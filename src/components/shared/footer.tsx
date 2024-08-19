import { Link } from "react-router-dom";
import Container from "../ui/container";

export const Footer = () => {
  return (
    <footer className=" bg-[#1C2625] text-white font-raleway">
      <Container className="flex justify-between">
        <div className="space-y-2 max-w-xl">
          <h1 className="text-2xl font-clashDisplaySemibold">Masakmudah</h1>
          <p>
            Temukan berbagai resep dan buat masakan dengan mudah hanya di
            Masakmudah
          </p>
        </div>
        <div className="flex gap-x-16">
          <div className="space-y-2">
            <h3 className="font-bold mb-4 font-clashDisplayMedium">Sitemap</h3>
            <Link to="/">Home</Link>
            <p>Semua resep</p>
            <p>Tentang</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-4 font-clashDisplayMedium">Bantuan</h3>
            <p>Kontak</p>
            <p>Lapor resep berbahaya</p>
            <p>Tentang</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold mb-4 font-clashDisplayMedium">
              Sosial media
            </h3>
            <p>Instagram</p>
            <p>TikTok</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
