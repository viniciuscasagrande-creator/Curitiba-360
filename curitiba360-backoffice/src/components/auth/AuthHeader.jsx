import React from "react";
import { cn } from "../../utils/cn";

export function AuthHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) {
  const alignment = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <header className={cn("mb-8 text-left", alignment[align], className)}>
      {eyebrow && (
        <p className="text-sm font-semibold text-emerald-700 my-0 select-none">
          {eyebrow}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 my-0">
        {title}
      </h1>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-600 my-0">
          {description}
        </p>
      )}
    </header>
  );
}

export default AuthHeader;
