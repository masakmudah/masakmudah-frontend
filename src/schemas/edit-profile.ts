import { z } from "zod";

export const editUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(100, { message: "Maximal 100 karakter." })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Hanya boleh huruf (a-z) atau angka (0-9) atau dash.",
    }),

  fullname: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(100, { message: "Maximal 100 karakter." })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Hanya boleh huruf (a-z) dan spasi",
    }),
  email: z.string().trim().email(),
  imageURL: z.string().optional(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
