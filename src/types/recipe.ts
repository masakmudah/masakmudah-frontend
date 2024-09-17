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
  categoryId: string;
  ingredientItems: IngredientItem[];
  instructions: Instruction[];
  user: User;
};

export type RecipeInAuth = Pick<
  Recipe,
  | "name"
  | "cookingTime"
  | "imageURL"
  | "cookingTime"
  | "description"
  | "slug"
  | "id"
>;
