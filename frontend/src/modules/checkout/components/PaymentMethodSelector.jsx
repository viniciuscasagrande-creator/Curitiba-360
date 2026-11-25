import React from "react";
import { PAYMENT_METHODS } from "../constants/checkoutConfig";
import { CreditCard, QrCode } from "lucide-react";

export default function PaymentMethodSelector({ selectedMethod, onChange }) {
  return (
    <div className="space-y-3 select-none text-left">
      <label className="text-xs font-bold text-slate-700 block mb-1">
        Selecione o Meio de Pagamento
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          const isPix = method.id === "pix";
          const isCard = method.id === "credit_card";

          return (
            <label
              key={method.id}
              className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
                method.disabled
                  ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                  : isSelected
                  ? "bg-emerald-50/50 border-emerald-500 shadow-sm cursor-pointer"
                  : "bg-white border-slate-200 hover:border-slate-300 cursor-pointer"
              }`}
            >
              <input
                type="radio"
                name="payment_method"
                disabled={method.disabled}
                checked={isSelected}
                onChange={() => !method.disabled && onChange(method.id)}
                className="mt-1 h-4 w-4 rounded-full border-slate-300 text-emerald-700 focus:ring-emerald-500"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {isPix && <QrCode size={16} className="text-emerald-700" />}
                  {isCard && <CreditCard size={16} className="text-emerald-705" />}
                  <span className="text-sm font-bold text-slate-900">{method.label}</span>
                </div>
                {method.description && (
                  <p className="mt-1 text-xs text-slate-500 my-0">
                    {method.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
