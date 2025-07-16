// src/app/appointment/[userId]/page.tsx

import { Metadata } from "next";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

// This is the correct shape expected by Next.js App Router
interface PageProps {
  params: {
    userId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Appointment | CarePulse`,
    description: `Book appointment for user ${params.userId}`,
  };
}

export default async function AppointmentPage({ params }: PageProps) {
  const patient = await getPatient(params.userId);

  return (
    <div className="flex h-screen max-h-screen ml-10 mt-10">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id || ""}
            userId={params.userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
