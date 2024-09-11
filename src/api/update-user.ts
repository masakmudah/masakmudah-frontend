import { UpdateUserSchema } from "@/schemas/edit-profile";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const updateUser = async (
  id: string,
  values: UpdateUserSchema,
  token: string
) => {
  const response = await fetch(`${apiBaseUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Terjadi kesalahan.");
  }

  return response.json();
};
