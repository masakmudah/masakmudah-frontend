import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky p-2 top-0 flex items-center gap-4 border-b bg-background px-4 md:px-6">
      <h1>
        <a href="/">Masakmudah</a>
      </h1>
      <nav className="flex justify-center text-center ml-auto ">
        <ul className="flex gap-6 items-center">
          <li>
            <a href="/recipes">Resep</a>
          </li>
          <li>
            <a href="/">Tips&Tricks</a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center ml-auto">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>

      <div className="flex ml-auto gap-3 justify-center items-center">
        <div>
          <a href="/dashboard">My Profile</a>
        </div>
        <Button asChild className="w-32 h-9 bg-orange-500">
          <a href="/login" className="">
            <p className="text-2xl font-bold">Masuk</p>
          </a>
        </Button>
        <Button asChild className="w-32 h-9 bg-green-500">
          <a href="/register" className="">
            <p className="text-xl font-bold">Daftar</p>
          </a>
        </Button>
      </div>
    </header>
  );
}
