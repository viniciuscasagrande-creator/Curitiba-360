import React from "react";
import { Link } from "react-router-dom";
import { Bell, ShieldAlert, Sun, CloudRain } from "lucide-react";

export default function SuperAppHeader({ unreadNotifications = 0, alertsCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 shadow-md flex items-center justify-between animate-fadeIn">
      <div className="flex items-center gap-2">
        <div className="bg-white text-emerald-600 p-1.5 rounded-xl font-bold tracking-wider text-sm shadow-sm flex items-center justify-center font-mono">
          C360
        </div>
        <div>
          <h1 className="font-extrabold text-sm tracking-tight m-0 font-sans">Curitiba 360</h1>
          <span className="text-[10px] text-emerald-100 flex items-center gap-1">
            <Sun size={10} className="text-yellow-300" /> 19°C • Ensolarado
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {alertsCount > 0 && (
          <Link to="/app/alerts" className="relative text-white hover:text-emerald-100 transition">
            <ShieldAlert size={18} className="text-amber-300 animate-pulse" />
          </Link>
        )}

        <Link to="/app/notifications" className="relative text-white hover:text-emerald-100 transition">
          <Bell size={18} />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[8px] px-1 font-bold h-3.5 min-w-3.5 flex items-center justify-center border border-emerald-600">
              {unreadNotifications}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
