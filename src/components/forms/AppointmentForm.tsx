"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getAppointmentSchema } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "./PatientForm";
import SubmitButton from "@/components/ui/SubmitButton";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";

interface AppointmentFormProps {
  type: "create" | "cancel" | "schedule";
  patientId?: string;
  userId?: string;
  setOpen?: (open: boolean) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  type,
  patientId,
  userId,
  setOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormSchema = getAppointmentSchema(type);

  const form = useForm({
    resolver: zodResolver(AppointmentFormSchema),
    defaultValues: {
      primaryPhysician: "",
      schedule: undefined,
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormSchema>) => {
    setIsLoading(true);

    const payload = {
      ...values,
      schedule: values.schedule?.toISOString(),
      patientId,
      userId,
    };

    setTimeout(() => {
      console.log("Payload submitted:", payload);
      form.reset();
      setIsLoading(false);

      if (setOpen) setOpen(false);

      const appointmentId = "fake-12345";
      router.push(
        `/appointment/success/${userId}?appointmentId=${appointmentId}`
      );
    }, 1000);
  };

  const buttonLabel =
    type === "cancel"
      ? "Cancel Appointment"
      : type === "schedule"
      ? "Schedule Appointment"
      : "Submit Appointment";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {/* Doctor select */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            ><div className="bg-gray-900 text-white">

              {Doctors.map((doctor, i) => (
                <SelectItem key={i} value={doctor.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}

            </div>
            </CustomFormField>

            {/* Date Picker */}
            <div>
              <label className="block mb-1 font-medium text-white">
                Expected appointment date
              </label>
              <Controller
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value as Date | null}
                    onChange={(date) => field.onChange(date)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy - h:mm aa"
                    placeholderText="Select a date and time"
                    className="w-full rounded-md border border-gray-300 p-2 text-white"
                  />
                )}
              />
              {form.formState.errors.schedule && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.schedule.message}
                </p>
              )}
            </div>

            {/* Reason and Note */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="e.g., Chest pain, headache"
                disabled={type === "schedule"}
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comments / Notes"
                placeholder="Optional notes"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="I can't make it due to..."
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`w-full ${
            type === "cancel"
              ? "bg-red-700 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
