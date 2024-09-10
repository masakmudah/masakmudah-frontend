import { z } from "zod";
export const createRecipeSchema = z.object({
  // Done
  // imageURL: z
  //   .string()
  //   .trim()
  //   .min(10, { message: "Minimal 10 karakter" })
  //   .url({
  //     message: "Gunakan format URL. Contoh: https://www.masakmudah.com",
  //   })
  //   .startsWith("http", {
  //     message: "Gunakan format URL. Contoh: https://www.masakmudah.com",
  //   }),

  // Done
  name: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(100, { message: "Maximal 100 karakter." })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      message: "Hanya boleh huruf (a-z) atau angka (0-9) atau spasi.",
    }),

  // Done
  description: z
    .string()
    .trim()
    .min(10, { message: "Minimal 10 karakter." })
    .max(1500, { message: "Maximal 1500 karakter." })
    .regex(/^[a-zA-Z0-9-,.\s]+$/, {
      message:
        "Hanya boleh huruf (a-z) atau angka (0-9) atau beberapa spesial karakter (koma, titik, strip, enter).",
    }),

  // Done
  cookingTime: z.string().trim(),

  // Done
  categoryId: z.string().trim().min(1, { message: "Kategori harus dipilih" }),

  // // Done
  ingredientItems: z
    .array(
      z.object({
        sequence: z.number(),
        quantity: z
          .number()
          .int()
          .gte(1, { message: "Wajib diisi " })
          .lt(9999, { message: "Maksimal 4 digit." }),
        measurement: z
          .string()
          .trim()
          .toUpperCase()
          .min(1, { message: "Minimal 1 karakter." })
          .max(30, { message: "Maximal 30 karakter." })
          .regex(/^[a-zA-Z -]+$/, {
            message: "Hanya boleh huruf (a-z)",
          }),
        ingredient: z.object({
          name: z.string().trim().min(1, { message: "Minimal 1 karakter." }),
        }),
      })
    )
    .nonempty({ message: "Bahan-bahan wajib diisi." }),
  // Done
  instructions: z
    .array(
      z.object({
        step: z.number().int(),
        text: z
          .string()
          .trim()
          .min(5, { message: "Minimal 5 karakter." })
          .max(1500, { message: "Maximal 1500 karakter." }),
        // .regex(/^[a-zA-Z0-9-,.\s]+$/, {
        //   message:
        //     "Hanya boleh huruf (a-z) angka (0-9) beberapa spesial karakter (-,.)",
        // }),
      })
    )
    .nonempty({ message: "Instruksi wajib diisi." }),
});
export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
