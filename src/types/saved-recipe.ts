export type SavedRecipe = {
  id: string;
  recipeId: string;
  userId: string;
  recipes: {
    name: string;
    slug: string;
    imageURL: string;
    cookingTime: string;
  };
};
