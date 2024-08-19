import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password harus terdiri dari minimal 8 karakter" }),
  fullName: z.string(),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});
