import { getRecipes } from "@/api/recipe";
import Container from "@/components/ui/container";
import { Recipe } from "@/types/recipe";
import { Link, useLoaderData } from "react-router-dom";
export async function loader() {
  const data = await getRecipes();
  const recipes = data.data;
  console.log(recipes);
  return { recipes };
}

// TODO: need to make type/interface for LoaderData

export function RecipesRoute() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };

  return (
    <Container className="w-full space-y-12">
      <h1 className="text-3xl font-clashDisplaySemibold">All Recipes</h1>
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
                    {recipe.recipe}
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
                      <h4 className="font-clashDisplayMedium">Novia Filas</h4>
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
    </Container>
  );
}
