import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const UserNotFound = () => {
  return (
    <div className="bg-gradient-to-b from-[#e2ff8a] from-[-100%] to-[#FEFEFE] flex items-center justify-center text-xl md:text-4xl h-screen flex-col gap-y-4 md:gap-y-8 w-full">
      <p>Pengguna tidak ditemukan</p>
      <Link
        to={"/"}
        className="w-48 md:w-72 rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%] text-white"
      >
        <div className="flex p-2 md:p-4 justify-center items-center gap-2">
          <ArrowLeft />
          <p>Kembali</p>
        </div>
      </Link>
    </div>
  );
};
