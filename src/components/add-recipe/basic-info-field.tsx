import { Control, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateRecipeSchema } from "@/schemas/new-recipe";

interface BasicInfoFieldProps {
  control: Control<CreateRecipeSchema>;
  setValue: UseFormSetValue<CreateRecipeSchema>;
}

export const BasicInfoField = ({ control }: BasicInfoFieldProps) => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="name"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Nama Resep
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
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
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="cookingTime"
                className="text-white text-lg font-clashDisplayMedium"
              >
                Durasi
              </FormLabel>
              <FormControl>
                <Input
                  id="cookingTime"
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
