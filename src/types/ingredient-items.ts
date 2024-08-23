import { Ingredient } from "./ingredient";

export type IngredientItem = {
  id: string;
  quantity: string;
  measurement: string;
  sequence: number;
  ingredient: Ingredient;
};
