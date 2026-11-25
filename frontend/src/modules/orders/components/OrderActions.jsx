import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Download, Calendar, Ban, CreditCard, RotateCcw, MessageSquarePlus } from "lucide-react";

export default function OrderActions({ order, onOpenCancel }) {
  const status = order.status;
  const isTicket = order.type === "ticket" || order.type === "experience";

  const handleDownloadReceipt = () => {
    const receiptContent = `
CURITIBA 360 - COMPROVANTE DE PEDIDO
====================================
Código do Pedido: ${order.code}
Data da Compra: ${new Date(order.createdAt).toLocaleDateString("pt-BR")}
Total Pago: R$ ${order.pricing.total.toFixed(2)}
Status: ${order.status.toUpperCase()}
Cliente: ${order.customer.name}
Documento: ${order.customer.document}
====================================
Obrigado por sua compra!
    `;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comprovante-${order.code}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddToCalendar = () => {
    window.alert("Evento adicionado ao seu calendário pessoal (simulado).");
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020101021226850014br.gov.bcb.pix2563pix.curitiba360.com.br5204000053039865406119.805802BR5912Curitiba 3606008Curitiba62070503***6304");
    window.alert("Código Pix Copia e Cola copiado para a área de transferência!");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <h2 className="text-base font-bold text-slate-900 my-0">
        Ações Disponíveis
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {status === "confirmed" && (
          <>
            {isTicket && (
              <Link
                to={`/perfil/pedidos/${order.id}/ingressos`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 transition text-decoration-none"
              >
                <Ticket size={17} />
                Acessar Ingressos
              </Link>
            )}

            <button
              onClick={handleDownloadReceipt}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download size={17} />
              Baixar Comprovante
            </button>

            <button
              onClick={handleAddToCalendar}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Calendar size={17} />
              Adicionar ao Calendário
            </button>

            {order.cancellation?.allowed && (
              <button
                onClick={onOpenCancel}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-sm font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
              >
                <Ban size={17} />
                Solicitar Cancelamento
              </button>
            )}
          </>
        )}

        {status === "pending" && (
          <>
            {order.payment.method === "pix" && (
              <button
                onClick={handleCopyPix}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 transition cursor-pointer border-none"
              >
                <CreditCard size={17} />
                Copiar Código Pix
              </button>
            )}

            <button
              onClick={onOpenCancel}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Ban size={17} />
              Cancelar Pedido
            </button>
          </>
        )}

        {status === "completed" && (
          <>
            {order.review?.allowed && !order.review?.submitted && (
              <Link
                to={`/perfil/pedidos/${order.id}/avaliar`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 transition text-decoration-none"
              >
                <MessageSquarePlus size={17} />
                Avaliar Experiência
              </Link>
            )}

            <Link
              to="/buscar"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition text-decoration-none"
            >
              <RotateCcw size={17} />
              Comprar Novamente
            </Link>

            <button
              onClick={handleDownloadReceipt}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Download size={17} />
              Baixar Comprovante
            </button>
          </>
        )}

        {(status === "cancelled" || status === "refunded") && (
          <>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600">
              <p className="font-bold my-0 text-slate-700">Pedido cancelado</p>
              {order.cancellation?.reason && (
                <p className="mt-1 my-0">Motivo: "{order.cancellation.reason}"</p>
              )}
            </div>

            <Link
              to="/buscar"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-800 transition text-decoration-none"
            >
              <RotateCcw size={17} />
              Comprar Novamente
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
