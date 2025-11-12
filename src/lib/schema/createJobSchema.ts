import { z } from "zod";

const profileRequirementsSchema = z.object({
  full_name: z.enum(["mandatory", "optional", "off"]).optional(),
  photo_profile: z.enum(["mandatory", "optional", "off"]).optional(),
  gender: z.enum(["mandatory", "optional", "off"]).optional(),
  domicile: z.enum(["mandatory", "optional", "off"]).optional(),
  email: z.enum(["mandatory", "optional", "off"]).optional(),
  phone_number: z.enum(["mandatory", "optional", "off"]).optional(),
  linkedin_url: z.enum(["mandatory", "optional", "off"]).optional(),
  date_of_birth: z.enum(["mandatory", "optional", "off"]).optional(),
});

export const createJobSchema = z.object({
  job_name: z.string().min(1, "Nama Posisi Wajib Diisi"),
  job_type: z.string().min(1, "Tipe Pekerjaan Wajib Diisi"),
  job_desc: z.string().min(1, "Deskripsi Pekerjaan wajib diisi!"),
  number_candidate: z.number(),
  min_salary: z.string().optional(),
  max_salary: z.string().optional(),
  profile_requirements: profileRequirementsSchema,
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
