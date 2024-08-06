import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function RegisterRoute() {
  useEffect(() => {
    document.title = "Daftar Masakmudah";
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">Daftar akun baru </h1>
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
    </div>
  );
}
