import React from "react";
import { Sparkles } from "lucide-react";

export default function HomeGreeting({ fullName = "Cidadão", loyaltyLevel = "Essencial" }) {
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Bom dia";
    if (hr < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs flex items-center justify-between font-sans">
      <div>
        <h2 className="text-lg font-extrabold text-slate-800 m-0">
          {getGreeting()}, <span className="text-emerald-600">{fullName}</span>!
        </h2>
        <p className="text-[10px] text-slate-500 m-0 mt-0.5 flex items-center gap-1 font-medium">
          <Sparkles size={11} className="text-emerald-500" /> Nível: {loyaltyLevel}
        </p>
      </div>
      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-100 shadow-2xs">
        {fullName.charAt(0)}
      </div>
    </div>
  );
}
