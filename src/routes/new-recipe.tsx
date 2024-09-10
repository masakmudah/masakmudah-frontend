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
  // ActionFunctionArgs,
  Navigate,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { CategoryField } from "../components/add-recipe/category-field";
import { BasicInfoField } from "@/components/add-recipe/basic-info-field";
import { useState } from "react";
import ImageUploadButton from "@/components/shared/image-upload-button";
// import { CategoriesField } from "@/components/add-recipe/categories-field";
import { IngredientsField } from "@/components/add-recipe/ingredients-field";
import { InstructionsField } from "@/components/add-recipe/instructions-field";
// import ImageUploadButton from "@/components/shared/image-upload-button";

import { uploadFile } from "@uploadcare/upload-client";
import Container from "@/components/ui/container";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
  const data = await response.json();
  const categories = data.data;
  return { categories };
}

export function NewRecipeRoute() {
  const { token, user } = useAuth();
  const { categories } = useLoaderData() as { categories: Category[] };
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [timeUnit, setTimeUnit] = useState("menit");

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: "",
      description: "",
      cookingTime: "",
      categoryId: "",
      ingredientItems: [
        { sequence: 0, quantity: 0, measurement: "", ingredient: { name: "" } },
      ],
      instructions: [{ step: 1, description: "" }],
      // imageURL: "",
    },
  });

  const { handleSubmit, control } = form;

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

      const getUsername = user?.username;
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
          description: "Selamat resep telah terbuat font-raleway",
          className: "rounded-2xl border-none",
          style: {
            color: "#fff",
            backgroundColor: "#1C2625",
          },
        }); // Menghilangkan toast setelah submit berhasil
        navigate(`/dashboard/${getUsername}`);
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
          pet: "cat",
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
    console.log(uploadedFile); // prevent vercel error
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] min-h-dvh text-black">
      <Container>
        <div className="flex flex-col bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg gap-5 text-black relative">
          <h1 className="text-3xl sm:text-4xl font-bold text-center font-clashDisplaySemibold">
            Tulis Resep Baru
          </h1>
          <Separator className="border-black border" />

          <ImageUploadButton onFileChange={handleFileChange} />
          {/* <button onClick={submitImage}>Submit</button> */}

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <BasicInfoField
                control={control}
                timeUnit={timeUnit}
                setTimeUnit={setTimeUnit}
              />
              {/* <Separator /> */}
              <CategoryField categories={categories} control={control} />

              {/* <Separator /> */}
              <IngredientsField control={control} />
              {/* <Separator /> */}
              <InstructionsField control={control} />
              {/* <Separator /> */}
              {/* <CategoriesField control={control} /> */}

              <Button
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

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();

//   const userData = {
//     name: formData.get("name")?.toString(),
//     description: formData.get("description")?.toString(),
//     cookingTime: formData.get("cookingTime")?.toString(),
//     categoryId: formData.get("categoryId")?.toString(),
//   };

//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (response.ok) {
//       return navigate("/dashboard");
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to create recipe:", errorData);
//       return null;
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return null;
//   }
// }
