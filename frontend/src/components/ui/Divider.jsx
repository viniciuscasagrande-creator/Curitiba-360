import React from "react";
import { cn } from "../../utils/cn";

export function Divider({
  label,
  className,
}) {
  return (
    <div
      className={cn("flex items-center gap-4", className)}
      role="separator"
    >
      <div className="h-px flex-1 bg-slate-200" />

      {label && (
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 select-none">
          {label}
        </span>
      )}

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export default Divider;
