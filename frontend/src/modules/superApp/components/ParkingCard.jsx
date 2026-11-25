import React from "react";
import { MapPin, Info, ArrowRight } from "lucide-react";

export default function ParkingCard({ zone = {}, onActivate = () => {} }) {
  const getOccupancyColor = (status) => {
    switch (status) {
      case "high_occupancy": return "text-red-600 bg-red-50 border-red-100";
      case "medium_occupancy": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-emerald-600 bg-emerald-50 border-emerald-100";
    }
  };

  const occupancyLabel = {
    high_occupancy: "Ocupação Alta",
    medium_occupancy: "Ocupação Média",
    low_occupancy: "Vagas Livres"
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-3 font-sans animate-fadeIn">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            EstaR Digital
          </span>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${getOccupancyColor(zone.status)}`}>
            {occupancyLabel[zone.status]}
          </span>
        </div>
        <h4 className="text-xs font-bold text-slate-800 m-0 leading-tight">
          {zone.name}
        </h4>
        <div className="space-y-1 mt-2 text-[10px] text-slate-500 font-mono">
          <div>Vagas Livres: <b>{zone.availableSpots}</b></div>
          <div>Tarifa: <b>R$ {zone.hourlyRate.toFixed(2)}/h</b></div>
        </div>
      </div>

      <button
        onClick={() => {
          const plate = prompt("Digite a placa do veículo:");
          if (plate) onActivate(zone.id, plate, 60);
        }}
        className="flex items-center justify-center gap-1 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl shadow-2xs transition border-none cursor-pointer"
      >
        Ativar EstaR <ArrowRight size={10} />
      </button>
    </div>
  );
}
