import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCashback } from '../hooks/useCashback';
import StatementItem from '../components/StatementItem';
import { Coins, ArrowLeft, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export function CashbackPage() {
  const navigate = useNavigate();
  const { cashback, history, loading } = useCashback();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/carteira')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para a Carteira
      </button>

      {/* Hero Banner Cashback */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={16} />
            Programa Oficial Curitiba 360
          </div>
          <h1 className="text-3xl font-extrabold text-white">Seu Saldo de Cashback</h1>
          <p className="text-slate-300 text-xs max-w-md">
            Acumule créditos em compras de ingressos, refeições parceiras e turismo na cidade.
          </p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center shrink-0">
          <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Saldo Disponível</span>
          <span className="text-3xl font-black text-amber-400 flex items-center justify-center gap-2">
            <Coins size={28} />
            R$ {cashback.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Regras do Cashback */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs text-slate-300">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldAlert size={16} className="text-amber-400" />
          Como Funciona o Cashback
        </h3>
        <p className="text-slate-400">
          Toda compra realizada no app gera cashback automático. O saldo fica pendente até a confirmação do serviço e, após aprovado, fica livre para abatimento direto no checkout de novos pedidos.
        </p>
      </div>

      {/* Extrato de Cashback */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Histórico de Cashback Recebido</h3>

        {loading ? (
          <p className="text-xs text-slate-400">Carregando histórico...</p>
        ) : history.length === 0 ? (
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
            Nenhum cashback acumulado até o momento.
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl divide-y divide-slate-800 overflow-hidden shadow-xl">
            {history.map((tx) => (
              <StatementItem key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CashbackPage;
