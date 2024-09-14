import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateRecipeSchema } from "@/schemas/new-recipe";
import { Category } from "@/types/category";
import { Control } from "react-hook-form";

interface CategoriesFieldProps {
  control: Control<CreateRecipeSchema>;
  categories: Category[];
}

export function CategoryField({ control, categories }: CategoriesFieldProps) {
  return (
    <FormItem>
      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex-1">
            <h1 className="font-clashDisplayMedium text-lg">Kategori</h1>
            <FormControl>
              <Select
                name="categoryId"
                value={field.value} // Handle single selection or use the first item of the array
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="border-[#B9BCBB] bg-[#F7F7F7] rounded-xl focus:ring-0 focus:ring-offset-0 font-raleway pl-4 font-medium">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BCBB] bg-[#F7F7F7] rounded-xl font-raleway">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormItem>
  );
}
