import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useEffect } from "react";
import { Form } from "react-router-dom";

export function LoginRoute() {
  useEffect(() => {
    document.title = "Masakmudah - Masuk atau Daftar";
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/017/221/436/small_2x/spaghetti-with-vegetables-cooking-in-a-pan-png.png"
          alt="favorite recipe"
        />
      </div>
      <div className="ml-10">
        <h1 className="text-5xl font-bold mb-10">
          Masuk <span className="text-orange-500 stroke-2"> Masakmudah </span>
        </h1>
        <div>
          <Form method="post">
            <div>
              <label htmlFor="username">Username</label>
              <Input id="username" type="text" placeholder="Username" />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Kata sandi</label>
              <Input id="password" type="password" placeholder="Kata Sandi" />
            </div>
            <div className="mt-4">
              <Button asChild className="w-full h-10 bg-orange-500">
                <a href="/" className="">
                  <p className="text-2xl font-bold">Masuk</p>
                </a>
              </Button>
            </div>

            <Separator className="my-4" />
            <div className="flex justify-center">
              <Button asChild className="w-44 h-10 bg-green-500">
                <a href="/register" className="">
                  <p className="text-xl font-bold">Buat akun baru</p>
                </a>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
