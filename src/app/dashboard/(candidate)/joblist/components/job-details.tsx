import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import YellowButton from "@/components/yellow-button";
import { IJobDetails } from "@/types/job";
import { useRouter } from "next/navigation";

interface IJobDetailsSheet {
  open: boolean;
  setOpen: (value: boolean) => void;
  jobData: IJobDetails;
}

export default function JobDetails({
  open,
  setOpen,
  jobData,
}: IJobDetailsSheet) {
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[90%] lg:w-1/2! p-5">
        <SheetHeader>
          <SheetTitle hidden>Hidden</SheetTitle>
        </SheetHeader>
        {/* Header */}
        <section className="flex gap-5 w-full">
          <div id="company-logo">
            <Avatar className="size-12 border border-neutral-40 rounded-md">
              <AvatarImage src={jobData.companyLogo} />
            </Avatar>
          </div>
          <div id="job-title" className="w-full">
            <div className="flex justify-between items-center ">
              <div>
                <Badge className="h-7 text-neutral-10 font-medium bg-success-main rounded-md">
                  {jobData.jobType}
                </Badge>
              </div>
              <div>
                <YellowButton
                  onClick={() => {
                    localStorage.setItem(
                      "selectedJob",
                      JSON.stringify(jobData)
                    );
                    router.push(`/dashboard/apply-job/${jobData.id}`);
                  }}
                >
                  Apply
                </YellowButton>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xl font-bold">{jobData.jobTitle}</p>
              <p className="text-[16px] text-gray-500">{jobData.companyName}</p>
            </div>
          </div>
        </section>
        <hr className="border border-neutral-40" />
        {/* Content */}
        <section>
          <p className="text-m-regular">{jobData.jobDesc}</p>
        </section>
      </SheetContent>
    </Sheet>
  );
}
