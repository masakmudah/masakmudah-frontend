import { navigationMenu } from "@/constant/navigation-menu";
import { Link } from "react-router-dom";

import Container from "../ui/container";
import { useAuth } from "@/context/auth-provider";
import ProfileImage from "../header/profile-image";
import { SideMenu } from "../header/side-menu";
import { SearchInput } from "../header/search-input";
import { Logo } from "../header/logo";

export function Header() {
  const { token } = useAuth();

  return (
    <header className="bg-[#E6FDB0] shadow-sm w-full">
      <Container className="w-full py-4">
        <div className="grid grid-cols-6 place-items-center ">
          {/* Left Side */}
          <div
            id="left-side"
            className="flex items-center gap-1 col-span-1  xs:max-2xl:w-full w-full"
          >
            {/* LOGO LEFT*/}
            <Link to="/" className="hidden md:flex sm:gap-2">
              <Logo />
            </Link>

            {/* SIDE MENU */}
            <div className="md:hidden ">
              <SideMenu />
            </div>
            {/* LOGO RIGHT*/}
            <Link to="/" className="md:hidden hidden xs:max-md:flex gap-2">
              <Logo />
            </Link>
          </div>

          {/* Center Side */}
          <ul
            id="center-side"
            className="hidden md:flex items-center justify-start gap-10 col-span-2 md:max-lg:ml-10 w-full"
          >
            {navigationMenu.map((menu) => (
              <Link key={menu.href} to={menu.href}>
                <li className="text-sm md:text-base font-clashDisplayMedium">
                  {menu.label}
                </li>
              </Link>
            ))}
          </ul>

          {/* Right Side */}
          <div
            id="right-side"
            className="flex items-center justify-end gap-4 col-span-5 md:col-span-3 w-full "
          >
            <div className="w-[80%] flex items-end justify-end">
              <SearchInput />
            </div>
            {token ? (
              <div className="md:w-[20%]  flex items-end justify-end">
                <ProfileImage />
              </div>
            ) : (
              <div className="md:w-[20%]  flex items-end justify-end">
                <Link
                  to="/login"
                  className="px-4 md:px-8 py-2 md:py-2 bg-[#FF5D47] rounded-3xl font-raleway text-white text-sm md:text-base"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
