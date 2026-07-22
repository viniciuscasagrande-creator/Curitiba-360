import React from "react";
import {
  MapPinOff,
  RotateCcw,
} from "lucide-react";

export default function MapEmpty({
  onClear,
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center select-none">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <MapPinOff size={30} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-950 my-0">
          Nenhum local no mapa
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600 my-0">
          Tente remover alguns filtros ou pesquisar outro termo.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white border-none cursor-pointer"
        >
          <RotateCcw size={16} />
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
