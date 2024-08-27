import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function DashboardRoute() {
  return (
    <div className="">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10  rounded-lg gap-5 text-black">
        <section className="flex justify-start gap-10">
          <Link to="/dashboard">
            <Avatar className="w-32 h-32">
              <img
                src="/images/profile-user-alpha.png"
                alt="Profile User Alpha"
              />
            </Avatar>
          </Link>

          <div className="justify-center items-start flex flex-col">
            <Link to="/dashboard">
              <p className="hover:text-blue-800">@username_user</p>
            </Link>
            <h1>fullname_user</h1>
          </div>
          {/* <div className="">
            <div className="mt- flex">
              <p>This is my bio</p>
            </div>
          </div> */}

          {/* <div className="ml-4 mt-2">
            <Button asChild className="mt-4">
              <a href="/editprofile">Edit Profile</a>
            </Button>
          </div> */}
        </section>

        {/* <div className="mt-4">
          <Button>Aktifitas</Button>
          <Button className="ml-4">Resepku</Button>
        </div> */}
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
