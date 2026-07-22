import React from "react";
import {
  ArrowRight,
  Home,
  RotateCcw,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PurchaseActions({
  result,
}) {
  const status =
    result.payment.status;

  if (status === "approved") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 select-none">
        <Link
          to={`/perfil/pedidos/${result.orderId}/ingressos`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 text-sm font-semibold text-white text-decoration-none"
        >
          <Ticket size={18} />
          Acessar ingressos
        </Link>

        <Link
          to={`/perfil/pedidos/${result.orderId}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 text-sm font-semibold text-slate-700 text-decoration-none"
        >
          Ver detalhes
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  if (
    status === "declined" ||
    status === "failed" ||
    status === "expired"
  ) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 select-none">
        <Link
          to="/checkout"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 text-sm font-semibold text-white text-decoration-none"
        >
          <RotateCcw size={17} />
          Tentar novamente
        </Link>

        <Link
          to="/carrinho"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 text-sm font-semibold text-slate-700 text-decoration-none"
        >
          Revisar carrinho
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 select-none">
      <Link
        to={`/perfil/pedidos/${result.orderId}`}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-700 px-5 text-sm font-semibold text-white text-decoration-none"
      >
        Acompanhar pedido
        <ArrowRight size={17} />
      </Link>

      <Link
        to="/"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 text-sm font-semibold text-slate-700 text-decoration-none"
      >
        <Home size={17} />
        Voltar ao início
      </Link>
    </div>
  );
}
