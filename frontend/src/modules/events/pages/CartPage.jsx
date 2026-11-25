import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartSummary from '../components/CartSummary';
import TicketQuantity from '../components/TicketQuantity';
import { ShoppingBag, ArrowLeft, Trash2, Ticket, ArrowRight } from 'lucide-react';

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    coupon,
    cashbackUsed,
    couponInput,
    setCouponInput,
    couponMessage,
    summary,
    validation,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    toggleCashback,
    clearCart
  } = useCart();

  const handleCheckout = () => {
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    navigate('/events/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Botão de Voltar */}
      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Continuar Comprando
      </button>

      {/* Header do Carrinho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Etapa 2 de 3</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <ShoppingBag size={28} className="text-amber-400" />
            Seu Carrinho de Ingressos
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition-colors font-medium border border-rose-500/30"
          >
            <Trash2 size={14} />
            Esvaziar Carrinho
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 text-amber-400 mx-auto flex items-center justify-center">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-200">Seu carrinho está vazio</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Você ainda não adicionou nenhum ingresso ao seu carrinho. Explore a programação de Curitiba e garanta seu lugar!
          </p>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2 text-sm"
          >
            <Ticket size={18} />
            Explorar Eventos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna de Itens */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Itens Selecionados ({items.length})
            </h2>

            {items.map((item) => (
              <div
                key={item.lotId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-400">{item.eventName}</span>
                    <h3 className="text-base font-bold text-white">{item.lotName}</h3>
                    <p className="text-xs text-slate-400">
                      {item.eventVenue} • {item.eventDate ? new Date(item.eventDate).toLocaleDateString('pt-BR') : ''}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <span className="text-lg font-extrabold text-white">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>

                    <TicketQuantity
                      quantity={item.quantity}
                      onAdd={() => updateQuantity(item.lotId, item.quantity + 1)}
                      onRemove={() => updateQuantity(item.lotId, item.quantity - 1)}
                    />

                    <button
                      onClick={() => removeItem(item.lotId)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remover item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna do Resumo */}
          <div>
            <CartSummary
              summary={summary}
              coupon={coupon}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              couponMessage={couponMessage}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              cashbackUsed={cashbackUsed}
              onToggleCashback={toggleCashback}
              onProceed={handleCheckout}
              proceedText="Avançar para o Checkout"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default CartPage;
