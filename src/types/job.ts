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
  jobStatus: "Active" | "Inactive" | "Draft";
  startedAt: Date;
}

export type ProfileRequirements = {
  full_name?: ProfileRequirementValue;
  photo_profile?: ProfileRequirementValue;
  gender?: ProfileRequirementValue;
  domicile?: ProfileRequirementValue;
  email?: ProfileRequirementValue;
  phone_number?: ProfileRequirementValue;
  linkedin_link?: ProfileRequirementValue;
  date_of_birth?: ProfileRequirementValue;
};

export type ProfileRequirementValue = "mandatory" | "optional" | "off";
