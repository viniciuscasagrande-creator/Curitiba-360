import React from "react";
import { useCart } from "../../cart";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default function CheckoutSummary() {
  const { cart } = useCart();

  if (!cart) return null;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left space-y-4">
      <h3 className="text-base font-bold text-slate-900 my-0">
        Resumo da Compra
      </h3>

      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-3 text-xs border-b border-slate-50 pb-2">
            <img
              src={item.image}
              alt={item.title}
              className="h-10 w-10 rounded-lg object-cover bg-slate-50 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-800 truncate my-0">{item.title}</h4>
              <p className="text-slate-500 my-0 mt-0.5">
                {item.quantity}x {item.ticketType}
              </p>
            </div>
            <span className="font-semibold text-slate-700">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-slate-800">{formatCurrency(cart.pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxa de Serviço</span>
          <span className="font-medium text-slate-800">{formatCurrency(cart.pricing.serviceFee)}</span>
        </div>
        {cart.pricing.discount > 0 && (
          <div className="flex justify-between font-semibold text-emerald-700">
            <span>Desconto</span>
            <span>- {formatCurrency(cart.pricing.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-slate-100">
          <span>Total</span>
          <span className="text-base font-black text-slate-950">{formatCurrency(cart.pricing.total)}</span>
        </div>
      </div>
    </aside>
  );
}
