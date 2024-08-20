import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

export function RootRoute() {
  const location = useLocation();
  const notRoutes = ["/login", "/register"];

  return (
    <div className="flex-grow bg-[#FDFFF7]">
      {!notRoutes.includes(location.pathname) && (
        <div>
          <Header />
          <Separator className="h-[1px] bg-[#1C2625]" />
        </div>
      )}

      <main className="flex flex-col min-h-screen bg-[#FDFFF7]">
        <ScrollRestoration />
        <Outlet />
      </main>

      {!notRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
