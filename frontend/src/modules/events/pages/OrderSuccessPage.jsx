import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import { CheckCircle2, QrCode, Ticket, Copy, Check, Clock, ArrowRight } from 'lucide-react';

export function OrderSuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos

  useEffect(() => {
    async function loadOrder() {
      if (!id) return;
      try {
        const res = await OrderService.getOrderById(id);
        setOrder(res.order);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  useEffect(() => {
    if (order?.status === 'pending') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [order?.status]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando informações do pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center text-rose-400 font-bold">
        Pedido não encontrado.
      </div>
    );
  }

  const isApproved = order.status === 'approved';
  const isPix = order.paymentMethod === 'pix';
  const paymentDetails = order.paymentDetails || {};

  const handleCopyPix = () => {
    if (paymentDetails.pixCopyPaste) {
      navigator.clipboard.writeText(paymentDetails.pixCopyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleApprovePixSimulated = async () => {
    const res = await OrderService.approveOrder(order.id);
    setOrder(res.order);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header do Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          {isApproved ? 'Pedido Aprovado com Sucesso! 🎉' : 'Pedido Gerado — Aguardando Pagamento'}
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Código do Pedido: <span className="font-mono text-amber-400 font-bold">{order.id}</span>
        </p>
      </div>

      {/* Seção PIX se pendente */}
      {!isApproved && isPix && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-6 text-center shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase">
            <Clock size={16} />
            Tempo restante para pagar via PIX: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          {/* QRCode */}
          <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto border border-slate-700 shadow-lg">
            <img
              src={paymentDetails.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CURITIBA360'}
              alt="QR Code PIX"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 block font-semibold">Código Copia e Cola:</span>
            <div className="flex items-center gap-2 max-w-md mx-auto bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono text-slate-300 truncate flex-1">
                {paymentDetails.pixCopyPaste || '00020126580014BR.GOV.BCB.PIX...'}
              </span>
              <button
                onClick={handleCopyPix}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-1 shrink-0"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleApprovePixSimulated}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all"
            >
              ⚡ Simular Confirmação de Pagamento PIX (Ambiente Teste)
            </button>
          </div>
        </div>
      )}

      {/* Resumo do Pedido */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Resumo dos Ingressos do Pedido
        </h3>

        {order.items && order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="font-bold text-slate-200 block">{item.eventName}</span>
              <span className="text-slate-400">{item.lotName} x {item.quantity}</span>
            </div>
            <span className="font-bold text-amber-400">R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
          <span>Valor Total Pago:</span>
          <span className="text-amber-400 text-lg">R$ {order.total ? order.total.toFixed(2) : '0.00'}</span>
        </div>
      </div>

      {/* Botão Ação Ingresso */}
      {isApproved && (
        <div className="text-center pt-4">
          <button
            onClick={() => {
              const ticketId = order.tickets && order.tickets.length > 0 ? order.tickets[0].id : `TCK-${order.id}`;
              navigate(`/events/tickets/${ticketId}`);
            }}
            className="px-8 py-4 font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-xl shadow-amber-500/20 transition-all inline-flex items-center gap-2 text-base"
          >
            <Ticket size={22} />
            Ver Meu Ingresso Digital com QR Code
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
export default OrderSuccessPage;
