import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Outlet, useLocation } from "react-router-dom";

export function RootRoute() {
  const location = useLocation();
  const notRoutes = ["/login", "/register"];

  return (
    <>
      {!notRoutes.includes(location.pathname) && <Header />}
      <main className="flex flex-col min-h-screen bg-[#FDFFF7]">
        <Outlet />
      </main>
      {!notRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}
