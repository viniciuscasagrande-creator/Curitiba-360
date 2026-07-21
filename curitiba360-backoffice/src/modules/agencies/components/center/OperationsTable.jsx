import React, { useState } from 'react';
import { Download, Search, FileText, CheckCircle2, Zap, CreditCard } from 'lucide-react';
import { financeCenterService } from '../../services/financeCenterService';

export default function OperationsTable({ operations = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = operations.filter((op) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      op.id.toLowerCase().includes(term) ||
      op.descricao.toLowerCase().includes(term) ||
      op.agencia.toLowerCase().includes(term) ||
      op.tipo.toLowerCase().includes(term) ||
      op.meio.toLowerCase().includes(term)
    );
  });

  const handleExportCSV = () => {
    financeCenterService.exportOperationsCSV(filtered);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs space-y-3 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Operações Financeiras Recentes & Trilha Contábil
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Histórico de vendas, comissões, repasses PIX e estornos.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Exportar Extrato CSV
          </button>
        </div>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtrar operações por ID, Descrição, Agência ou Meio de Pagamento..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200/60">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
              <th className="p-3">ID / Data</th>
              <th className="p-3">Tipo Operação</th>
              <th className="p-3">Descrição / Ref</th>
              <th className="p-3">Agência / Canal</th>
              <th className="p-3">Meio Pagamento</th>
              <th className="p-3 text-right">Valor (R$)</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  Nenhuma operação encontrada.
                </td>
              </tr>
            ) : (
              filtered.map((op) => (
                <tr key={op.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono">
                    <div className="font-bold text-slate-900">{op.id}</div>
                    <div className="text-[10px] text-slate-400">{op.data}</div>
                  </td>

                  <td className="p-3 font-bold text-slate-800">{op.tipo}</td>

                  <td className="p-3 font-semibold text-slate-800">{op.descricao}</td>

                  <td className="p-3 font-medium text-slate-700">{op.agencia}</td>

                  <td className="p-3 font-semibold text-slate-700">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px]">
                      {op.meio === 'PIX' ? <Zap className="w-3 h-3 text-emerald-600" /> : <CreditCard className="w-3 h-3 text-blue-600" />}
                      {op.meio}
                    </span>
                  </td>

                  <td className={`p-3 text-right font-extrabold text-sm ${
                    op.valor < 0 ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {op.valor < 0 ? `- R$ ${Math.abs(op.valor).toFixed(2)}` : `+ R$ ${op.valor.toFixed(2)}`}
                  </td>

                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> {op.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
