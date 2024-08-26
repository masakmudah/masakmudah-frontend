import { navigationMenu } from "@/constant/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/libs/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Container from "../ui/container";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

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
    <header className="bg-[#E6FDB0] shadow-sm w-full">
      <Container className="flex items-center justify-between md:gap-20 p-4 md:p-6 space-x-2 w-full max-w-full md:w-fit">
        <div id="left-side" className="flex items-center gap-x-4 md:gap-x-20">
          <Link to="/" className="hidden md:flex items-center gap-x-2">
            <h1 className="text-lg md:text-xl font-clashDisplaySemibold">
              Masakmudah
            </h1>
          </Link>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify className="cursor-pointer" /> {/* Icon */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4 ml-2 w-56 bg-[#1C2625]">
                {navigationMenu.map((menu) => (
                  <Link key={menu.href} to={menu.href}>
                    <DropdownMenuItem className="text-base text-white font-clashDisplayMedium">
                      {menu.label}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link to="/" className="md:hidden">
            <h1 className="text-lg font-clashDisplaySemibold">Masakmudah</h1>
          </Link>

          <nav className="hidden md:flex">
            <ul className="flex items-center gap-x-6 md:gap-x-10">
              {navigationMenu.map((menu) => (
                <Link key={menu.href} to={menu.href}>
                  <li className="text-sm md:text-base font-clashDisplayMedium">
                    {menu.label}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
        <div id="right-side" className="flex items-center gap-x-4 md:gap-x-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full md:w-auto"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Cari resep"
                      className="pl-6 bg-white rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0 border-2 w-full md:w-96 placeholder:text-slate-400"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Link
            to="/dashboard"
            className="flex justify-center items-center gap-2"
          >
            <Avatar>
              <AvatarImage
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4="
                alt="profile"
              />
            </Avatar>
            <p>Username</p>
          </Link>
          <Link
            to="/login"
            className="px-4 md:px-8 py-2 md:py-2 bg-[#FF5D47] rounded-3xl font-raleway text-white text-sm md:text-base"
          >
            Login
          </Link>
        </div>
      </Container>
    </header>
  );
}
