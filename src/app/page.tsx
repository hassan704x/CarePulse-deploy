import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-between h-screen max-h-screen">
      <section className=" w-fit h-fit mx-auto px-8 max-w-full 2xl:max-w-[1400px] my-auto ">
        <div>
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-14-regular mt20 flex justify-between">
            <p className="justify-items-end text-[#76828D] xl:text-left">
              © 2025 CarePulse
            </p>
            <Link href="/src/components/forms/RegisterForm.tsx" className="text-green-500">Admin</Link> 
          </div>
        </div>
      </section>
      <Image 
      src="/assets/images/onboarding-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
