import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export type Recipe = {
  id: string;
  recipe: string;
  description: string;
  duration: string;
  imageURL: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
};
