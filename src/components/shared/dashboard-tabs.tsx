import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Recipe } from "@/types/recipe";
import { Link } from "react-router-dom";
interface DashboardTabsProps {
  recipes: Recipe[];
}

export function DashboardTabs({ recipes }: DashboardTabsProps) {
  console.log(recipes);

  return (
    <Tabs defaultValue="my-recipe" className="w-full">
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
      <TabsContent value="my-recipe">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-4">
            {recipes.map((recipe) => (
              <Link
                to={`/recipes/${recipe.slug}`}
                className="bg-[#1C2625] rounded-3xl flex min-h-[31.25rem] flex-col justify-between gap-y-8 items-center py-8 hover:scale-[.994] transition-transform duration-300 active:scale-[.98]"
              >
                <div className="flex flex-col items-center gap-y-8 ">
                  <img
                    src={recipe.imageURL}
                    className="w-56 h-56 object-cover rounded-xl"
                    alt={recipe.name}
                  />
                  <div className="flex flex-col items-center px-8 gap-y-4 ">
                    <h2 className="text-2xl font-clashDisplaySemibold">
                      {recipe.name}
                    </h2>
                    <p className="text-center">{recipe.description}</p>
                  </div>
                </div>
                <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                  {recipe.cookingTime}
                </h1>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-96 font-clashDisplayMedium text-xl">
            Tidak ada resep
          </div>
        )}
      </TabsContent>
      <TabsContent value="saved-recipe"></TabsContent>
    </Tabs>
  );
}
