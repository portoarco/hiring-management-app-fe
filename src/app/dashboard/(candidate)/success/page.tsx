import Image from "next/image";

export default function SuccessPage() {
  return (
    <section className=" flex flex-col min-h-screen items-center justify-center">
      <div id="success-image" className="relative size-56 ">
        <Image
          src={"/sent-application.png"}
          alt="success-notif"
          fill
          className="object-contain"
        />
      </div>
      <div className="text-center mt-4">
        <p className="heading-m-bold">🎉Your application was sent!</p>
        <p className="text-l-regular mt-2">
          Congratulations! You have taken the first step towards a rewarding
          career at Rakamin.
        </p>
        <p className="text-l-regular">
          {" "}
          We look forward to learning more about you during the application
          process.
        </p>
      </div>
    </section>
  );
}
