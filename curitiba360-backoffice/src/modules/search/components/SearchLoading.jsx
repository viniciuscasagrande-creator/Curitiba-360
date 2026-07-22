import React from "react";

export default function SearchLoading({
  count = 6,
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="aspect-[16/10] animate-pulse bg-slate-200" />

          <div className="space-y-3 p-4">
            <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

            <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />

            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
