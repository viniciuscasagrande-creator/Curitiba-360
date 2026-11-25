import React from "react";
import {
  MapPin,
  Navigation,
} from "lucide-react";

export default function DetailLocation({
  item,
}) {
  const routeUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${item.location.latitude},${item.location.longitude}`;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left select-none">
      <div className="flex min-h-[260px] items-center justify-center bg-slate-100">
        <div className="text-center">
          <MapPin
            size={42}
            className="mx-auto text-emerald-700 animate-bounce"
          />

          <p className="mt-3 text-sm font-semibold text-slate-700 my-0">
            Mapa do local
          </p>

          <p className="mt-1 text-xs text-slate-500 my-0">
            Integração com mapa será adicionada posteriormente.
          </p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-950 my-0">
          Localização
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 my-0">
          {item.formattedAddress}
        </p>

        <a
          href={routeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
        >
          <Navigation size={17} />
          Traçar rota
        </a>
      </div>
    </section>
  );
}
