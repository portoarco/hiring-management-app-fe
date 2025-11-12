import { z } from "zod";

export const applyJobSchema = z.object({
  pic_url: z.string().optional(),
  email: z
    .string()
    .email("Email tidak valid")
    .min(1, "Alamat Email Wajib Diisi"),
  fullname: z.string().min(1, "Nama Lengkap Wajib Diisi"),
  date_of_birth: z.date(),
  gender: z.string(),
  domicile: z.string().min(1, "Minimal 1 Karakter"),
  phone_number: z.string().min(1, "Nomor Telepon Wajib Diisi"),
  linkedin_url: z.string().optional(),
});

export type ApplyJobSchema = z.infer<typeof applyJobSchema>;
