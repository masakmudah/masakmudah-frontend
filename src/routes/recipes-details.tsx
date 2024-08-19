import { getRecipe } from "@/api/recipe";
import Container from "@/components/ui/container";
import { socialMediaIcons } from "@/constant/navigation-menu";
import { Recipe } from "@/types/recipe";
import { Link, useLoaderData } from "react-router-dom";

export async function loader(slug: string) {
  try {
    const data = await getRecipe(slug);
    const recipe = data.data;

    return { recipe };
  } catch (error) {
    console.log(error);
  }
}

export function RecipesDetails() {
  const { recipe } = useLoaderData() as { recipe: Recipe };

  return (
    <div className="bg-[#FDFFF7]">
      <Container className="flex w-full gap-x-12">
        <main className="space-y-8 min-w-96">
          <img src={recipe.imageURL} alt="food-image" className="w-96" />
          <section className="space-y-8">
            <h2 className="font-clashDisplaySemibold text-3xl">Bahan-bahan</h2>
            <ul className="space-y-2 font-raleway font-medium">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex justify-between items-center"
                >
                  <span>{ingredient.name}</span>
                  <span>
                    {ingredient.quantity} {ingredient.measurement}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <aside className="space-y-8 font-clashDisplayRegular w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-clashDisplaySemibold">
              {recipe.name}
            </h1>
            <p>{recipe.duration}</p>
          </div>
          <div className="space-y-12">
            <section className="space-y-4">
              <h3>Bagikan resep :</h3>
              <nav className="flex items-center gap-x-4">
                {socialMediaIcons.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-full w-12 h-12 bg-transparent border border-[#616A4A] flex items-center justify-center"
                    aria-label={`Share on ${item.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={item.icon} alt={`Share on ${item.href}`} />
                  </Link>
                ))}
              </nav>
            </section>
            <p className="font-raleway">{recipe.description}</p>
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
            <hr className="h-0.5 bg-black my-4 w-full" />
          </div>
          <h1 className="font-clashDisplayMedium text-2xl">Instruksi</h1>
          <ul className="space-y-2 font-raleway">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id}>
                {instruction.sequence}. {instruction.text}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </div>
  );
}
