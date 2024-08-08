import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditProfileRoute() {
  return (
    <main className="flex justify-center">
      <div className="mt-10">
        <div>
          <h1 className="font-bold text-3xl text-center">Edit Profile</h1>
        </div>
        <div className="mt-4">
          <form method="post">
            <div>
              <label className="flex flex-col justify-center border-gray-400 cursor-pointer">
                <div className="flex flex-col items-center pt-7">
                  <img
                    src="/images/profile-user-alpha.png"
                    alt="Profile User Alpha"
                    className="w-20 h-20"
                  />
                  <p className="text-gray-400">Ganti Foto</p>
                </div>
                <Input type="file" className="opacity-0 cursor-pointer" />
              </label>
            </div>

            <div>
              <label htmlFor="name">Nama</label>
              <Input id="name" type="text" placeholder="Nama" />
            </div>
            <div className="mt-4">
              <label htmlFor="username">Nama Pengguna</label>
              <Input id="username" type="text" placeholder="Nama Pengguna" />
            </div>
            <div className="mt-4">
              <label htmlFor="bio">Bio</label>
              <Input
                id="bio"
                type="bio"
                placeholder="Informasi tentang dirimu, minat, atau pesan tertentu yang ingin anda sampaikan kepada pengikut anda"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="gender">Jenis Kelamin</label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="- Pilihan -" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pria">pria</SelectItem>
                  <SelectItem value="wanita">wanita</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <label htmlFor="website">Website</label>
              <Input id="website" type="website" placeholder="Link website" />
            </div>

            <div>
              <Button asChild className="w-44 h-16 bg-orange-500 mt-10">
                <a href="/dashboard" className="">
                  <p className="text-2xl font-bold">Simpan</p>
                </a>
              </Button>
              <Button asChild className="w-44 h-16 bg-green-500 ml-10">
                <a href="/dashboard" className="">
                  <p className="text-xl font-bold">Cancel</p>
                </a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
