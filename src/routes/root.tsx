import { Button } from "@/components/ui/button";

export function RootRoute() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">
        Welcome to <span className="text-red-500"> masakmudah.com </span>
      </h1>
      <Button asChild className="w-40 h-16 bg-red-500 mt-4">
        <a href="/" className="">
          <img
            src="/images/logo-masakmudah.png"
            alt="logo-masakmudah.png"
            className="h-full object-contain"
          />
        </a>
      </Button>
    </div>
  );
}
