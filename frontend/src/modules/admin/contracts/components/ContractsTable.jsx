import React from 'react';
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  MoreHorizontal
} from 'lucide-react';

import {
  contractStatusLabels,
  partnerTypeLabels
} from '../data/contractsMock';

const contractStatusStyles = {
  active: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-slate-100 text-slate-600',
  pending_signature: 'bg-amber-50 text-amber-700',
  expired: 'bg-rose-50 text-rose-700',
  inactive: 'bg-slate-100 text-slate-500',
  cancelled: 'bg-rose-50 text-rose-700'
};

const partnerTypeStyles = {
  commercial_partner:
    'bg-violet-50 text-violet-700',
  agency: 'bg-sky-50 text-sky-700',
  agent: 'bg-cyan-50 text-cyan-700',
  public_agency:
    'bg-emerald-50 text-emerald-700',
  supplier: 'bg-amber-50 text-amber-700'
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(
    new Date(`${value}T12:00:00`)
  );
}

export function ContractsTable({
  partners,
  expandedIds,
  selectedIds,
  page,
  pageSize,
  totalItems,
  onTogglePartner,
  onToggleContract,
  onTogglePartnerContracts,
  onEditContract,
  onPageChange,
  onPageSizeChange
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  const firstItem =
    totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const lastItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm text-left">
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[64px_120px_1fr_220px_150px] items-center bg-slate-50 px-5 py-4 text-[11px] font-black uppercase tracking-[0.08em] text-slate-500">
            <span />
            <span>ID</span>
            <span>Nome do parceiro</span>
            <span>Tipo</span>
            <span>Contratos</span>
          </div>

          {partners.map((partner) => {
            const expanded =
              expandedIds.includes(partner.id);

            const partnerContractIds =
              partner.contracts.map(
                (contract) => contract.id
              );

            const allPartnerContractsSelected =
              partnerContractIds.length > 0 &&
              partnerContractIds.every((id) =>
                selectedIds.includes(id)
              );

            return (
              <section
                key={partner.id}
                className="border-t border-slate-100"
              >
                <div className="grid grid-cols-[64px_120px_1fr_220px_150px] items-center px-5 py-4 transition hover:bg-slate-50">
                  <button
                    type="button"
                    onClick={() =>
                      onTogglePartner(partner.id)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                  >
                    {expanded ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  <span className="text-sm font-semibold text-slate-600">
                    {partner.id.replace('partner-', '')}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onTogglePartner(partner.id)
                    }
                    className="flex items-center gap-3 text-left"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <Building2 size={20} />
                    </span>

                    <span>
                      <strong className="block text-sm text-slate-900">
                        {partner.name}
                      </strong>

                      <span className="mt-0.5 block text-xs text-slate-400 font-medium">
                        {partner.city} · {partner.document}
                      </span>
                    </span>
                  </button>

                  <span>
                    <span
                      className={[
                        'inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold',
                        partnerTypeStyles[
                          partner.type
                        ] ||
                          'bg-slate-100 text-slate-600'
                      ].join(' ')}
                    >
                      {partnerTypeLabels[
                        partner.type
                      ] || partner.type}
                    </span>
                  </span>

                  <span className="text-sm font-bold text-slate-700">
                    {partner.contracts.length}
                  </span>
                </div>

                {expanded && (
                  <div className="mx-5 mb-5 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="grid grid-cols-[56px_140px_1fr_170px_180px_60px] items-center bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                      <input
                        type="checkbox"
                        checked={
                          allPartnerContractsSelected
                        }
                        onChange={() =>
                          onTogglePartnerContracts(
                            partnerContractIds
                          )
                        }
                        className="h-4 w-4 accent-emerald-600"
                      />

                      <span>Contrato ID</span>
                      <span>Atração</span>
                      <span>Status</span>
                      <span>Expiração</span>
                      <span />
                    </div>

                    {partner.contracts.map(
                      (contract) => {
                        const selected =
                          selectedIds.includes(
                            contract.id
                          );

                        return (
                          <div
                            key={contract.id}
                            className={[
                              'grid grid-cols-[56px_140px_1fr_170px_180px_60px] items-center border-t border-slate-100 px-4 py-4',
                              selected
                                ? 'bg-emerald-50/50'
                                : 'hover:bg-slate-50'
                            ].join(' ')}
                          >
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() =>
                                onToggleContract(
                                  contract.id
                                )
                              }
                              className="h-4 w-4 accent-emerald-600"
                            />

                            <span className="text-sm font-semibold text-slate-600">
                              {contract.number}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onEditContract(
                                  contract
                                )
                              }
                              className="flex items-center gap-3 text-left"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                <FileText size={17} />
                              </span>

                              <span>
                                <strong className="block text-sm text-slate-800">
                                  {
                                    contract.attractionName
                                  }
                                </strong>

                                <span className="block text-[10px] text-slate-400 font-medium">
                                  {contract.title}
                                </span>
                              </span>
                            </button>

                            <span>
                              <span
                                className={[
                                  'inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold',
                                  contractStatusStyles[
                                    contract.status
                                  ]
                                ].join(' ')}
                              >
                                {contractStatusLabels[
                                  contract.status
                                ]}
                              </span>
                            </span>

                            <span className="text-xs text-slate-600 font-medium">
                              {formatDate(
                                contract.expirationDate
                              )}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onEditContract(
                                  contract
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {partners.length === 0 && (
        <div className="px-6 py-20 text-center">
          <FileText
            size={34}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-black text-slate-800">
            Nenhum contrato encontrado
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Ajuste os filtros ou adicione um novo contrato.
          </p>
        </div>
      )}

      <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Parceiros por página</span>

          <select
            value={pageSize}
            onChange={(event) =>
              onPageSizeChange(
                Number(event.target.value)
              )
            }
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 font-bold text-slate-700 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-xs text-slate-500 font-medium">
            {firstItem} a {lastItem} de {totalItems}
          </span>

          <div className="flex gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() =>
                onPageChange(page - 1)
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="flex h-9 min-w-20 items-center justify-center rounded-xl bg-slate-100 px-3 text-xs font-bold text-slate-700">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                onPageChange(page + 1)
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContractsTable;
