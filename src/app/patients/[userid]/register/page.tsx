"use client";

import Image from "next/image";
import React from "react";
import RegisterForm from "@/components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container overflow-y-auto">
        <div className="sub-container max-w-[860px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="logo"
            height={100}
            width={200}
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user=""/>

          <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
