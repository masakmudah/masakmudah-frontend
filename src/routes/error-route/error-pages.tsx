import { ArrowLeft } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="bg-gradient-to-b from-[#e2ff8a] from-[-100%] to-[#FEFEFE] flex items-center justify-center text-center text-xl md:text-5xl font-clashDisplayMedium h-screen flex-col gap-y-4 md:gap-y-8 w-full">
      <div className="flex gap-2">
        <img
          src="/images/masakmudah-logo-2.png"
          alt="Logo Masakmudah.com"
          className="md:w-40 md:h-40 w-24 h-24"
        />
        <div className="flex flex-col justify-center items-left text-left -space-y-2">
          <p>masak</p>
          <p>mudah</p>
        </div>
      </div>
      <div className="text-xl space-y-4 px-5">
        <h1>Oops!</h1>
        <p className="font-clashDisplayRegular">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i className="text-red-400">{error.statusText || error.message}</i>
        </p>
      </div>
      <Link
        to={"/"}
        className="w-48 rounded-3xl font-clashDisplayMedium bg-gradient-to-b from-white to-[#1C2625] from-[-150%] text-white"
      >
        <div className="flex p-2 md:p-4 justify-center items-center gap-2 text-lg">
          <ArrowLeft />
          <p>Back to Home</p>
        </div>
      </Link>
    </div>
  );
};
