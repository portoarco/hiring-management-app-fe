export interface IJobDetails {
  id: number;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobType: "Full Time" | "Part Time" | "Contract" | "Freelance" | "Internship";
  jobDesc: string;
  placement: string;
  minSalary: string;
  maxSalary: string;
}
