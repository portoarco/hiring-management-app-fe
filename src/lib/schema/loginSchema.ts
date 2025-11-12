import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .email("Email tidak valid")
      .min(1, "Alamat Email Wajib Diisi"),
    password: z.string().optional(),
    loginByPassword: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.loginByPassword && (!data.password || data.password.trim() === ""))
      ctx.addIssue({
        path: ["password"],
        message: "Password Wajib Diisi",
        code: "custom",
      });
  });

export type LoginSchema = z.infer<typeof loginSchema>;
