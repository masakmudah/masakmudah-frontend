import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export function RegisterRoute() {
  useEffect(() => {
    document.title = "Daftar Masakmudah";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="ml-10">
        <h1 className="text-5xl font-bold">Daftar akun baru </h1>
        <div className="mt-10">
          <form method="post">
            <div>
              <label htmlFor="username">Nama Pengguna</label>
              <Input id="username" type="text" placeholder="Nama Pengguna" />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Kata sandi</label>
              <Input id="password" type="password" placeholder="Kata sandi" />
            </div>
            <div className="mt-4">
              <label htmlFor="re-password">Ulangi Kata sandi</label>
              <Input
                id="re-password"
                type="password"
                placeholder="Ketik ulang kata sandi"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="Email" />
            </div>
            <div className="mt-4">
              <label htmlFor="re-email">Ulangi Email</label>
              <Input
                id="re-email"
                type="email"
                placeholder="Ketik ulang email"
              />
            </div>
            <div>
              <Button asChild className="w-44 h-16 bg-orange-500 mt-10">
                <a href="/" className="">
                  <p className="text-2xl font-bold">Daftar</p>
                </a>
              </Button>
              <Button asChild className="w-44 h-16 bg-green-500 ml-10">
                <a href="/login" className="">
                  <p className="text-xl font-bold">Kembali ke login</p>
                </a>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
