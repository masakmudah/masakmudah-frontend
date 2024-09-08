import { CreateRecipeSchema } from "@/schemas/new-recipe";

export const getUser = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

export const getCategoryId = async (categoryId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

export const createRecipe = async (userData: CreateRecipeSchema) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Handle errors
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
};
