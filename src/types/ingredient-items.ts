import { Ingredient } from "./ingredient";

export type IngredientItem = {
  id: string;
  quantity: number;
  measurement: string;
  sequence: number;
  ingredient: Ingredient;
};
