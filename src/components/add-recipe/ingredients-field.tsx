import { useFieldArray, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateRecipeSchema } from "@/schemas/new-recipe";
import { SequenceInput } from "./sequence-input";

interface IngredientsFieldProps {
  control: Control<CreateRecipeSchema>;
}

export const IngredientsField = ({ control }: IngredientsFieldProps) => {
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
    move: moveIngredient,
  } = useFieldArray({
    control,
    name: "ingredientItems",
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== index) {
      moveIngredient(draggedIndex!, index);
    }
    setDraggedIndex(null);
    setHoverIndex(null);
  };

  useEffect(() => {
    if (!ingredientFields.length)
      appendIngredient({
        sequence: 1,
        quantity: 0,
        measurement: "",
        ingredient: { name: "" },
      });
  }, [ingredientFields, appendIngredient]);

  return (
    <FormItem>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-xl tracking-wider font-semibold font-clashDisplayMedium text-white">
          Bahan-bahan
        </h2>
        <Button
          type="button"
          onClick={() =>
            appendIngredient({
              sequence: 0,
              quantity: 0,
              measurement: "",
              ingredient: { name: "" },
            })
          }
          className="py-2 bg-green-600 text-white hover:bg-green-700 w-8 h-8 p-[7px] rounded-xl font-raleway"
        >
          <Plus />
        </Button>
      </div>

      {ingredientFields.map((ingredient, index) => (
        <div
          key={ingredient.id}
          className="flex gap-3 justify-center items-center  p-4 rounded-lg border border-gray-300 bg-gray-50"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={() => setHoverIndex(null)}
        >
          <div className="flex items-center gap-4">
            <GripVertical
              className={`w-8 h-8 cursor-move ${
                hoverIndex === index ? "text-blue-600" : "text-gray-600"
              }`}
            />
            <FormField
              control={control}
              name={`ingredientItems.${index}.sequence`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <div>
                    <FormControl>
                      <SequenceInput
                        id={`ingredients.${index}.sequence`}
                        type="text"
                        readOnly
                        value={index + 1}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-10 h-10 p-0 text-center font-clashDisplaySemibold text-base"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`ingredientItems.${index}.ingredient.name`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id={`ingredients.${index}.name`}
                      placeholder="Nama Bahan"
                      type="text"
                      className="w-full border rounded-md p-2 capitalize"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`ingredientItems.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id={`ingredientItems.${index}.quantity`}
                      placeholder="Jumlah"
                      type="number"
                      className="w-full border rounded-md p-2"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`ingredientItems.${index}.measurement`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id={`ingredientItems.${index}.measurement`}
                      placeholder="Satuan"
                      type="text"
                      className="w-full border rounded-md p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-600 text-white hover:bg-red-700 w-8 h-8 p-[8px] rounded-xl font-raleway"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </FormItem>
  );
};
