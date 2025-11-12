"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/helper/apiCall";
import { useUserStore } from "@/stores/user-store";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IDashboardWrapper {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: IDashboardWrapper) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("user_token");
      try {
        const res = await apiCall.post(`/api/user/data`, { data: { token } });
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
  }, []);

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
              <AvatarImage src={user?.avatar ?? "/avatar.png"}></AvatarImage>
            </Avatar>
            {/* <DropdownProfile
            open={openDropdownProfile}
            setOpen={setOpenDropdownProfile}
          /> */}
            <Button
              variant={"destructive"}
              className="cursor-pointer rounded-xl"
              onClick={() => {
                localStorage.removeItem("user_token");
                router.replace("/");
              }}
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
