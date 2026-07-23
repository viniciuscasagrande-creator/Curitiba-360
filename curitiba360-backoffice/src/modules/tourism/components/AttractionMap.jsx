import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function AttractionMap({ location, name, address }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location ? `${location.latitude},${location.longitude}` : encodeURIComponent(name + ' Curitiba')}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <MapPin size={18} className="text-amber-400" />
          Localização no Mapa
        </h3>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
        >
          Google Maps
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="relative w-full h-56 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <div className="relative z-10 text-center space-y-2 p-4">
          <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 ring-8 ring-amber-500/10">
            <MapPin size={24} />
          </div>
          <h4 className="font-bold text-white text-sm">{name}</h4>
          <p className="text-slate-400 text-xs max-w-xs">{address?.street}, {address?.number} — {address?.neighborhood}</p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 shadow-md transition-colors"
          >
            <Navigation size={14} className="text-amber-400" />
            Traçar Rota no GPS
          </a>
        </div>
      </div>
    </div>
  );
}
export default AttractionMap;
