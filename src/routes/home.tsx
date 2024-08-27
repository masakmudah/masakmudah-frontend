import { getRecipes } from "@/api/recipe";
import FloatingCard from "@/components/shared/floating-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Recipe } from "@/types/recipe";
import { ArrowUp } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const data = await getRecipes();
  const recipes = data.data;

  return { recipes };
}

export function HomeRoute() {
  const { recipes } = useLoaderData() as { recipes: Recipe[] };

  return (
    <div className="font-clashDisplayRegular bg-">
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
                to="/recipes"
              >
                Cari resep
                <ArrowUp className="rotate-45 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
              <Link
                className="px-8 py-3 bg-[#192322] text-white rounded-3xl flex gap-x-2 items-center group"
                to="/recipes/new"
              >
                Buat resep
                <ArrowUp className="rotate-45 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            </div>

            <p className="font-raleway">
              Selamat datang di situs kami! Di sini, Anda bisa menemukan
              berbagai resep makanan yang tidak hanya lezat, tetapi juga mudah
              untuk dibuat. Apakah Anda sedang mencari inspirasi untuk masakan
              sehari-hari atau ingin mencoba hidangan istimewa untuk acara
              tertentu? Kami punya semuanya! Bergabunglah dengan komunitas kami
              dan eksplorasi berbagai resep yang akan memanjakan lidah Anda.
              Mari kita masak bersama dan ciptakan momen-momen spesial di dapur!
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
            <Button className="px-5 py-3 rounded-3xl bg-[#C1F17A] hover:bg-transparent">
              <h1 className="text-[#1C2625]">Semua masakan</h1>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent hover:bg-transparent">
              <Link to="/recipes?search=ayam">Ayam</Link>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent hover:bg-transparent">
              <Link to="/recipes?search=sayuran">Sayuran</Link>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent hover:bg-transparent">
              <Link to="/recipes?search=sapi">Sapi</Link>
            </Button>
            <Button className="px-5 py-3 rounded-3xl bg-transparent hover:bg-transparent">
              <Link to="/recipes?search=seafood">Seafood</Link>
            </Button>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={24}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="grid grid-cols-4"
          >
            {recipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <Link
                  to={`/recipes/${recipe.slug}`}
                  className="bg-[#F7FEE7] rounded-3xl flex flex-col gap-y-8 items-center py-8 h-full hover:scale-[.994] transition-transform duration-300 active:scale-[.98]"
                >
                  <div className="flex flex-col items-center gap-y-8 flex-grow">
                    <img
                      src={recipe.imageURL}
                      className="w-56 h-56 object-cover rounded-xl"
                      alt={recipe.name}
                    />
                    <div className="flex flex-col items-center px-8 gap-y-4 ">
                      <h2 className="text-2xl font-clashDisplaySemibold">
                        {recipe.name}
                      </h2>
                      <p className="text-center">{recipe.description}</p>
                    </div>
                  </div>
                  <h1 className="text-2xl text-[#FF5D47] font-clashDisplayMedium">
                    {recipe.cookingTime}
                  </h1>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
      <section className="bg-[#F7FEE7]">
        <Container className="space-y-16">
          <h1 className="text-4xl font-clashDisplaySemibold text-center">
            Apa yang banyak disukai
          </h1>
          <div className="grid grid-cols-3 gap-x-5">
            <div className="bg-[#FF5D47] flex flex-col items-center gap-y-6 rounded-[2.5rem] px-8 pt-8 pb-20 text-white">
              <img
                src="/images/chicken-roasted.png"
                alt="card-image"
                className="object-cover"
              />
              <h1 className="text-2xl">Ayam Bakar Paprika</h1>
              <p className="text-center font-raleway">
                Ayam bakar yang juicy dengan bumbu paprika yang pedas dan
                aromatik.
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
                Temukan berbagai resep lezat yang mudah diikuti, mulai dari
                masakan sehari-hari hingga hidangan istimewa untuk acara
                spesial. Dapatkan inspirasi untuk memasak dan nikmati pengalaman
                kuliner yang tak terlupakan!
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
