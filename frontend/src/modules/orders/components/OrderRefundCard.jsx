import React from "react";
import { RotateCcw } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function OrderRefundCard({ order = {} }) {
  if (order.status !== "refunded") return null;

  return (
    <section className="rounded-3xl border border-violet-200 bg-violet-50/50 p-5 sm:p-6 select-none text-left space-y-3">
      <div className="flex items-center gap-3 text-violet-850">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
          <RotateCcw size={18} />
        </div>
        <h2 className="text-base font-bold my-0">
          Informações de Reembolso
        </h2>
      </div>

      <div className="text-sm text-violet-900 space-y-2">
        <p className="my-0">
          O valor total de <strong className="text-base font-extrabold">{formatCurrency(order.pricing.total)}</strong> foi reembolsado.
        </p>
        <p className="text-xs my-0 leading-5">
          <strong>Método:</strong> Estorno no mesmo método de pagamento ({order.payment.method === "pix" ? "Pix" : "Cartão de Crédito"}).<br />
          <strong>Data de solicitação:</strong> {new Date(order.updatedAt).toLocaleDateString("pt-BR")}<br />
          <strong>Prazo:</strong> O crédito pode levar até 7 dias úteis para Pix, ou até 2 faturas para Cartão de Crédito.
        </p>
      </div>
    </section>
  );
}
