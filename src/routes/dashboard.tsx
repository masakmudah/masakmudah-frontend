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
    <div className="">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10  rounded-lg gap-5 text-black">
        <section className="flex justify-start gap-10">
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
            <p>Belum punya resep</p>
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl">Resep Saya</h2>
              <ul className="space-y-6">
                {recipes.map((recipe: Recipe) => (
                  <li key={recipe.id}>
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="bg-[#1C2625] rounded-3xl px-8 py-10 flex gap-x-12"
                    >
                      <div className="">
                        <div className="rounded-2xl overflow-hidden w-48 h-48">
                          <img
                            src={recipe.imageURL}
                            alt="food"
                            className="object-cover w-48 h-48"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between  font-raleway text-white">
                        <div className="space-y-3">
                          <h1 className="text-2xl font-clashDisplayMedium">
                            {recipe.name}
                          </h1>
                          <p>{recipe.description}</p>
                        </div>
                        <section className="space-y-2">
                          <h3 className="font-clashDisplayMedium">Author</h3>
                          <div className="flex gap-x-4 items-center">
                            <img
                              src="/path/to/author-image.jpg"
                              alt="Novia Filas"
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="space-y-1">
                              <h4 className="font-clashDisplayMedium">
                                {recipe.user.fullname}
                              </h4>
                              <p className="text-slate-400 font-raleway">
                                Memasak adalah koentji
                              </p>
                            </div>
                          </div>
                        </section>
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
