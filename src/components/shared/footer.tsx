import { Link } from "react-router-dom";
import Container from "../ui/container";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-[#1C2625] text-[#fafbff] text-base font-clashDisplayReguler">
      <Container className="flex flex-col md:flex-row p-10 gap-10">
        <div className="space-y-2 justify-center items-center">
          <Link to="/" className="hover:text-[#b54232]">
            <h1 className="text-3xl md:text-xl font-clashDisplaySemibold">
              Masakmudah
            </h1>
          </Link>
          <p className="text-lg">
            Temukan berbagai resep dan buat masakan dengan mudah hanya di
            Masakmudah
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-clashDisplaySemibold">Sitemap</h3>
            <div className="flex flex-col">
              <Link to="/" className="hover:text-[#b54232]">
                Beranda
              </Link>
              <Link to="/recipes" className="hover:text-[#b54232]">
                Semua Resep
              </Link>
              <Link to="/about" className="hover:text-[#b54232]">
                Tentang
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-clashDisplaySemibold">Bantuan</h3>
            <div className="flex flex-col">
              <Link to="">
                {/* TO DO: Fix this */}
                Kontak
              </Link>
              <Link to="">
                {/* TO DO: Fix this */}
                Laporkan
              </Link>
              <Link to="/about" className="hover:text-[#b54232]">
                Tentang
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-clashDisplaySemibold">Sosial Media</h3>
            <div className="flex flex-col space-y-2">
              {/* TO DO: Fix this */}
              <div className="flex gap-2">
                <FaSquareFacebook
                  size={25}
                  title="Link Facebook Masakmudah.com"
                />
                <h4>Facebook</h4>
              </div>
              {/* TO DO: Fix this */}
              <div className="flex gap-2">
                <FaSquareXTwitter
                  size={25}
                  title="Link Twitter/X Masakmudah.com"
                />
                <h4>Twitter</h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
