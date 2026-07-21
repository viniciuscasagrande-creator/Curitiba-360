import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ticketingService } from '../services/ticketingService';
import LotTable from '../components/LotTable';
import TicketTypeCards from '../components/TicketTypeCards';
import SalesChannelPanel from '../components/SalesChannelPanel';
import { Ticket, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function EventTicketingPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ticketingService.getTicketingOverview(eventId);
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const handleToggleLotStatus = async (lotId, newStatus) => {
    try {
      await ticketingService.updateLotStatus(lotId, newStatus);
      loadData();
    } catch (err) {
      alert('Erro ao atualizar status do lote.');
    }
  };

  const handleUpdateChannelQuota = async (channelId, newQuota) => {
    try {
      await ticketingService.updateChannelQuota(channelId, newQuota);
      alert('Cota do canal atualizada com sucesso!');
      loadData();
    } catch (err) {
      alert('Erro ao atualizar cota do canal.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando loteamento e canais de venda...</p>
      </div>
    );
  }

  const lotes = data.lotesComerciais || [];
  const tipos = data.tiposIngressos || [];
  const canais = data.canaisVenda || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(`/eventos/${eventId}`)}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes do Evento
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-07 • ETAPA 02
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Lotes, Ingressos & Canais de Venda 🎫
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Virada de lotes, cotas por canal (Web, Agências, Agentes, Bilheteria) e precificação.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Dados"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* TABELA DE LOTES COMERCIAIS */}
      <LotTable lotes={lotes} onToggleStatus={handleToggleLotStatus} />

      {/* TIPOS DE INGRESSOS */}
      <TicketTypeCards tipos={tipos} />

      {/* PAINEL DE CANAIS DE VENDA */}
      <SalesChannelPanel canais={canais} onUpdateQuota={handleUpdateChannelQuota} />
    </div>
  );
}
