import React from "react";

export default function CartLoading() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] select-none text-left">
      <div className="space-y-4">
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
      </div>

      <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
    </div>
  );
}
