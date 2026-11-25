import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function OrderHeader({ code }) {
  return (
    <div className="flex items-start gap-4 select-none text-left">
      <Link
        to="/perfil/pedidos"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 text-decoration-none"
        aria-label="Voltar para o histórico"
      >
        <ArrowLeft size={19} />
      </Link>

      <div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold">
          <ShoppingBag size={18} />
          <span className="text-xs uppercase tracking-wider">
            Minha Conta
          </span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-955 my-0">
          Pedido {code}
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 my-0">
          Consulte ingressos, comprovantes, andamento e ações.
        </p>
      </div>
    </div>
  );
}
