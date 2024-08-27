import { loginSchema } from "@/libs/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordToggle } from "./password-toggle";
import { useAuth } from "@/context/auth-provider";
import { useToast } from "../ui/use-toast";
import { login } from "@/api/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useAuth();
  const { toast } = useToast();

  const triggerToggle = () => {
    setShowPassword((prevState) => !prevState);
  };
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { token } = await login(values);

      console.log("Ini adalah token dari login-form", token);

      setToken(token);
      navigate("/");
    } catch (error) {
      console.error("Error saat melakukan login:", error);
      toast({
        className:
          "bg-red-500 text-white rounded-3xl font-clashDisplayRegular border-0",
        title: "Gagal saat melakukan login",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-5">
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
                    autoComplete="off"
                    placeholder="john.doe"
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
        </div>
        <Button className="w-full rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%]">
          Masuk
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
