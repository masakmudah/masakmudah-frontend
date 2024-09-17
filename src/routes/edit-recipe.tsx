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
import Container from "@/components/ui/container";
import { IngredientsField } from "@/components/add-recipe/ingredients-field";
import { InstructionsField } from "@/components/add-recipe/instructions-field";
import { BasicInfoField } from "@/components/add-recipe/basic-info-field";
import { useState } from "react";
import ImageUploadButton from "@/components/shared/image-upload-button";
import { uploadFile } from "@uploadcare/upload-client";
import { Recipe } from "@/types/recipe";
import { resizeUploadcareImage } from "@/libs/text-manipulation";

interface EditRecipeProps {
  categories: Category[];
  recipe: Recipe;
  cookingTime: string;
  categoryId: Category;
  useCategory: Category[];
}

export async function loader(id: string) {
  try {
    const recipeResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/recipes/${id}`
    );

    const recipes = await recipeResponse.json();
    const recipe = recipes.data;

    const cookingTime = recipe.cookingTime.replace(/ menit| jam/, "").trim();
    const useCategory = recipe.categories;

    const categoriesResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/categories`
    );

    const category = await categoriesResponse.json();
    const categories = category.data;

    return {
      recipe,
      categories,
      cookingTime,
      useCategory,
    };
  } catch (error) {
    console.error("Data tidak dapat diakses:", error);
    throw redirect("/");
  }
}

export function EditRecipeRoute() {
  const { token, user } = useAuth();
  const { categories, recipe, cookingTime, useCategory } =
    useLoaderData() as EditRecipeProps;
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [timeUnit, setTimeUnit] = useState("menit");

  const time = recipe.cookingTime.replace(/[0-9\s]+/, "").trim();
  const categoryName = useCategory[0].name;
  const categoryId = useCategory[0].id;

  const ingredientItems = recipe.ingredientItems.map((item) => ({
    sequence: Number(item.sequence),
    quantity: Number(item.quantity),
    measurement: item.measurement.toLowerCase(),
    ingredient: { name: item.ingredient.name },
  }));

  const instructions = recipe.instructions.map((item) => ({
    step: Number(item.step),
    description: item.description,
  }));

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: recipe.name || "",
      description: recipe.description || "",
      cookingTime: cookingTime || "",
      categoryId: categoryId || "",
      ingredientItems:
        ingredientItems.length > 0
          ? ingredientItems
          : [
              {
                sequence: 1,
                quantity: 0,
                measurement: "",
                ingredient: { name: "" },
              },
            ],
      instructions:
        instructions.length > 0 ? instructions : [{ step: 1, description: "" }],
    },
  });

  const { handleSubmit, control, setValue, formState } = form;

  const onSubmit = async (data: CreateRecipeSchema) => {
    try {
      toast({
        title: "Mengirim formulir",
        description: "Membuat resep",
        className: "rounded-2xl border-none",
        style: {
          backgroundColor: "#1C2625",
          color: "#fff",
        },
      });

      const imageResponse = await submitImage();
      if (!imageResponse?.cdnUrl) throw new Error("Gagal mengambil url gambar");

      const { cdnUrl } = imageResponse;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          userId: user?.id,
          cookingTime: data.cookingTime.split(" ")[0] + " " + timeUnit,
          imageURL: cdnUrl,
        }),
      });

      if (response.ok) {
        toast({
          title: "Berhasil mengirim formulir",
          description: "Selamat resep telah terbuat",
          className: "rounded-2xl border-none",
          style: {
            color: "#fff",
            backgroundColor: "#1C2625",
          },
        }); // Menghilangkan toast setelah submit berhasil

        const getUsername = user?.username;
        navigate(`/${getUsername}/dashboard`);
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

  const submitImage = async () => {
    try {
      if (!uploadedFile) throw new Error("File harus ada");

      const response = await uploadFile(uploadedFile, {
        publicKey: "6c06ff53d4ffc84d8a11",
        store: "auto",
        metadata: {
          userId: user?.id || "",
        },
      });

      const { cdnUrl } = response;

      if (!cdnUrl) {
        throw new Error("cdnUrl tidak ditemukan dalam response");
      }

      return { cdnUrl };
    } catch (error) {
      console.log("Error saat upload file:", error);
      throw error;
    }
  };

  const handleFileChange = (selectedFile: File | null) => {
    setUploadedFile(selectedFile);
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] min-h-dvh text-black">
      <Container>
        <div className="flex flex-col bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg gap-5 text-black relative">
          <h1 className="text-3xl sm:text-4xl font-bold text-center font-clashDisplaySemibold">
            Edit Resep
          </h1>
          <Separator className="border-black border" />

          <div className="flex justify-center items-center">
            <ImageUploadButton
              onFileChange={handleFileChange}
              defaultImage={resizeUploadcareImage(recipe.imageURL)}
              defaultImageName={recipe.name}
            />
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <BasicInfoField
                control={control}
                timeUnit={timeUnit}
                time={time}
                setTimeUnit={setTimeUnit}
              />
              <CategoryField
                categories={categories}
                categoryName={categoryName}
                categoryId={categoryId}
                control={control}
              />

              <IngredientsField control={control} setValue={setValue} />
              <InstructionsField control={control} setValue={setValue} />

              <Button
                disabled={formState.isSubmitting}
                type="submit"
                className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%]"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </div>
  );
}
