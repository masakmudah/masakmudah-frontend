import { z } from "zod";

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(30, { message: "Maximal 30 karakter." })
    .regex(/^[a-zA-Z ]+$/, {
      message: "Hanya boleh huruf (a-z) dan spasi",
    })
    .optional(),

  description: z
    .string()
    .trim()
    .max(250, { message: "Maximal 250 karakter." })
    .optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
