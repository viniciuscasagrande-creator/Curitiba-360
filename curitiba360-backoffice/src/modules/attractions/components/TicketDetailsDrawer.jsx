import React from 'react';
import {
  X,
  QrCode,
  Download,
  Mail,
  XCircle,
  ShieldAlert,
  RotateCcw,
  User,
  CreditCard,
  Ticket as TicketIcon,
  Calendar,
  DollarSign,
  Building2,
  Phone,
  FileText
} from 'lucide-react';

export function TicketDetailsDrawer({ ticket, onClose, onAction }) {
  if (!ticket) return null;

  const isCancelled = ticket.status === 'cancelled';
  const isBlocked = ticket.status === 'blocked';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col text-left">
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <TicketIcon size={20} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consulta de Ingresso</p>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                {ticket.code}
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase">
                  {ticket.status || 'Ativo'}
                </span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information (Left 2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Section 1: Pedido */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <CreditCard size={14} className="text-emerald-600" />
                  Dados do Pedido
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Código do Pedido</span>
                    <strong className="text-slate-800 font-mono font-bold">{ticket.orderCode || ticket.code?.replace('C360-', 'ORD-')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Forma de Pagamento</span>
                    <strong className="text-slate-800 font-bold">{ticket.paymentMethod || 'PIX Instantâneo'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Vendedor / Origem</span>
                    <span className="text-slate-700 font-medium">{ticket.seller || 'App Curitiba 360 (Online)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Data / Hora</span>
                    <span className="text-slate-700 font-medium">
                      {ticket.orderDate ? new Date(ticket.orderDate).toLocaleString('pt-BR') : '21/07/2026 14:30'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Observações</span>
                    <span className="text-slate-600 text-[11px] italic">
                      {ticket.notes || 'Venda validada com comissão padrão de 10%.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Cliente */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <User size={14} className="text-emerald-600" />
                  Dados do Cliente
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Nome Completo</span>
                    <strong className="text-slate-900 font-bold text-sm">{ticket.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">E-mail</span>
                    <span className="text-slate-700 font-medium truncate block">{ticket.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">CPF / CNPJ</span>
                    <span className="text-slate-700 font-mono font-medium">{ticket.customerCpf}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Telefone</span>
                    <span className="text-slate-700 font-medium">(41) 3344-5566</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Celular / WhatsApp</span>
                    <span className="text-slate-700 font-medium">(41) 99887-6655</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Dados do Ingresso */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <TicketIcon size={14} className="text-emerald-600" />
                  Dados do Ingresso
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Atração</span>
                    <strong className="text-slate-800 font-bold">{ticket.attractionName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Categoria</span>
                    <span className="inline-flex rounded-lg bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-bold">
                      {ticket.categoryName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Localização / Setor</span>
                    <span className="text-slate-700 font-medium">{ticket.location || 'Ópera de Arame - Setor Geral'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">PDV de Emissão</span>
                    <span className="text-slate-700 font-medium">{ticket.pdv || 'Bilheteria Digital CWB'}</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Financeiro */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <DollarSign size={14} className="text-emerald-600" />
                  Demonstrativo Financeiro
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Valor Facial</span>
                    <strong className="text-slate-800 font-bold">
                      R$ {Number(ticket.price || 0).toFixed(2)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Taxa Adm. (10%)</span>
                    <span className="text-slate-600 font-medium">
                      R$ {Number((ticket.price || 0) * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-600 block text-[10px] font-bold uppercase">Valor Total</span>
                    <strong className="text-emerald-900 font-black text-sm">
                      R$ {Number((ticket.price || 0) * 1.1).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Quick Actions (Right 1 col) */}
            <div className="space-y-5">
              {/* QR Code Container */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  QR Code de Acesso
                </span>
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-3 text-slate-800">
                  <div className="text-center">
                    <QrCode size={80} className="mx-auto text-slate-800 mb-1" />
                    <span className="text-[9px] font-mono font-bold text-slate-600">{ticket.qrCode || ticket.code}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Apresente este código no leitor da catraca para liberação.
                </p>
              </div>

              {/* Action Buttons Panel */}
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1 mb-2">
                  Ações Rápidas
                </span>

                <button
                  type="button"
                  onClick={() => onAction && onAction('pdf', ticket)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <Download size={16} className="text-emerald-600" />
                  Baixar PDF
                </button>

                <button
                  type="button"
                  onClick={() => onAction && onAction('email', ticket)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  <Mail size={16} className="text-blue-600" />
                  Reenviar E-mail
                </button>

                {!isCancelled && (
                  <button
                    type="button"
                    onClick={() => onAction && onAction('cancel', ticket)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                  >
                    <XCircle size={16} />
                    Cancelar Ingresso
                  </button>
                )}

                {!isBlocked && (
                  <button
                    type="button"
                    onClick={() => onAction && onAction('block', ticket)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
                  >
                    <ShieldAlert size={16} />
                    Bloquear Ingresso
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onAction && onAction('refund', ticket)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-purple-200 bg-purple-50/50 px-4 py-2.5 text-xs font-bold text-purple-800 hover:bg-purple-100 transition"
                >
                  <RotateCcw size={16} />
                  Estornar (Reembolso)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            Fechar Consulta
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsDrawer;
