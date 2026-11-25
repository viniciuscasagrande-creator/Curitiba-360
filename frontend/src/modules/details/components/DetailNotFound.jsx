import React from "react";
import {
  Compass,
  Home,
  MapPinOff,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DetailNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center select-none">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
        <MapPinOff size={36} />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slate-950 my-0">
        Local não encontrado
      </h1>

      <p className="mt-3 text-sm leading-7 text-slate-600 my-0">
        O conteúdo pode ter sido removido, estar indisponível ou o endereço informado está incorreto.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 text-decoration-none"
        >
          <Home size={17} />
          Voltar para a Home
        </Link>

        <Link
          to="/buscar"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white text-decoration-none"
        >
          <Compass size={17} />
          Explorar Curitiba
        </Link>
      </div>
    </div>
  );
}
