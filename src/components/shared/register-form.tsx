import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
            fullname: values.fullName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Pendaftaran gagal");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saat mendaftar:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-clashDisplayMedium">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john_doe"
                    className="rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-clashDisplayMedium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    className="rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-clashDisplayMedium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-clashDisplayMedium">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%]">
          Daftar
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
