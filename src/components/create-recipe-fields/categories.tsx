import { useFieldArray, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CreateRecipeSchema } from "@/schemas/create-recipe";
import { Input } from "@/components/ui/input";

interface CategoriesFieldProps {
  control: Control<CreateRecipeSchema>;
}

export const CategoriesField = ({ control }: CategoriesFieldProps) => {
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  if (categoryFields.length === 0) {
    appendCategory({ name: "" });
  }

  return (
    <FormItem>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Categories
          </h2>
          <Button
            type="button"
            onClick={() => appendCategory({ name: "" })}
            className="py-2 bg-green-600 text-white hover:bg-green-700"
          >
            Add Category
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryFields.map((category, index) => (
            <div
              key={category.id}
              className="p-4 rounded-lg border border-gray-300 bg-gray-50 flex items-center gap-4"
            >
              <FormField
                control={control}
                name={`categories.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        id={`categories.${index}.name`}
                        type="text"
                        placeholder="Category Name"
                        className="w-full capitalize"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => removeCategory(index)}
                className="w-4 h-4 p-0 bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 className="object-contain" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </FormItem>
  );
};
