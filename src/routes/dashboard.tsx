import { getUserRecipes } from "@/api/get-user";
import { DashboardTabs } from "@/components/shared/dashboard-tabs";
import UpdateUserForm from "@/components/shared/update-user";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/auth-provider";
import { capitalText, upperText } from "@/libs/format-text";

import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";
import { useState } from "react";
import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";

interface DashboardProps {
  user: User;
  recipes: Recipe[];
}

export async function loader(username: string) {
  try {
    const recipesResponse = await getUserRecipes(username);
    const recipes = recipesResponse.data;

    return { recipes };
  } catch (error) {
    console.error("Data tidak dapat diakses:", error);
    throw redirect("/");
  }
}

export function DashboardRoute() {
  const { token, user, setUser } = useAuth();
  const { recipes: initialRecipes } = useLoaderData() as DashboardProps;
  const [edit, setEdit] = useState(false);

  const handleUpdateSuccess = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Respon gagal");

      const { user: updatedUser } = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error("Gagal refresh data:", error);
    }
    setEdit(false);
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-[#F7FEE7] font-clashDisplayRegular min-h-dvh">
      <Container className="space-y-10">
        <section className="flex flex-col md:flex-row justify-center items-center px-4 py-1 text-black font-raleway gap-6 w-full">
          {/* IMAGE */}
          <div className=" text-center flex flex-col justify-center items-center gap-2 ">
            <Avatar className="w-24 h-24 ">
              <img
                src={
                  user?.imageURL ||
                  "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                }
                alt={user?.username + "'s image"}
              />
            </Avatar>
            <p className="font-raleway font-medium text-sm">
              @{user?.username}
            </p>
          </div>

          {/* PROFILE */}
          {edit ? (
            <UpdateUserForm onUpdateSuccess={handleUpdateSuccess} />
          ) : (
            <div className="w-full space-y-2">
              <p className="font-raleway font-semibold text-xl">
                {upperText(user?.fullname)}
              </p>
              <p className="text-justify">{capitalText(user?.description)}</p>
            </div>
          )}

          {/* BUTTON */}
          <div className="flex md:flex-col gap-2 ">
            {!edit ? (
              <Button
                onClick={() => setEdit(!edit)}
                className="hover:text-[#C1F17A] rounded-3xl font-clashDisplayMedium bg-[#C1F17A] text-black"
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                onClick={() => setEdit(!edit)}
                className="hover:text-[#C1F17A] rounded-3xl font-clashDisplayMedium bg-[#C1F17A] text-black"
              >
                Cancel
              </Button>
            )}

            {initialRecipes.length === 0 ? (
              ""
            ) : (
              <Button
                asChild
                className="rounded-3xl font-clashDisplayMedium bg-[#FE5D47] hover:bg-[#ee5743]"
              >
                <Link to="/recipes/new">Buat resep</Link>
              </Button>
            )}
          </div>
        </section>

        <DashboardTabs myRecipes={initialRecipes} />
      </Container>
    </div>
  );
}
