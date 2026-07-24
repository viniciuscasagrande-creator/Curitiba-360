import { useState } from 'react';
import {
  Ban,
  Eye,
  ShieldCheck,
  Trash2,
  XCircle,
  ArrowUpDown,
  MoreHorizontal,
  CheckCircle2,
  Users,
} from 'lucide-react';
import AgencyStatusBadge from './AgencyStatusBadge';
import { AGENCY_STATUS } from '../../shared/constants/partnerStatus';

export default function AgencyTable({
  agencies = [],
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectItem,
  onViewDrawer,
  onApprove,
  onRejectModal,
  onSuspendModal,
  onInactivate,
  onRemove,
}) {
  const [sortField, setSortField] = useState('tradeName');
  const [sortDirection, setSortDirection] = useState('asc');

  function handleSort(field) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

  const sortedAgencies = [...agencies].sort((a, b) => {
    let valA = a[sortField] ?? '';
    let valB = b[sortField] ?? '';

    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const allSelected = agencies.length > 0 && selectedIds.length === agencies.length;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                />
              </th>

              <SortableTh label="ID" field="id" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="Agência / Razão Social" field="tradeName" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="CNPJ" field="cnpj" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="Responsável" field="responsibleName" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="Cidade / UF" field="city" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="Agentes" field="agentsCount" currentSort={sortField} onSort={handleSort} />
              <SortableTh label="Status" field="status" currentSort={sortField} onSort={handleSort} />

              <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500 text-right">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {sortedAgencies.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-12 text-center text-xs font-bold text-slate-400">
                  Nenhuma agência encontrada com os filtros selecionados.
                </td>
              </tr>
            ) : (
              sortedAgencies.map((agency) => {
                const isSelected = selectedIds.includes(agency.id);

                return (
                  <tr
                    key={agency.id}
                    className={`transition hover:bg-slate-50/80 ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelectItem(agency.id)}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                      />
                    </td>

                    <td className="p-4 font-mono text-xs font-black text-slate-900">
                      {agency.id}
                    </td>

                    <td className="p-4">
                      <div>
                        <strong className="block text-xs font-black text-slate-900">
                          {agency.tradeName}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-semibold truncate block max-w-[220px]">
                          {agency.corporateName || agency.companyName}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-xs font-bold text-slate-700">
                      {agency.cnpj || agency.document}
                    </td>

                    <td className="p-4">
                      <div>
                        <strong className="block text-xs font-bold text-slate-800">
                          {agency.responsibleName}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {agency.email || agency.responsibleEmail}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-xs font-bold text-slate-700">
                      {agency.city} - {agency.state}
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">
                        <Users size={12} className="text-slate-500" />
                        {agency.agentsCount || 0}
                      </span>
                    </td>

                    <td className="p-4">
                      <AgencyStatusBadge status={agency.status} />
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          title="Ver Detalhes (Drawer)"
                          onClick={() => onViewDrawer(agency)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                        >
                          <Eye size={15} />
                        </button>

                        {agency.status === AGENCY_STATUS.PENDING_APPROVAL && (
                          <>
                            <button
                              type="button"
                              title="Aprovar Agência"
                              onClick={() => onApprove(agency.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                            >
                              <ShieldCheck size={15} />
                            </button>

                            <button
                              type="button"
                              title="Rejeitar Agência"
                              onClick={() => onRejectModal(agency)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}

                        {agency.status === AGENCY_STATUS.ACTIVE && (
                          <button
                            type="button"
                            title="Suspender Agência"
                            onClick={() => onSuspendModal(agency)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                          >
                            <Ban size={15} />
                          </button>
                        )}

                        <button
                          type="button"
                          title="Excluir Agência"
                          onClick={() => onRemove(agency.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortableTh({ label, field, currentSort, onSort }) {
  const isCurrent = currentSort === field;

  return (
    <th
      onClick={() => onSort(field)}
      className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500 cursor-pointer select-none hover:text-slate-800 transition"
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <ArrowUpDown size={12} className={isCurrent ? 'text-slate-900' : 'text-slate-300'} />
      </div>
    </th>
  );
}
