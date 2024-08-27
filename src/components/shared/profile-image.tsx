import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-provider";

const ProfileImage = () => {
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken(null);
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
          Akun saya
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Resep saya</DropdownMenuItem>
        <DropdownMenuItem>Ubah profil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => handleLogout()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImage;
