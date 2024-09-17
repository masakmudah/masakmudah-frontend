import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalText, upperText } from "@/libs/format-text";
import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
import { DeleteRecipeButton } from "./delete-recipe-button";
// import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getSavedRecipeByUsername } from "@/api/recipe";
import { useAuth } from "@/context/auth-provider";
import { SavedRecipe } from "@/types/saved-recipe";
import { Recipe } from "@/types/recipe";
import { getUserRecipes } from "@/api/get-user";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { EditRecipeButton } from "./edit-recipe-button";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardTabsProps {
  myRecipes: Recipe[];
}

export function DashboardTabs({ myRecipes }: DashboardTabsProps) {
  const { token, user } = useAuth();
  const [tabSelected, setTabSelected] = useState("my-recipe");
  const [ownRecipes, setOwnRecipes] = useState<Recipe[]>(myRecipes);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

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
      setOwnRecipes(recipes);
    } catch (error) {
      console.error("Gagal refresh data:", error);
    }
  };

  useEffect(() => {
    const fetchMySavedRecipe = async () => {
      if (!user?.username) {
        throw new Error("Username doesn't exist");
      }

      try {
        const { data } = await getSavedRecipeByUsername(user.username, token!);
        setSavedRecipes(data);
      } catch (error) {
        console.error("Data tidak tersedia:", error);
      }
    };

    if (user) {
      fetchMySavedRecipe();
    }
  }, [user, token]);

  return (
    <Tabs
      defaultValue="my-recipe"
      className="w-full"
      onValueChange={(value: string) => setTabSelected(value)}
    >
      <TabsList className="grid w-full grid-cols-2 bg-[#1C2625] rounded-3xl text-white font-clashDisplayMedium mb-8">
        <TabsTrigger
          value="my-recipe"
          className="data-[state=active]:bg-[#F7FEE7] rounded-3xl"
        >
          Resep saya
        </TabsTrigger>
        <TabsTrigger
          value="saved-recipe"
          className="data-[state=active]:bg-[#F7FEE7] rounded-3xl"
        >
          Resep disimpan
        </TabsTrigger>
      </TabsList>
      {tabSelected === "my-recipe" ? (
        <TabsContent value="my-recipe">
          {ownRecipes.length === 0 ? (
            <div className="flex items-center flex-col h-dvh mt-16 gap-4">
              <p className="text-xl text-center font-clashDisplaySemibold text-gray-400">
                Mari membuat resep, bagikan resep andalan anda.
              </p>
              <Button
                asChild
                className="rounded-3xl font-clashDisplayMedium bg-[#FE5D47] hover:bg-[#ee5743]"
              >
                <Link to="/recipes/new">Buat resep</Link>
              </Button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {ownRecipes.map((recipe) => (
                <li key={recipe.id} className="relative group">
                  <div className="justify-between h-full bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98]">
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98] h-full"
                    >
                      <div className="flex justify-center items-center m-5">
                        <img
                          src={
                            resizeUploadcareImage(recipe.imageURL) ||
                            "/images/masakmudah-logo-2.png"
                          }
                          className="w-60 h-60 md:w-70 md:h-70 sm:w-52 sm:h-52 object-center object-cover rounded-lg"
                          alt={recipe.name}
                        />
                      </div>
                      <div className="flex flex-col items-center text-center text-base sm:text-lg px-6 w-full">
                        <h2 className="font-clashDisplaySemibold line-clamp-2 break-word w-full">
                          {upperText(recipe.name)}
                        </h2>
                        <h3 className="font-clashDisplayRegular text-justify line-clamp-2 break-all w-full px-2 lg:px-6">
                          {capitalText(recipe.description)}
                        </h3>
                        <h4 className="text-[#FF5D47] font-clashDisplayMedium ">
                          {recipe.cookingTime}
                        </h4>
                      </div>
                    </Link>
                    <Link
                      to={`/${recipe.user.username}/recipes`}
                      className="flex justify-center items-center text-center gap-2 p-2 hover:font-bold"
                    >
                      <img
                        src={
                          recipe.user.imageURL ||
                          "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                        }
                        alt={recipe.user.username + "'s image"}
                        className="w-6 h-6 rounded-full  "
                      />
                      <p className="font-clashDisplayRegular bg-gray-200 p-1 rounded-lg">
                        {upperText(recipe.user.fullname) ||
                          recipe.user.username}
                      </p>
                    </Link>
                    <EditRecipeButton recipe={recipe.slug} />
                    <DeleteRecipeButton
                      recipeId={recipe.id}
                      onDelete={handleDeleteRecipe}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      ) : (
        <TabsContent value="saved-recipe">
          {savedRecipes.length === 0 ? (
            <div className="flex items-center flex-col h-dvh mt-16">
              <p className="text-xl text-center font-clashDisplaySemibold text-gray-400">
                Tidak ada resep yang tersimpan
              </p>
              <Link
                to="/recipes"
                className="text-red-300 p-4 rounded-xl font-clashDisplayMedium flex gap-x-2 items-center group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-out duration-300" />
                Lihat semua resep
              </Link>
            </div>
          ) : (
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {savedRecipes.map((recipe) => (
                <li key={recipe.recipes.slug} className="group relative">
                  <div className="justify-between h-full bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98]">
                    <Link
                      to={`/recipes/${recipe.recipes.slug}`}
                      className="bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98] h-full"
                    >
                      <div className="flex justify-center items-center m-5">
                        <img
                          src={
                            resizeUploadcareImage(recipe.recipes.imageURL) ||
                            "/images/masakmudah-logo-2.png"
                          }
                          className="w-60 h-60 md:w-70 md:h-70 sm:w-52 sm:h-52 object-center object-cover rounded-lg"
                          alt={recipe.recipes.name}
                        />
                      </div>
                      <div className="flex flex-col items-center text-center text-base sm:text-lg px-6 w-full">
                        <h2 className="font-clashDisplaySemibold line-clamp-2 break-word w-full">
                          {upperText(recipe.recipes.name)}
                        </h2>
                        <h3 className="font-clashDisplayRegular text-justify line-clamp-2 break-all w-full px-2 lg:px-6">
                          {capitalText(recipe.recipes.description)}
                        </h3>
                        <h4 className="text-[#FF5D47] font-clashDisplayMedium ">
                          {recipe.recipes.cookingTime}
                        </h4>
                      </div>
                    </Link>
                    <Link
                      to={`/${recipe.recipes.user.username}/recipes`}
                      className="flex justify-center items-center text-center gap-2 p-2 hover:font-bold"
                    >
                      <img
                        src={
                          recipe.recipes.user.imageURL ||
                          "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                        }
                        alt={recipe.recipes.user.username + "'s image"}
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="font-clashDisplayRegular bg-gray-200 p-1 rounded-lg">
                        {upperText(recipe.recipes.user.fullname) ||
                          recipe.recipes.user.username}
                      </p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}
