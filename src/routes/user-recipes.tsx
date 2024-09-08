import { getUser } from "@/api/get-user";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";
import { Link, useLoaderData } from "react-router-dom";

interface UserRecipesProps {
  user: User;
  recipes: Recipe[];
}

export const userRecipes = async (username: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/username/${username}`
    );

    if (!response.ok) {
      throw new Response("Recipe not found", { status: 404 });
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Response("Error loading user data", { status: 500 });
  }
};

export async function loader(username: string) {
  try {
    const data = await userRecipes(username);
    const recipes = data.data;

    const userResponse = await getUser(username);
    const user = userResponse.data;

    return { user, recipes };
  } catch (error) {
    console.log(error);
  }
}

export function UserRecipesRoute() {
  const { user, recipes } = useLoaderData() as UserRecipesProps;

  return (
    <div className="bg-[#495151] font-clashDisplayRegular min-h-dvh">
      <div className="flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg gap-5">
        <section className="flex justify-start gap-10 text-white">
          <Avatar className="w-32 h-32">
            <img
              src={user.imageURL || "/images/profile-user-alpha.png"}
              alt={user.fullname || "Profile User"}
            />
          </Avatar>

          <div className="justify-center items-start flex flex-col">
            <p className="hover:text-blue-800">@{user.username}</p>
            <h1>{user.fullname || "Fullname"}</h1>
          </div>
        </section>

        <Separator className="h-1 bg-gray-400" />

        <section className="text-center">
          {recipes.length === 0 ? (
            <p className="text-white">Belum punya resep</p>
          ) : (
            <div className="flex flex-col gap-3">
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {recipes.map((recipe: Recipe) => (
                  <li key={recipe.id}>
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98]"
                    >
                      <div className="flex flex-col gap-4">
                        <img
                          src={recipe.imageURL}
                          className="w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 px-5 pt-5 object-cover"
                          alt={recipe.name}
                        />
                        <div className="flex flex-col items-center text-center text-lg px-4 ">
                          <h2 className="font-clashDisplaySemibold">
                            {recipe.name}
                          </h2>
                          <h3 className="font-clashDisplayRegular">
                            {recipe.description}
                          </h3>
                          <h4 className="text-[#FF5D47] font-clashDisplayMedium mt-2">
                            {recipe.cookingTime}
                          </h4>
                        </div>
                        <div className="flex justify-center items-center text-center gap-3 pb-4">
                          <img
                            src={recipe.user.imageURL}
                            alt={recipe.user.fullname + " profile's image"}
                            className="w-6 h-6 rounded-full"
                          />
                          <h2 className="font-clashDisplayRegular">
                            {recipe.user.fullname}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
