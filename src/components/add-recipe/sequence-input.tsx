import * as React from "react";

import { cn } from "@/libs/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SequenceInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        readOnly
        disabled
        className={cn("m-0 text-sm font-medium border-2 rounded-lg", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
SequenceInput.displayName = "Input";

export { SequenceInput };
