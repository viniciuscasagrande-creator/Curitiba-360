import React from "react";

export default function MapLoading() {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)] select-none text-left">
      <div className="space-y-3">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>

      <div className="min-h-[520px] animate-pulse rounded-3xl bg-slate-200" />
    </div>
  );
}
