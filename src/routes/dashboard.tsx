import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DashboardRoute() {
  return (
    <main className="flex justify-center">
      <div className="mt-20 ">
        <section className="flex justify-center max-w-5xl">
          <Avatar className="w-32 h-32">
            <img
              src="/images/profile-user-alpha.png"
              alt="Profile User Alpha"
            />
          </Avatar>

          <div className="ml-4 mt-2">
            <div>
              <h1>name_user</h1>
              <a href="">
                <p>@username_user</p>
              </a>
            </div>
            <div className="mt-5 flex">
              <div className="flex">
                <p>(0)</p>
                <p className="ml-1">Mengikuti</p>
              </div>
              <div className="ml-4 flex">
                <p>(0)</p>

                <p className="ml-1">Pengikut</p>
              </div>
            </div>
          </div>

          <div className="ml-4 mt-2">
            <Button asChild className="mt-4">
              <a href="/editprofile">Edit Profile</a>
            </Button>
          </div>
        </section>

        <div className="mt-1">
          <p>This is my bio</p>
        </div>

        <div className="mt-4">
          <Button>Aktifitas</Button>
          <Button className="ml-4">Resepku</Button>
        </div>
        <Separator className="my-4 h-1 bg-gray-400" />

        <section className="text-center">
          <p>Belum punya resep</p>
          <Button asChild className="mt-4">
            <a href="/recipe/new">Tambah resep baru</a>
          </Button>
        </section>
      </div>
    </main>
  );
}
