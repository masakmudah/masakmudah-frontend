import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ImageUp } from "lucide-react";

export function NewRecipeRoute() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl px-4">
        <div className="flex justify-between items-center mb-4">
          <Button asChild>
            <a href="/dashboard" className="flex items-center">
              <ArrowLeft />
              <p className="ml-2">Kembali</p>
            </a>
          </Button>
          <Button asChild>
            <a href="/recipe">
              <p>Simpan</p>
            </a>
          </Button>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-bold">Tambah resep baru</h1>
          <form action="post" className="mt-4">
            <div>
              <label className="flex flex-col justify-center w-full h-32 border-2 border-gray-400 cursor-pointer">
                <div className="flex flex-col items-center pt-7">
                  <ImageUp />
                  <p className="text-gray-400">Tambahkan foto resep</p>
                </div>
                <Input type="file" className="opacity-0 cursor-pointer" />
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="servings">Porsi</label>
              <Input id="servings" type="servings" placeholder="2 orang" />
            </div>

            <div className="mt-4">
              <label htmlFor="cook-time">Lama memasak</label>
              <Input
                id="cook-time"
                type="cook-time"
                placeholder="1 jam 30 menit"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="title-recipe">Judul resep</label>
              <Input
                id="title-recipe"
                type="title-recipe"
                placeholder="Judul resep masakan anda"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="ingredients">Bahan-bahan masakan</label>
              <Input
                id="ingredients"
                type="ingredients"
                placeholder="Bahan pertama"
              />
              <Input
                id="ingredients"
                type="ingredients"
                placeholder="Bahan kedua"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="instructions">Cara memasak</label>
              <Input
                id="instructions"
                type="instructions"
                placeholder="Langkah pertama"
              />
              <Input
                id="ingredients"
                type="ingredients"
                placeholder="Langkah kedua"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
