import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default function CartCheckoutBar({ total, itemCount }) {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-slate-200 bg-white p-4 shadow-lg lg:hidden select-none">
      <div className="flex items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider my-0">
            Total ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </p>
          <p className="text-lg font-black text-slate-950 my-0 mt-0.5">
            {formatCurrency(total)}
          </p>
        </div>

        <Link
          to="/checkout"
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white transition hover:bg-emerald-800 text-decoration-none"
        >
          Checkout
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
