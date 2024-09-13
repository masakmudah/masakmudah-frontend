import { getRecipes } from "@/api/recipe";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { capitalText, upperText } from "@/libs/format-text";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { Recipe } from "@/types/recipe";
import { ArrowLeft } from "lucide-react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { LoaderFunctionArgs } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const queryParam = url.searchParams.get("q");

  const data = await getRecipes(queryParam);
  const recipes = data.data;
  return { recipes };
}

// TODO: need to make type/interface for LoaderData

export function RecipesRoute() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };
  const [params] = useSearchParams();
  const q = params.get("q");

  return (
    <div className="bg-[#495151] min-h-dvh">
      <Container className="w-full space-y-5">
        <h1 className="text-3xl font-clashDisplaySemibold text-white">
          {q === null ? (
            "Semua resep"
          ) : (
            <p>
              Hasil pencarian untuk:
              <span className="capitalize text-[#FF5D47]"> {q}</span>
            </p>
          )}
        </h1>
        <Separator />
        {recipes && recipes.length > 0 ? (
          <ul className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recipes.map((recipe: Recipe) => (
              <li key={recipe.id}>
                <div className="justify-between h-full bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98]">
                  <Link to={`/recipes/${recipe.slug}`}>
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
                      <h3 className="font-clashDisplayRegular text-left line-clamp-2 break-all w-full px-2 lg:px-6">
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
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="font-clashDisplayRegular bg-gray-200 p-1 rounded-lg">
                      {upperText(recipe.user.fullname || recipe.user.username)}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center flex-col gap-y-4 h-dvh text-white">
            <p className="text-xl text-center font-clashDisplaySemibold">
              Tidak ada resep yang ditemukan
            </p>
            <Link
              to="/recipes"
              className="text-red-300 p-4 rounded-xl font-clashDisplayMedium flex gap-x-2 items-center group"
            >
              <ArrowLeft className="w-4 h-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-out duration-300" />
              Lihat semua resep
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
