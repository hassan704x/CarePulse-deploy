"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";

import { useRouter } from "next/navigation";





export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  SKELETON = "skeleton",
  CUSTOM = "custom", 
 DATE_PICKER = "DATE_PICKER",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

 async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
  setIsLoading(true);

  try {
    const user = { name, email, phone };
    console.log(user);
    router.push("/register");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="max-w-lg w-[476px] mx-auto p-6 bg-[#1a1a1a] rounded-xl shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="text-32-bold md:text-36-bold">Hi there 👋</h1>
            <p className="text-[#ABB8C4]">
              Schedule your first appointment.
            </p>
          </section>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone" 
            label="Phone Number"
            placeholder="(555) 123-4567"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
