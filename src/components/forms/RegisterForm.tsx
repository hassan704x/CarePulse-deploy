"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import CustomFormField from "@/components/forms/CustomFormField";
import FileUploader from "@/components/ui/FileUploader";
import SubmitButton from "@/components/ui/SubmitButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Doctors, IdentificationTypes } from "@/constants";
import { FormFieldType } from "@/components/forms/PatientForm";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  birthDate: Date | null;
  gender: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocument: File[];
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
};

type RegisterFormProps = {
  user: string;
};

const RegisterForm = ({ user }: RegisterFormProps) => {
  console.log(user);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: null,
      gender: "",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      identificationDocument: [],
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  });

  const { control, handleSubmit } = methods;
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    router.push("/appointment/[userId]");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 space-y-12 max-w-4xl mx-auto p-6"
      >
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome 👋</h1>
          <p className="text-muted-foreground">
            Let us know more about yourself.
          </p>
        </section>

        {/* Personal Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <CustomFormField
            control={control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row justify-between">
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <div className="space-y-2 w-full">
                  <Label className="font-medium">Date of Birth</Label>
                  <DatePicker
                    selected={field.value ?? null}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className="w-full rounded-md border border-gray-300 p-2 text-white"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <div className="space-y-2 w-full">
                  <Label className="font-medium">Gender</Label>
                  <RadioGroup
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    {["Male", "Female", "Other"].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="address"
              label="Address"
              placeholder="14 street, New York, NY - 5101"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        {/* Medical Information */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Medical Information</h2>

          <CustomFormField
            control={control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
            
          ><div className="bg-gray-900 text-white">
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex items-center gap-2 p-2 rounded">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}

          </div>
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.INPUT}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.TEXTAREA}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.TEXTAREA}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={control}
              fieldType={FormFieldType.TEXTAREA}
              name="familyMedicalHistory"
              label="Family medical history"
              placeholder="Mother had cancer, Father has hypertension"
            />
            <CustomFormField
              control={control}
              fieldType={FormFieldType.TEXTAREA}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma"
            />
          </div>
        </section>

        {/* Identification */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Identification</h2>

          <CustomFormField
            control={control}
            fieldType={FormFieldType.SELECT}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          ><div className="bg-gray-900 text-white">
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}

          </div>
          </CustomFormField>

          <CustomFormField
            control={control}
            fieldType={FormFieldType.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <Controller
            control={control}
            name="identificationDocument"
            render={({ field }) => (
              <div className="space-y-2">
                <Label className="font-medium">
                  Scanned Copy of Identification Document
                </Label>
                <FileUploader
                  onChange={(files) => field.onChange(files)}
                  files={field.value ?? []}
                />
              </div>
            )}
          />
        </section>

        {/* Consent */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Consent</h2>

          <CustomFormField
            control={control}
            fieldType={FormFieldType.CHECKBOX}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />
          <CustomFormField
            control={control}
            fieldType={FormFieldType.CHECKBOX}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health information for treatment purposes."
          />
          <CustomFormField
            control={control}
            fieldType={FormFieldType.CHECKBOX}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the privacy policy."
          />
        </section>

        <SubmitButton isLoading={false}>Submit and Continue</SubmitButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
