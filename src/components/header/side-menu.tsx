import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { navigationMenu } from "@/constant/navigation-menu";
import { Link } from "react-router-dom";

export function SideMenu() {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => setOpenDropdown(!openDropdown)}
    >
      <DropdownMenuTrigger
        onClick={() => setOpenDropdown(true)}
        className="flex justify-center items-center mr-4"
      >
        <AlignJustify className="cursor-pointer" /> {/* Icon */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-2xl font-raleway text-lg font-medium min-w-32 border-2 border-black/80 mt-4 ml-8"
        align="end"
      >
        <DropdownMenuItem>
          <Link
            to="/"
            className=" flex gap-2"
            onClick={() => setOpenDropdown(false)}
          >
            <img
              src="/images/masakmudah-logo-2.png"
              alt="Logo Masakmudah.com"
              className="w-9 h-9"
            />
            <div className="-space-y-2 md:-space-y-3 flex flex-col items-left justify-center">
              <p className="text-sm md:text-lg font-clashDisplayMedium">
                masak
              </p>
              <p className="text-sm md:text-lg font-clashDisplayMedium">
                mudah
              </p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="" />
        {navigationMenu.map((menu) => (
          <DropdownMenuItem
            className="focus:bg-transparent flex gap-x-1"
            key={menu.href}
          >
            <img
              src="/images/icon/paper.svg"
              alt="book-icon"
              className="scale-90"
            />
            <Link to={menu.href} onClick={() => setOpenDropdown(false)}>
              {menu.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
