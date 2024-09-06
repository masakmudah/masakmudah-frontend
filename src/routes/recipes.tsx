import { getRecipes } from "@/api/recipe";
import Container from "@/components/ui/container";
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
    <Container className="w-full space-y-12">
      <h1 className="text-3xl font-clashDisplaySemibold">
        {q === null ? "Semua resep" : `Hasil pencarian untuk "${q}"`}
      </h1>

      {recipes && recipes.length > 0 ? (
        <ul className="grid grid-cols md:grid-cols-4 gap-4 ">
          {recipes.map((recipe: Recipe) => (
            <li key={recipe.id}>
              <Link
                to={`/recipes/${recipe.slug}`}
                className="bg-[#F7FEE7] shadow-lg shadow-black rounded-3xl flex flex-col gap-y-8 items-center py-8 h-full hover:scale-[.994] transition-transform duration-300 active:scale-[.98]"
              >
                <div className="flex gap-x-4 items-center">
                  <img
                    src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix"
                    alt={`avatar-${recipe.user.fullname}`}
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
                <div className="flex flex-col items-center gap-y-8 flex-grow">
                  <img
                    src={recipe.imageURL}
                    className="w-56 h-56 object-cover rounded-xl"
                    alt={recipe.name}
                  />
                  <div className="flex flex-col items-center px-8 gap-y-4 ">
                    <h2 className="text-3xl font-clashDisplaySemibold">
                      {recipe.name}
                    </h2>
                    <p className="text-center">{recipe.description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center flex-col gap-y-4 h-96">
          <p className="text-xl text-center font-clashDisplayMedium">
            Tidak ada resep yang ditemukan
          </p>
          <Link
            to="/recipes"
            className=" p-4 rounded-xl font-clashDisplayMedium flex gap-x-2 items-center group"
          >
            <ArrowLeft className="w-4 h-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ease-out duration-300" />
            Lihat semua resep
          </Link>
        </div>
      )}
    </Container>
  );
}
