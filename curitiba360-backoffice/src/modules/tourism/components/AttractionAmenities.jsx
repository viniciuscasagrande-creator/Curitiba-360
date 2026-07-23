import React from 'react';
import { Accessibility, Car, Dog, Users, ShieldCheck } from 'lucide-react';

export function AttractionAmenities({ attraction }) {
  if (!attraction) return null;

  const amenities = [
    { label: 'Acessibilidade PCD', active: attraction.accessibility, icon: Accessibility },
    { label: 'Estacionamento no Local', active: attraction.parking, icon: Car },
    { label: 'Pet Friendly', active: attraction.petFriendly, icon: Dog },
    { label: 'Ambiente Familiar', active: attraction.familyFriendly !== false, icon: Users }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
        <ShieldCheck size={18} className="text-amber-400" />
        Comodidades & Serviços
      </h3>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {amenities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                item.active
                  ? 'bg-slate-950 border-emerald-500/30 text-emerald-400 font-semibold'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500 line-through'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AttractionAmenities;
