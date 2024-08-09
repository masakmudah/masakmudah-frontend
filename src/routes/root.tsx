import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
