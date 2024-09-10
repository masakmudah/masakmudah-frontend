import { useAuth } from "@/context/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { CreateRecipeSchema, createRecipeSchema } from "@/schemas/new-recipe";
import { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import {
  Navigate,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { CategoryField } from "../components/add-recipe/category-field";
// import { BasicInfoField } from "@/components/add-recipe/basic-info-field";

export async function loader(slug: string) {
  try {
    const recipeResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/${slug}`
    );
    const recipes = await recipeResponse.json();
    const recipe = recipes.data;

    const categoriesResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/categories`
    );
    const category = await categoriesResponse.json();
    const categories = category.data;

    return { recipe, categories };
  } catch (error) {
    console.error("Data tidak dapat diakses:", error);
    throw redirect("/dashboard");
  }
}

export function EditRecipeRoute() {
  const { token } = useAuth();
  const { recipe, categories } = useLoaderData() as {
    recipe: CreateRecipeSchema;
    categories: Category[];
  };
  const navigate = useNavigate();

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: recipe.name || "",
      description: recipe.description || "",
      cookingTime: recipe.cookingTime || "",
      categoryId: recipe.categoryId || "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: CreateRecipeSchema) => {
    try {
      if (!token) throw new Error("No authentication token");

      const userResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) throw new Error("Gagal mendapatkan User Id");

      const userData = await userResponse.json();
      const userId = userData.user.id;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, userId }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Lengkapi form:", errorData);
      }
    } catch (error) {
      toast({
        className:
          "bg-red-500 text-white rounded-3xl font-clashDisplayRegular border-0",
        title: "Gagal membuat resep baru",
        description: (error as Error).message,
      });
      console.error("Error saat membuat resep baru:", error);
    }
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[#192322] h-dvh">
      <div className="flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-[#192322] rounded-lg gap-5 text-black">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white ">
          Edit Resep
        </h1>
        <Separator />

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* <BasicInfoField control={control} /> */}
            <Separator />
            <CategoryField categories={categories} control={control} />

            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
