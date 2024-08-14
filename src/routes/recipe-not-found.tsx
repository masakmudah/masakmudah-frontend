import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RecipeNotFound = () => {
  return (
    <div className="flex items-center justify-center text-4xl h-screen flex-col gap-y-8">
      Recipe not found
      <Link
        to={"/"}
        className="px-8 rounded-2xl py-6 bg-black text-white flex gap-x-4 items-center"
      >
        <ArrowLeft />
        Back to home
      </Link>
    </div>
  );
};

export default RecipeNotFound;
