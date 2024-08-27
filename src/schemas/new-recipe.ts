import { z } from "zod";
export const createRecipeSchema = z.object({
  // Done
  imageURL: z
    .string()
    .trim()
    .min(10, { message: "Minimal 10 karakter" })
    .url({
      message: "Gunakan format URL. Contoh: https://www.masakmudah.com",
    })
    .startsWith("http", {
      message: "Gunakan format URL. Contoh: https://www.masakmudah.com",
    }),
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
  cookingTime: z
    .string()
    .trim()
    .regex(/^\d{1,4}\s*menit$/i, {
      message:
        "Awali dengan angka (0-9) maksimal 4 digit dan diakhiri dengan 'menit'.",
    }),
  // Done
  categories: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .toUpperCase()
          .min(2, { message: "Minimal 2 karakter." })
          .max(30, { message: "Maximal 30 karakter." })
          .regex(/^[a-zA-Z -]+$/, {
            message:
              "Hanya boleh huruf (a-z) atau beberapa spesial karakter (spasi, dash).",
          }),
      })
    )
    .nonempty({ message: "Kategori wajib diisi" }),
  // Done
  ingredients: z
    .array(
      z.object({
        sequence: z.number().int(),
        name: z
          .string()
          .trim()
          .toUpperCase()
          .min(2, { message: "Minimal 2 karakter." })
          .max(30, { message: "Maximal 30 karakter." })
          .regex(/^[a-zA-Z -]+$/, {
            message: "Hanya boleh huruf (a-z).",
          }),
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
      })
    )
    .nonempty({ message: "Bahan-bahan wajib diisi." }),
  // Done
  instructions: z
    .array(
      z.object({
        sequence: z.number().int(),
        text: z
          .string()
          .trim()
          .min(10, { message: "Minimal 10 karakter." })
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
