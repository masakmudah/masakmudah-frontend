import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-provider";
import { Link, useNavigate } from "react-router-dom";

const ProfileImage = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          src="https://api.dicebear.com/9.x/thumbs/svg?seed=Sheba"
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-black"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-2xl font-raleway font-medium"
        align="end"
      >
        <DropdownMenuLabel className="font-clashDisplaySemibold">
          {username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-transparent">
          <Link to="/dashboard">Resep saya</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="focus:bg-transparent">
          Ubah profil
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="focus:bg-transparent">
          <button onClick={() => handleLogout()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImage;
