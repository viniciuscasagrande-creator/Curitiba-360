import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletService } from '../services/WalletService';
import StatementItem from '../components/StatementItem';
import { ArrowLeft, Wallet, Filter, Calendar } from 'lucide-react';

export function StatementPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('all'); // 'all', 'today', '7days', '30days', '90days'
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await WalletService.getTransactions(period);
        setTransactions(list);
      } catch (e) {
        console.error('Erro ao carregar extrato:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [period]);

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
          <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Histórico Financeiro</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Wallet size={28} className="text-amber-400" />
            Extrato da Carteira
          </h1>
        </div>

        {/* Filtros de Período */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs font-bold overflow-x-auto">
          {[
            { id: 'all', label: 'Tudo' },
            { id: 'today', label: 'Hoje' },
            { id: '7days', label: '7 Dias' },
            { id: '30days', label: '30 Dias' },
            { id: '90days', label: '90 Dias' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPeriod(item.id)}
              className={`px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                period === item.id ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400">Carregando movimentações do extrato...</div>
      ) : transactions.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <Calendar size={32} className="text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">Nenhuma movimentação no período selecionado</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tente selecionar outro filtro de período para consultar o histórico financeiro.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl divide-y divide-slate-800 overflow-hidden shadow-xl">
          {transactions.map((tx) => (
            <StatementItem key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
}
export default StatementPage;
