import Container from "../ui/container";

export const Footer = () => {
  return (
    <footer className=" bg-[#1C2625] text-white font-raleway">
      <Container className="flex justify-between">
        <div className="space-y-2 max-w-xl">
          <h1 className="text-2xl font-clashDisplaySemibold">Masakmudah</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi quis
            quia ullam veniam aperiam error odio velit accusamus necessitatibus
            quod!
          </p>
        </div>
        <div className="flex gap-x-16">
          <div className="space-y-2">
            <h3 className="font-bold mb-4 font-clashDisplayMedium">Sitemap</h3>
            <p>Home</p>
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
