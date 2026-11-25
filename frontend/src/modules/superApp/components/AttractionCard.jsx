import React from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AttractionCard({ attraction = {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            {attraction.type}
          </span>
          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <Star size={10} className="fill-amber-400 text-amber-400" /> {attraction.rating}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {attraction.title}
        </h4>
        <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500 font-mono">
          <MapPin size={11} className="text-emerald-500" />
          <span>{attraction.distanceKm} km de distância</span>
        </div>
      </div>

      <Link
        to={`/app/attractions/${attraction.id}`}
        className="flex items-center justify-center gap-1 w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 font-bold text-[10px] rounded-xl border border-emerald-100 hover:no-underline transition"
      >
        Visitar <ArrowRight size={10} />
      </Link>
    </div>
  );
}
