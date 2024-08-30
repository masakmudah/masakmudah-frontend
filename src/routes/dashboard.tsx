import { getUser } from "@/api/get-user";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";
import { Navigate, redirect, useLoaderData } from "react-router-dom";

export async function loader(): Promise<User> {
  const username = localStorage.getItem("username");
  if (!username) {
    throw redirect("/login");
  }
  try {
    const response = await getUser(username);
    return response.data;
  } catch (error) {
    console.error("Error loading user data:", error);
    throw redirect("/login");
  }
}

export function DashboardRoute() {
  const user = useLoaderData() as User;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10  rounded-lg gap-5 text-black">
        <section className="flex justify-start gap-10">
          <Avatar className="w-32 h-32">
            <img
              src={user.imageURL || "/images/profile-user-alpha.png"} // Display user's avatar if available
              alt={user.fullname || "Profile User"} // Use user's full name for alt text if available
            />
          </Avatar>

          <div className="justify-center items-start flex flex-col">
            <p className="hover:text-blue-800">@{user.username}</p>
            <h1>{user.fullname || "Fullname"}</h1>
          </div>
        </section>

        <Separator className="h-1 bg-gray-400" />

        <section className="text-center">
          <p>Belum punya resep</p>
          <Button asChild className="mt-4">
            <a href="/recipes/new">Tambah resep baru</a>
          </Button>
        </section>
      </div>
    </div>
  );
}
