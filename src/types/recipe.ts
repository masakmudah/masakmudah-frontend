import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";
import { User } from "./user";

export type Recipe = {
  id: string;
  name: string;
  description: string;
  duration: string;
  imageURL: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  user: User;
};
