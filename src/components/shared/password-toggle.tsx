import React from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface PasswordToggleProps {
  showPassword: boolean;
  triggerToggle: () => void;
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({
  showPassword,
  triggerToggle,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={triggerToggle}
            className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent hover:bg-transparent"
          >
            {showPassword ? (
              <Eye size={18} color="#1C2625" strokeWidth={1} />
            ) : (
              <EyeOff size={18} color="#1C2625" strokeWidth={1} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-[#1C2625] text-sm font-clashDisplayMedium text-white">
          <p>Show or Hide Password</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
