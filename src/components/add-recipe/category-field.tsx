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

export function TestRoute({ control, categories }: CategoriesFieldProps) {
  return (
    <FormItem>
      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Select
                value={field.value} // Handle single selection or use the first item of the array
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
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
