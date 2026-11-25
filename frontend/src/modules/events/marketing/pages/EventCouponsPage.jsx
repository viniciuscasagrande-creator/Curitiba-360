import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventMarketingService } from '../services/eventMarketingService';
import CouponManagementTable from '../components/CouponManagementTable';
import { ArrowLeft, Tag } from 'lucide-react';

export default function EventCouponsPage() {
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
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando cupons promocionais...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/marketing`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Central de Marketing
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Gestão de Cupons de Desconto 🏷️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Criação, regras de porcentagem/valor fixo e controle de limite de resgates.</p>
      </div>

      <CouponManagementTable cupons={data.cupons || []} onAddCoupon={handleAddCoupon} onToggleStatus={handleToggleCouponStatus} />
    </div>
  );
}
