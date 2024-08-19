import { navigationMenu } from "@/constant/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/libs/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function Header() {
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
        }/recipes?search=${values.search.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Failed to get recipe");
      }

      navigate(`/recipes?search=${values.search.toLowerCase()}`);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-20 w-full flex items-center justify-center text-[#202633]">
      <div className=" max-w-screen-xl w-full flex items-center justify-between px-8">
        <div id="left-side" className="flex items-center gap-x-20">
          <Link to="/" className="flex items-center gap-x-2">
            <h1 className="text-xl font-clashDisplaySemibold">Masakmudah</h1>
          </Link>
          <nav>
            <ul className="flex items-center gap-x-10">
              {navigationMenu.map((menu) => (
                <li key={menu.href}>
                  <Link to={menu.href} className="font-clashDisplayMedium">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="right-side" className="flex items-center gap-x-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Cari resep"
                      className="pl-6 bg-white rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0 border-2 w-96 placeholder:text-slate-400"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Link
            to="/login"
            className="px-8 py-2 bg-[#FF5D47] rounded-3xl font-raleway text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
