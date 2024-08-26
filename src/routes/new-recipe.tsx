import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CreateRecipeSchema, createRecipeSchema } from "@/schemas/new-recipe";
import { Separator } from "@/components/ui/separator";
import { BasicInfoField } from "@/components/add-recipe/basic-info-field";
import { CategoriesField } from "@/components/add-recipe/categories-field";
import { IngredientsField } from "@/components/add-recipe/ingredients-field";
import { InstructionsField } from "@/components/add-recipe/instructions-field";

export function NewRecipeRoute() {
  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      imageURL: "",
      nameRecipe: "",
      description: "",
      duration: "",
      categories: [{ name: "" }],
      ingredients: [{ sequence: 0, name: "", quantity: 0, measurement: "" }],
      instructions: [{ sequence: 0, text: "" }],
    },
  });

  const { handleSubmit, control, setValue } = form;

  // Function to handle form submission
  const onSubmit = (data: CreateRecipeSchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-[#1C2625] shadow-lg rounded-lg gap-5 text-black">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white ">
        Tulis Resep Baru
      </h1>
      <Separator />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfoField control={control} setValue={setValue} />
          <Separator />
          <CategoriesField control={control} />
          <Separator />

          <IngredientsField control={control} />
          <Separator />

          <InstructionsField control={control} />
          <Separator />

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
