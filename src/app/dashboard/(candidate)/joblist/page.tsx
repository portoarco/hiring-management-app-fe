"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatSalaryToRupiah } from "@/utils/formatSalaryToRupiah";
import { BanknotesIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import JobDetails from "./components/job-details";
import { IJobDetails } from "@/types/job";
import DropdownProfile from "@/components/DropdownProfile";
import { dummyJob } from "@/api/dummyJobData";
import DashboardWrapper from "../../dashboardWrapper";

export default function JobListPage() {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJobCard, setSelectedJobCard] = useState<IJobDetails | null>(
    null
  );
  const [openDropdownProfile, setOpenDropdownProfile] = useState(false);
  return (
    <>
      <DashboardWrapper>
        <section className="justify-around lg:px-20 lg:py-10 flex gap-6 ">
          {dummyJob.length > 0 ? (
            <section
              id="job-list"
              className=" mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 "
            >
              {dummyJob.map((job, idx) => (
                <div
                  key={idx}
                  tabIndex={0}
                  id="job-card"
                  className="border-2 border-success-main   p-3 lg:w-[300px] rounded-lg bg-primary-surface cursor-pointer"
                  onClick={() => {
                    setSelectedJobCard(job);
                    setShowJobDetails(true);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      id="company-logo"
                      className="border border-neutral-40 rounded-md"
                    >
                      <Avatar className="size-10">
                        <AvatarImage src={job.companyLogo} />
                      </Avatar>
                    </div>
                    <div id="job-title">
                      <p className="text-l-bold">{job.jobTitle}</p>
                      <p className="text-m-regular">{job.companyName}</p>
                    </div>
                  </div>
                  <hr className="mt-2 border-dashed border-neutral-40" />

                  <div id="job-desc" className="mt-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="size-4 text-neutral-80" />
                      <span className="text-s-regular text-neutral-80">
                        {job.placement}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <BanknotesIcon className="size-4 text-neutral-80" />
                      <span className="text-s-regular text-neutral-80">
                        {formatSalaryToRupiah(job.minSalary)} -{" "}
                        {formatSalaryToRupiah(job.maxSalary)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section className="flex flex-col justify-center items-center text-center w-full min-h-[70vh]">
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
                  Please wait for the next batch of openings
                </p>
              </div>
            </section>
          )}

          {selectedJobCard && (
            <JobDetails
              open={showJobDetails}
              setOpen={setShowJobDetails}
              jobData={selectedJobCard}
            />
          )}
        </section>
      </DashboardWrapper>
    </>
  );
}
