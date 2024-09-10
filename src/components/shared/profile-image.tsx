import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-provider";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileImage = () => {
  const navigate = useNavigate();
  const { setToken, user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => setOpenDropdown(!openDropdown)}
    >
      <DropdownMenuTrigger onClick={() => setOpenDropdown(true)}>
        <img
          src={
            user?.imageURL ||
            "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
          }
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-black"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-2xl font-raleway text-lg font-medium min-w-40 py-2 border-2 border-black/80 "
        align="end"
      >
        <DropdownMenuLabel className=" ml-2">
          <div className="flex gap-x-4">
            <img
              src={
                user?.imageURL ||
                "https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
              }
              alt={user?.username + "'s image"}
              className="w-8 h-8 rounded-full "
            />
            <div className="flex flex-col gap-y-1">
              <p className="font-clashDisplayMedium capitalize">
                {user?.fullname || user?.username}
              </p>
              <p className="font-normal">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-transparent flex gap-x-1">
          <img
            src="/images/icon/paper.svg"
            alt="book-icon"
            className="scale-90"
          />
          <Link
            to={`/dashboard/${user?.username}`}
            onClick={() => setOpenDropdown(false)}
          >
            Resep saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-transparent flex gap-x-1">
          <img
            src="/images/icon/paper.svg"
            alt="book-icon"
            className="scale-90"
          />
          <Link
            to={`/dashboard/${user?.username}`}
            onClick={() => setOpenDropdown(false)}
          >
            Ubah profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-transparent flex gap-x-1">
          <img src="/images/icon/logout.svg" alt="icon" className="scale-90" />
          <button onClick={() => handleLogout()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImage;
