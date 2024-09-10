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
import { toast } from "../ui/use-toast";
import { useAuth } from "@/context/auth-provider";
import { updateUserSchema, UpdateUserSchema } from "@/schemas/edit-profile";
import { updateUser } from "@/api/update-user";

interface UpdateUserProps {
  onUpdateSuccess: () => void;
}

const UpdateUserForm = ({ onUpdateSuccess }: UpdateUserProps) => {
  const { token, user } = useAuth();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: user?.fullname || "",
    },
  });

  const onSubmit = async (values: UpdateUserSchema) => {
    console.log(values);
    try {
      const formatValues = {
        ...values,
      };

      console.log(formatValues);
      await updateUser(user!.id, formatValues.fullname, token!);
      toast({
        className:
          "bg-green-500 text-white rounded-3xl font-clashDisplayRegular border-0",
        title: "Update Berhasil",
        description: "Data anda berhasil diperbarui.",
      });
      onUpdateSuccess();
    } catch (error) {
      toast({
        className:
          "bg-red-500 text-white rounded-3xl font-clashDisplayRegular border-0",
        title: "Gagal saat pembaruan",
        description: (error as Error).message,
      });
      console.error("Error saat memperbarui:", error);
    }
  };

  function handleReplaceSpace(field: any) {
    return (f: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = f.target.value
        .replace(/\s+/g, " ")
        .split(" ")
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
        .join(" ");
      field.onChange(inputValue);
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-clashDisplayMedium">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB] capitalize"
                    {...field}
                    onChange={handleReplaceSpace(field)}
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
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
