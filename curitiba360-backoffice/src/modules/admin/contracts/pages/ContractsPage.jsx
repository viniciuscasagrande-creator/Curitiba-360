import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Plus,
  Sliders,
  ChevronDown,
  ChevronRight,
  Download,
  Send,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  MoreHorizontal,
  X,
  RotateCcw,
  UserX,
  Trash2,
  Pencil
} from 'lucide-react';

import AdminPageHeader from '../../../../components/admin/AdminPageHeader';
import PageContainer from '../../../../components/admin/PageContainer';
import StatusTabs from '../../../../components/admin/StatusTabs';
import ContractsFilterDrawer from '../components/ContractsFilterDrawer';
import ContractCreateDrawer from '../components/ContractCreateDrawer';
import {
  contractsMock,
  statusLabels,
  statusStyles,
  partnerTypeLabels
} from '../data/contractsMock';

export function ContractsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Status Tab sync: ?status=todos | ativos | inativos
  const currentTab = searchParams.get('status') || 'todos';

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    partnerType: '',
    status: '',
    expiringSoon: false,
    pendingSignatureOnly: false
  });

  // UI State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  // Expandable Rows State: array of partnerIds that are currently open
  const [expandedPartnerIds, setExpandedPartnerIds] = useState([
    'partner-001',
    'partner-002'
  ]);

  // Contracts Data & Selection State
  const [partnerGroupList, setPartnerGroupList] = useState(contractsMock);
  const [selectedContractIds, setSelectedContractIds] = useState([]);

  // Flattened contracts for global filtering
  const allContracts = useMemo(() => {
    return partnerGroupList.flatMap((g) => g.contracts);
  }, [partnerGroupList]);

  // Tab Counts
  const counts = useMemo(() => {
    return {
      todos: allContracts.length,
      ativos: allContracts.filter((c) => c.status === 'active').length,
      inativos: allContracts.filter((c) => c.status === 'inactive' || c.status === 'expired').length
    };
  }, [allContracts]);

  // Filtered Partner Groups & Contracts
  const filteredGroups = useMemo(() => {
    return partnerGroupList
      .map((group) => {
        const matchingContracts = group.contracts.filter((contract) => {
          // Tab Filter
          if (currentTab === 'ativos' && contract.status !== 'active') return false;
          if (currentTab === 'inativos' && contract.status !== 'inactive' && contract.status !== 'expired') return false;

          // Drawer Status Filter
          if (filters.status && contract.status !== filters.status) return false;

          // Drawer Partner Type Filter
          if (filters.partnerType && group.partnerType !== filters.partnerType) return false;

          // Expiring Soon Filter (within 30 days of 2027-01-01)
          if (filters.expiringSoon && contract.status !== 'expired') {
            const expYear = new Date(contract.expirationDate).getFullYear();
            if (expYear > 2026) return false;
          }

          // Pending Signature Filter
          if (filters.pendingSignatureOnly && contract.status !== 'pending_signature' && contract.status !== 'draft') {
            return false;
          }

          // Search Term
          const term = searchTerm.toLowerCase().trim();
          if (!term) return true;

          const searchString = [
            contract.id,
            contract.title,
            contract.partnerName,
            contract.attractionName
          ]
            .join(' ')
            .toLowerCase();

          return searchString.includes(term);
        });

        return {
          ...group,
          contracts: matchingContracts
        };
      })
      .filter((group) => group.contracts.length > 0);
  }, [partnerGroupList, currentTab, filters, searchTerm]);

  // Toggle Partner Row Expansion
  const toggleExpandPartner = (partnerId) => {
    setExpandedPartnerIds((prev) =>
      prev.includes(partnerId) ? prev.filter((id) => id !== partnerId) : [...prev, partnerId]
    );
  };

  // Toggle Single Contract Checkbox Selection
  const handleToggleSelectContract = (contractId) => {
    setSelectedContractIds((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId]
    );
  };

  // Toggle Select All Visible Contracts
  const handleSelectAllVisible = (e) => {
    const visibleIds = filteredGroups.flatMap((g) => g.contracts.map((c) => c.id));
    if (e.target.checked) {
      setSelectedContractIds(visibleIds);
    } else {
      setSelectedContractIds([]);
    }
  };

  // Actions Handlers
  const handleDocuSignSend = () => {
    alert(`Enviando ${selectedContractIds.length} envelope(s) DocuSign para assinatura digital...`);
    setPartnerGroupList((prev) =>
      prev.map((g) => ({
        ...g,
        contracts: g.contracts.map((c) =>
          selectedContractIds.includes(c.id) ? { ...c, status: 'pending_signature' } : c
        )
      }))
    );
    setSelectedContractIds([]);
  };

  const handleDownloadPDF = () => {
    alert(`Baixando lote em PDF para os ${selectedContractIds.length} contratos selecionados...`);
  };

  const handleBulkDeactivate = () => {
    setPartnerGroupList((prev) =>
      prev.map((g) => ({
        ...g,
        contracts: g.contracts.map((c) =>
          selectedContractIds.includes(c.id) ? { ...c, status: 'inactive' } : c
        )
      }))
    );
    setSelectedContractIds([]);
  };

  const handleBulkActivate = () => {
    setPartnerGroupList((prev) =>
      prev.map((g) => ({
        ...g,
        contracts: g.contracts.map((c) =>
          selectedContractIds.includes(c.id) ? { ...c, status: 'active' } : c
        )
      }))
    );
    setSelectedContractIds([]);
  };

  const handleContractCreated = (newContract) => {
    setPartnerGroupList((prev) => {
      const existingGroup = prev.find((g) => g.partnerName === newContract.partnerName);
      if (existingGroup) {
        return prev.map((g) =>
          g.partnerName === newContract.partnerName
            ? { ...g, contracts: [newContract, ...g.contracts] }
            : g
        );
      }
      return [
        {
          partnerId: newContract.partnerId,
          partnerName: newContract.partnerName,
          partnerType: newContract.partnerType,
          contracts: [newContract]
        },
        ...prev
      ];
    });
  };

  return (
    <PageContainer>
      {/* 1. Page Header & Actions */}
      <AdminPageHeader
        breadcrumbItems={[
          { label: 'Administração', path: '/admin/contratos' },
          { label: 'Gestão de Contratos' }
        ]}
        icon="📜"
        title="Gestão de Contratos"
        description="Gerencie acordos comerciais, contratos por parceiro, integrações DocuSign e prazos de expiração."
        actions={
          <>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <Download size={15} />
              Exportar PDF Lote
            </button>

            <button
              type="button"
              onClick={() => setIsCreateDrawerOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <Plus size={16} />
              Novo Contrato
            </button>
          </>
        }
      />

      {/* 2. Controls & Search Toolbar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between text-left">
        <StatusTabs
          activeTab={currentTab}
          onChange={(tabId) => setSearchParams({ status: tabId })}
          tabs={[
            { id: 'todos', label: 'Todos', count: counts.todos },
            { id: 'ativos', label: 'Ativos', count: counts.ativos },
            { id: 'inativos', label: 'Inativos / Expirados', count: counts.inativos }
          ]}
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar contrato, atração, parceiro..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <Sliders size={15} />
            Filtros
          </button>
        </div>
      </div>

      {/* 3. Expandable Grouped Contracts Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllVisible}
                    checked={
                      selectedContractIds.length > 0 &&
                      selectedContractIds.length ===
                        filteredGroups.flatMap((g) => g.contracts).length
                    }
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5">Parceiro / Contratante</th>
                <th className="px-6 py-3.5">Tipo</th>
                <th className="px-6 py-3.5 text-center">Contratos Vinculados</th>
                <th className="px-6 py-3.5">Status Geral</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Nenhum contrato encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => {
                  const isExpanded = expandedPartnerIds.includes(group.partnerId);

                  return (
                    <React.Fragment key={group.partnerId}>
                      {/* LEVEL 1: Partner Row */}
                      <tr className="bg-slate-50/50 hover:bg-slate-100/60 font-bold text-slate-900 border-t border-slate-200">
                        <td className="px-4 py-3.5 text-center">
                          <button
                            type="button"
                            onClick={() => toggleExpandPartner(group.partnerId)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
                              <Building2 size={16} />
                            </span>
                            <div>
                              <strong className="block text-sm text-slate-950">
                                {group.partnerName}
                              </strong>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-3.5">
                          <span className="inline-flex rounded-full bg-slate-200/70 px-2.5 py-1 text-[10px] font-bold text-slate-800">
                            {partnerTypeLabels[group.partnerType] || group.partnerType}
                          </span>
                        </td>

                        <td className="px-6 py-3.5 text-center">
                          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-2 text-xs font-black text-white">
                            {group.contracts.length}
                          </span>
                        </td>

                        <td className="px-6 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            Operacional
                          </span>
                        </td>

                        <td className="px-6 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => toggleExpandPartner(group.partnerId)}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                          >
                            {isExpanded ? 'Recolher Contratos' : 'Ver Contratos'}
                          </button>
                        </td>
                      </tr>

                      {/* LEVEL 2: Nested Contracts Rows */}
                      {isExpanded &&
                        group.contracts.map((contract) => {
                          const isSelected = selectedContractIds.includes(contract.id);

                          return (
                            <tr
                              key={contract.id}
                              className={`transition border-b border-slate-100 ${
                                isSelected ? 'bg-emerald-50/40' : 'bg-white hover:bg-slate-50/70'
                              }`}
                            >
                              <td className="px-4 py-3 text-center pl-8">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelectContract(contract.id)}
                                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                />
                              </td>

                              <td className="px-4 py-3 pl-8">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[11px] font-bold text-slate-400">
                                    {contract.id}
                                  </span>
                                  <strong className="text-xs font-bold text-slate-800">
                                    {contract.title}
                                  </strong>
                                </div>
                                <span className="block text-[11px] text-slate-500 font-medium">
                                  📍 Atração: {contract.attractionName}
                                </span>
                              </td>

                              <td className="px-6 py-3">
                                <span
                                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                                    statusStyles[contract.status]
                                  }`}
                                >
                                  {statusLabels[contract.status]}
                                </span>
                              </td>

                              <td className="px-6 py-3 text-center font-medium text-slate-600">
                                <span className="flex items-center justify-center gap-1 text-[11px]">
                                  <Calendar size={13} className="text-slate-400" />
                                  Expira em {contract.expirationDate}
                                </span>
                              </td>

                              <td className="px-6 py-3">
                                {contract.signature?.status === 'signed' ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                                    <FileCheck size={13} /> Assinado DocuSign
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                                    <Clock size={13} /> Pendente Assinatura
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => alert(`Baixando PDF ${contract.id}`)}
                                    title="Baixar PDF"
                                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                                  >
                                    <Download size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bulk Action Bar */}
      {selectedContractIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-2xl bg-slate-950 px-5 py-3 text-white shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">
              {selectedContractIds.length}
            </span>
            <span className="text-xs font-bold text-slate-300">
              {selectedContractIds.length === 1 ? 'contrato selecionado' : 'contratos selecionados'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDocuSignSend}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              <Send size={14} />
              Enviar DocuSign
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              <Download size={14} />
              Download PDF Lote
            </button>

            {currentTab !== 'inativos' ? (
              <button
                type="button"
                onClick={handleBulkDeactivate}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition border border-amber-500/30"
              >
                <UserX size={14} />
                Inativar Selecionados
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBulkActivate}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition border border-emerald-500/30"
              >
                <RotateCcw size={14} />
                Reativar Selecionados
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSelectedContractIds([])}
            className="ml-2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 5. Filter Slide-over Drawer */}
      <ContractsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        filters={filters}
      />

      {/* 6. Contract Create Drawer */}
      <ContractCreateDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        onContractCreated={handleContractCreated}
      />
    </PageContainer>
  );
}

export default ContractsPage;
