"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { applyJobSchema, ApplyJobSchema } from "@/lib/schema/applyJobSchema";
import { IJobDetails } from "@/types/job";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IApplyJob {
  params: Promise<{ jobId: string }>;
}

export default function ApplyJob({ params }: IApplyJob) {
  const { jobId } = use(params);
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");
  const [jobData, setJobData] = useState<IJobDetails | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplyJobSchema>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      fullname: "",
      date_of_birth: undefined,
      gender: "",
      domicile: "",
      phone_number: "",
      email: "",
      linkedin_url: "",
    },
  });

  const onSubmit = (data: ApplyJobSchema) => {
    try {
      console.log(data);
      toast.success("Lamaran Anda Terkirim");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("selectedJob");
    if (data) {
      setTimeout(() => setJobData(JSON.parse(data)), 0);
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center  overflow-auto p-4">
      <section className="w-full max-w-[700px] bg-neutral-10 p-6 sm:p-8 md:p-10 shadow-sm rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem("selectedJob");
                router.replace("/dashboard/joblist");
              }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <p className="text-lg font-semibold text-wrap">
              Apply <span className="font-bold">{jobData?.jobTitle}</span> at{" "}
              {jobData?.companyName}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            <span className="text-danger-main">*</span> This fields required to
            fill
          </p>
        </div>

        <div id="form-data" className="mt-6">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div id="photo">
              <label className="text-s-bold">
                Photo Profile <span className="text-danger-main">*</span>
              </label>
              <div className="flex flex-col max-sm:flex-row max-sm:items-center max-sm:gap-2 sm:gap-6 mt-3">
                <Avatar className="size-24 sm:size-24">
                  <AvatarImage src={"/avatar.png"} />
                </Avatar>
                <Input
                  className="sm:w-1/3 mt-3 sm:mt-0 cursor-pointer"
                  type="file"
                  placeholder="Upload Photo"
                />
              </div>
            </div>

            <div>
              <label className="text-s-regular">
                Full Name <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("fullname")}
                placeholder="Enter Your Full Name"
                className={`  ${
                  errors.fullname
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.fullname && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.fullname.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-s-regular">
                Date of birth <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("date_of_birth", {
                  setValueAs: (v) => (v ? new Date(v) : undefined),
                })}
                type="date"
                placeholder="Input Date of Birth"
                className={`  ${
                  errors.date_of_birth
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.date_of_birth && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.date_of_birth.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-s-regular">
                Pronoun (gender) <span className="text-danger-main">*</span>
              </label>
              <RadioGroup
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2"
                value={selectedGender}
                onValueChange={(value) => {
                  setValue("gender", value);
                  setSelectedGender(value);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="option-one" />
                  <label htmlFor="option-one">He/him (Male)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="option-two" />
                  <label htmlFor="option-two">She/her (Female)</label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label className="text-s-regular">
                Domicile <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("domicile")}
                placeholder="Input Your Domicile"
                className={`  ${
                  errors.domicile
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.domicile && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.domicile.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-s-regular">
                Phone Number <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("phone_number")}
                type="number"
                placeholder="6281XXXXX"
                className={`  ${
                  errors.phone_number
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.phone_number && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.phone_number.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-s-regular">
                Email <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className={`  ${
                  errors.email
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.email && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.email.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-s-regular">
                Link Linkedin <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("linkedin_url")}
                placeholder="https://linkedin.com/in/username"
                className={`  ${
                  errors.linkedin_url
                    ? "focus-visible:ring-danger-main hover:border-danger-main hover:border-2"
                    : "focus-visible:ring-primary-main hover:border-primary-main hover:border-2"
                }`}
              />
              {errors.linkedin_url && (
                <div className="flex items-center mt-2 gap-2">
                  <ExclamationTriangleIcon className="text-danger-main size-5" />
                  <p className="text-danger-main text-sm">
                    {errors.linkedin_url.message}
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="bg-primary-main hover:bg-primary-hover mt-5 cursor-pointer w-full"
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
    </section>
  );
}
