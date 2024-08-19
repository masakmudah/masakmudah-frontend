import { useEffect, useState } from "react";
import { useFieldArray, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { CreateRecipeSchema } from "@/schemas/create-recipe";
import { SequenceInput } from "./sequenceInput";

interface InstructionsFieldProps {
  control: Control<CreateRecipeSchema>;
}

export const InstructionsField = ({ control }: InstructionsFieldProps) => {
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
    setDraggedIndex(null);
    setHoverIndex(null);
  };

  useEffect(() => {
    if (!instructionFields.length) appendInstruction({ sequence: 0, text: "" });
  }, [instructionFields, appendInstruction]);

  return (
    <FormItem>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">
          Instruksi
        </h2>
        <Button
          type="button"
          onClick={() => appendInstruction({ sequence: 0, text: "" })}
          className="py-2 bg-green-600 text-white hover:bg-green-700"
        >
          <Plus />
        </Button>
      </div>
      {instructionFields.map((instruction, index) => (
        <div
          key={instruction.id}
          className={`space-y-4 p-4 rounded-lg border ${
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
            <FormField
              control={control}
              name={`instructions.${index}.sequence`}
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <SequenceInput
                        id={`instructions.${index}.sequence`}
                        type="text"
                        readOnly
                        value={index + 1} // Set value based on index
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-12 text-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name={`instructions.${index}.text`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      id={`instructions.${index}.text`}
                      placeholder="Langkah memasak."
                      className="w-full resize-none border rounded-md p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => removeInstruction(index)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </FormItem>
  );
};
