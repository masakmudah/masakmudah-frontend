import React from "react";

import { cn } from "@/libs/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-screen-xl px-8 py-24", className)}>
      {children}
    </div>
  );
};

export default Container;
