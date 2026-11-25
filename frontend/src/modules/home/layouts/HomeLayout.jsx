import React from "react";

export default function HomeLayout({
  children,
  header,
  bottomNavigation,
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col">
      {header}

      <main className="pb-24 flex-1">
        {children}
      </main>

      {bottomNavigation}
    </div>
  );
}
