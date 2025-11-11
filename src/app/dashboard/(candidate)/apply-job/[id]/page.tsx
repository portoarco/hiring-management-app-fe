"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { use } from "react";

interface IApplyJob {
  params: Promise<{ jobId: string }>;
}
export default function ApplyJob({ params }: IApplyJob) {
  const { jobId } = use(params);
  const router = useRouter();
  return (
    <section className="min-w-screen min-h-screen overflow-auto flex items-center justify-center  ">
      <section className="header">
        <div className=" bg-neutral-10 overflow-auto md:w-[700px] mx-auto  w-[500px]  p-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => router.replace("/dashboard/joblist")}
              >
                <ArrowLeftIcon />
              </Button>
              <p className="text-xl font-semibold">
                Apply Front End at Rakamin
              </p>
            </div>
            <p>
              <span className="text-danger-main">*</span> This fields required
              to fill
            </p>
          </div>
          <div id="form-data" className="mt-5">
            <form>
              <div id="photo">
                <label className="text-s-bold ">
                  Photo Profile <span className="text-danger-main">*</span>
                </label>
                <Avatar className="size-32 mt-2">
                  <AvatarImage src={"/avatar.png"}></AvatarImage>
                </Avatar>
                <div className="my-3">
                  <Input
                    className="w-50"
                    type="file"
                    placeholder="Upload Photo"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Full Name <span className="text-danger-main">*</span>
                </label>
                <Input placeholder="Enter Your Full Name" />
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Date of birth <span className="text-danger-main">*</span>
                </label>
                <Input type="date" placeholder="Input Date of Birth" />
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Pronoun (gender) <span className="text-danger-main">*</span>
                </label>
                <RadioGroup className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="option-one" />
                    <label htmlFor="option-one">He/him (Male)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="option-two" />
                    <label htmlFor="option-two">She/her(Female)</label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Domicile<span className="text-danger-main">*</span>
                </label>
                <Input placeholder="Input Your Domicile" />
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Phone Number<span className="text-danger-main">*</span>
                </label>
                <Input type="number" placeholder="6281XXXXX" />
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Email<span className="text-danger-main">*</span>
                </label>
                <Input placeholder="Enter your email address" />
              </div>
              <div className="mt-2">
                <label className="text-s-regular">
                  Link Linkedin<span className="text-danger-main">*</span>
                </label>
                <Input placeholder="https://linkedin.com/in/username" />
              </div>
              <Button className="bg-primary-main hover:bg-primary-hover mt-5 cursor-pointer w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
}
