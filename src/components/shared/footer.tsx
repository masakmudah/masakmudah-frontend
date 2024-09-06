import { Link } from "react-router-dom";
import Container from "../ui/container";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-[#1C2625] text-[#fafbff] text-base font-clashDisplayReguler">
      <Container className="flex flex-col md:flex-row p-10 gap-10 justify-between w-full">
        <div className="space-y-2 justify-center items-center ">
          <Link
            to="/"
            className="hover:text-[#b54232] flex gap-x-2 items-center"
          >
            <img
              src="/images/masakmudah-logo-2.png"
              alt=""
              className="w-16 h-16"
            />
            <div className="-space-y-2">
              <p className="text-3xl md:text-xl font-clashDisplaySemibold text-white/90">
                masak
              </p>
              <p className="text-3xl md:text-xl font-clashDisplaySemibold text-white/90">
                mudah
              </p>
            </div>
          </Link>
          <p className="text-base font-raleway">
            Temukan berbagai resep dan buat masakan dengan mudah hanya di
            Masakmudah
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 font-raleway">
          <div className="space-y-6">
            <h3 className="text-lg font-clashDisplayMedium tracking-wide">
              Sitemap
            </h3>
            <div className="flex flex-col gap-y-2 text-base">
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
          <div className="space-y-6">
            <h3 className="text-lg font-clashDisplayMedium tracking-wide">
              Bantuan
            </h3>
            <div className="flex flex-col gap-y-2">
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
          <div className="space-y-6">
            <h3 className="text-lg font-clashDisplayMedium tracking-wide ">
              Sosial Media
            </h3>
            <div className="flex flex-col gap-y-2">
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
