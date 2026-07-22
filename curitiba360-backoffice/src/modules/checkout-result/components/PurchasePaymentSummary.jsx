import React from "react";
import {
  CreditCard,
  Hash,
  QrCode,
} from "lucide-react";

import {
  formatCurrency,
} from "../utils/resultFormatters";

const PAYMENT_METHOD_LABELS = {
  pix: "PIX",
  credit_card: "Cartão de crédito",
};

export default function PurchasePaymentSummary({
  payment,
}) {
  const MethodIcon =
    payment.method === "pix"
      ? QrCode
      : CreditCard;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 select-none text-left">
      <h2 className="text-lg font-bold text-slate-955 my-0">
        Pagamento
      </h2>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <MethodIcon size={22} />
        </div>

        <div>
          <p className="font-bold text-slate-955 my-0">
            {PAYMENT_METHOD_LABELS[
              payment.method
            ] || "Pagamento"}
          </p>

          <p className="mt-1 text-sm text-slate-500 my-0">
            {formatCurrency(
              payment.amount
            )}
          </p>
        </div>
      </div>

      {payment.transactionId && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
          <Hash
            size={18}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 my-0">
              Transação
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-805 my-0">
              {payment.transactionId}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
