import React from "react";
import {
  SearchX,
} from "lucide-react";

export default function SearchEmpty({
  onClear,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center select-none">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
        <SearchX
          size={30}
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950 my-0">
        Nenhum resultado encontrado
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 my-0">
        Tente pesquisar outro termo,
        selecionar uma categoria diferente
        ou remover alguns filtros.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 border-none cursor-pointer"
      >
        Limpar filtros
      </button>
    </div>
  );
}
