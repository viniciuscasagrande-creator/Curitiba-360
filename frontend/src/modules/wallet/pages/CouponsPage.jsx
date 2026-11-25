import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoupons } from '../hooks/useCoupons';
import CouponCard from '../components/CouponCard';
import { ArrowLeft, Tag } from 'lucide-react';

export function CouponsPage() {
  const navigate = useNavigate();
  const { coupons, loading } = useCoupons();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/carteira')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a Carteira
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Descontos Especiais</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Tag size={28} className="text-amber-400" />
            Cupons de Desconto
          </h1>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Carregando cupons...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {coupons.map((c) => (
            <CouponCard key={c.id} coupon={c} />
          ))}
        </div>
      )}
    </div>
  );
}
export default CouponsPage;
