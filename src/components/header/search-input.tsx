import { Input } from "../ui/input";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/libs/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/recipes?q=${values.search.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Failed to get recipe");
      }

      navigate(`/recipes?q=${values.search.toLowerCase()}`);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="xs:w-[70%] w-full "
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <Input
                placeholder="Cari resep"
                className="md:pl-4 bg-white rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-black  placeholder:text-slate-400 w-full"
                {...field}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
