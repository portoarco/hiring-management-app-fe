"use client";
import { dummyCandidates } from "@/api/dummyCandidates";
import DashboardWrapper from "@/app/dashboard/dashboardWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDate } from "@/utils/convertDate";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const dummyCandidates: any = [];
export default function ManageCandidates() {
  const router = useRouter();
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedCandidates.length === dummyCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(dummyCandidates.map((cand) => cand.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter((sid) => sid !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  return (
    <DashboardWrapper>
      <section className="justify-around lg:px-20 lg:py-10  flex flex-col gap-6 ">
        <div className="flex items-center gap-5">
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => router.replace("/dashboard/jobportal-admin")}
          >
            <ArrowLeft /> Back
          </Button>
          <p className="text-xl font-bold">Front End Developer</p>
        </div>
        {dummyCandidates.length > 0 ? (
          <section id="job-list" className=" mt-5 ">
            <div className="border border-border rounded-lg bg-neutral-10">
              <div
                tabIndex={0}
                id="job-card"
                className="n   p-3 rounded-lg  cursor-pointer"
              >
                <Table className="">
                  <TableHeader
                    className="bg-neutral-20
                  "
                  >
                    <TableRow>
                      <TableHead>
                        {" "}
                        <Checkbox
                          className="mr-2 border-2 border-primary-main"
                          checked={
                            selectedCandidates.length === dummyCandidates.length
                          }
                          onCheckedChange={toggleSelectAll}
                        />{" "}
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Nama Lengkap
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Email Address
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Phone Numbers
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Date of Birth
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Domicile
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Gender
                      </TableHead>
                      <TableHead className="text-sm font-bold py-4">
                        Link LinkedIn
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyCandidates.map((cand, idx) => (
                      <TableRow key={idx}>
                        <TableCell className=" py-3">
                          <Checkbox
                            className="mr-2 border-2 border-primary-main"
                            checked={selectedCandidates.includes(cand.id)}
                            onCheckedChange={() => toggleSelect(cand.id)}
                          />{" "}
                        </TableCell>
                        <TableCell className=" py-3">{cand.name}</TableCell>
                        <TableCell className=" py-3">{cand.email}</TableCell>
                        <TableCell className=" py-3">{cand.phone}</TableCell>
                        <TableCell className=" py-3">
                          {convertDate(cand.date_of_birth)}
                        </TableCell>
                        <TableCell className=" py-3">{cand.domicile}</TableCell>
                        <TableCell className=" py-3">{cand.gender}</TableCell>
                        <TableCell className=" py-3">
                          <Link
                            href={cand.linkedin_url}
                            className="text-primary-main"
                            target="_blank"
                          >
                            {cand.linkedin_url}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-col justify-center items-center text-center w-full min-h-[60vh]">
            <div className="w-50 h-50 lg:w-80 lg:h-80 relative">
              <Image
                src="/no-candidates.png"
                alt="no-jobs"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div>
              <p className="heading-s-bold text-center">No candidates found</p>
              <p className="text-neutral-70 text-lg text-center">
                Share your job vacancies so that more candidates will apply
              </p>
            </div>
          </section>
        )}
      </section>
    </DashboardWrapper>
  );
}
