import { Category } from "@/types/category";

export const getCategories = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
  const data: Category[] = await response.json();

  return data;
};
