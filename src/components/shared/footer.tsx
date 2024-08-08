import { FaInstagram, FaTiktok } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="flex p-5 bg-secondary ">
      <div className="w-4/4">
        <h1 className="font-bold">Masakmudah</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          voluptatum maiores molestias iusto blanditiis pariatur cumque tempore
          ducimus, dolores ullam labore velit fugiat aliquid sit quisquam
          voluptatibus corporis eligendi. Fugiat.
        </p>
      </div>
      <div className="w-1/4">
        <h1 className="font-bold">Sitemap</h1>
        <a href="/" className="flex">
          Beranda
        </a>
        <a href="/recipes" className="flex">
          Semua Resep
        </a>
        <a href="/about" className="flex">
          Tentang Kami
        </a>
      </div>
      <div className="w-1/4">
        <h1 className="font-bold">Bantuan</h1>
        <a href="/contact" className="flex">
          Hubungi kami
        </a>
        <a href="/report" className="flex">
          Lapor resep berbahaya
        </a>
        <a href="/faq" className="flex">
          FAQ
        </a>
      </div>
      <div className="w-1/4">
        <h1 className="font-bold">Sosial Media</h1>
        <div>
          <a href="" className="flex">
            <FaInstagram className=" mr-1" />
            <p>Instagram</p>
          </a>
        </div>
        <div>
          <a href="" className="flex">
            <FaTiktok className=" mr-1" />
            Tiktok
          </a>
        </div>
      </div>
    </footer>
  );
}
