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
