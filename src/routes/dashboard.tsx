import { getUserRecipes } from "@/api/get-user";
import { DashboardTabs } from "@/components/shared/dashboard-tabs";
import { DeleteRecipeButton } from "@/components/shared/delete-recipe";
import UpdateUserForm from "@/components/shared/update-user";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/auth-provider";
import { capitalText, firstCapital, upperText } from "@/libs/format-text";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";
import {
  ArrowLeft,
  // Pencil
} from "lucide-react";
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
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
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

  const handleDeleteRecipe = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Respon gagal");

      const recipesResponse = await getUserRecipes(user!.username);
      const recipes = recipesResponse.data;
      setRecipes(recipes);
    } catch (error) {
      console.error("Gagal refresh data:", error);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-[#F7FEE7] font-clashDisplayRegular min-h-dvh">
      {/* <div className="flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg gap-5 bg-red-500">
       */}
      <Container className="space-y-14 ">
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
                {upperText(user?.fullname!)}
              </p>
              <p>{firstCapital(user?.description!)}</p>
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

            <Button
              asChild
              className="rounded-3xl font-clashDisplayMedium bg-[#FE5D47] hover:bg-[#ee5743]"
            >
              <Link to="/recipes/new">Buat resep</Link>
            </Button>
          </div>
        </section>

        <DashboardTabs />

        <section className="text-center">
          {recipes.length === 0 ? (
            <div className="flex items-center justify-start flex-col gap-y-4 h-dvh text-white pt-10">
              <p className="text-base md:text-xl text-center font-clashDisplaySemibold text-gray-400">
                Belum punya resep
              </p>
              <Link
                to="/recipes/new"
                className="text-red-300 p-4 rounded-xl font-clashDisplayMedium flex gap-x-2 items-center group text-base md:text-xl -ml-8"
              >
                <ArrowLeft className="w-6 h-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-out duration-300" />
                Buat resep
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {recipes.map((recipe: Recipe) => (
                <li
                  key={recipe.id}
                  className="group relative shadow-md rounded-lg"
                >
                  <div className="justify-between h-full bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98]">
                    <Link to={`/recipes/${recipe.slug}`}>
                      <div className="flex justify-center items-center m-5">
                        <img
                          src={
                            resizeUploadcareImage(recipe.imageURL) ||
                            "/images/masakmudah-logo-2.png"
                          }
                          className="w-32 h-32 xs:w-60 xs:h-60 md:w-70 md:h-70 sm:w-52 sm:h-52 object-center object-cover rounded-lg"
                          alt={recipe.name}
                        />
                      </div>
                      <div className="flex flex-col items-center text-center text-base sm:text-lg px-6 w-full">
                        <h2 className="font-clashDisplaySemibold line-clamp-2 break-word w-full">
                          {upperText(recipe.name)}
                        </h2>
                        <h3 className="font-clashDisplayRegular text-left line-clamp-2 break-all w-full px-2 lg:px-6">
                          {capitalText(recipe.description)}
                        </h3>
                        <h4 className="text-[#FF5D47] font-clashDisplayMedium ">
                          {recipe.cookingTime}
                        </h4>
                      </div>
                    </Link>
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="flex justify-center items-center text-center gap-2 p-2"
                    >
                      <img
                        src={
                          recipe.user.imageURL ||
                          "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                        }
                        alt={recipe.user.username + "'s image"}
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="font-clashDisplayRegular p-1">
                        {upperText(
                          recipe.user.fullname || recipe.user.username
                        )}
                      </p>
                    </Link>
                    {/* <Button
                      asChild
                      className="p-2 text-black hover:text-[#e85541] absolute top-5 left-5 backdrop-filter backdrop-blur-sm w-10 h-10 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gray-200"
                    >
                      <Link to={`/recipes/edit/${recipe.slug}`}> */}
                    {/* Icon */}
                    {/* <Pencil
                          className="transition-colors duration-400"
                          strokeWidth={3}
                          absoluteStrokeWidth
                        />
                      </Link>
                    </Button> */}
                    <DeleteRecipeButton
                      recipeId={recipe.id}
                      onDelete={handleDeleteRecipe}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </div>
  );
}
