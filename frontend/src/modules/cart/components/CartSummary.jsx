import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CartCouponForm from "./CartCouponForm";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export default function CartSummary({
  cart,
  saving,
  onApplyCoupon,
  onRemoveCoupon,
}) {
  return (
    <aside className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 select-none text-left">
      <h2 className="text-xl font-bold text-slate-950 my-0">
        Resumo da compra
      </h2>

      <CartCouponForm
        coupon={cart.coupon}
        saving={saving}
        onApply={onApplyCoupon}
        onRemove={onRemoveCoupon}
      />

      <div className="space-y-3 border-t border-slate-100 pt-5 text-sm">
        <div className="flex justify-between gap-4 text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">
            {formatCurrency(cart.pricing.subtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-slate-600">
          <span>Taxa de serviço</span>
          <span className="font-semibold text-slate-800">
            {formatCurrency(cart.pricing.serviceFee)}
          </span>
        </div>

        {cart.pricing.discount > 0 && (
          <div className="flex justify-between gap-4 font-semibold text-emerald-700">
            <span>Desconto</span>
            <span>
              - {formatCurrency(cart.pricing.discount)}
            </span>
          </div>
        )}

        <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
          <span className="font-bold text-slate-955">
            Total
          </span>

          <span className="text-2xl font-black text-slate-955">
            {formatCurrency(cart.pricing.total)}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white transition hover:bg-emerald-800 text-decoration-none"
      >
        Continuar para o checkout
        <ArrowRight size={17} />
      </Link>

      <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
        <ShieldCheck
          size={19}
          className="mt-0.5 shrink-0 text-emerald-700"
        />

        <p className="text-xs leading-5 text-slate-600 my-0">
          Seus dados são protegidos. O pagamento será realizado em ambiente seguro.
        </p>
      </div>
    </aside>
  );
}
