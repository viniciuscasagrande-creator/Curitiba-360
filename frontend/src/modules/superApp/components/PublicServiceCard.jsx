import React from "react";
import { Landmark, ArrowRight } from "lucide-react";

export default function PublicServiceCard({ name = "Serviço Público", description = "Detalhes", organ = "Prefeitura", onClick = () => {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full bg-slate-50 text-slate-655 flex items-center justify-center border border-slate-200">
            <Landmark size={12} />
          </div>
          <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {organ}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {name}
        </h4>
        <p className="text-[10px] text-slate-500 m-0 mt-1 leading-snug">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className="flex items-center justify-center gap-1 w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-855 font-bold text-[10px] rounded-xl border border-slate-200 transition cursor-pointer"
      >
        Acessar Canal <ArrowRight size={10} />
      </button>
    </div>
  );
}
