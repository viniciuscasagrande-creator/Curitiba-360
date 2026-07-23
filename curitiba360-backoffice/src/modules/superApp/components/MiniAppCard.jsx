import React from "react";
import * as Icons from "lucide-react";

export default function MiniAppCard({ miniApp = {}, onInstall = () => {} }) {
  // Resolve icons dynamically
  let LucideIcon = Icons.Layers;
  if (miniApp.icon === "Bus") LucideIcon = Icons.Bus;
  else if (miniApp.icon === "ParkingSquare") LucideIcon = Icons.ParkingSquare;
  else if (miniApp.icon === "Image") LucideIcon = Icons.Image;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex items-center justify-between font-sans animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
          <LucideIcon size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
            {miniApp.name}
          </h4>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">v{miniApp.version} • {miniApp.rating} ★</span>
        </div>
      </div>

      <button
        onClick={() => onInstall(miniApp.id)}
        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl shadow-2xs border-none transition cursor-pointer"
      >
        Abrir
      </button>
    </div>
  );
}
