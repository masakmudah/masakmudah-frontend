import { getRecipe } from "@/api/recipe";
import { FacebookIcon, XIcon } from "@/components/share-button/button-share";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/auth-provider";
import { capitalText, upperText } from "@/libs/format-text";
import { resizeUploadcareImage } from "@/libs/text-manipulation";
import { Recipe } from "@/types/recipe";
import { SavedRecipe } from "@/types/saved-recipe";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";

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

  const shareUrl = window.location.href;
  const title = `${recipe.name}`;

  return (
    <div className="bg-[#FDFFF7]">
      <Container className="flex w-full gap-x-4 sm:flex-row flex-col">
        <main className="sm:space-y-8 space-y-4 sm:min-w-96 min-w-52 px-4">
          <div className="flex gap-2 flex-col sm:hidden">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-center font-clashDisplaySemibold">
                {upperText(recipe.name)}
              </h1>
            </div>
            <hr className="h-0.5 bg-black w-full sm:hidden" />
            <div className="flex justify-around items-center">
              <p className="text-[#FF5D47] font-clashDisplayMedium text">
                {recipe.cookingTime}
              </p>
              <Button
                className="rounded-3xl flex bg-transparent text-black border hover:bg-transparent font-raleway font-semibold border-black h-6 p-2
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
                <p className="text-xs">
                  {isRecipeSaved ? "Tersimpan" : "Simpan"}
                </p>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={
                resizeUploadcareImage(recipe.imageURL) ||
                "/images/masakmudah-logo-2.png"
              }
              alt={recipe.name + "'s image"}
              className="w-96"
            />
          </div>
          <section className="sm:space-y-8 space-y-4">
            <h2 className="font-clashDisplaySemibold sm:text-3xl text-xl">
              Bahan-bahan
            </h2>
            <ul className="space-y-2 font-raleway font-medium sm:text-base text-sm">
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
          <hr className="h-0.5 w-full sm:hidden bg-black" />
        </main>

        <aside className="space-y-4 font-clashDisplayRegular w-full sm:mt-8 px-4">
          {/* HEAD*/}
          <section className="hidden sm:flex gap-1 flex-col">
            {/* TITLE */}
            <div className="flex gap-4 sm:gap-0 md:gap-4 lg:items-center sm:max-md:flex-col ">
              <h1 className="text-3xl font-clashDisplaySemibold">
                {upperText(recipe.name)}
              </h1>
              <Button
                className="rounded-3xl flex bg-transparent text-black border hover:bg-transparent font-raleway font-semibold border-black h-8 md:mt-1
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
                </p>
              </Button>
            </div>

            {/* DURATION */}
            <p className="text-[#FF5D47] font-clashDisplayMedium">
              {recipe.cookingTime}
            </p>
          </section>

          {/* SHARE LINK */}
          <section className="sm:space-y-4 space-y-1">
            <h3>Bagikan resep :</h3>
            <nav className="flex items-center gap-x-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <XIcon size={32} round />
              </TwitterShareButton>
            </nav>
          </section>

          {/* DESCRIPTION */}
          <section>
            <p className="font-raleway text-justify">
              {capitalText(recipe.description)}
            </p>
          </section>

          {/* AUTHOR */}
          <section className="flex flex-col gap-3">
            <div className="space-y-1">
              <h3 className="font-clashDisplayMedium sm:text-lg text-sm">
                Author
              </h3>
              <Link
                to={`/${recipe.user.username}/recipes`}
                className="gap-3 flex px-2"
              >
                {/* IMAGE USER*/}
                <div className="flex items-center justify-center ">
                  <img
                    src={
                      recipe.user.imageURL ||
                      "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
                    }
                    alt={recipe.user.username + "'s image"}
                    className="sm:w-12 sm:h-12 w-8 h-8 object-cover rounded-full"
                  />
                </div>

                {/* PROFILE USER */}
                <div className="sm:text-base text-xs py-1 w-full">
                  <h4 className="font-clashDisplayMedium">
                    {upperText(recipe.user.fullname || recipe.user.username)}
                  </h4>
                  <p className="text-slate-400 font-raleway line-clamp-1 text-justify">
                    {capitalText(recipe.user.description)}
                  </p>
                </div>
              </Link>
            </div>
            <hr className="h-0.5 bg-black w-full" />
          </section>

          {/* INSTRUCTION */}
          <section className="gap-2 flex flex-col">
            <h1 className="font-clashDisplayMedium text-2xl">Instruksi</h1>
            <ul className="space-y-1 font-raleway">
              {recipe.instructions.map((instruction, index) => (
                <li key={`${instruction.id}-${index}`}>
                  {instruction.step}. {capitalText(instruction.description)}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </Container>
    </div>
  );
}
