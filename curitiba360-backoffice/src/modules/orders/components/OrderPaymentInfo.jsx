import React from "react";
import { CreditCard, Receipt } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value) {
  if (!value) return "Não disponível";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

const METHOD_LABELS = {
  credit_card: "Cartão de Crédito",
  pix: "Pix",
  google_pay: "Google Pay",
  apple_pay: "Apple Pay",
};

export default function OrderPaymentInfo({ payment = {}, pricing = {} }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 select-none text-left">
      {/* Payment details */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <CreditCard size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900 my-0">
            Informações de Pagamento
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Método</span>
            <span className="font-bold text-slate-900">
              {METHOD_LABELS[payment.method] || payment.method}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Status</span>
            <span className="font-bold text-slate-900 uppercase">
              {payment.status}
            </span>
          </div>

          {payment.transactionId && (
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span>Transação</span>
              <span className="font-mono text-xs font-bold text-slate-900">
                {payment.transactionId}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Data do Pagamento</span>
            <span className="font-bold text-slate-900">
              {formatDate(payment.paidAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Receipt size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900 my-0">
            Resumo Financeiro
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">
              {formatCurrency(pricing.subtotal)}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span>Taxa de Serviço</span>
            <span className="font-semibold text-slate-800">
              {formatCurrency(pricing.serviceFee)}
            </span>
          </div>

          {pricing.discount > 0 && (
            <div className="flex justify-between border-b border-slate-100 pb-2 text-red-600">
              <span>Desconto</span>
              <span className="font-semibold">
                -{formatCurrency(pricing.discount)}
              </span>
            </div>
          )}

          <div className="flex justify-between pt-1">
            <span className="text-base font-bold text-slate-950">Total</span>
            <span className="text-lg font-black text-slate-955">
              {formatCurrency(pricing.total)}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
