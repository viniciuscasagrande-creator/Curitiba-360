import React from "react";
import { maskCardNumber, maskExpiry } from "../utils/masks";

export default function CreditCardForm({ values = {}, onChange, errors = {} }) {
  const handleCardNumberChange = (e) => {
    onChange("cardNumber", maskCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    onChange("expiry", maskExpiry(e.target.value));
  };

  const handleCvvChange = (e) => {
    onChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 4));
  };

  return (
    <div className="space-y-4 select-none text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">Número do Cartão</label>
          <input
            type="text"
            required
            value={values.cardNumber || ""}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.cardNumber && <p className="mt-1 text-xs text-red-650 my-0">{errors.cardNumber}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">Nome Impresso no Cartão</label>
          <input
            type="text"
            required
            value={values.holderName || ""}
            onChange={(e) => onChange("holderName", e.target.value.toUpperCase())}
            placeholder="NOME IGUAL NO CARTÃO"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition uppercase"
          />
          {errors.holderName && <p className="mt-1 text-xs text-red-650 my-0">{errors.holderName}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Validade</label>
          <input
            type="text"
            required
            value={values.expiry || ""}
            onChange={handleExpiryChange}
            placeholder="MM/AA"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.expiry && <p className="mt-1 text-xs text-red-650 my-0">{errors.expiry}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Código de Segurança (CVV)</label>
          <input
            type="password"
            required
            value={values.cvv || ""}
            onChange={handleCvvChange}
            placeholder="123"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.cvv && <p className="mt-1 text-xs text-red-650 my-0">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
}
