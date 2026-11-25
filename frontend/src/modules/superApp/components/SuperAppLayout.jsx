import React from "react";
import BottomNavigation from "./BottomNavigation";

export default function SuperAppLayout({ children }) {
  return (
    <div className="bg-slate-100 min-h-screen flex justify-center text-xs font-sans text-slate-800">
      <div className="w-full max-w-md bg-slate-50 min-h-screen flex flex-col relative shadow-xl pb-16">
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
}
