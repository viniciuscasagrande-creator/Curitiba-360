import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event = {} }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {event.name}
        </h4>
        <div className="space-y-1 mt-2 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1">
            <Calendar size={11} className="text-emerald-500" />
            <span>{event.date} às {event.startTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} className="text-emerald-500" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

      <Link
        to={`/app/events/${event.id}`}
        className="flex items-center justify-center gap-1 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl shadow-2xs hover:no-underline transition"
      >
        Ver Detalhes <ArrowRight size={10} />
      </Link>
    </div>
  );
}
