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

import { useAuth } from "@/context/auth-provider";
import ProfileImage from "./profile-image";

export function Header() {
  const navigate = useNavigate();
  const { token } = useAuth();

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
    <header className="bg-[#E6FDB0] shadow-sm w-full">
      <Container className="flex items-center justify-between md:gap-20 p-4 md:p-6 space-x-2 h-20">
        <div id="left-side" className="flex items-center gap-x-4 md:gap-x-20">
          <Link to="/" className="hidden md:flex items-center  gap-x-2">
            <img
              src="/images/masakmudah-logo-2.png"
              alt=""
              className="w-12 h-12"
            />
            <div className="-space-y-3">
              <p className="text-lg md:text-lg font-clashDisplayMedium">
                masak
              </p>
              <p className="text-lg md:text-lg font-clashDisplayMedium">
                mudah
              </p>
            </div>
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
                      className="pl-6 bg-white rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-black w-full md:w-96 placeholder:text-slate-400"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {token ? (
            <ProfileImage />
          ) : (
            <Link
              to="/login"
              className="px-4 md:px-8 py-2 md:py-2 bg-[#FF5D47] rounded-3xl font-raleway text-white text-sm md:text-base"
            >
              Login
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
