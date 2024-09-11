import { z } from "zod";

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(100, { message: "Maximal 100 karakter." })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Hanya boleh huruf (a-z) dan spasi",
    }),

  description: z
    .string()
    .trim()
    .max(250, { message: "Maximal 250 karakter." })
    .optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
