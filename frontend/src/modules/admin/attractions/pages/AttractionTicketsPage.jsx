import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  MessageSquare,
  QrCode,
  RotateCcw,
  Search,
  ShieldAlert,
  Ticket,
  XCircle
} from 'lucide-react';

import {
  attractionTicketsMock,
  attractionsMock,
  ticketStatusLabels,
  ticketStatusStyles
} from '../data/attractionsMock';

export function AttractionTicketsPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();

  const attraction = useMemo(
    () => attractionsMock.find((item) => item.id === attractionId) || attractionsMock[0],
    [attractionId]
  );

  const [tickets, setTickets] = useState(
    attractionTicketsMock.filter((t) => t.attractionId === attraction.id)
  );

  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [cancelModalTicket, setCancelModalTicket] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [qrModalTicket, setQrModalTicket] = useState(null);

  const filteredTickets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => {
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;
      if (!q) return true;
      return (
        t.code +
        ' ' +
        t.customerName +
        ' ' +
        t.customerCpf +
        ' ' +
        t.categoryName
      )
        .toLowerCase()
        .includes(q);
    });
  }, [tickets, query, statusFilter]);

  function handleValidate(ticketId) {
    setTickets((current) =>
      current.map((item) =>
        item.id === ticketId ? { ...item, status: 'validated' } : item
      )
    );
    window.alert('Ingresso validado com sucesso!');
  }

  function handleResend(ticket, channel) {
    window.alert(`Ingresso ${ticket.code} reenviado com sucesso via ${channel}!`);
  }

  function handleCancelSubmit(event) {
    event.preventDefault();
    if (!cancelReason.trim()) {
      window.alert('Informe a justificativa de cancelamento.');
      return;
    }

    setTickets((current) =>
      current.map((item) =>
        item.id === cancelModalTicket.id ? { ...item, status: 'cancelled' } : item
      )
    );
    window.alert(`Ingresso ${cancelModalTicket.code} cancelado com sucesso.`);
    setCancelModalTicket(null);
    setCancelReason('');
  }

  function handleBlockSelected() {
    if (!selectedIds.length) return;
    setTickets((current) =>
      current.map((item) =>
        selectedIds.includes(item.id) ? { ...item, status: 'blocked' } : item
      )
    );
    setSelectedIds([]);
    window.alert('Ingressos selecionados bloqueados.');
  }

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/admin/atracoes/${attraction.id}`)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Operação de Ingressos &bull; {attraction.name}
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Pesquisar & Validar Ingressos (ATR-006)
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar por código, cliente ou CPF..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none font-medium focus:border-emerald-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="sold">Vendido</option>
            <option value="validated">Validado</option>
            <option value="reserved">Reservado</option>
            <option value="pending">Pendente</option>
            <option value="cancelled">Cancelado</option>
            <option value="blocked">Bloqueado</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={handleBlockSelected}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white hover:bg-rose-700"
            >
              <XCircle size={16} />
              Bloquear Selecionados ({selectedIds.length})
            </button>
          )}
        </div>
      </header>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="w-12 px-4 py-4">
                  <input
                    type="checkbox"
                    checked={
                      filteredTickets.length > 0 &&
                      filteredTickets.every((t) => selectedIds.includes(t.id))
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredTickets.map((t) => t.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="h-4 w-4 accent-emerald-600 cursor-pointer"
                  />
                </th>

                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Código
                </th>
                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Cliente / CPF
                </th>
                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Categoria
                </th>
                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Data do Pedido
                </th>
                <th className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Status
                </th>
                <th className="px-4 py-4 text-right text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Ações Operacionais
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => {
                const selected = selectedIds.includes(ticket.id);
                const canValidate = ticket.status === 'sold';

                return (
                  <tr
                    key={ticket.id}
                    className={[
                      'border-t border-slate-100 hover:bg-slate-50 transition',
                      selected ? 'bg-emerald-50/50' : ''
                    ].join(' ')}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {
                          setSelectedIds((current) =>
                            current.includes(ticket.id)
                              ? current.filter((id) => id !== ticket.id)
                              : [...current, ticket.id]
                          );
                        }}
                        className="h-4 w-4 accent-emerald-600 cursor-pointer"
                      />
                    </td>

                    <td className="px-4 py-4 text-xs font-bold font-mono text-emerald-800">
                      {ticket.code}
                    </td>

                    <td className="px-4 py-4">
                      <strong className="block text-xs font-bold text-slate-900">
                        {ticket.customerName}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-medium font-mono">
                        {ticket.customerCpf}
                      </span>
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

                    <td className="px-4 py-4">
                      <span
                        className={[
                          'rounded-full px-3 py-1 text-[11px] font-bold border',
                          ticketStatusStyles[ticket.status] || 'bg-slate-100 text-slate-600'
                        ].join(' ')}
                      >
                        {ticketStatusLabels[ticket.status] || ticket.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {canValidate && (
                          <button
                            type="button"
                            title="Validar Ingresso (Check-in)"
                            onClick={() => handleValidate(ticket.id)}
                            className="flex h-8 items-center gap-1 rounded-xl bg-emerald-50 px-2.5 text-xs font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          >
                            <CheckCircle2 size={14} />
                            Validar
                          </button>
                        )}

                        <button
                          type="button"
                          title="Visualizar QR Code"
                          onClick={() => setQrModalTicket(ticket)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                        >
                          <QrCode size={16} />
                        </button>

                        <button
                          type="button"
                          title="Reenviar por E-mail"
                          onClick={() => handleResend(ticket, 'E-mail')}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                        >
                          <Mail size={16} />
                        </button>

                        <button
                          type="button"
                          title="Reenviar por WhatsApp"
                          onClick={() => handleResend(ticket, 'WhatsApp')}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-emerald-600 hover:bg-emerald-50"
                        >
                          <MessageSquare size={16} />
                        </button>

                        {ticket.status !== 'cancelled' && (
                          <button
                            type="button"
                            title="Cancelar Ingresso"
                            onClick={() => setCancelModalTicket(ticket)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50"
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

      {/* QR Code Modal */}
      {qrModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center space-y-4">
            <h3 className="font-black text-slate-900 text-lg">QR Code de Validação</h3>
            <p className="text-xs text-slate-500 font-medium">Ingresso: {qrModalTicket.code}</p>

            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs p-4">
              [QR CODE ENCRIPTADO: {qrModalTicket.qrCode}]
            </div>

            <button
              type="button"
              onClick={() => setQrModalTicket(null)}
              className="w-full h-11 rounded-2xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Cancel Ticket Modal */}
      {cancelModalTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCancelSubmit}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl text-left space-y-4"
          >
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <ShieldAlert className="text-rose-600" size={20} />
              Cancelar Ingresso {cancelModalTicket.code}
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              O cancelamento irá invalidar o QR Code do cliente ({cancelModalTicket.customerName}) e registrar a justificativa no relatório de auditoria.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Motivo do Cancelamento *</label>
              <textarea
                required
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Informe a razão comercial ou solicitação do cliente..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs font-medium outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalTicket(null)}
                className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Manter Ingresso
              </button>
              <button
                type="submit"
                className="flex-1 h-11 rounded-2xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AttractionTicketsPage;
