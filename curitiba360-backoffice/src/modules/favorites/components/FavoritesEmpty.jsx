import React from "react";
import {
  Compass,
  HeartOff,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FavoritesEmpty() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center select-none">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
        <HeartOff
          size={36}
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-950 my-0">
        Você ainda não salvou favoritos
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 my-0">
        Salve atrações, eventos, restaurantes,
        hotéis e experiências para encontrar tudo
        rapidamente depois.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/buscar"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
        >
          <Search
            size={17}
            aria-hidden="true"
          />

          Buscar lugares
        </Link>

        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 text-decoration-none"
        >
          <Compass
            size={17}
            aria-hidden="true"
          />

          Explorar Curitiba
        </Link>
      </div>
    </section>
  );
}
