import { getRecipe } from "@/api/recipe";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { socialMediaIcons } from "@/constant/navigation-menu";
import { useAuth } from "@/context/auth-provider";
import { capitalText, upperText } from "@/libs/format-text";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { Recipe } from "@/types/recipe";
import { SavedRecipe } from "@/types/saved-recipe";
import { useEffect, useState } from "react";
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
  const { user, token } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  const savedRecipeIds = savedRecipes.map((item: SavedRecipe) => item.recipeId);
  const isRecipeSaved = savedRecipeIds.includes(recipe.id);

  const handleBookmark = async () => {
    const recipeToUnbookmark = savedRecipes.find(
      (item: SavedRecipe) => item.recipeId === recipe.id
    );

    if (recipeToUnbookmark) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/saved-recipes/${
            recipeToUnbookmark.id
          }`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete recipe");
          // Tambahkan penanganan error yang sesuai, misalnya menampilkan pesan ke pengguna
        }

        // const data = await response.json();

        const newSavedRecipes = savedRecipes.filter(
          (item: SavedRecipe) => item.recipeId !== recipeToUnbookmark.recipeId
        );

        setSavedRecipes(newSavedRecipes);
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/saved-recipes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              recipeId: recipe.id,
              userId: user?.id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to bookmark recipe");
        }

        const { data } = await response.json();

        setSavedRecipes([...savedRecipes, data]);
      } catch (error) {
        console.error("Error bookmarking recipe:", error);
      }
    }
  };

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/saved-recipes/${user?.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil bookmark");
        }

        const { data } = await response.json();

        setSavedRecipes(data);
      } catch (error) {
        console.error("Error saat mengambil bookmark:", error);
        // Tambahkan penanganan error yang sesuai, misalnya menampilkan pesan ke pengguna
      }
    };

    fetchBookmark();
  }, [recipe.id, token, user]);

  return (
    <div className="bg-[#FDFFF7]">
      <Container className="flex w-full gap-x-12">
        <main className="space-y-8 min-w-96">
          <img
            src={
              resizeUploadcareImage(recipe.imageURL) ||
              "/images/masakmudah-logo-2.png"
            }
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
                  <span>{upperText(ingredienItem.ingredient.name)}</span>
                  <span className="lowercase">
                    {ingredienItem.quantity} {ingredienItem.measurement}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <aside className="space-y-8 font-clashDisplayRegular w-full">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-3">
              <h1 className="text-3xl font-clashDisplaySemibold">
                {upperText(recipe.name)}
              </h1>
              <Button
                className="rounded-3xl flex bg-transparent text-black border hover:bg-transparent font-raleway font-semibold border-black h-8 px-2
                "
                onClick={handleBookmark}
              >
                {isRecipeSaved ? (
                  <img
                    src="/images/icon/heart.svg"
                    alt="duo-line"
                    className="scale-90"
                  />
                ) : (
                  <img
                    src="/images/icon/unheart.svg"
                    alt="duo-line"
                    className="scale-75"
                  />
                )}
                <p className="text-sm">
                  {isRecipeSaved ? "Tersimpan" : "Simpan"}
                </p>{" "}
              </Button>
            </div>

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
            <p className="font-raleway">{capitalText(recipe.description)}</p>
            <section className="space-y-2">
              <Link to={`/${recipe.user.username}/recipes`}>
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
                    <h4 className="font-clashDisplayMedium">
                      {upperText(recipe.user.fullname || recipe.user.username)}
                    </h4>
                    <p className="text-slate-400 font-raleway line-clamp-1">
                      {capitalText(recipe.user.description)}
                    </p>
                  </div>
                </div>
              </Link>
            </section>
            <hr className="h-0.5 bg-black my-4 w-full" />
          </div>
          <h1 className="font-clashDisplayMedium text-2xl">Instruksi</h1>
          <ul className="space-y-2 font-raleway">
            {recipe.instructions.map((instruction, index) => (
              <li key={`${instruction.id}-${index}`}>
                {instruction.step}. {capitalText(instruction.description)}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </div>
  );
}
