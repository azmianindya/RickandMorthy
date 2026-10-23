import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email atau username wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  remember: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;