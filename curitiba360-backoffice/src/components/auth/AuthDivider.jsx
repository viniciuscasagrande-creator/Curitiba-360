import React from "react";
import { cn } from "../../utils/cn";

export function AuthDivider({
  label = "ou continue com",
  className,
}) {
  return (
    <div
      role="separator"
      className={cn("flex items-center gap-4 select-none", className)}
    >
      <div className="h-px flex-1 bg-slate-200" />

      <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-slate-405">
        {label}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export default AuthDivider;
