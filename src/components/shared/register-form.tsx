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
import { registerSchema } from "@/libs/zod-schema";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { PasswordToggle } from "./password-toggle";
import { useState } from "react";
import { register } from "@/api/auth";
import { toast } from "../ui/use-toast";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const triggerToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      await register(values);

      navigate("/");
    } catch (error) {
      toast({
        className:
          "bg-red-500 text-white rounded-3xl font-clashDisplayRegular border-0",
        title: "Gagal saat pendaftaran",
        description: (error as Error).message,
      });
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
                    type="text"
                    autoComplete="username"
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
                    type="email"
                    autoComplete="email"
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel
                    htmlFor="password"
                    className="font-clashDisplayMedium"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="pr-10 rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB]"
                        {...field}
                      />
                      <PasswordToggle
                        showPassword={showPassword}
                        triggerToggle={triggerToggle}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
                    type="text"
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
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%]"
        >
          Daftar
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
