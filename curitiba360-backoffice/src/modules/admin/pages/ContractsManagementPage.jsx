import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  ExternalLink,
  Calendar,
  Building2
} from 'lucide-react';

const mockContracts = [
  {
    id: 'CTR-2025-001',
    company: 'Jardim Botânico Curitiba Eireli',
    cnpj: '12.345.678/0001-90',
    category: 'Parque Público / Concessão',
    startDate: '01/01/2025',
    endDate: '31/12/2026',
    status: 'active',
    signed: true,
    value: 'R$ 2.400.000,00'
  },
  {
    id: 'CTR-2025-002',
    company: 'Ópera de Arame Entretenimento S.A.',
    cnpj: '98.765.432/0001-10',
    category: 'Teatro & Shows',
    startDate: '15/02/2025',
    endDate: '15/02/2027',
    status: 'active',
    signed: true,
    value: 'R$ 1.850.000,00'
  },
  {
    id: 'CTR-2025-003',
    company: 'Associação Amigos do MON',
    cnpj: '45.112.334/0001-55',
    category: 'Museu & Exposição',
    startDate: '10/03/2025',
    endDate: '10/03/2026',
    status: 'active',
    signed: true,
    value: 'R$ 960.000,00'
  },
  {
    id: 'CTR-2024-089',
    company: 'Parque Tanguá Concessionária',
    cnpj: '33.998.776/0001-22',
    category: 'Parque & Turismo',
    startDate: '01/06/2024',
    endDate: '31/08/2026',
    status: 'expiring',
    signed: true,
    value: 'R$ 1.200.000,00'
  }
];

export function ContractsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = mockContracts.filter(
    (c) =>
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Operação Jurídica & Parcerias
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Gestão de Contratos
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert('Abrir modal de novo contrato')}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
        >
          <Plus size={16} />
          Novo Contrato
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por empresa ou número de contrato..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Nº Contrato / Empresa</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5">Vigência</th>
                <th className="px-6 py-3.5">Valor Estimado</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <Building2 size={18} />
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{c.company}</p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {c.id} • CNPJ: {c.cnpj}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-600">
                    {c.category}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{c.startDate} até {c.endDate}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-black text-slate-900">
                    {c.value}
                  </td>

                  <td className="px-6 py-4">
                    {c.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 size={12} />
                        Vigente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                        <AlertTriangle size={12} />
                        Renovação Próxima
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Baixando PDF do contrato ${c.id}`)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Download size={13} />
                      Documento PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContractsManagementPage;
