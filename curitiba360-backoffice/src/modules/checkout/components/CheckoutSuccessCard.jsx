import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CheckoutSuccessCard({ order = {} }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm select-none text-center space-y-6 max-w-xl mx-auto">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <CheckCircle2 size={32} />
      </div>

      <div>
        <h2 className="text-2xl font-black text-slate-950 my-0">
          Pedido Criado com Sucesso!
        </h2>
        <p className="mt-2 text-sm text-slate-500 my-0">
          O código do seu pedido é <strong className="font-mono text-slate-900 font-bold">{order.code}</strong>.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-600">
        <div className="flex justify-between">
          <span>Status do Pagamento</span>
          <span className={`font-bold ${order.payment?.status === "approved" ? "text-emerald-700" : "text-amber-700"}`}>
            {order.payment?.status === "approved" ? "Aprovado" : "Aguardando pagamento"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Atração / Evento</span>
          <span className="font-bold text-slate-900">{order.items?.[0]?.title}</span>
        </div>
        <div className="flex justify-between">
          <span>Quantidade</span>
          <span className="font-bold text-slate-900">{order.items?.[0]?.quantity} ingressos</span>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to={`/perfil/pedidos/${order.id}`}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 text-decoration-none"
        >
          Visualizar Ingressos e Detalhes
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
