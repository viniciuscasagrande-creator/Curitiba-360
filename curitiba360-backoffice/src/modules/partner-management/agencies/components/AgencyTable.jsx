import { Ban, Eye, ShieldCheck, Trash2, XCircle, CheckCircle2 } from 'lucide-react';
import AgencyStatusBadge from './AgencyStatusBadge';
import { formatDateTime } from '../../shared/utils/partnerFormatters';
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
  const allSelected = agencies.length > 0 && selectedIds.length === agencies.length;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm text-left">
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
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">ID</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Agência / Razão Social</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">CNPJ</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Responsável</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Cidade / UF</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Agentes</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500">Status</th>
            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-slate-500 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {agencies.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-12 text-center text-xs font-bold text-slate-400">
                Nenhuma agência encontrada.
              </td>
            </tr>
          ) : (
            agencies.map((agency) => {
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
                      <span className="text-[10px] text-slate-400 font-semibold truncate block max-w-[200px]">
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
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">
                      {agency.agentsCount || 0} agentes
                    </span>
                  </td>

                  <td className="p-4">
                    <AgencyStatusBadge status={agency.status} />
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        title="Ver Detalhes"
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
  );
}
