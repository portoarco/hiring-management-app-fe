"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface IDashboardWrapper {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: IDashboardWrapper) {
  const router = useRouter();
  return (
    <>
      {" "}
      <nav className="h-12 w-full shadow-md bg-neutral-10 flex items-center justify-between p-5 lg:px-28">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative size-15  lg:size-30 ">
            <Image
              src={"/logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-primary-main text-sm lg:text-xl font-bold ">
            Job Portal
          </p>
        </div>
        <div className="border-l-2 border-neutral-40 pl-7">
          <div className="flex items-center gap-2">
            <Avatar
              className="cursor-pointer"
              // onClick={() => setOpenDropdownProfile((prev) => !prev)}
            >
              <AvatarImage src={"/avatar.png"}></AvatarImage>
            </Avatar>
            {/* <DropdownProfile
            open={openDropdownProfile}
            setOpen={setOpenDropdownProfile}
          /> */}
            <Button
              variant={"destructive"}
              className="cursor-pointer rounded-xl"
              onClick={() => router.replace("/")}
            >
              <LogOutIcon className="size-4 font-medium" />
              <span className="font-medium max-sm:hidden">Logout</span>
            </Button>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
