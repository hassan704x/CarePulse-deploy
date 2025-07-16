import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SearchParamProps {
  params: {
    userId: string;
  };
  searchParams: {
    appointmentId?: string;
  };
}

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = searchParams?.appointmentId || '';
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%] items-center justify-center">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has been successfully submitted!
          </h2>
          <p className="text-white">We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details space-y-4 mt-6">
          <p className="text-white">Requested appointment details:</p>

          <div className="flex items-center gap-3">
            {doctor?.image && (
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="rounded-full border border-white size-6"
              />
            )}
            <p className="whitespace-nowrap text-white">DR. {doctor?.name}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-white">
              {appointment?.schedule
                ? formatDateTime(appointment.schedule).dateTime
                : 'Not scheduled'}
            </p>
          </div>
        </section>

        <div className="mt-6">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>

        <p className="copyright mt-10 text-sm text-white">
          © 2024 Carepulse
        </p>
      </div>
    </div>
  );
};

export default Success;
