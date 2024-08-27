import { loginSchema } from "@/libs/zod-schema";
import { z } from "zod";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const login = async (values: z.infer<typeof loginSchema>) => {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: values.username,
      password: values.password,
    }),
  });

  if (response.status === 400) {
    const errorData = await response.json();
    console.log("Ini error data", errorData);
    throw new Error(errorData.message || response.statusText);
  }

  if (!response.ok) throw new Error("Failed to login");

  const {
    data: { token },
  } = await response.json();

  return { token };
};
