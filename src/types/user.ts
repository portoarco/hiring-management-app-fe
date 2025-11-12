export interface IUser {
  id?: string;
  full_name?: string;
  role?: "RECRUITER" | "APPLICANT";
  date_of_birth?: Date;
  gender?: "MALE" | "FEMALE";
  domicile?: string;
  phone?: string;
  email?: string;
  password?: string;
  linkedin_url?: string;
  avatar?: string;
  company_id?: number;
}
