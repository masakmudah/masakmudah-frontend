import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function LoginRoute() {
  useEffect(() => {
    document.title = "Masakmudah - Masuk atau Daftar";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">
        Masuk <span className="text-orange-500 stroke-2"> Masakmudah </span>
      </h1>
      <div>
        <Button asChild className="w-44 h-16 bg-orange-500 mt-10">
          <a href="/" className="">
            <p className="text-2xl font-bold">Masuk</p>
          </a>
        </Button>
        <Button asChild className="w-44 h-16 bg-green-500 ml-10">
          <a href="/register" className="">
            <p className="text-xl font-bold">Buat akun baru</p>
          </a>
        </Button>
      </div>
    </div>
  );
}
