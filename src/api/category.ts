import { Category } from "@/types/category";

export const getCategories = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
  const data: Category[] = await response.json();

  return data;
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    if (slug === "Semua masakan") {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      const { data } = await response.json();
      return data;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/categories?q=${slug}`
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
