import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";

export default function CartHeader({ itemsCount, onClear, saving }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 select-none text-left">
      <div className="flex items-start gap-4">
        <Link
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition text-decoration-none"
          aria-label="Voltar para início"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>
          <div className="flex items-center gap-2 text-emerald-700">
            <ShoppingCart size={18} />
            <span className="text-sm font-semibold uppercase tracking-[0.14em]">
              Minha compra
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
            Carrinho
          </h1>

          <p className="mt-2 text-sm text-slate-600 my-0">
            Revise os itens antes de continuar para o pagamento.
          </p>
        </div>
      </div>

      {itemsCount > 0 && (
        <button
          type="button"
          disabled={saving}
          onClick={onClear}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-650 transition hover:bg-red-50 cursor-pointer"
        >
          <Trash2 size={16} />
          Limpar carrinho
        </button>
      )}
    </header>
  );
}
