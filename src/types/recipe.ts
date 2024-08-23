import { IngredientItem } from "./ingredient-items";
import { Instruction } from "./instruction";
import { User } from "./user";

export type Recipe = {
  id: string;
  name: string;
  description: string;
  cookingTime: string;
  imageURL: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  ingredientItems: IngredientItem[];
  instructions: Instruction[];
  user: User;
};
