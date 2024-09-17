import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";

interface EditRecipeProps {
  recipe: string;
}

export function EditRecipeButton({ recipe }: EditRecipeProps) {
  return (
    <Button
      asChild
      className="p-0 text-red-500 hover:text-white absolute top-0 left-0 backdrop-filter backdrop-blur-sm w-10 h-10 flex items-center justify-center rounded-lg transition-opacity duration-1000 bg-opacity-30 bg-gray-100"
    >
      <Link to={`/recipes/edit/${recipe}`}>
        {/* Icon */}
        <Pencil
          className="transition-colors duration-400"
          strokeWidth={3}
          absoluteStrokeWidth
        />
      </Link>
    </Button>
  );
}
