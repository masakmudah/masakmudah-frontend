import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(15, { message: "Maximal 15 karakter." })
    .regex(/^[a-zA-Z]/, {
      message: "Username harus diawali dengan huruf.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Hanya boleh huruf (a-z), angka (0-9) dan garis bawah (_).",
    }),
  email: z
    .string()
    .email({ message: "Format salah. 'john.doe@example.com'" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
    .trim(),
  fullname: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(25, { message: "Maximal 25 karakter." })
    .regex(/^[a-zA-Z]/, {
      message: "Username harus diawali dengan huruf.",
    })
    .regex(/^[a-zA-Z ]*$/, {
      message: "Hanya boleh huruf (a-z) dan spasi",
    }),
});

export const loginSchema = registerSchema.pick({
  username: true,
  password: true,
});

export const searchSchema = z.object({
  search: z.string(),
});
