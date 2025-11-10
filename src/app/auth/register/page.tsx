"use client";
import TooltipHover from "@/components/tooltip-awareness";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import YellowButton from "@/components/yellow-button";
import {
  CheckBadgeIcon,
  CheckIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthLayoutWrapper from "../layoutWrapper";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      loginByPassword: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log("Mulai submit:", data);
    // Simulasi pemanggilan API selama 2 detik
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (data.loginByPassword === true) {
      console.log("Anda login dengan password");
    } else {
      console.log("Anda login dengan email");
      router.replace(`auth/auth-mailer/${encodeURIComponent(data.email)}`);
      reset();
    }
  };

  return (
    <>
      <AuthLayoutWrapper>
        <span className="font-bold text-[20px] leading-8 mb-2">
          Bergabung dengan Rakamin
        </span>
        <p className="text-m-regular mb-4 leading-6">
          Sudah punya akun?{" "}
          <span>
            <Link href="/auth/login" className="text-primary-main">
              Masuk
            </Link>
          </span>
        </p>
        {/* Error Notification */}
        {/* <section className="mb-2 border border-danger-border bg-danger-surface rounded-sm px-5 py-1">
          <p className="text-s-regular text-danger-main">
            Email ini sudah terdaftar sebagai akun di Rakamin Academy.{" "}
            <strong>
              <Link href="#">Masuk</Link>
            </strong>
          </p>
        </section> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form */}
          <label className="text-s-regular mb-2.5" htmlFor="email">
            Alamat Email
          </label>
          <div id="email" className="w-full flex flex-col gap-5">
            <Input
              {...register("email")}
              className={`  ${
                errors.email
                  ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                  : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center mt-2 gap-2">
              <ExclamationTriangleIcon className="text-danger-main size-5" />
              <p className="text-danger-main text-sm">{errors.email.message}</p>
            </div>
          )}
          {/* Success Caption Notification */}
          {/* <div className="flex items-center mt-2">
            <CheckIcon className="size-5 text-success-main font-bold stroke-3" />
            <span className="text-s-regular text-success-main">
              Alamat email teridentifikasi
            </span>
          </div> */}

          <div hidden={!showLoginPass} className="mt-2">
            <TooltipHover label="Fitur login dengan kata sandi akan dihapus. Pastikan emailmu valid untuk login melalui email atau Google">
              <label className="text-s-regular mb-2.5" htmlFor="password">
                Password
              </label>
            </TooltipHover>
            <div className="w-full flex flex-col gap-5 relative">
              <Input
                {...register("password")}
                className={`  ${
                  errors.password
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
                type={showPassword ? "text" : "password"}
              />

              {showPassword ? (
                <button
                  type="button"
                  className="absolute size-5 right-2 top-1/4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <EyeSlashIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute size-5 right-2 top-1/4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <EyeIcon />
                </button>
              )}
            </div>
            {errors.password && (
              <div className="flex items-center mt-2 gap-2">
                <ExclamationTriangleIcon className="text-danger-main size-5" />
                <p className="text-danger-main text-sm">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Btn Send Email Login */}
        <div className="flex flex-col gap-3 mt-5">
          <YellowButton
            hidden={showLoginPass}
            className="w-full"
            onClick={() => {
              setValue("loginByPassword", false);
              handleSubmit(onSubmit)();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Please wait</span>
              </>
            ) : (
              "Daftar dengan Email"
            )}
          </YellowButton>
          {/* Btn Login Manually */}
          <YellowButton
            className="w-full"
            hidden={!showLoginPass}
            onClick={() => {
              setValue("loginByPassword", true);
              handleSubmit(onSubmit)();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Please wait</span>
              </>
            ) : (
              "Masuk"
            )}
          </YellowButton>
        </div>
        <div className="flex items-center gap-2 w-full mt-5">
          <Separator className="flex-1" />
          <span className="text-sm text-neutral-60">or</span>
          <Separator className="flex-1" />
        </div>

        {/* Button Helper  */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Google */}
          <TooltipHover label="Fitur ini belum tersedia">
            <Button
              type="button"
              className="bg-white hover:bg-white  border border-neutral-40 shadow-xs text-gray-300/60 cursor-not-allowed  disabled:"
            >
              <Image
                src="/google.png"
                alt="google-icon"
                width={20}
                height={20}
              />
              <span className="text-m-bold">Daftar dengan Google</span>
            </Button>
          </TooltipHover>
        </div>
      </AuthLayoutWrapper>
    </>
  );
}
