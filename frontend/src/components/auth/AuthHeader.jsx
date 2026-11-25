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
      <div className="mb-4 flex items-center gap-3">
        <img
          src="/logo-360-main.png"
          alt="Curitiba 360 Logo"
          className="h-12 w-auto rounded-2xl object-contain shadow-md border border-slate-100"
        />
        <div>
          <p className="text-base font-black text-slate-950 leading-none">
            Curitiba <span className="text-emerald-600">360</span>
          </p>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Super App</p>
        </div>
      </div>

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
