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
            <>
              Hasil pencarian untuk:
              <span className="capitalize text-[#FF5D47]"> {q}</span>
            </>
          )}
        </h1>
        <Separator />
        {recipes && recipes.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {recipes.map((recipe: Recipe) => (
              <li key={recipe.id} className="relative">
                <div className="gap-4 h-full bg-[#F7FEE7] rounded-3xl flex flex-col hover:scale-[.994] transition-transform duration-300 active:scale-[.98] ">
                  <Link to={`/recipes/${recipe.slug}`}>
                    <img
                      src={
                        resizeUploadcareImage(recipe.imageURL) ||
                        "/images/masakmudah-logo-2.png"
                      }
                      className="w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 px-5 pt-5 object-cover"
                      alt={recipe.name}
                    />
                    <div className="flex flex-col items-center text-center text-lg px-4 w-full">
                      <h2 className="font-clashDisplaySemibold mt-2">
                        {upperText(recipe.name)}
                      </h2>
                      <h3 className="font-clashDisplayRegular text-left line-clamp-2 break-all max-w-full px-4">
                        {capitalText(recipe.description)}
                      </h3>
                      <h4 className="text-[#FF5D47] font-clashDisplayMedium mt-2">
                        {recipe.cookingTime}
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to={`/${recipe.user.username}`}
                    className="flex justify-center items-center text-center gap-2 pb-4  hover:font-bold"
                  >
                    <img
                      src={
                        recipe.user.imageURL ||
                        "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                      }
                      alt={recipe.user.username + "'s image"}
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="font-clashDisplayRegular bg-gray-200 p-1">
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
