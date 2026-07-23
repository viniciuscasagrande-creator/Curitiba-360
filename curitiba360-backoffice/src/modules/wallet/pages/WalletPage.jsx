import React from 'react';
import { useWallet } from '../hooks/useWallet';
import WalletBalance from '../components/WalletBalance';
import StatementItem from '../components/StatementItem';
import BenefitCard from '../components/BenefitCard';
import CouponCard from '../components/CouponCard';
import { useBenefits } from '../hooks/useBenefits';
import { useCoupons } from '../hooks/useCoupons';
import { Wallet, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WalletPage() {
  const navigate = useNavigate();
  const { wallet, transactions, loading } = useWallet();
  const { benefits } = useBenefits();
  const { coupons } = useCoupons();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-slate-400">
        <p>Carregando sua carteira digital...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header da Carteira */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={16} />
            Super App Curitiba 360
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Carteira Digital & Benefícios
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gerencie seu saldo, programa de cashback municipal, cupons e histórico financeiro.
          </p>
        </div>
      </div>

      {/* Card de Saldo Central */}
      <WalletBalance
        balance={wallet?.balance || 0}
        cashback={wallet?.cashback || 0}
        blocked={wallet?.blocked || 0}
      />

      {/* Grid com Extrato Recente e Cupons/Benefícios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Extrato Recente (2 Colunas) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wallet size={20} className="text-amber-400" />
              Últimas Movimentações
            </h3>
            <button
              onClick={() => navigate('/carteira/extrato')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              Ver Extrato Completo
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl divide-y divide-slate-800/80 overflow-hidden shadow-xl">
            {transactions.slice(0, 5).map((tx) => (
              <StatementItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>

        {/* Benefícios & Cupons em Destaque (1 Coluna) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Benefícios em Destaque</h3>
            <button
              onClick={() => navigate('/carteira/beneficios')}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Ver Todos
            </button>
          </div>

          {benefits.slice(0, 1).map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} onUse={() => navigate('/carteira/beneficios')} />
          ))}

          <div className="flex items-center justify-between pt-2">
            <h3 className="text-base font-bold text-white">Cupons Disponíveis</h3>
            <button
              onClick={() => navigate('/carteira/cupons')}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Ver Cupons
            </button>
          </div>

          {coupons.slice(0, 1).map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default WalletPage;
