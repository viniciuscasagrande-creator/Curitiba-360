import React from "react";
import HomeHeader from "../Header/HomeHeader";
import BottomNavigation from "../BottomNavigation/BottomNavigation";

export default function HomeLayout({ children, favoritesCount = 0, searchBar }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header */}
      <HomeHeader favoritesCount={favoritesCount} />

      {/* Embedded Search bar in Layout header if provided */}
      {searchBar}

      {/* Main Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto pb-24 md:pb-12">
        {children}
      </main>

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
