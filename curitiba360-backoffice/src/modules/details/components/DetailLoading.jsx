import React from "react";

export default function DetailLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8 text-left select-none">
      <div className="min-h-[420px] animate-pulse rounded-3xl bg-slate-200" />

      <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />

      <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-3xl bg-slate-100"
            />
          ))}
        </div>

        <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    </div>
  );
}
