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
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatRupiah } from "@/utils/formatInputRupiah";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";

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

export default function CreateNewJob({ open, setOpen }: ICreateNewJob) {
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");
  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSalary(formatRupiah(e.target.value));
  };
  const [selectedProfileInfo, setSelectedProfileInfo] = useState<
    Record<number, "mandatory" | "optional" | "off" | null>
  >({});

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSalary(formatRupiah(e.target.value));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent size="xl" className="h-[75%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Job Opening</DialogTitle>
          </DialogHeader>
          <hr className="w-full" />
          {/* Form Section */}
          <section id="job-info">
            <div>
              <label>
                Job Name <span className="text-danger-main">*</span>
              </label>
              <Input placeholder="Ex. Front End Engineer" />
            </div>
            <div>
              <label>
                Job Type <span className="text-danger-main">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Select Job Type"
                    className="font-bold"
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time" className="font-bold">
                    Full Time
                  </SelectItem>
                  <SelectItem value="contract" className="font-bold">
                    Contract
                  </SelectItem>
                  <SelectItem value="part-time" className="font-bold">
                    Part Time
                  </SelectItem>
                  <SelectItem value="internship" className="font-bold">
                    Internship
                  </SelectItem>
                  <SelectItem value="freelance" className="font-bold">
                    Freelance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label>
                Job Description <span className="text-danger-main">*</span>
              </label>
              <Textarea />
            </div>
            <div>
              <label>
                Number of Candidate Needed{" "}
                <span className="text-danger-main">*</span>
              </label>
              <Input type="number" placeholder="Ex 2." />
            </div>
          </section>
          {/*  */}
          <hr className="border-dashed" />
          <section id="job-salary">
            <p>Job Salary</p>
            <div className="flex items-center mt-2">
              <div className="flex-1">
                <label className="block mb-1">
                  Minimum Estimated Salary (Rp)
                </label>
                <Input
                  placeholder="7.000.000"
                  value={minSalary}
                  onChange={handleMinSalaryChange}
                />
              </div>

              <div className="w-5 h-0.5 bg-neutral-40 mx-4 mt-7 self-center"></div>

              <div className="flex-1">
                <label className="block mb-1">
                  Maximum Estimated Salary (Rp)
                </label>
                <Input
                  placeholder="14.000.000"
                  value={maxSalary}
                  onChange={handleMaxSalaryChange}
                />
              </div>
            </div>
          </section>
          <section id="min-profile-info">
            <Card className="shadow-none py-3">
              <CardContent>
                <p className="text-m-bold">
                  Minimum Profile Information Required
                </p>
                <div className="grid grid-cols-1 gap-5 mt-2">
                  {profileInfoReq.map((info, idx) => (
                    <div key={info.id}>
                      <div className="flex justify-between items-center ">
                        <p className="text-m-regular">{info.name}</p>
                        <div className="flex items-center gap-3 ">
                          <Button
                            className={`cursor-pointer rounded-xl ${
                              selectedProfileInfo[info.id] === "mandatory"
                                ? "bg-primary-main hover:tex-white text-white"
                                : "bg-white text-primary-main border-primary-main border hover:bg-primary-hover hover:text-white "
                            }`}
                            disabled={!info.isMandatoryActive}
                            onClick={() =>
                              setSelectedProfileInfo((prev) => ({
                                ...prev,
                                [info.id]: "mandatory",
                              }))
                            }
                          >
                            Mandatory
                          </Button>
                          <Button
                            className={`cursor-pointer rounded-xl ${
                              selectedProfileInfo[info.id] === "optional"
                                ? "bg-primary-main hover:tex-white text-white"
                                : "bg-white text-primary-main border-primary-main border hover:bg-primary-hover hover:text-white "
                            }`}
                            disabled={!info.isOptionalActive}
                            onClick={() =>
                              setSelectedProfileInfo((prev) => ({
                                ...prev,
                                [info.id]: "optional",
                              }))
                            }
                          >
                            Optional
                          </Button>
                          <Button
                            className={`cursor-pointer rounded-xl ${
                              selectedProfileInfo[info.id] === "off"
                                ? "bg-primary-main hover:tex-white text-white"
                                : "bg-white text-primary-main border-primary-main border hover:bg-primary-hover hover:text-white "
                            }`}
                            disabled={!info.isOffActive}
                            onClick={() =>
                              setSelectedProfileInfo((prev) => ({
                                ...prev,
                                [info.id]: "off",
                              }))
                            }
                          >
                            Off
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        {idx < profileInfoReq.length - 1 && <hr />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <hr />
          <DialogFooter>
            <Button className="bg-primary-main hover:bg-primary-hover text-white font-bold cursor-pointer rounded-xl">
              Publish Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
