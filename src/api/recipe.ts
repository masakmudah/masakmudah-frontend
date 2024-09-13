const baseUrl = import.meta.env.VITE_API_URL;

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
      url.searchParams.append("q", search);
    }

    const response = await fetch(url.toString());
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Response("Error loading user data", { status: 500 });
  }
};

export const getSavedRecipeByUsername = async (
  username: string,
  token: string
) => {
  try {
    const response = await fetch(`${baseUrl}/saved-recipes/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Response("Error loading user data", { status: 500 });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Response("Error loading user data", { status: 500 });
  }
};
