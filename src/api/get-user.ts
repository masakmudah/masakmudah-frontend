export const getUser = async (username: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    );

    if (!response.ok) {
      throw new Response("User tidak ditemukan", { status: 404 });
    }
    return await response.json();
  } catch (error) {
    throw new Response("Data tidak dapat di akses", { status: 500 });
  }
};

export async function getUserRecipes(username: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/username/${username}`
    );

    if (!response.ok) {
      throw new Response("Resep tidak ditemukan", { status: 404 });
    }
    return await response.json();
  } catch (error) {
    console.error("Data tidak dapat di akses:", { status: 500 });
    throw error;
  }
}
