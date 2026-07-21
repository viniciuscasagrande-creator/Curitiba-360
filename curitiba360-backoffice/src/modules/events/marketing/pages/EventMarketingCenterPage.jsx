import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventMarketingService } from '../services/eventMarketingService';
import EventMarketingKpiGrid from '../components/EventMarketingKpiGrid';
import CouponManagementTable from '../components/CouponManagementTable';
import AffiliateLinksPanel from '../components/AffiliateLinksPanel';
import UtmTrackingTable from '../components/UtmTrackingTable';
import { Target, ArrowLeft, RefreshCw, Tag } from 'lucide-react';

export default function EventMarketingCenterPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventMarketingService.getMarketingOverview(eventId);
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

  const handleAddCoupon = async (couponData) => {
    try {
      await eventMarketingService.addCoupon(eventId, couponData);
      loadData();
    } catch (err) {
      alert('Erro ao adicionar cupom.');
    }
  };

  const handleToggleCouponStatus = async (couponId, newStatus) => {
    try {
      await eventMarketingService.toggleCouponStatus(couponId, newStatus);
      loadData();
    } catch (err) {
      alert('Erro ao alterar status do cupom.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando marketing e cupons do evento...</p>
      </div>
    );
  }

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
              MOD-07 • ETAPA 07
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Marketing, CRM, Cupons & Afiliados 🎯
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Rastreamento de campanhas UTM, CAC, ROI, cupons promocionais e rede de afiliados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/eventos/${eventId}/cupons`)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Tag className="w-4 h-4" /> Gerenciar Cupons
          </button>
          <button
            onClick={loadData}
            title="Atualizar Dados"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS DE MARKETING */}
      <EventMarketingKpiGrid kpis={data.kpis || {}} />

      {/* CUPONS DE DESCONTO */}
      <CouponManagementTable cupons={data.cupons || []} onAddCoupon={handleAddCoupon} onToggleStatus={handleToggleCouponStatus} />

      {/* AFILIADOS E RASTREAMENTO UTM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AffiliateLinksPanel afiliados={data.afiliados || []} />
        <UtmTrackingTable utms={data.utmTracking || []} />
      </div>
    </div>
  );
}
