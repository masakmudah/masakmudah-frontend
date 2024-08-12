import FloatingCard from "@/components/shared/floating-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeRoute() {
  return (
    <div className="font-clashDisplayRegular ">
      <section id="hero-section" className="bg-[#E6FDB0]">
        <Container className="grid grid-cols-2">
          <div className="space-y-16 ">
            <div className="font-clashDisplaySemibold">
              <h1 className="text-5xl">Buat masakan enak dengan</h1>
              <div className="relative max-w-fit">
                <div className="bg-[#C1F17A] absolute top-3 h-10 w-full z-0 rounded-3xl" />
                <h1 className="z-10 relative inset-y-0 text-5xl pr-4">
                  #masakmudah
                </h1>
              </div>
            </div>

            <div className="flex gap-x-4 font-raleway">
              <Link
                className="px-8 py-3 bg-[#FF5D47] text-white rounded-3xl flex gap-x-2 items-center group"
                to="/"
              >
                Cari resep
                <ArrowUp className="rotate-45 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
              <Link
                className="px-8 py-3 bg-[#192322] text-white rounded-3xl flex gap-x-2 items-center group"
                to="/"
              >
                Buat resep
                <ArrowUp className="rotate-45 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            </div>

            <p className="font-raleway">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sed
              cupiditate asperiores consequatur non possimus delectus atque
              natus, quia distinctio aliquid libero, numquam nisi maiores quidem
              sapiente eius dignissimos tempora. Fuga voluptate quia impedit,
              culpa dolorum corrupti nam natus nulla.
            </p>
          </div>
          <div className="relative">
            <img src="/images/chicken-roasted.png" />
            <FloatingCard className="top-0" />
            <FloatingCard className="bottom-0 right-0" />
          </div>
        </Container>
      </section>
      <section className="bg-[#1C2625]">
        <Container className="space-y-20">
          <h1 className="text-[#E6FDB0] text-5xl text-center font-clashDisplaySemibold">
            Resep populer
          </h1>
          <div className="flex justify-center items-center gap-x-10 font-clashDisplayMedium">
            <Button className="px-5 py-3 rounded-3xl bg-[#C1F17A]">
              <h1 className="text-[#1C2625]">Semua masakan</h1>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent">
              <h1 className="text-white">Ayam</h1>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent">
              <h1 className="text-white">Sayuran</h1>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent">
              <h1 className="text-white">Sapi</h1>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent">
              <h1 className="text-white">Seafood</h1>
            </Button>
          </div>
          <div className="flex gap-x-4 font-raleway">
            <div className="bg-[#F7FEE7] w-80 rounded-3xl flex gap-y-8 flex-col items-center py-8">
              <div className="flex flex-col items-center">
                <img
                  src="/images/chicken-roasted.png"
                  className="w-64"
                  alt=""
                />
                <div className="flex flex-col items-center px-8 gap-y-4">
                  <h2 className="text-2xl font-clashDisplaySemibold">
                    Mie ayam
                  </h2>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat, suscipit.
                  </p>
                </div>
              </div>
              <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                15 Menit
              </h1>
            </div>
            <div className="bg-[#F7FEE7] w-80 rounded-3xl flex gap-y-8 flex-col items-center py-8">
              <div className="flex flex-col items-center">
                <img
                  src="/images/chicken-roasted.png"
                  className="w-64"
                  alt=""
                />
                <div className="flex flex-col items-center px-8 gap-y-4">
                  <h2 className="text-2xl font-clashDisplaySemibold">
                    Mie ayam
                  </h2>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat, suscipit.
                  </p>
                </div>
              </div>
              <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                15 Menit
              </h1>
            </div>
            <div className="bg-[#F7FEE7] w-80 rounded-3xl flex gap-y-8 flex-col items-center py-8">
              <div className="flex flex-col items-center">
                <img
                  src="/images/chicken-roasted.png"
                  className="w-64"
                  alt=""
                />
                <div className="flex flex-col items-center px-8 gap-y-4">
                  <h2 className="text-2xl font-clashDisplaySemibold">
                    Mie ayam
                  </h2>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat, suscipit.
                  </p>
                </div>
              </div>
              <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                15 Menit
              </h1>
            </div>
            <div className="bg-[#F7FEE7] w-80 rounded-3xl flex gap-y-8 flex-col items-center py-8">
              <div className="flex flex-col items-center">
                <img
                  src="/images/chicken-roasted.png"
                  className="w-64"
                  alt=""
                />
                <div className="flex flex-col items-center px-8 gap-y-4">
                  <h2 className="text-2xl font-clashDisplaySemibold">
                    Mie ayam
                  </h2>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Placeat, suscipit.
                  </p>
                </div>
              </div>
              <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                15 Menit
              </h1>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#F7FEE7]">
        <Container className="space-y-6">
          <h1 className="text-3xl font-bold">Apa yang banyak disukai</h1>
          <div className="grid grid-cols-3 gap-x-5">
            <div className="bg-[#FF5D47] flex flex-col items-center gap-y-6 rounded-[2.5rem] px-8 pt-8 pb-20 text-white">
              <img
                src="/images/chicken-roasted.png"
                alt="card-image"
                className="object-cover"
              />
              <h1 className="text-2xl">Mi goreng</h1>
              <p className="text-center font-raleway">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, facilis?
              </p>
              <Link
                to="/"
                className="px-8 font-raleway py-5 rounded-[2rem] bg-black"
              >
                Lihat caranya
              </Link>
            </div>
            <div className="flex flex-col justify-center px-4 py-6 bg-[url('/images/kitchen.jpg')] rounded-[2.5rem] bg-center bg-cover h-full items-center text-white relative overflow-hidden ">
              <div className="absolute h-full w-full bg-black/70 z-10" />
              <h1 className="text-3xl z-20">5000+ resep</h1>
              <p className="z-20 text-center font-raleway">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
                aliquam repellendus qui aut autem inventore cupiditate
                distinctio expedita placeat dolorem, accusantium dolores
                necessitatibus sapiente accusamus. Animi corrupti laborum
                debitis optio!
              </p>
            </div>
            <div className="bg-[#1C2625] rounded-[2.5rem] flex flex-col justify-center items-center space-y-8 py-8 px-6">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl">Jus semangka</h1>
                <p>Pembuatan yang mudah</p>
              </div>
              <Link
                to="/"
                className="px-8 font-raleway py-5 rounded-[2rem] bg-[#FF5D47] text-white"
              >
                Lihat caranya
              </Link>
              <img src="/images/juice.png" className="w-80" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
