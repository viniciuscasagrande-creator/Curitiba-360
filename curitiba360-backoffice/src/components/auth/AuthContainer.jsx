import React from "react";
import { cn } from "../../utils/cn";

export function AuthContainer({ children, className }) {
  return (
    <div className={cn("mx-auto flex w-full flex-col", className)}>
      {children}
    </div>
  );
}

export default AuthContainer;
