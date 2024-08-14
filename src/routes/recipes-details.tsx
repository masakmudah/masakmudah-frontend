import Container from "@/components/ui/container";
import { socialMediaIcons } from "@/constant/navigation-menu";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function RecipesDetails() {
  useEffect(() => {
    document.title = "${user.name} - Masakmudah";
  }, []);
  return (
    <div className="bg-[#FDFFF7]">
      <Container className="flex w-full gap-x-12">
        <main className="space-y-8 min-w-96">
          <img
            src="/images/chicken-roasted.png"
            alt="Rendang Sapi"
            className="w-96"
          />
          <section className="space-y-8">
            <h2 className="font-clashDisplaySemibold text-3xl">Bahan-bahan</h2>
            <ul className="space-y-2 font-raleway font-medium">
              <li className="flex justify-between items-center">
                <span>Daging sapi</span>
                <span>1kg</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Santan</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Bawang merah</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Bawang putih</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Jahe</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Lengkuas</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Serai</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Cabai</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Garam</span>
                <span></span>
              </li>
              <li className="flex justify-between items-center">
                <span>Gula merah</span>
                <span></span>
              </li>
            </ul>
          </section>
        </main>
        <aside className="space-y-8 font-clashDisplayRegular w-full">
          <h1 className="text-3xl font-clashDisplaySemibold">Rendang Sapi</h1>
          <div className="space-y-12">
            <section className="space-y-4">
              <h3>Bagikan resep :</h3>
              <nav className="flex items-center gap-x-4">
                {socialMediaIcons.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-full w-12 h-12 bg-transparent border border-[#616A4A] flex items-center justify-center"
                    aria-label={`Share on ${item.href}`}
                  >
                    <img src={item.icon} alt="" />
                  </Link>
                ))}
              </nav>
            </section>
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
            <hr className="h-0.5 bg-black my-4 w-full" />
          </div>
          <h1 className="font-clashDisplayMedium text-2xl">Instruksi</h1>
          <div className="space-y-2 font-raleway">
            <p>1. Cuci daging sapi dan potong menjadi ukuran sedang.</p>
            <p>2. Rebus daging dengan air hingga empuk.</p>
            <p>
              3. Haluskan bawang merah, bawang putih, jahe, lengkuas, dan cabai.
            </p>
            <p>4. Tumis bumbu halus hingga harum.</p>
            <p>5. Masukkan daging yang sudah direbus ke dalam tumisan bumbu.</p>
            <p>6. Tambahkan santan, garam, dan gula merah, aduk rata.</p>
            <p>
              7. Masak dengan api kecil hingga kuah mengental dan daging meresap
              bumbu.
            </p>
            <p>8. Sajikan rendang sapi dengan nasi hangat.</p>
          </div>
        </aside>
      </Container>
    </div>
  );
}
