import RegisterForm from "@/components/shared/register-form";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";

export function RegisterRoute() {
  return (
    <div className="h-screen bg-[#1C2625] w-full">
      <Container className="flex justify-center items-center h-full">
        <div className="bg-gradient-to-b from-[#e2ff8a] from-[-180%] to-[#FEFEFE] rounded-[2rem] px-16 py-24 flex justify-center flex-col items-center gap-y-4">
          <div className="bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-2xl px-2 py-2">
            <img src="/images/login-icon.svg" alt="login-icon" />
          </div>
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-clashDisplayMedium text-xl">
              Daftar dengan email
            </h1>
            <p className="text-center text-[#8E8E93] font-raleway text-sm">
              Simpan resep dan bagikan resep dengan mudah
            </p>
          </div>
          <RegisterForm />
          <p className="font-raleway text-xs text-slate-500 ">
            Sudah memiliki akun?{" "}
            <span className="underline">
              <Link to="/login">Login disini</Link>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
