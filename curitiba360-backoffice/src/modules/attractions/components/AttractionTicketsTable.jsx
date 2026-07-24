import React from 'react';
import { CheckCircle2, Mail, MessageSquare, QrCode, XCircle, Eye } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function AttractionTicketsTable({
  tickets,
  selectedIds,
  onToggle,
  onToggleAll,
  onValidate,
  onResend,
  onShowQr,
  onCancel,
  onViewDetails
}) {
  const allSelected =
    tickets.length > 0 && tickets.every((item) => selectedIds.includes(item.id));

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="h-4 w-4 accent-emerald-600 cursor-pointer"
                />
              </th>

              {[
                'Código',
                'Cliente / CPF',
                'Categoria',
                'Data do Pedido',
                'Status'
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500"
                >
                  {label}
                </th>
              ))}

              <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                Ações Operacionais
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => {
              const selected = selectedIds.includes(ticket.id);
              const canValidate = ticket.status === 'sold';

              return (
                <tr
                  key={ticket.id}
                  className={[
                    'border-t border-slate-100 hover:bg-slate-50/80 transition',
                    selected ? 'bg-emerald-50/50' : ''
                  ].join(' ')}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggle(ticket.id)}
                      className="h-4 w-4 accent-emerald-600 cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-4 text-xs font-bold font-mono">
                    <button
                      type="button"
                      onClick={() => onViewDetails && onViewDetails(ticket)}
                      className="text-emerald-700 hover:text-emerald-900 hover:underline text-left font-bold"
                    >
                      {ticket.code}
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => onViewDetails && onViewDetails(ticket)}
                      className="text-left group"
                    >
                      <strong className="block text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {ticket.customerName}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-medium font-mono">
                        {ticket.customerCpf}
                      </span>
                    </button>
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-slate-800">
                    {ticket.categoryName}
                  </td>

                  <td className="px-4 py-4 text-xs text-slate-500 font-medium">
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    }).format(new Date(ticket.orderDate))}
                  </td>

                  <td className="px-4 py-5">
                    <StatusBadge status={ticket.status} type="ticket" />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Detalhes do Ingresso (Consulta)"
                        onClick={() => onViewDetails && onViewDetails(ticket)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        <Eye size={16} />
                      </button>

                      {canValidate && (
                        <button
                          type="button"
                          title="Validar Ingresso (Check-in)"
                          onClick={() => onValidate(ticket.id)}
                          className="flex h-8 items-center gap-1 rounded-xl bg-emerald-50 px-2.5 text-xs font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
                        >
                          <CheckCircle2 size={14} />
                          Validar
                        </button>
                      )}

                      <button
                        type="button"
                        title="Visualizar QR Code"
                        onClick={() => onShowQr(ticket)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition"
                      >
                        <QrCode size={16} />
                      </button>

                      <button
                        type="button"
                        title="Reenviar por E-mail"
                        onClick={() => onResend(ticket, 'E-mail')}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition"
                      >
                        <Mail size={16} />
                      </button>

                      <button
                        type="button"
                        title="Reenviar por WhatsApp"
                        onClick={() => onResend(ticket, 'WhatsApp')}
                        className="flex h-8 w-8 items-center justify-center rounded-xl text-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <MessageSquare size={16} />
                      </button>

                      {ticket.status !== 'cancelled' && (
                        <button
                          type="button"
                          title="Cancelar Ingresso"
                          onClick={() => onCancel(ticket)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50 transition"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttractionTicketsTable;
