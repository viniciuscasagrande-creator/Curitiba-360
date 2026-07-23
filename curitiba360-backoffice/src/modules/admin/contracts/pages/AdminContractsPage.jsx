import React, {
  useMemo,
  useState
} from 'react';

import {
  FileText,
  Filter,
  Plus,
  Search
} from 'lucide-react';

import {
  useNavigate
} from 'react-router-dom';

import { ROUTES } from '../../../../routes/routePaths';

import ContractStatusTabs from '../components/ContractStatusTabs';
import ContractsBulkActions from '../components/ContractsBulkActions';
import ContractsFilterDrawer from '../components/ContractsFilterDrawer';
import ContractsTable from '../components/ContractsTable';

import partnersContractsMock from '../data/contractsMock';

const emptyFilters = {
  partnerType: '',
  status: '',
  attraction: '',
  expiration: ''
};

export function AdminContractsPage() {
  const navigate = useNavigate();

  const [partnersData, setPartnersData] =
    useState(partnersContractsMock);

  const [query, setQuery] = useState('');
  const [statusTab, setStatusTab] =
    useState('active');

  const [filters, setFilters] =
    useState(emptyFilters);

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [expandedIds, setExpandedIds] =
    useState(['partner-001']);

  const [
    filterDrawerOpen,
    setFilterDrawerOpen
  ] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(10);

  const attractions = useMemo(
    () => [
      ...new Set(
        partnersData.flatMap((partner) =>
          partner.contracts.map(
            (contract) =>
              contract.attractionName
          )
        )
      )
    ],
    [partnersData]
  );

  const allContracts = useMemo(
    () =>
      partnersData.flatMap(
        (partner) => partner.contracts
      ),
    [partnersData]
  );

  const counts = useMemo(
    () => ({
      active: allContracts.filter(
        (contract) =>
          contract.status === 'active'
      ).length,
      inactive: allContracts.filter(
        (contract) =>
          contract.status === 'inactive'
      ).length,
      all: allContracts.length
    }),
    [allContracts]
  );

  const filteredPartners = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    const now = new Date();

    return partnersData
      .map((partner) => {
        const filteredContracts =
          partner.contracts.filter(
            (contract) => {
              if (
                statusTab !== 'all' &&
                contract.status !== statusTab
              ) {
                return false;
              }

              if (
                filters.partnerType &&
                partner.type !==
                  filters.partnerType
              ) {
                return false;
              }

              if (
                filters.status &&
                contract.status !==
                  filters.status
              ) {
                return false;
              }

              if (
                filters.attraction &&
                contract.attractionName !==
                  filters.attraction
              ) {
                return false;
              }

              if (filters.expiration) {
                const expirationDate =
                  new Date(
                    `${contract.expirationDate}T12:00:00`
                  );

                if (
                  filters.expiration ===
                  'expired'
                ) {
                  if (
                    expirationDate >= now
                  ) {
                    return false;
                  }
                } else {
                  const limitDate =
                    new Date();

                  limitDate.setDate(
                    limitDate.getDate() +
                      Number(
                        filters.expiration
                      )
                  );

                  if (
                    expirationDate < now ||
                    expirationDate > limitDate
                  ) {
                    return false;
                  }
                }
              }

              if (!normalizedQuery) {
                return true;
              }

              const searchable = [
                partner.name,
                partner.document,
                partner.city,
                contract.id,
                contract.number,
                contract.title,
                contract.attractionName,
                contract.status
              ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

              return searchable.includes(
                normalizedQuery
              );
            }
          );

        return {
          ...partner,
          contracts: filteredContracts
        };
      })
      .filter(
        (partner) =>
          partner.contracts.length > 0
      );
  }, [
    partnersData,
    query,
    statusTab,
    filters
  ]);

  const paginatedPartners = useMemo(() => {
    const start =
      (page - 1) * pageSize;

    return filteredPartners.slice(
      start,
      start + pageSize
    );
  }, [
    filteredPartners,
    page,
    pageSize
  ]);

  const activeFilterCount =
    Object.values(filters).filter(
      Boolean
    ).length;

  function togglePartner(partnerId) {
    setExpandedIds((current) =>
      current.includes(partnerId)
        ? current.filter(
            (id) => id !== partnerId
          )
        : [...current, partnerId]
    );
  }

  function toggleContract(contractId) {
    setSelectedIds((current) =>
      current.includes(contractId)
        ? current.filter(
            (id) => id !== contractId
          )
        : [...current, contractId]
    );
  }

  function togglePartnerContracts(
    contractIds
  ) {
    const allSelected =
      contractIds.every((id) =>
        selectedIds.includes(id)
      );

    if (allSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !contractIds.includes(id)
        )
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([
        ...current,
        ...contractIds
      ])
    ]);
  }

  function updateSelectedStatus(status) {
    setPartnersData((current) =>
      current.map((partner) => ({
        ...partner,
        contracts:
          partner.contracts.map(
            (contract) =>
              selectedIds.includes(
                contract.id
              )
                ? {
                    ...contract,
                    status
                  }
                : contract
          )
      }))
    );

    setSelectedIds([]);
  }

  function deleteSelected() {
    const confirmed =
      window.confirm(
        `Deseja excluir ${selectedIds.length} contrato(s)?`
      );

    if (!confirmed) {
      return;
    }

    setPartnersData((current) =>
      current
        .map((partner) => ({
          ...partner,
          contracts:
            partner.contracts.filter(
              (contract) =>
                !selectedIds.includes(
                  contract.id
                )
            )
        }))
        .filter(
          (partner) =>
            partner.contracts.length > 0
        )
    );

    setSelectedIds([]);
  }

  function editSelected() {
    if (selectedIds.length !== 1) {
      return;
    }

    navigate(
      ROUTES.admin.contractDetails(
        selectedIds[0]
      )
    );
  }

  function sendSignature() {
    const eligibleContracts =
      allContracts.filter(
        (contract) =>
          selectedIds.includes(
            contract.id
          ) &&
          [
            'draft',
            'pending_signature'
          ].includes(contract.status)
      );

    if (
      eligibleContracts.length === 0
    ) {
      window.alert(
        'Selecione contratos em rascunho ou aguardando assinatura.'
      );

      return;
    }

    setPartnersData((current) =>
      current.map((partner) => ({
        ...partner,
        contracts:
          partner.contracts.map(
            (contract) =>
              eligibleContracts.some(
                (eligible) =>
                  eligible.id ===
                  contract.id
              )
                ? {
                    ...contract,
                    status:
                      'pending_signature',
                    signature: {
                      ...contract.signature,
                      status: 'sent',
                      sentAt:
                        new Date().toISOString()
                    }
                  }
                : contract
          )
      }))
    );

    window.alert(
      'Contratos enviados para assinatura.'
    );

    setSelectedIds([]);
  }

  function downloadSelected() {
    if (!selectedIds.length) {
      return;
    }

    window.alert(
      `Preparando ${selectedIds.length} contrato(s) para download.`
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Administração
          </p>

          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <FileText size={22} />
            </span>

            Gestão de Contratos
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-medium">
            Gerencie contratos, parceiros,
            atrações, documentos e
            assinaturas.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 sm:w-80">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(
                  event.target.value
                );
                setPage(1);
              }}
              placeholder="Pesquisar contratos..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setFilterDrawerOpen(true)
            }
            className="relative inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Filter size={18} />
            Filtros

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                ROUTES.admin.contractCreate
              )
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
          >
            <Plus size={18} />
            Adicionar contrato
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <ContractStatusTabs
          value={statusTab}
          counts={counts}
          onChange={(tab) => {
            setStatusTab(tab);
            setSelectedIds([]);
            setPage(1);
          }}
        />

        <div className="p-4 sm:p-5">
          <ContractsBulkActions
            selectedCount={
              selectedIds.length
            }
            currentTab={statusTab}
            onSendSignature={
              sendSignature
            }
            onDownload={
              downloadSelected
            }
            onEdit={editSelected}
            onActivate={() =>
              updateSelectedStatus(
                'active'
              )
            }
            onDeactivate={() =>
              updateSelectedStatus(
                'inactive'
              )
            }
            onDelete={deleteSelected}
            onClear={() =>
              setSelectedIds([])
            }
          />
        </div>
      </section>

      <ContractsTable
        partners={paginatedPartners}
        expandedIds={expandedIds}
        selectedIds={selectedIds}
        page={page}
        pageSize={pageSize}
        totalItems={
          filteredPartners.length
        }
        onTogglePartner={
          togglePartner
        }
        onToggleContract={
          toggleContract
        }
        onTogglePartnerContracts={
          togglePartnerContracts
        }
        onEditContract={(contract) =>
          navigate(
            ROUTES.admin.contractDetails(
              contract.id
            )
          )
        }
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />

      <ContractsFilterDrawer
        open={filterDrawerOpen}
        filters={filters}
        attractions={attractions}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
        onClose={() =>
          setFilterDrawerOpen(false)
        }
      />
    </div>
  );
}

export default AdminContractsPage;
