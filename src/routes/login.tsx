import LoginForm from "@/components/shared/login-form";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";

export function LoginRoute() {
  return (
    <div className="h-screen bg-[#1C2625] w-full">
      <Container className="flex justify-center items-center h-full">
        <div className="bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] rounded-[2rem] px-16 py-24 flex justify-center flex-col items-center gap-y-4">
          <div className="bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-2xl px-2 py-2">
            <img src="/images/login-icon.svg" alt="login-icon" />
          </div>
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-clashDisplayMedium text-xl">
              Masuk dengan email
            </h1>
            <p className="text-center text-[#8E8E93] font-raleway text-sm">
              Simpan resep dan bagikan resep dengan mudah
            </p>
          </div>
          <LoginForm />
          <p className="font-raleway text-xs text-slate-500 ">
            Belum punya akun?{" "}
            <span className="underline">
              <Link to="/register">Daftar disini</Link>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
