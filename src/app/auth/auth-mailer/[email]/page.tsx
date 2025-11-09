import { use } from "react";
import AuthLayoutWrapper from "../../layoutWrapper";
import Image from "next/image";

interface IParams {
  params: Promise<{ email: string }>;
}

export default function AuthMailer({ params }: IParams) {
  const { email } = use(params);
  const cleanEmail = decodeURIComponent(email);
  return (
    <AuthLayoutWrapper>
      <div className="flex flex-col text-center items-center justify-center gap-2">
        <p className="heading-m-bold">Periksa Email Anda</p>
        <p className="text-m-regular">
          Kami sudah mengirimkan link ke <strong>{cleanEmail}</strong> yang
          berlaku dalam <strong>30 menit</strong>
        </p>

        <Image
          src="/verif-email.png"
          alt="verif-email-pic"
          width={1000}
          height={1000}
          className="w-50"
        />
      </div>
    </AuthLayoutWrapper>
  );
}
