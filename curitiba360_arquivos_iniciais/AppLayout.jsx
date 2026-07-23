import React from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "../components/layout/AppHeader";
import { BottomNavigation } from "../components/layout/BottomNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0d0f14] text-gray-100 flex flex-col font-sans">
      <AppHeader />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 pb-24 pt-6">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}
