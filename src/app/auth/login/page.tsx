"use client";
import TooltipHover from "@/components/tooltip-awareness";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import YellowButton from "@/components/yellow-button";
import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthLayoutWrapper from "../layoutWrapper";
import { apiCall } from "@/helper/apiCall";

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
    try {
      if (data.loginByPassword === true) {
        const res = await apiCall.post("/api/auth/login-manual", data);
        const token = res.data.token;
        router.replace(`/auth-token/login/${token}`);
        return;
      }
      const res = await apiCall.post("/api/auth/login-email", data);
      if (!res) return toast.error("Something went wrong");
      router.replace(`/auth/auth-mailer/${encodeURIComponent(data.email)}`);
      toast.success("Login Berhasil");
    } catch (error: any) {
      console.log(error);
      if (error.status === 404) {
        return toast.error("Email Tidak Terdaftar");
      }
      if (error.status === 401) {
        return toast.error("Password atau Email  Salah");
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <AuthLayoutWrapper>
        <span className="font-bold text-[20px] leading-8 mb-2">
          Masuk ke Rakamin
        </span>
        <p className="text-m-regular mb-4 leading-6">
          Belum punya akun?{" "}
          <span>
            <Link href="/auth/register" className="text-primary-main">
              Daftar Menggunakan email
            </Link>
          </span>
        </p>
        {/* Error Notification */}
        {/* <section className="mb-2 border border-danger-border bg-danger-surface rounded-sm px-5 py-1">
          <p className="text-s-regular text-danger-main">
            Email ini belum terdaftar sebagai akun di Rakamin Academy.{" "}
            <strong>
              <Link href="#">Daftar</Link>
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
              "Kirim Link"
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
          <TooltipHover label="Fitur ini belum tersedia">
            <Button
              type="button"
              className="bg-white hover:bg-white cursor-pointer border border-neutral-40 shadow-xs text-black "
              disabled
            >
              <Image
                src="/google.png"
                alt="google-icon"
                width={20}
                height={20}
              />
              <span className="text-m-bold">Masuk dengan Google</span>
            </Button>
          </TooltipHover>
        </div>
      </AuthLayoutWrapper>
    </>
  );
}
