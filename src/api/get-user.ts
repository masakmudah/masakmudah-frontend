import { User } from "@/types/user";

export type UserProps = {
  message: string;
  data: User;
};

export const getUser = async (username: string): Promise<UserProps> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    );

    if (!response.ok) {
      throw new Response("User tidak ditemukan", { status: 404 });
    }

    const data: UserProps = await response.json();
    return data;
  } catch (error) {
    throw new Response("Data tidak dapat di akses", { status: 500 });
  }
};
