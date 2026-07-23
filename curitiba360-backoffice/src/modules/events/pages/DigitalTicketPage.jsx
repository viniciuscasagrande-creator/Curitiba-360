import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDigitalTicket } from '../hooks/useDigitalTicket';
import { Ticket, Calendar, MapPin, User, ShieldCheck, Download, Share2, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';

export function DigitalTicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ticket, loading, error, validationResult, validateTicket } = useDigitalTicket(id || 'TCK-DEMO');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando seu ingresso digital...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center space-y-4">
        <p className="text-rose-400 font-bold">{error || 'Ingresso não encontrado.'}</p>
        <button onClick={() => navigate('/events')} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold">
          Ir para Eventos
        </button>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Válido':
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">VÁLIDO 🟢</span>;
      case 'Utilizado':
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">UTILIZADO 🔵</span>;
      case 'Cancelado':
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">CANCELADO 🔴</span>;
      case 'Transferido':
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">TRANSFERIDO 🟡</span>;
      case 'Expirado':
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-slate-700 text-slate-400 border border-slate-600">EXPIRADO ⚪</span>;
      default:
        return <span className="px-3 py-1 text-xs font-extrabold uppercase rounded-full bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(ticket.qrCodeData || ticket.id)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
      {/* Voltar */}
      <button
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a Home
      </button>

      {/* Card do Ingresso Digital */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-6">
        {/* Topo do Ingresso */}
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Ticket size={24} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Ingresso Digital Oficial</span>
              <h2 className="text-lg font-black text-white">{ticket.eventName}</h2>
            </div>
          </div>

          <div>{getStatusBadge(ticket.status)}</div>
        </div>

        {/* QR Code Container */}
        <div className="text-center space-y-4 px-6">
          <div className="w-56 h-56 bg-white p-4 rounded-3xl mx-auto border-4 border-slate-800 shadow-xl relative group">
            <img src={qrUrl} alt="QR Code Ingresso" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
              <span className="text-xs text-amber-400 font-bold">Apresente este QR Code na portaria do evento</span>
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-400">ID do Bilhete: {ticket.id}</p>
        </div>

        {/* Detalhes do Bilhete */}
        <div className="px-6 pb-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-500 block mb-0.5">Portador / Participante</span>
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <User size={14} className="text-amber-400" />
                {ticket.attendeeName}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">CPF: {ticket.attendeeCpf}</span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Lote / Categoria</span>
              <span className="font-bold text-amber-400">{ticket.lotName}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Valor: R$ {ticket.price ? ticket.price.toFixed(2) : '0.00'}</span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Data do Evento</span>
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-400" />
                {ticket.eventDate}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Setor & Portão</span>
              <span className="font-bold text-slate-200">
                {ticket.sector || 'Geral'} • {ticket.gate || 'Portão A'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <MapPin size={14} className="text-amber-400 shrink-0" />
            <span>{ticket.eventVenue} — {ticket.eventAddress}</span>
          </div>
        </div>

        {/* Botão de Validação Teste / Ações */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={validateTicket}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            <RefreshCw size={14} />
            Validar / Usar Ingresso
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Download do PDF do ingresso iniciado!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
            >
              <Download size={14} />
              Baixar PDF
            </button>
          </div>
        </div>
      </div>

      {validationResult && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold text-center ${validationResult.valid ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
          {validationResult.message}
        </div>
      )}
    </div>
  );
}
export default DigitalTicketPage;
