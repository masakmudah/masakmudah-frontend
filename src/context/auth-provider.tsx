import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed response");

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to set user data", error);
        setUser(null);
      }
    };

    fetchMe();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
