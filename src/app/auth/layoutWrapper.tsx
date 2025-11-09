import Image from "next/image";
import React from "react";

export default function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-screen h-screen flex items-center justify-center ">
      <div className="">
        <div className="">
          <Image
            src="/logo.png"
            alt="logo"
            width={1000}
            height={1000}
            className="w-36"
          />
        </div>
        <div className=" bg-neutral-10 w-[500px] p-10 shadow-sm">
          {children}
        </div>
      </div>
    </section>
  );
}
