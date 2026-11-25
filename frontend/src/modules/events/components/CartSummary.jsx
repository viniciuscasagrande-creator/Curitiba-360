import React from 'react';
import { ShoppingBag, Tag, Sparkles, ShieldCheck } from 'lucide-react';

export function CartSummary({
  summary,
  coupon,
  couponInput,
  setCouponInput,
  couponMessage,
  onApplyCoupon,
  onRemoveCoupon,
  cashbackUsed,
  onToggleCashback,
  onProceed,
  proceedText = 'Ir para o Checkout'
}) {
  const { subtotal, taxes, discount, total, itemCount } = summary;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl backdrop-blur-md">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
        <ShoppingBag size={20} className="text-amber-400" />
        Resumo do Pedido
      </h3>

      {/* Seção Cupom */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Cupom de Desconto
        </label>
        {coupon ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <Tag size={16} />
              <span>{coupon.code} ({coupon.description})</span>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-slate-400 hover:text-rose-400 font-bold"
            >
              Remover
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Digite o cupom (ex: CURITIBA10)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 uppercase placeholder:normal-case focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={() => onApplyCoupon(couponInput)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
            >
              Aplicar
            </button>
          </div>
        )}
        {couponMessage && (
          <p className={`text-xs ${couponMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Seção Cashback */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <div>
            <span className="text-xs font-semibold text-slate-200 block">Usar Saldo de Cashback</span>
            <span className="text-[10px] text-slate-400">Saldo disponível: R$ 15,00</span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={cashbackUsed > 0}
          onChange={(e) => onToggleCashback && onToggleCashback(e.target.checked, 15.0)}
          className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
        />
      </div>

      {/* Valores */}
      <div className="space-y-3 pt-2 text-sm text-slate-300 border-t border-slate-800">
        <div className="flex justify-between">
          <span className="text-slate-400">Subtotal ({itemCount} ingressos)</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Taxa de conveniência</span>
          <span>R$ {taxes.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Desconto do Cupom</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
        )}

        {cashbackUsed > 0 && (
          <div className="flex justify-between text-amber-400">
            <span>Desconto Cashback</span>
            <span>- R$ {cashbackUsed.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-3 border-t border-slate-800 text-base font-extrabold text-white">
          <span>Total a pagar</span>
          <span className="text-xl text-amber-400">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onProceed}
        disabled={itemCount === 0}
        className="w-full py-4 font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 text-base"
      >
        <ShieldCheck size={20} />
        {proceedText}
      </button>
    </div>
  );
}
export default CartSummary;
