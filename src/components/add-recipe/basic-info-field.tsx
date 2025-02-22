/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateRecipeSchema } from "@/schemas/new-recipe";

interface BasicInfoFieldProps {
  control: Control<CreateRecipeSchema>;
  timeUnit: string;
  setTimeUnit: (timeUnit: string) => void;
}

export const BasicInfoField = ({
  control,
  timeUnit,
  setTimeUnit,
}: BasicInfoFieldProps) => {
  const trimSpace =
    (field: any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const space = e.target.value;
      if (space.startsWith(" ")) {
        return;
      }

      const multipleSpace = space.replace(/\s+/g, " ");

      field.onChange(multipleSpace);
    };

  const trimZero =
    (field: any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = e.target.value;
      if (text.startsWith(" " || "0")) {
        return;
      }
      const removeZero = text.replace(/^[ 0]+/, "");
      const multipleSpace = removeZero.replace(/\s+/g, "");

      field.onChange(multipleSpace);
    };

  return (
    <>
      <div className="space-y-6 ">
        {/* RECIPE NAME */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="name"
                className="  text-lg font-clashDisplayMedium"
              >
                Nama Resep
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Nama Resep"
                  type="text"
                  className="w-full border p-2 pl-4 capitalize border-[#B9BCBB] bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl font-raleway font-medium"
                  {...field}
                  onChange={trimSpace(field)}
                  autoComplete="name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="description"
                className="text-lg font-clashDisplayMedium"
              >
                Deskripsi
              </FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Cerita di balik masakan ini. Apa atau siapa yang menginspirasimu? Apa yang membuatnya istimewa? Bagaimana caramu menikmatinya? Gunakan @ untuk menandai pengguna lain."
                  className="w-full resize-none border p-2 pt-3 border-[#B9BCBB] bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl font-raleway pl-4 font-medium"
                  {...field}
                  onChange={trimSpace(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* COOKINGTIME */}
        <FormField
          control={control}
          name="cookingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="cookingTime"
                className="text-lg font-clashDisplayMedium"
              >
                Durasi
              </FormLabel>
              <div className="flex items-end gap-x-2">
                <FormControl className="max-w-[180px]">
                  <Input
                    id="cookingTime"
                    placeholder="Durasi"
                    type="text"
                    className="w-full border  p-2 border-[#B9BCBB] bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl font-raleway pl-4 font-medium"
                    {...field}
                    onChange={trimZero(field)}
                  />
                </FormControl>
                <Select
                  name="cookingTime"
                  defaultValue={timeUnit}
                  onValueChange={setTimeUnit}
                >
                  <SelectTrigger className=" border-[#B9BCBB] bg-[#F7F7F7] max-w-[150px] rounded-xl focus:ring-0 focus:ring-offset-0 font-raleway pl-4 font-medium">
                    <SelectValue placeholder="Pilih waktu" />
                  </SelectTrigger>
                  <SelectContent className="border-[#B9BCBB] bg-[#F7F7F7] rounded-xl font-raleway">
                    <SelectItem value="menit">Menit</SelectItem>
                    <SelectItem value="jam">Jam</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
