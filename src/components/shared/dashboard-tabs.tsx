import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalText, upperText } from "@/libs/format-text";
import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
import { DeleteRecipeButton } from "./delete-recipe";
// import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getSavedRecipeByUsername } from "@/api/recipe";
import { useAuth } from "@/context/auth-provider";
import { SavedRecipe } from "@/types/saved-recipe";
import { Recipe } from "@/types/recipe";
import { getUserRecipes } from "@/api/get-user";
import { resizeUploadcareImage } from "@/libs/text-manipulation";

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
      const { data } = await getSavedRecipeByUsername(user.username, token!);
      setSavedRecipes(data);
    };

    fetchMySavedRecipe();
  }, [user, token]);

  return (
    <Tabs
      defaultValue="my-recipe"
      className="w-full"
      onValueChange={(value: string) => setTabSelected(value)}
    >
      <TabsList className="grid w-full grid-cols-2 bg-[#1C2625] rounded-3xl text-white font-clashDisplayMedium">
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
            <div className="my-40 flex items-center justify-center">
              Maaf kamu belum pernah membuat resep
            </div>
          ) : (
            <ul className="grid mt-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {ownRecipes.map((recipe) => (
                <li key={recipe.id} className="group relative">
                  <Link
                    to={`/recipes/${recipe.slug}`}
                    className="bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98] h-full"
                  >
                    <div className="flex flex-col gap-4 w-full">
                      <img
                        src={
                          resizeUploadcareImage(recipe.imageURL) ||
                          "/images/masakmudah-logo-2.png"
                        }
                        className="w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 px-5 pt-5 object-cover"
                        alt={recipe.name}
                      />

                      <div className="flex flex-col items-center text-center text-lg px-4 w-full">
                        <h2 className="font-clashDisplaySemibold">
                          {upperText(recipe.name)}
                        </h2>
                        <h3 className="font-clashDisplayRegular text-left line-clamp-2 break-all max-w-full px-4">
                          {capitalText(recipe.name)}
                        </h3>
                        <h4 className="text-[#FF5D47] font-clashDisplayMedium mt-2">
                          {recipe.cookingTime}
                        </h4>
                      </div>
                      <div className="flex justify-center items-center text-center gap-3 pb-4 bottom-0">
                        <img
                          src={
                            user?.imageURL ||
                            "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                          }
                          alt={"'s image"}
                          className="w-6 h-6 rounded-full"
                        />
                        <h2 className="font-clashDisplayRegular">
                          {upperText(user?.fullname)}
                        </h2>
                      </div>
                    </div>
                  </Link>
                  {/* <Button
                    asChild
                    className="p-2 text-black hover:text-[#e85541] absolute top-5 left-5 backdrop-filter backdrop-blur-sm w-10 h-10 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gray-200"
                  >
                    <Link to={`/recipes/edit/${recipe.slug}`}>

                      <Pencil
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
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      ) : (
        <TabsContent value="saved-recipe">
          {savedRecipes.length === 0 ? (
            <div className="my-40 flex items-center justify-center">
              Maaf resep tersimpan tidak ada
            </div>
          ) : (
            <ul className="grid mt-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {savedRecipes.map((recipe) => (
                <li key={recipe.recipes.slug} className="group relative">
                  <Link
                    to={`/recipes/${recipe.recipes.slug}`}
                    className="bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98] h-full"
                  >
                    <div className="flex flex-col gap-4 w-full">
                      <img
                        src={
                          resizeUploadcareImage(recipe.recipes.imageURL) ||
                          "/images/masakmudah-logo-2.png"
                        }
                        className="w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 px-5 pt-5 object-cover"
                        alt={recipe.recipes.name}
                      />

                      <div className="flex flex-col items-center text-center text-lg px-4 w-full">
                        <h2 className="font-clashDisplaySemibold">
                          {upperText(recipe.recipes.name)}
                        </h2>
                        <h3 className="font-clashDisplayRegular text-left line-clamp-2 break-all max-w-full px-4">
                          {capitalText(recipe.recipes.name)}
                        </h3>
                        <h4 className="text-[#FF5D47] font-clashDisplayMedium mt-2">
                          {recipe.recipes.cookingTime}
                        </h4>
                      </div>
                      <div className="flex justify-center items-center text-center gap-3 pb-4 bottom-0">
                        <img
                          src={
                            recipe.recipes.user.imageURL ||
                            "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                          }
                          alt={"'s image"}
                          className="w-6 h-6 rounded-full"
                        />
                        <h2 className="font-clashDisplayRegular">
                          {upperText(recipe.recipes.user.fullname) ||
                            recipe.recipes.user.username}
                        </h2>
                      </div>
                    </div>
                  </Link>
                  {/* <Button
                    asChild
                    className="p-2 text-black hover:text-[#e85541] absolute top-5 left-5 backdrop-filter backdrop-blur-sm w-10 h-10 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gray-200"
                  >
                    <Link to={`/recipes/edit/${recipe.recipes.slug}`}> */}

                  {/* <Pencil
                        className="transition-colors duration-400"
                        strokeWidth={3}
                        absoluteStrokeWidth
                      />
                    </Link>
                  </Button>
                  <DeleteRecipeButton
                    recipeId={recipe.id}
                    onDelete={handleDeleteRecipe}
                  /> */}
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      )}
      {/* <TabsContent value="my-recipe"></TabsContent>
      <TabsContent value="saved-recipe"></TabsContent> */}
    </Tabs>
  );
}
