import React from "react";
import { Gift, ArrowRight } from "lucide-react";

export default function BenefitCard({ benefit = {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Gift size={12} />
          </div>
          <span className="text-[8px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {benefit.partner}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {benefit.title}
        </h4>
        <p className="text-[10px] text-slate-500 m-0 mt-1 leading-snug">
          {benefit.desc}
        </p>
      </div>

      <button className="flex items-center justify-center gap-1 w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 font-bold text-[10px] rounded-xl border border-purple-100 transition cursor-pointer">
        Resgatar Benefício <ArrowRight size={10} />
      </button>
    </div>
  );
}
