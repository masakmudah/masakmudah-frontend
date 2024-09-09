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
          <img
            src={recipe.imageURL || "/images/masakmudah-logo-2.png"}
            alt={recipe.name + "'s image"}
            className="w-96"
          />
          <section className="space-y-8">
            <h2 className="font-clashDisplaySemibold text-3xl">Bahan-bahan</h2>
            <ul className="space-y-2 font-raleway font-medium">
              {recipe.ingredientItems.map((ingredienItem) => (
                <li
                  key={ingredienItem.id}
                  className="flex justify-between items-center"
                >
                  <span>{ingredienItem.ingredient.name}</span>
                  <span>
                    {ingredienItem.quantity} {ingredienItem.measurement}
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
            <p>{recipe.cookingTime}</p>
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
              <Link to={`/${recipe.user.username}`}>
                <h3 className="font-clashDisplayMedium">Author</h3>
                <div className="flex gap-x-4 items-center">
                  <img
                    src={
                      recipe.user.imageURL ||
                      "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                    }
                    alt={recipe.user.username + "'s image"}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="space-y-1">
                    <h4 className="font-clashDisplayMedium capitalize">
                      {recipe.user.fullname || recipe.user.username}
                    </h4>
                    <p className="text-slate-400 font-raleway">
                      Memasak adalah koentji
                    </p>
                  </div>
                </div>
              </Link>
            </section>
            <hr className="h-0.5 bg-black my-4 w-full" />
          </div>
          <h1 className="font-clashDisplayMedium text-2xl">Instruksi</h1>
          {/* <ul className="space-y-2 font-raleway">
            {recipe.instructions.map((instruction, index) => (
              <li key={`${instruction.id}-${index}`}>
                {instruction.step}. {instruction.description}
              </li>
            ))}
          </ul> */}
        </aside>
      </Container>
    </div>
  );
}
