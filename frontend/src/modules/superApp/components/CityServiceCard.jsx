import React from "react";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function CityServiceCard({ service = {}, onClick = () => {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <HelpCircle size={12} />
          </div>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {service.category}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {service.name}
        </h4>
        <p className="text-[10px] text-slate-500 m-0 mt-1 leading-snug">
          {service.desc}
        </p>
      </div>

      <button
        onClick={() => onClick(service)}
        className="flex items-center justify-center gap-1 w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-bold text-[10px] rounded-xl border border-emerald-100 hover:no-underline transition cursor-pointer"
      >
        Solicitar Serviço <ArrowRight size={10} />
      </button>
    </div>
  );
}
