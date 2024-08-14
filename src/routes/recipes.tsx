import Container from "@/components/ui/container";

import { useEffect } from "react";

export function RecipesRoute() {
  useEffect(() => {
    document.title = "${user.name} - Masakmudah";
  }, []);
  return (
    <Container className="w-full space-y-12">
      <h1 className="text-3xl font-clashDisplaySemibold">All Recipes</h1>
      <div className="space-y-24">
        <div className="bg-[#1C2625] rounded-3xl px-4 py-2 h-80 flex gap-x-4">
          <img
            src="/images/chicken-roasted.png"
            alt="food"
            className="object-cover w-64"
          />
          <div className="flex flex-col justify-between py-10 font-raleway text-white">
            <div className="space-y-3  ">
              <h1 className="text-2xl font-clashDisplayMedium">
                Sate Maranggi Purwakarta
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                rem sequi delectus ipsum ipsam id tempore praesentium sapiente
                sit labore itaque corporis, in assumenda repellendus at
                laboriosam necessitatibus quos. Doloribus?
              </p>
            </div>
            <section className="space-y-2">
              <h3 className="font-clashDisplayMedium">Author:</h3>
              <div className="flex gap-x-4 items-center">
                <img
                  src="/path/to/author-image.jpg"
                  alt="Novia Filas"
                  className="w-12 h-12 rounded-full"
                />
                <div className="space-y-1">
                  <h4 className="font-clashDisplayMedium">Novia Filas</h4>
                  <p className="text-slate-400 font-raleway">
                    Memasak adalah koentji
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
