import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBenefits } from '../../wallet/hooks/useBenefits';
import BenefitCard from '../../wallet/components/BenefitCard';
import { Gift, ArrowRight } from 'lucide-react';

export function BenefitsCarousel() {
  const navigate = useNavigate();
  const { benefits, loading } = useBenefits();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Gift size={20} className="text-amber-400" />
            Benefícios e Cashback Municipal
          </h3>
          <p className="text-xs text-slate-400">Vantagens exclusivas para moradores e visitantes de Curitiba</p>
        </div>

        <button
          onClick={() => navigate('/carteira/beneficios')}
          className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
        >
          Ver Carteira
          <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-xs">Carregando benefícios...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.slice(0, 2).map((b) => (
            <BenefitCard key={b.id} benefit={b} onUse={() => navigate('/carteira/beneficios')} />
          ))}
        </div>
      )}
    </div>
  );
}
export default BenefitsCarousel;
