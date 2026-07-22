import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartEmpty() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center select-none">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <ShoppingCart size={29} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-950 my-0">
        Seu carrinho está vazio
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 my-0">
        Explore eventos, experiências e atrações de Curitiba para começar sua compra.
      </p>

      <Link
        to="/buscar"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white text-decoration-none"
      >
        Explorar Curitiba
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
