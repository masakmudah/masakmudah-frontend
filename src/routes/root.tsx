import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Outlet, useLocation } from "react-router-dom";

export function RootRoute() {
  const location = useLocation();
  const notRoutes = ["/login", "/register"];

  return (
    <>
      {!notRoutes.includes(location.pathname) && <Header />}
      <main className="flex min-h-screen flex-col bg-[#E6FDB0] p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="container mx-auto flex-1">
          <Outlet />
        </div>
      </main>
      {!notRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}
