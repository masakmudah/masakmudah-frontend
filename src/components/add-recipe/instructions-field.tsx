import { useEffect, useState } from "react";
import { useFieldArray, Control, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { CreateRecipeSchema } from "@/schemas/new-recipe";
import { Input } from "../ui/input";

interface InstructionsFieldProps {
  control: Control<CreateRecipeSchema>;
  setValue: UseFormSetValue<CreateRecipeSchema>;
}

export const InstructionsField = ({
  control,
  setValue,
}: InstructionsFieldProps) => {
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
    move: moveInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
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
      moveInstruction(draggedIndex!, index);
    }
    setDraggedIndex(index);
    setHoverIndex(null);
  };

  useEffect(() => {
    if (!instructionFields.length) {
      appendInstruction({ step: 1, description: "" });
    } else {
      instructionFields.forEach((_, index) => {
        setValue(`instructions.${index}.step`, index + 1);
      });
    }
  }, [instructionFields, appendInstruction, setValue]);

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
        <h2 className="text-3xl sm:text-lg font-semibold text-black font-clashDisplayMedium">
          Instruksi
        </h2>
        <Button
          type="button"
          onClick={() =>
            appendInstruction({
              step: instructionFields.length + 1,
              description: "",
            })
          }
          className="py-2 bg-[#EE5743] text-white hover:bg-[#EE5743] w-8 h-8 p-[7px] rounded-xl font-raleway"
        >
          <Plus />
        </Button>
      </div>
      {instructionFields.map((instruction, index) => (
        <div
          key={instruction.id}
          className={`space-y-4 p-4 border-[#B9BCBB] bg-[#F7F7F7] rounded-xl focus:ring-0 focus:ring-offset-0 font-raleway pl-4 font-medium border ${
            hoverIndex === index ? "border-blue-600" : "border-gray-300"
          } bg-gray-50`}
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

            {/* SEQUENCE */}
            <FormField
              control={control}
              name={`instructions.${index}.step`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id={`instructions.${index}.step`}
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

            {/* DESCRIPTION */}
            <FormField
              control={control}
              name={`instructions.${index}.description`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      id={`instructions.${index}.description`}
                      placeholder="Langkah memasak."
                      className="w-full resize-none border rounded-md px-4 text-sm font-raleway"
                      rows={2}
                      {...field}
                      onChange={trimSpace(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => removeInstruction(index)}
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
