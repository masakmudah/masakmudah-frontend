import { useEffect } from "react";
import { Control, useWatch, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateRecipeSchema } from "@/schemas/create-recipe";

interface BasicInfoFieldProps {
  control: Control<CreateRecipeSchema>;
  setValue: UseFormSetValue<CreateRecipeSchema>;
}

export const BasicInfoField = ({ control, setValue }: BasicInfoFieldProps) => {
  const value = useWatch({ control, name: "nameRecipe" });

  useEffect(() => {
    if (value) {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "");
      setValue("slug", slug);
    }
  }, [value, setValue]);

  const trimSpace =
    (field: any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const space = e.target.value;
      if (space.startsWith(" ")) {
        return;
      }

      const multipleSpace = space.replace(/\s{2,}/g, " ");

      field.onChange(space, multipleSpace);
    };

  return (
    <>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        Informasi Dasar
      </h2>
      <div className="space-y-6 ">
        <FormField
          control={control}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="imageURL"
                className="text-white text-lg font-clashDisplayMedium"
              >
                ImageURL
              </FormLabel>
              <FormControl>
                <Input
                  id="imageURL"
                  placeholder="ImageURL"
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...field}
                  onChange={trimSpace(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel
                htmlFor="slug"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Slug
              </FormLabel>
              <FormControl>
                <Input
                  id="slug"
                  placeholder="Recipe Slug"
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nameRecipe"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="nameRecipe"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Nama Resep
              </FormLabel>
              <FormControl>
                <Input
                  id="nameRecipe"
                  placeholder="Nama Resep"
                  type="text"
                  className="w-full border rounded-md p-2 capitalize"
                  {...field}
                  onChange={trimSpace(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="description"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Deskripsi
              </FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Cerita di balik masakan ini. Apa atau siapa yang menginspirasimu? Apa yang membuatnya istimewa? Bagaimana caramu menikmatinya? Gunakan @ untuk menandai pengguna lain."
                  className="w-full resize-none border rounded-md p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="duration"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Durasi
              </FormLabel>
              <FormControl>
                <Input
                  id="duration"
                  placeholder="Durasi"
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
