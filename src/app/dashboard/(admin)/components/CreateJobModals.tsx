import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createJobSchema, CreateJobSchema } from "@/lib/schema/createJobSchema";
import { formatRupiah } from "@/utils/formatInputRupiah";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ProfileRequirements, ProfileRequirementValue } from "@/types/job";

interface ICreateNewJob {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const profileInfoReq = [
  {
    id: 1,
    name: "Full Name",
    isMandatoryActive: true,
    isOptionalActive: false,
    isOffActive: false,
  },
  {
    id: 2,
    name: "Photo Profile",
    isMandatoryActive: true,
    isOptionalActive: false,
    isOffActive: false,
  },
  {
    id: 3,
    name: "Gender",
    isMandatoryActive: true,
    isOptionalActive: true,
    isOffActive: true,
  },
  {
    id: 4,
    name: "Domicile",
    isMandatoryActive: true,
    isOptionalActive: true,
    isOffActive: true,
  },
  {
    id: 5,
    name: "Email",
    isMandatoryActive: true,
    isOptionalActive: false,
    isOffActive: false,
  },
  {
    id: 6,
    name: "Phone number",
    isMandatoryActive: true,
    isOptionalActive: true,
    isOffActive: true,
  },
  {
    id: 7,
    name: "Linkedin link",
    isMandatoryActive: true,
    isOptionalActive: true,
    isOffActive: true,
  },
  {
    id: 8,
    name: "Date of birth",
    isMandatoryActive: true,
    isOptionalActive: true,
    isOffActive: true,
  },
];

// Helper untuk mengubah nama menjadi key ProfileRequirements
const toKey = (name: string): keyof ProfileRequirements => {
  switch (name.toLowerCase()) {
    case "full name":
      return "full_name";
    case "photo profile":
      return "photo_profile";
    case "gender":
      return "gender";
    case "domicile":
      return "domicile";
    case "email":
      return "email";
    case "phone number":
      return "phone_number";
    case "linkedin link":
      return "linkedin_link";
    case "date of birth":
      return "date_of_birth";
    default:
      throw new Error(`Invalid profile field name: ${name}`);
  }
};

export default function CreateNewJob({ open, setOpen }: ICreateNewJob) {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedProfileInfo, setSelectedProfileInfo] =
    useState<ProfileRequirements>({});

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateJobSchema>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      job_name: "",
      job_type: "",
      job_desc: "",
      number_candidate: 0,
      min_salary: "",
      max_salary: "",
      profile_requirements: profileInfoReq.reduce((acc, info) => {
        const key = toKey(info.name);
        acc[key] = "mandatory";
        return acc;
      }, {} as ProfileRequirements),
    },
  });

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setMinSalary(formatted);
    setValue("min_salary", formatted);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setMaxSalary(formatted);
    setValue("max_salary", formatted);
  };

  const handleProfileRequirementChange = (
    key: keyof ProfileRequirements,
    value: ProfileRequirementValue
  ) => {
    setSelectedProfileInfo((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: CreateJobSchema) => {
    try {
      const payload = { ...data, profile_requirements: selectedProfileInfo };
      console.log(payload);
      toast.success("Lowongan Berhasil Terdaftar");
      reset();
      setSelectedProfileInfo({});
      setMinSalary("");
      setMaxSalary("");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent size="xl" className="h-[75%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Job Opening</DialogTitle>
          </DialogHeader>
          <hr className="w-full" />

          {/* Job Info Section */}
          <section id="job-info" className="space-y-4">
            <div>
              <label>
                Job Name <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("job_name")}
                placeholder="Ex. Front End Engineer"
              />
              {errors.job_name && (
                <div className="flex items-center mt-2 gap-2 text-danger-main text-sm">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  <span>{errors.job_name.message}</span>
                </div>
              )}
            </div>

            <div>
              <label>
                Job Type <span className="text-danger-main">*</span>
              </label>
              <Controller
                name="job_type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select Job Type"
                        className="font-bold"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Time" className="font-bold">
                        Full Time
                      </SelectItem>
                      <SelectItem value="Contract" className="font-bold">
                        Contract
                      </SelectItem>
                      <SelectItem value="Part Time" className="font-bold">
                        Part Time
                      </SelectItem>
                      <SelectItem value="Internship" className="font-bold">
                        Internship
                      </SelectItem>
                      <SelectItem value="Freelance" className="font-bold">
                        Freelance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label>
                Job Description <span className="text-danger-main">*</span>
              </label>
              <Textarea {...register("job_desc")} />
            </div>

            <div>
              <label>
                Number of Candidate Needed{" "}
                <span className="text-danger-main">*</span>
              </label>
              <Input
                {...register("number_candidate")}
                type="number"
                placeholder="Ex. 2"
              />
            </div>
          </section>

          <hr className="border-dashed my-4" />

          {/* Salary Section */}
          <section id="job-salary" className="space-y-4">
            <p>Job Salary</p>
            <div className="flex max-sm:flex-col gap-4">
              <div className="flex-1">
                <label>Minimum Estimated Salary (Rp)</label>
                <Input
                  value={minSalary}
                  onChange={handleMinSalaryChange}
                  placeholder="7.000.000"
                />
              </div>
              <div className="flex-1">
                <label>Maximum Estimated Salary (Rp)</label>
                <Input
                  value={maxSalary}
                  onChange={handleMaxSalaryChange}
                  placeholder="14.000.000"
                />
              </div>
            </div>
          </section>

          <hr className="border-dashed my-4" />

          {/* Profile Requirements Section */}
          <section id="min-profile-info">
            <Card className="shadow-none py-3">
              <CardContent>
                <p className="text-m-bold max-sm:text-center">
                  Minimum Profile Information Required
                </p>
                <div className="grid grid-cols-1 gap-5 mt-2">
                  {profileInfoReq.map((info) => {
                    const key = toKey(info.name);
                    const value = selectedProfileInfo[key] || "mandatory";

                    return (
                      <div key={info.id}>
                        <div className="flex max-sm:flex-col justify-between items-center gap-3">
                          <p>{info.name}</p>
                          <div className="flex gap-3">
                            {(
                              [
                                "mandatory",
                                "optional",
                                "off",
                              ] as ProfileRequirementValue[]
                            ).map((v) => (
                              <Button
                                key={v}
                                className={`rounded-xl ${
                                  value === v
                                    ? "bg-primary-main text-white"
                                    : "bg-white border border-primary-main text-primary-main"
                                }`}
                                disabled={
                                  (v === "mandatory" &&
                                    !info.isMandatoryActive) ||
                                  (v === "optional" &&
                                    !info.isOptionalActive) ||
                                  (v === "off" && !info.isOffActive)
                                }
                                onClick={() =>
                                  handleProfileRequirementChange(key, v)
                                }
                              >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <hr />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          <hr className="my-4" />

          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary-main hover:bg-primary-hover text-white font-bold rounded-xl"
            >
              Publish Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
