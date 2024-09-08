import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-provider";
import { editUserSchema, EditUserSchema } from "@/schemas/edit-profile";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useLoaderData } from "react-router-dom";

interface EditProfileProps {
  user: User;
}

export async function loader(username: string) {
  try {
    const userResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    );
    const users = await userResponse.json();
    const user = users.data;

    return { user };
  } catch (error) {
    console.log(error);
  }
}

export function EditProfileRoute() {
  const { token } = useAuth();
  const { user } = useLoaderData() as EditProfileProps;

  const form = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user.username || "",
      fullname: user.fullname || "",
      email: user.email || "",
      imageURL: user.imageURL || "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: EditUserSchema) => {
    console.log(data);
  };

  const trimSpace =
    (field: any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const space = e.target.value;
      if (space.startsWith(" ")) {
        return;
      }

      const multipleSpace = space.replace(/\s{2,}/g, " ");

      field.onChange(space, multipleSpace);
    };

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex justify-center bg-[#495151] font-clashDisplayRegular min-h-dvh">
      <div className="mt-10 max-w-7xl">
        <div>
          <h1 className="font-bold text-3xl text-center">Edit Profile</h1>
        </div>
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="flex flex-col justify-center border-gray-400 cursor-pointer">
                  <div className="flex flex-col items-center pt-7">
                    <img
                      src={user.imageURL}
                      alt={user.username}
                      className="w-20 h-20"
                    />
                    <p className="text-gray-400">Ganti Foto</p>
                  </div>
                  <Input type="file" className="opacity-0 cursor-pointer" />
                </label>
              </div>

              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="username"
                      className="text-white text-lg "
                    >
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Username"
                        type="text"
                        className="w-full border rounded-md p-2 capitalize autocomplete"
                        {...field}
                        onChange={trimSpace(field)}
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="fullname"
                      className="text-white text-lg "
                    >
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="fullname"
                        placeholder="Nama Lengkap"
                        type="text"
                        className="w-full border rounded-md p-2 capitalize autocomplete"
                        {...field}
                        onChange={trimSpace(field)}
                        autoComplete="fullname"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-white text-lg ">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="text"
                        className="w-full border rounded-md p-2 autocomplete"
                        {...field}
                        onChange={trimSpace(field)}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white hover:bg-green-700"
                >
                  Simpan
                </Button>
                <Button
                  asChild
                  className="w-full py-3 bg-red-600 text-white hover:bg-red-700"
                >
                  <a href="/dashboard" className="">
                    <p className="text-2xl font-bold"> Cancel</p>
                  </a>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
