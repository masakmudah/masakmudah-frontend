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
// import { IngredientsField } from "@/components/add-recipe/ingredients-field";
// import { InstructionsField } from "@/components/add-recipe/instructions-field";
// import ImageUploadButton from "@/components/shared/image-upload-button";
// import { uploadFile } from "@uploadcare/upload-client";

export async function loader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
  const data = await response.json();
  const categories = data.data;
  return { categories };
}

export function NewRecipeRoute() {
  const { token } = useAuth();
  const { categories } = useLoaderData() as { categories: Category[] };
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: "",
      description: "",
      cookingTime: "",
      categoryId: "",
      // imageURL: "",
      // ingredients: [{ sequence: 0, name: "", quantity: 0, measurement: "" }],
      // instructions: [{ sequence: 0, text: "" }],
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

  // const submitImage = async () => {
  //   try {
  //     if (!uploadedFile) throw new Error("File harus ada");

  //     const { cdnUrl } = await uploadFile(uploadedFile, {
  //       publicKey: "6c06ff53d4ffc84d8a11",
  //       store: "auto",
  //       metadata: {
  //         pet: "cat",
  //       },
  //     });

  //     // console.log(data);
  //     console.log(cdnUrl);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleFileChange = (selectedFile: File | null) => {
    setUploadedFile(selectedFile);
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[#192322] min-h-dvh">
      <div className="flex flex-col w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-[#192322] rounded-lg gap-5 text-black">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white ">
          Tulis Resep Baru
        </h1>
        <Separator />

        <ImageUploadButton onFileChange={handleFileChange} />
        {/* <button onClick={submitImage}>Submit</button> */}

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <BasicInfoField control={control} />
            <Separator />
            <CategoryField categories={categories} control={control} />

            {/* <CategoriesField control={control} /> */}
            {/* <Separator /> */}
            {/* <IngredientsField control={control} /> */}
            {/* <Separator /> */}
            {/* <InstructionsField control={control} /> */}
            {/* <Separator /> */}

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
