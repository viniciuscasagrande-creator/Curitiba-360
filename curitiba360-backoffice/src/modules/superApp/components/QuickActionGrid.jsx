import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

export default function QuickActionGrid({ actions = [] }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs">
      {actions.map((act) => {
        // Resolve icons dynamically
        let LucideIcon = Icons.HelpCircle;
        if (act.id === "tickets") LucideIcon = Icons.Ticket;
        else if (act.id === "reservations") LucideIcon = Icons.CalendarCheck;
        else if (act.id === "map") LucideIcon = Icons.Map;
        else if (act.id === "events") LucideIcon = Icons.Sparkles;
        else if (act.id === "mobility") LucideIcon = Icons.Bus;
        else if (act.id === "parking") LucideIcon = Icons.MapPin;
        else if (act.id === "benefits") LucideIcon = Icons.Gift;
        else if (act.id === "services") LucideIcon = Icons.Building;
        else if (act.id === "sos") LucideIcon = Icons.Activity;

        const isSos = act.id === "sos";

        return (
          <Link
            key={act.id}
            to={act.route}
            className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl hover:no-underline transition group ${
              isSos ? "bg-red-50 hover:bg-red-100" : "hover:bg-slate-50"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xs transition group-hover:scale-105 ${
                isSos
                  ? "bg-red-500 text-white"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              <LucideIcon size={20} className={isSos ? "animate-pulse" : ""} />
            </div>
            <span
              className={`text-[10px] font-bold text-center ${
                isSos ? "text-red-700" : "text-slate-700"
              }`}
            >
              {act.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
