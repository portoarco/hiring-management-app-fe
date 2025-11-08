"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import YellowButton from "@/components/yellow-button";
import Link from "next/link";
import AuthLayoutWrapper from "../layoutWrapper";
import Image from "next/image";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TooltipHover from "@/components/tooltip-awareness";

export default function LoginPage() {
  const [showLoginPass, setShowLoginPass] = useState(false);
  return (
    <AuthLayoutWrapper>
      <span className="font-bold text-[20px] leading-8 mb-2">
        Masuk ke Rakamin
      </span>
      <p className="text-m-regular mb-4 leading-6">
        Belum punya akun?{" "}
        <span>
          <Link href="#" className="text-primary-main">
            Daftar Menggunakan email
          </Link>
        </span>
      </p>
      <form>
        {/* Form */}
        <label className="text-s-regular mb-2.5">Alamat Email</label>
        <div className="w-full flex flex-col gap-5">
          <Input className="focus-visible:ring-primary-main hover:border-primary-main hover:border-2" />
        </div>
        <div hidden={!showLoginPass} className="mt-2">
          <TooltipHover label="Fitur login dengan kata sandi akan dihapus. Pastikan emailmu valid untuk login melalui email atau Google">
            <label className="text-s-regular mb-2.5">Password</label>
          </TooltipHover>
          <div className="w-full flex flex-col gap-5">
            <Input className="focus-visible:ring-primary-main hover:border-primary-main hover:border-2" />
          </div>
        </div>
      </form>

      {/* Btn Send Email Login */}
      <div className="flex flex-col gap-3 mt-5">
        <YellowButton
          hidden={showLoginPass}
          label="Kirim Link"
          className="w-full"
        />
        {/* Btn Login Manually */}
        <YellowButton
          label="Masuk"
          className="w-full"
          hidden={!showLoginPass}
        />
      </div>
      <div className="flex items-center gap-2 w-full mt-5">
        <Separator className="flex-1" />
        <span className="text-sm text-neutral-60">or</span>
        <Separator className="flex-1" />
      </div>

      {/* Button Helper  */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Pass */}
        <Button
          type="button"
          className="bg-white hover:bg-white cursor-pointer border border-neutral-40 shadow-xs text-black"
          hidden={showLoginPass}
          onClick={() => setShowLoginPass((prev) => !prev)}
        >
          <KeyIcon />
          <span className="text-m-bold">Masuk dengan kata sandi</span>
        </Button>
        {/* Send Login via email */}
        <Button
          type="button"
          className="bg-white hover:bg-white cursor-pointer border border-neutral-40 shadow-xs text-black"
          hidden={!showLoginPass}
          onClick={() => setShowLoginPass((prev) => !prev)}
        >
          <EnvelopeIcon />
          <span className="text-m-bold">Kirim link login melalui email</span>
        </Button>
        {/* Google */}
        <Button
          type="button"
          className="bg-white hover:bg-white cursor-pointer border border-neutral-40 shadow-xs text-black "
        >
          <Image src="/google.png" alt="google-icon" width={20} height={20} />
          <span className="text-m-bold">Masuk dengan Google</span>
        </Button>
      </div>
    </AuthLayoutWrapper>
  );
}
