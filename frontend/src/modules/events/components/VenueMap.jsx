import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function VenueMap({ venue = 'Curitiba', address = 'Curitiba - PR' }) {
  const encodedAddress = encodeURIComponent(`${venue}, ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <MapPin size={20} className="text-amber-400" />
          Localização do Evento
        </h3>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
        >
          Abrir no Google Maps
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {/* Placeholder visual do Mapa Interativo com efeito moderno */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <div className="relative z-10 text-center space-y-3 p-4">
          <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 ring-8 ring-amber-500/10 animate-bounce">
            <MapPin size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">{venue}</h4>
            <p className="text-slate-400 text-xs mt-0.5 max-w-sm">{address}</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors border border-slate-700 shadow-md"
          >
            <Navigation size={14} className="text-amber-400" />
            Traçar Rota no GPS
          </a>
        </div>
      </div>
    </div>
  );
}
export default VenueMap;
