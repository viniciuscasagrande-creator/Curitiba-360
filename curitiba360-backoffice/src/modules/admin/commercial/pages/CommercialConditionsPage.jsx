import React, {
  useMemo,
  useState
} from 'react';

import {
  BadgeDollarSign,
  Filter,
  Landmark,
  Plus,
  Search
} from 'lucide-react';

import CommercialBulkActions from '../components/CommercialBulkActions';
import CommercialConditionDrawer from '../components/CommercialConditionDrawer';
import CommercialConditionsTable from '../components/CommercialConditionsTable';
import CommercialMainTabs from '../components/CommercialMainTabs';
import CommercialStatusTabs from '../components/CommercialStatusTabs';
import FinancialInformationDrawer from '../components/FinancialInformationDrawer';
import FinancialInformationTable from '../components/FinancialInformationTable';

import {
  commercialConditionsMock,
  financialInformationMock
} from '../data/commercialMock';

export function CommercialConditionsPage() {
  const [mainTab, setMainTab] =
    useState('conditions');

  const [statusTab, setStatusTab] =
    useState('active');

  const [query, setQuery] =
    useState('');

  const [
    conditions,
    setConditions
  ] = useState(commercialConditionsMock);

  const [
    financialItems,
    setFinancialItems
  ] = useState(financialInformationMock);

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [
    conditionDrawerOpen,
    setConditionDrawerOpen
  ] = useState(false);

  const [
    financialDrawerOpen,
    setFinancialDrawerOpen
  ] = useState(false);

  const [
    editingCondition,
    setEditingCondition
  ] = useState(null);

  const [
    editingFinancial,
    setEditingFinancial
  ] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(10);

  const currentData =
    mainTab === 'conditions'
      ? conditions
      : financialItems;

  const counts = useMemo(
    () => ({
      active: currentData.filter(
        (item) =>
          item.status === 'active'
      ).length,
      inactive: currentData.filter(
        (item) =>
          item.status === 'inactive'
      ).length,
      all: currentData.length
    }),
    [currentData]
  );

  const mainCounts = {
    conditions: conditions.length,
    financial: financialItems.length
  };

  const filteredData = useMemo(() => {
    const normalized =
      query.trim().toLowerCase();

    return currentData.filter((item) => {
      if (
        statusTab !== 'all' &&
        item.status !== statusTab
      ) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const searchable = Object.values(item)
        .filter(
          (value) =>
            typeof value === 'string' ||
            typeof value === 'number'
        )
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [
    currentData,
    query,
    statusTab
  ]);

  const paginatedData = useMemo(() => {
    const start =
      (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );
  }, [
    filteredData,
    page,
    pageSize
  ]);

  function changeMainTab(tab) {
    setMainTab(tab);
    setSelectedIds([]);
    setPage(1);
  }

  function toggleItem(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (itemId) => itemId !== id
          )
        : [...current, id]
    );
  }

  function toggleAll() {
    const visibleIds =
      paginatedData.map(
        (item) => item.id
      );

    const allSelected =
      visibleIds.every((id) =>
        selectedIds.includes(id)
      );

    if (allSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !visibleIds.includes(id)
        )
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([
        ...current,
        ...visibleIds
      ])
    ]);
  }

  function updateSelectedStatus(status) {
    const setter =
      mainTab === 'conditions'
        ? setConditions
        : setFinancialItems;

    setter((current) =>
      current.map((item) =>
        selectedIds.includes(item.id)
          ? {
              ...item,
              status,
              updatedAt:
                new Date().toISOString()
            }
          : item
      )
    );

    setSelectedIds([]);
  }

  function deleteSelected() {
    const source =
      mainTab === 'conditions'
        ? conditions
        : financialItems;

    const blockedItems =
      mainTab === 'conditions'
        ? source.filter(
            (item) =>
              selectedIds.includes(
                item.id
              ) &&
              item.contractsCount > 0
          )
        : source.filter(
            (item) =>
              selectedIds.includes(
                item.id
              ) &&
              item.partnersCount > 0
          );

    if (blockedItems.length > 0) {
      window.alert(
        'Existem itens vinculados a contratos ou parceiros. Inative-os em vez de excluir.'
      );

      return;
    }

    if (
      !window.confirm(
        `Excluir ${selectedIds.length} item(ns)?`
      )
    ) {
      return;
    }

    const setter =
      mainTab === 'conditions'
        ? setConditions
        : setFinancialItems;

    setter((current) =>
      current.filter(
        (item) =>
          !selectedIds.includes(item.id)
      )
    );

    setSelectedIds([]);
  }

  function editSelected() {
    if (selectedIds.length !== 1) {
      return;
    }

    const item = currentData.find(
      (entry) =>
        entry.id === selectedIds[0]
    );

    if (mainTab === 'conditions') {
      setEditingCondition(item);
      setConditionDrawerOpen(true);
    } else {
      setEditingFinancial(item);
      setFinancialDrawerOpen(true);
    }
  }

  function saveCondition(form) {
    const now = new Date().toISOString();

    if (editingCondition) {
      setConditions((current) =>
        current.map((item) =>
          item.id === editingCondition.id
            ? {
                ...item,
                ...form,
                id: item.id,
                contractsCount:
                  item.contractsCount || 0,
                createdAt: item.createdAt,
                updatedAt: now
              }
            : item
        )
      );
    } else {
      setConditions((current) => [
        {
          ...form,
          id: `condition-${Date.now()}`,
          contractsCount: 0,
          createdAt: now,
          updatedAt: now
        },
        ...current
      ]);
    }

    setEditingCondition(null);
    setConditionDrawerOpen(false);
    setSelectedIds([]);
  }

  function saveFinancial(form) {
    const now = new Date().toISOString();

    if (editingFinancial) {
      setFinancialItems((current) =>
        current.map((item) =>
          item.id === editingFinancial.id
            ? {
                ...item,
                ...form,
                id: item.id,
                partnersCount:
                  item.partnersCount || 0,
                createdAt: item.createdAt,
                updatedAt: now
              }
            : item
        )
      );
    } else {
      setFinancialItems((current) => [
        {
          ...form,
          id: `financial-${Date.now()}`,
          partnersCount: 0,
          createdAt: now,
          updatedAt: now
        },
        ...current
      ]);
    }

    setEditingFinancial(null);
    setFinancialDrawerOpen(false);
    setSelectedIds([]);
  }

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Administração
          </p>

          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <BadgeDollarSign
                size={22}
              />
            </span>

            Configurações Comerciais
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-medium">
            Gerencie condições, taxas,
            prazos e informações de
            repasse.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
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
              placeholder="Pesquisar..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Filter size={18} />
            Filtros
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingFinancial(null);
              setFinancialDrawerOpen(true);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Landmark size={18} />
            Informação financeira
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingCondition(null);
              setConditionDrawerOpen(true);
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Adicionar condição
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CommercialMainTabs
          value={mainTab}
          counts={mainCounts}
          onChange={changeMainTab}
        />

        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
          <CommercialStatusTabs
            value={statusTab}
            counts={counts}
            onChange={(tab) => {
              setStatusTab(tab);
              setSelectedIds([]);
              setPage(1);
            }}
          />

          <div className="lg:ml-auto">
            <CommercialBulkActions
              selectedCount={
                selectedIds.length
              }
              statusTab={statusTab}
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
        </div>
      </section>

      {mainTab === 'conditions' ? (
        <CommercialConditionsTable
          conditions={paginatedData}
          selectedIds={selectedIds}
          page={page}
          pageSize={pageSize}
          totalItems={
            filteredData.length
          }
          onToggle={toggleItem}
          onToggleAll={toggleAll}
          onEdit={(condition) => {
            setEditingCondition(
              condition
            );
            setConditionDrawerOpen(
              true
            );
          }}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      ) : (
        <FinancialInformationTable
          items={paginatedData}
          selectedIds={selectedIds}
          page={page}
          pageSize={pageSize}
          totalItems={
            filteredData.length
          }
          onToggle={toggleItem}
          onToggleAll={toggleAll}
          onEdit={(item) => {
            setEditingFinancial(item);
            setFinancialDrawerOpen(
              true
            );
          }}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      )}

      <CommercialConditionDrawer
        open={conditionDrawerOpen}
        condition={editingCondition}
        onSave={saveCondition}
        onClose={() => {
          setConditionDrawerOpen(false);
          setEditingCondition(null);
        }}
      />

      <FinancialInformationDrawer
        open={financialDrawerOpen}
        item={editingFinancial}
        onSave={saveFinancial}
        onClose={() => {
          setFinancialDrawerOpen(false);
          setEditingFinancial(null);
        }}
      />
    </div>
  );
}

export default CommercialConditionsPage;
