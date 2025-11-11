"use client";
import { dummyJob } from "@/api/dummyJobData";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import YellowButton from "@/components/yellow-button";
import { IJobDetails } from "@/types/job";
import { convertDate } from "@/utils/convertDate";
import { formatSalaryToRupiah } from "@/utils/formatSalaryToRupiah";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CreateNewJob from "../components/CreateJobModals";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardWrapper from "../../dashboardWrapper";

// const dummyJob: any = [];

const jobStatusBadge = (status: IJobDetails["jobStatus"]) => {
  if (status === "Active") {
    return (
      <Badge className="bg-primary-surface text-success-main font-bold border border-success-border rounded-lg">
        {status}
      </Badge>
    );
  }
  if (status === "Inactive") {
    return (
      <Badge className="bg-danger-surface text-danger-main font-bold border border-danger-border rounded-lg">
        {status}
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-secondary-surface text-secondary-main font-bold border border-secondary-border rounded-lg">
        {status}
      </Badge>
    );
  }
};

export default function AdminJobPortal() {
  const [openCreateJob, setOpenCreateJob] = useState(false);
  const router = useRouter();

  return (
    <>
      <DashboardWrapper>
        <section className="flex flex-wrap justify-between items-start gap-5 mt-5 px-2 lg:px-20">
          <div className="flex-1 min-w-[300px] flex flex-col gap-5">
            <div className="relative w-full">
              <Input
                placeholder="Search by job details"
                className="w-full bg-neutral-10 border-border"
              />
              <MagnifyingGlassIcon className="absolute top-2 right-2 size-5 stroke-2 text-primary-main" />
            </div>

            {dummyJob.length > 0 ? (
              <section
                id="job-list"
                className="grid grid-cols-1 xl:grid-cols-2 gap-5"
              >
                {dummyJob.map((job, idx) => (
                  <Card key={idx}>
                    <CardContent>
                      <div className="flex gap-5 mb-2">
                        {jobStatusBadge(job.jobStatus)}
                        <div className="border border-border rounded-md px-3 py-1">
                          <span className="text-neutral-90 text-[14px]">
                            started on {convertDate(job.startedAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-bold">{job.jobTitle}</p>
                      <div className="flex items-center justify-between">
                        <p>
                          {formatSalaryToRupiah(job.minSalary)} -{" "}
                          {formatSalaryToRupiah(job.maxSalary)}
                        </p>
                        <Button
                          className="bg-primary-main hover:bg-primary-hover cursor-pointer"
                          onClick={() =>
                            router.push(
                              "/dashboard/jobportal-admin/manage-candidates"
                            )
                          }
                        >
                          Manage Jobs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            ) : (
              <section className="flex flex-col justify-center items-center text-center w-full min-h-[50vh]">
                <div className="w-50 h-50 lg:w-80 lg:h-80 relative">
                  <Image
                    src="/no-openings.png"
                    alt="no-jobs"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="heading-s-bold text-center">
                    No job openings available
                  </p>
                  <p className="text-l-regular text-center">
                    Create a job opening now and start the candidate process
                  </p>
                </div>
                <div className="mt-5">
                  <YellowButton
                    onClick={() => setOpenCreateJob((prev) => !prev)}
                  >
                    <span>Create a new job</span>
                  </YellowButton>
                </div>
              </section>
            )}
          </div>

          <section
            id="create-job-card"
            className="relative w-72 max-sm:min-w-full h-40 p-5 rounded-xl bg-[url(/recruit.jpg)] bg-cover bg-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-[18px] font-bold text-neutral-40">
                  Recruit the best candidates
                </p>
                <p className="text-neutral-10 font-bold text-[14px] ">
                  Create jobs, invite, and hire with ease
                </p>
              </div>
              <div>
                <Button
                  className="w-full bg-primary-main hover:bg-primary-hover cursor-pointer text-[16px] font-semibold text-neutral-10"
                  onClick={() => setOpenCreateJob((prev) => !prev)}
                >
                  Create a new job
                </Button>
              </div>
            </div>
          </section>
        </section>

        {openCreateJob && (
          <CreateNewJob open={openCreateJob} setOpen={setOpenCreateJob} />
        )}
      </DashboardWrapper>
    </>
  );
}
