import { getUser } from "@/api/get-user";
import { Avatar } from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { capitalText, upperText } from "@/libs/format-text";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { Recipe } from "@/types/recipe";
import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
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
    <div className="bg-[#F7FEE7] min-h-dvh">
      <Container className="w-full space-y-5">
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
          <div className=" w-full space-y-2">
            <p className="font-raleway font-semibold text-xl">
              {upperText(user?.fullname)}
            </p>
            <p className="text-justify">{capitalText(user?.description)}</p>
          </div>
        </section>

        <Separator className="bg-[#1C2625] h-1" />
        <section className="text-center">
          {recipes && recipes.length > 0 ? (
            <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {recipes.map((recipe: Recipe) => (
                <li key={recipe.id} className="rounded-lg">
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
                        <h3 className="font-clashDisplayRegular text-justify line-clamp-2 break-all w-full px-2 lg:px-6">
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
                        {upperText(recipe.user.fullname) ||
                          recipe.user.username}
                      </p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-start flex-col gap-y-4 h-dvh text-white pt-10 font-clashDisplayRegular">
              <p className="text-base md:text-xl text-center text-gray-400">
                Belum punya resep
              </p>
              <Link
                to="/recipes"
                className="text-red-300 p-4 rounded-xl flex gap-x-2 items-center group text-base md:text-xl -ml-8"
              >
                <ArrowLeft className="w-6 h-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-out duration-300" />
                Lihat semua resep
              </Link>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
