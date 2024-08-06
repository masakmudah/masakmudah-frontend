import { Button } from "@/components/ui/button";

export function HomeRoute() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">
        Welcome to <span className="text-orange-500"> masakmudah.com </span>
      </h1>
      <Button
        asChild
        className="w-40 h-16 hover:bg-orange-500 bg-gray-800 mt-16"
      >
        <a href="/" className="">
          {" "}
          <p className="text-4xl font-bold">Cari</p>
          <img
            src="/images/logo-masakmudah.png"
            alt="logo-masakmudah.png"
            className="h-full object-contain ml-2"
          />
        </a>
      </Button>
      <div>
        <Button asChild className="w-44 h-16 bg-orange-500 mt-10">
          <a href="/login" className="">
            <p className="text-2xl font-bold">Masuk</p>
          </a>
        </Button>
        <Button asChild className="w-44 h-16 bg-green-500 ml-10">
          <a href="/register" className="">
            <p className="text-xl font-bold">Daftar</p>
          </a>
        </Button>
      </div>
    </div>
  );
}
