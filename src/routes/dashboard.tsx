import { getUser, getUserRecipes } from "@/api/get-user";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";
import { Link, Navigate, redirect, useLoaderData } from "react-router-dom";

interface DashboardProps {
  user: User;
  recipes: Recipe[];
}

export async function loader() {
  const username = localStorage.getItem("username");
  if (!username) {
    throw redirect("/login");
  }

  try {
    const userResponse = await getUser(username);
    const user = userResponse.data;

    const recipesResponse = await getUserRecipes(username);
    const recipes = recipesResponse.data;

    return { user, recipes };
  } catch (error) {
    console.error("Data tidak dapat diakses:", error);
    throw redirect("/login");
  }
}

export function DashboardRoute() {
  const { user, recipes } = useLoaderData() as DashboardProps;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-[#495151] font-clashDisplayRegular">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg gap-5">
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

          <div>
            <Button asChild className="mt-4">
              <a href="/recipes/new">Tambah resep baru</a>
            </Button>
          </div>
        </section>

        <Separator className="h-1 bg-gray-400" />

        <section className="text-center">
          {recipes.length === 0 ? (
            <p className="text-white">Belum punya resep</p>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl text-white">Resep Saya</h2>
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
