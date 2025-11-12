import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid")
    .min(1, "Alamat Email Wajib Diisi"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
