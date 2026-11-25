import { useState, useEffect } from 'react';
import { getFinancialMetrics, getLedgerTransactions } from '../../../services/financialLedgerService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { DollarSign, TrendingUp, PieChart, RotateCcw, Building2, ArrowUpRight } from 'lucide-react';

export default function FinancialDashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const mData = await getFinancialMetrics();
      const lData = await getLedgerTransactions();
      setMetrics(mData);
      setLedger(lData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando dados financeiros e Ledger...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Plataforma Financeira & Ledger 360 💵
        </h1>
        <p className="mt-2 text-gray-500">
          Visão consolidada de GMV, receitas da plataforma, comissões, cashback e movimentações do Ledger.
        </p>
      </div>

      {/* Top 6 KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">GMV (Volume Bruto)</span>
            <DollarSign size={22} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">{formatCurrency(metrics?.gmv)}</h2>
          <p className="text-xs text-emerald-600 font-semibold">Total de transações movimentadas</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Receita Plataforma</span>
            <TrendingUp size={22} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700">{formatCurrency(metrics?.revenue)}</h2>
          <p className="text-xs text-blue-600 font-semibold">10% de taxa de conveniência</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Comissões Marketplace</span>
            <PieChart size={22} className="text-purple-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-purple-700">{formatCurrency(metrics?.commissions)}</h2>
          <p className="text-xs text-purple-600 font-semibold">Retenção B2B de parceiros</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Cashback Gerado</span>
            <RotateCcw size={22} className="text-amber-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-amber-600">{formatCurrency(metrics?.cashback)}</h2>
          <p className="text-xs text-amber-600 font-semibold">Crédito retido na carteira dos clientes</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Repasses a Parceiros</span>
            <Building2 size={22} className="text-indigo-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-700">{formatCurrency(metrics?.payouts)}</h2>
          <p className="text-xs text-indigo-600 font-semibold">Líquido agendado para desembolso</p>
        </Card>

        <Card className="p-6 space-y-2 bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
          <div className="flex items-center justify-between text-emerald-200">
            <span className="text-xs font-semibold uppercase">Resultado Líquido</span>
            <ArrowUpRight size={22} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black">{formatCurrency(metrics?.netIncome)}</h2>
          <p className="text-xs text-emerald-300 font-semibold">Receita da plataforma pós-cashback</p>
        </Card>
      </div>

      {/* DRE Gerencial Table */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">DRE Gerencial Resumido</h2>
        <div className="divide-y divide-gray-100 text-sm">
          <div className="flex justify-between py-2.5">
            <span className="font-semibold text-gray-700">(+) Receita Bruta (GMV)</span>
            <span className="font-bold text-gray-900">{formatCurrency(metrics?.gmv)}</span>
          </div>
          <div className="flex justify-between py-2.5 text-red-600">
            <span>(-) Repasses aos Parceiros (85%)</span>
            <span className="font-semibold">-{formatCurrency(metrics?.payouts)}</span>
          </div>
          <div className="flex justify-between py-2.5 text-amber-600">
            <span>(-) Provisão de Cashback (2%)</span>
            <span className="font-semibold">-{formatCurrency(metrics?.cashback)}</span>
          </div>
          <div className="flex justify-between py-3 font-extrabold text-base border-t-2 border-gray-200 text-emerald-600">
            <span>(=) Receita Operacional Líquida</span>
            <span>{formatCurrency(metrics?.netIncome)}</span>
          </div>
        </div>
      </Card>

      {/* Ledger Feed Table */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Transações do Financial Ledger (Imutável)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Transação</th>
                <th className="p-3">Cliente / Entidade</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ledger.map(tx => (
                <tr key={tx.transactionId} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{tx.transactionId}</td>
                  <td className="p-3 font-semibold text-gray-800">{tx.userName || tx.userId}</td>
                  <td className="p-3 font-semibold text-blue-700 uppercase text-xs">{tx.type}</td>
                  <td className={`p-3 font-bold ${tx.direction === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.direction === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
