import React from "react";
import { LoaderCircle } from "lucide-react";

export function FullPageLoader({
  label = "Carregando...",
}) {
  return (
    <div
      role="status"
      className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 select-none"
    >
      <LoaderCircle
        size={34}
        className="animate-spin text-emerald-700"
        aria-hidden="true"
      />

      <p className="text-sm font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}

export default FullPageLoader;
