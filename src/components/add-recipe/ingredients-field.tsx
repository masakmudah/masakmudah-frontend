import { useFieldArray, Control, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CreateRecipeSchema } from "@/schemas/new-recipe";

interface IngredientsFieldProps {
  control: Control<CreateRecipeSchema>;
  setValue: UseFormSetValue<CreateRecipeSchema>;
}

export const IngredientsField = ({
  control,
  setValue,
}: IngredientsFieldProps) => {
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
  const [newField, setNewField] = useState<number | null>(null);
  const nameRef = useRef<HTMLElement[]>([]);

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
    setDraggedIndex(index);
    setHoverIndex(null);
  };

  useEffect(() => {
    if (!ingredientFields.length) {
      appendIngredient({
        sequence: 1,
        quantity: 0,
        measurement: "",
        ingredient: { name: "" },
      });
    } else {
      ingredientFields.forEach((_, index) => {
        setValue(`ingredientItems.${index}.sequence`, index + 1);
      });
    }
  }, [ingredientFields, appendIngredient, setValue]);

  useEffect(() => {
    if (newField!) {
      const input = nameRef.current[newField];
      if (input) input.focus();
      setNewField(null);
    }
  }, [newField]);

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

  return (
    <FormItem>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-lg tracking-wider font-semibold font-clashDisplayMedium text-black">
          Bahan-bahan
        </h2>
        <Button
          type="button"
          onClick={() => {
            appendIngredient({
              sequence: ingredientFields.length + 1,
              quantity: 0,
              measurement: "",
              ingredient: { name: "" },
            });
            setNewField(ingredientFields.length);
          }}
          className="py-2 bg-[#EE5743] text-white hover:bg-[#e45441] w-8 h-8 p-[7px] rounded-xl font-raleway"
        >
          <Plus />
        </Button>
      </div>

      {ingredientFields.map((ingredient, index) => (
        <div
          key={ingredient.id}
          className="flex xs:flex-row flex-col gap-3 justify-center items-center py-2 pr-4 pl-1 border border-[#B9BCBB] bg-[#F7F7F7] rounded-xl focus:ring-0 focus:ring-offset-0 font-raleway font-medium"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={() => handleDrop(index)}
          onDragEnd={() => setHoverIndex(null)}
        >
          {/* INDEX */}
          <div className="flex gap-4 items-center justify-between w-[13%] xs:w-[7%] bg-red-300">
            <GripVertical
              className={`xs:-mr-4 -mr-2 w-8 h-8 cursor-move ${
                hoverIndex === index ? "text-blue-600" : "text-gray-600"
              }`}
            />

            {/* SEQUENCE */}
            <FormField
              control={control}
              name={`ingredientItems.${index}.sequence`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id={`ingredientItems.${index}.sequence`}
                      type="text"
                      readOnly
                      value={index + 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-10 h-10 text-center font-clashDisplaySemibold text-base rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DELETE BUTTON */}
            <Button
              type="button"
              onClick={() => removeIngredient(index)}
              className="bg-red-600 text-white hover:bg-red-700 w-8 h-8 p-[8px] rounded-xl font-raleway xs:hidden"
            >
              <Trash2 />
            </Button>
          </div>

          {/* INPUT */}
          <div className="flex items-center justify-center w-[87%] xs:w-[93%] gap-2 xs:gap-4 xs:flex-row flex-col bg-green-200">
            {/* INGREDIENT NAME */}
            <FormField
              control={control}
              name={`ingredientItems.${index}.ingredient.name`}
              render={({ field }) => (
                <FormItem className="grow w-[40%]">
                  <FormControl>
                    <Input
                      id={`ingredientItems.${index}.ingredient.name`}
                      placeholder="Nama Bahan"
                      type="text"
                      className="border rounded-md p-2 capitalize"
                      {...field}
                      onChange={trimSpace(field)}
                      ref={(e) => {
                        if (e) {
                          nameRef.current[index] = e;
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center xs:gap-4 w-[60%]">
              {/* QUANTITY */}
              <FormField
                control={control}
                name={`ingredientItems.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="grow md:w-[20%] w-[40%]">
                    <FormControl>
                      <Input
                        id={`ingredientItems.${index}.quantity`}
                        placeholder="Jumlah"
                        type="number"
                        className="w-full border rounded-md text-center font-clashDisplayRegular"
                        {...field}
                        min={0}
                        step={0.0001}
                        value={field.value ?? 0}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* MEASUREMENT */}
              <FormField
                control={control}
                name={`ingredientItems.${index}.measurement`}
                render={({ field }) => (
                  <FormItem className="grow md:w-[80%] w-[60%]">
                    <FormControl>
                      <Input
                        id={`ingredientItems.${index}.measurement`}
                        placeholder="Satuan"
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

              {/* DELETE BUTTON */}
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                className="bg-red-600 text-white hover:bg-red-700 w-8 h-8 p-[8px] rounded-xl font-raleway xs:flex hidden"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </FormItem>
  );
};
