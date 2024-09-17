import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface DeleteRecipeProps {
  recipeId: string;
  onDelete: (id: string) => void;
}

export function DeleteRecipeButton({ recipeId, onDelete }: DeleteRecipeProps) {
  const handleDelete = () => {
    if (window.confirm("Apakah anda yakin menghapus recipe ini?")) {
      onDelete(recipeId);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      className="p-0 text-red-500 hover:text-white absolute top-0 right-0 backdrop-filter backdrop-blur-sm w-10 h-10 flex items-center justify-center rounded-lg transition-opacity duration-1000 bg-opacity-30 bg-gray-100"
    >
      {/* Icon */}
      <Trash
        className="transition-colors duration-400"
        strokeWidth={3}
        absoluteStrokeWidth
      />
    </Button>
  );
}
