import React from "react";

export default function ProfileLoading() {
  return (
    <div className="space-y-6 select-none text-left">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="h-28 animate-pulse bg-slate-200" />

        <div className="flex flex-col items-center px-6 pb-7 sm:flex-row">
          <div className="-mt-14 h-28 w-28 animate-pulse rounded-full border-4 border-white bg-slate-300" />

          <div className="mt-5 w-full flex-1 space-y-3 sm:ml-5">
            <div className="h-7 w-52 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>

      {Array.from({
        length: 3,
      }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-3xl bg-slate-100"
        />
      ))}
    </div>
  );
}
