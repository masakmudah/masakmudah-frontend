import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useAuth } from "@/context/auth-provider";
import { updateUserSchema, UpdateUserSchema } from "@/schemas/edit-profile";
import { updateUser } from "@/api/update-user";
import { Textarea } from "../ui/textarea";

interface UpdateUserProps {
  onUpdateSuccess: () => void;
}

const UpdateUserForm = ({ onUpdateSuccess }: UpdateUserProps) => {
  const { token, user } = useAuth();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      description: user?.description || "",
    },
  });

  const { handleSubmit, control, formState } = form;

  const onSubmit = async (values: UpdateUserSchema) => {
    try {
      await updateUser(user!.id, values, token!);
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

  // Remove space
  function handleTrimSpace(field: any) {
    return (f: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = f.target.value.trim();
      field.onChange(inputValue);
    };
  }

  // Replace multiple space and capitalize
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  flex flex-col md:flex-row justify-between items-center mt-4 p-2"
      >
        <div className="space-y-2 w-full">
          {/* Fullname */}
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
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
          {/* Bio */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Ceritakan tentang dirimu"
                    className="resize-none rounded-xl font-raleway bg-[#F7F7F7] focus-visible:ring-0 focus-visible:ring-offset-0 border-[#B9BCBB] capitalize"
                    {...field}
                    onChange={handleTrimSpace(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <Button
              disabled={formState.isSubmitting}
              className={`${
                !formState.isDirty ? "hidden" : ""
              } rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%] w-full`}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
