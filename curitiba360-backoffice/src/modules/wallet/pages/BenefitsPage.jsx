import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBenefits } from '../hooks/useBenefits';
import BenefitCard from '../components/BenefitCard';
import { ArrowLeft, Gift } from 'lucide-react';

export function BenefitsPage() {
  const navigate = useNavigate();
  const { benefits, loading } = useBenefits();

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
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Vantagens Exclusivas</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Gift size={28} className="text-amber-400" />
            Benefícios Ativos Curitiba 360
          </h1>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Carregando benefícios...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <BenefitCard
              key={b.id}
              benefit={b}
              onUse={(benefit) => alert(`Benefício "${benefit.name}" ativado com sucesso para sua conta!`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default BenefitsPage;
