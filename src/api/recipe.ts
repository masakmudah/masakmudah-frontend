export const getRecipe = async (slug: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/${slug}`
    );

    if (!response.ok) {
      throw new Response("Recipe not found", { status: 404 });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Response("Error loading user data", { status: 500 });
  }
};

export const getRecipes = async (search?: string | null) => {
  try {
    const url = new URL(`${import.meta.env.VITE_API_URL}/recipes`);
    if (search) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Response("Error loading user data", { status: 500 });
  }
};
