import { z } from "zod";
export const createRecipeSchema = z.object({
  // Done
  name: z
    .string()
    .trim()
    .min(4, { message: "Minimal 4 karakter." })
    .max(100, { message: "Maximal 100 karakter." })
    .regex(/^[a-zA-Z ]+$/, {
      message: "Hanya boleh huruf (a-z) dan spasi.",
    }),

  // Done
  description: z
    .string()
    .trim()
    .min(10, { message: "Minimal 10 karakter." })
    .max(1500, { message: "Maximal 1500 karakter." })
    .regex(/^[a-zA-Z0-9]/, {
      message: "Harus diawali dengan huruf (a-z) dan angka (0-9).",
    })
    .regex(/^[a-zA-Z0-9-,.\s]+$/, {
      message:
        "Hanya boleh huruf (a-z), angka (0-9) dan beberapa spesial karakter (-,.).",
    }),

  // Done
  cookingTime: z
    .string()
    .trim()
    .min(1, { message: "Wajib diisi" })
    .regex(/^[0-9]+$/, {
      message: "Hanya boleh angka (0-9)",
    }),

  // Done
  categoryId: z.string().trim().min(1, { message: "Kategori harus dipilih" }),

  // // Done
  ingredientItems: z
    .array(
      z.object({
        sequence: z.number(),
        quantity: z
          .number()
          .gt(0, { message: "Wajib diisi > 0" })
          .lt(9999, { message: "Maksimal 4 digit." })
          .refine(
            (value) => {
              const decimalPart = value.toString().split(".")[1];
              return !decimalPart || decimalPart.length <= 4;
            },
            {
              message: "Maksimal 4 digit di belakang koma.",
            }
          ),
        measurement: z
          .string()
          .trim()
          .toUpperCase()
          .min(1, { message: "Minimal 1 karakter." })
          .max(30, { message: "Maximal 30 karakter." })
          .regex(/^[a-zA-Z -]+$/, {
            message: "Hanya boleh huruf (a-z), spasi dan strip (-)",
          }),
        ingredient: z.object({
          name: z
            .string()
            .trim()
            .min(1, { message: "Minimal 1 karakter." })
            .max(30, { message: "Maximal 30 karakter." })
            .regex(/^[a-zA-Z -]+$/, {
              message: "Hanya boleh huruf (a-z), spasi dan strip (-)",
            }),
        }),
      })
    )
    .nonempty({ message: "Bahan-bahan wajib diisi." }),

  // Done
  instructions: z
    .array(
      z.object({
        step: z.number().int(),
        description: z
          .string()
          .trim()
          .min(5, { message: "Minimal 5 karakter." })
          .max(1500, { message: "Maximal 1500 karakter." })
          .regex(/^[a-zA-Z0-9-,.\s]+$/, {
            message:
              "Hanya boleh huruf (a-z), angka (0-9) dan beberapa spesial karakter (-,.).",
          }),
      })
    )
    .nonempty({ message: "Instruksi wajib diisi." }),
});
export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
