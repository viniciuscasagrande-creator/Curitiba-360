import React, { useState } from "react";
import {
  LocateFixed,
  Map as MapIcon,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

import MapMarker from "./MapMarker";

export default function MapCanvas({
  items,
  selectedItem,
  onSelectItem,
}) {
  const [zoom, setZoom] =
    useState(1);

  function increaseZoom() {
    setZoom((current) =>
      Math.min(1.8, current + 0.2)
    );
  }

  // decrease zoom
  function decreaseZoom() {
    setZoom((current) =>
      Math.max(1, current - 0.2)
    );
  }

  function resetZoom() {
    setZoom(1);
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-[#e7ede8] shadow-sm lg:min-h-[calc(100vh-190px)] select-none">
      <div
        className="absolute inset-0 origin-center transition-transform duration-300"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute left-[12%] top-0 h-full w-2 rotate-12 bg-white/80" />
          <div className="absolute left-[33%] top-0 h-full w-3 -rotate-6 bg-white/70" />
          <div className="absolute right-[22%] top-0 h-full w-2 rotate-3 bg-white/80" />

          <div className="absolute left-0 top-[22%] h-3 w-full -rotate-3 bg-white/80" />
          <div className="absolute left-0 top-[48%] h-2 w-full rotate-6 bg-white/70" />
          <div className="absolute bottom-[19%] left-0 h-3 w-full -rotate-2 bg-white/80" />
        </div>

        <div className="absolute left-[6%] top-[9%] h-40 w-56 rounded-[45%] bg-emerald-200/70" />
        <div className="absolute bottom-[10%] right-[8%] h-52 w-64 rounded-[48%] bg-emerald-200/60" />
        <div className="absolute right-[32%] top-[31%] h-24 w-32 rounded-full bg-blue-200/70" />

        {items.map((item) => (
          <MapMarker
            key={item.id}
            item={item}
            selected={
              selectedItem?.id ===
              item.id
            }
            onClick={onSelectItem}
          />
        ))}
      </div>

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-md backdrop-blur">
        <MapIcon
          size={16}
          className="text-emerald-700"
          aria-hidden="true"
        />

        Curitiba
      </div>

      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <button
          type="button"
          onClick={increaseZoom}
          className="flex h-10 w-10 items-center justify-center border-b border-slate-200 text-slate-700 hover:bg-slate-50 border-none cursor-pointer"
          aria-label="Aumentar zoom"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          onClick={decreaseZoom}
          className="flex h-10 w-10 items-center justify-center border-b border-slate-200 text-slate-700 hover:bg-slate-50 border-none cursor-pointer"
          aria-label="Diminuir zoom"
        >
          <Minus size={18} />
        </button>

        <button
          type="button"
          onClick={resetZoom}
          className="flex h-10 w-10 items-center justify-center text-slate-700 hover:bg-slate-50 border-none cursor-pointer"
          aria-label="Redefinir mapa"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      <button
        type="button"
        className="absolute bottom-4 right-4 flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 shadow-lg transition hover:bg-slate-50 border-none cursor-pointer"
      >
        <LocateFixed
          size={18}
          className="text-emerald-700"
          aria-hidden="true"
        />

        Minha localização
      </button>

      <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur">
        Mapa demonstrativo · Curitiba 360
      </div>
    </section>
  );
}
