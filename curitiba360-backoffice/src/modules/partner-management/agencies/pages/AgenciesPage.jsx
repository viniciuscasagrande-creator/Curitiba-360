import {
  useState,
} from 'react';

import AgencyFilters from '../components/AgencyFilters';
import AgencyHeader from '../components/AgencyHeader';
import AgencyStatusTabs from '../components/AgencyStatusTabs';
import AgencySummaryCards from '../components/AgencySummaryCards';

import { useAgencies } from '../hooks/useAgencies';
import { useAgencyFilters } from '../hooks/useAgencyFilters';

export default function AgenciesPage() {
  const {
    agencies,
    isLoading,
    isMutating,
    error,
    reload,
  } = useAgencies();

  const {
    filters,
    filteredAgencies,
    cities,
    states,
    companyTypes,
    updateFilter,
    resetFilters,
  } = useAgencyFilters(agencies);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  function exportAgencies() {
    const headers = [
      'ID',
      'Nome Fantasia',
      'Razão Social',
      'CNPJ',
      'Responsável',
      'E-mail',
      'Status',
      'Agentes',
      'Cidade',
      'UF',
    ];

    const rows = filteredAgencies.map(
      (agency) => [
        agency.id,
        agency.tradeName,
        agency.corporateName,
        agency.cnpj,
        agency.responsibleName,
        agency.email,
        agency.status,
        agency.agentsCount,
        agency.city,
        agency.state,
      ],
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((cell) => {
            const value = String(
              cell ?? '',
            ).replaceAll('"', '""');

            return `"${value}"`;
          })
          .join(';'),
      )
      .join('\n');

    const blob = new Blob(
      [`\uFEFF${csvContent}`],
      {
        type: 'text/csv;charset=utf-8;',
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;

    link.download =
      'gestao-de-agencias.csv';

    document.body.appendChild(link);

    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8">
        <AgencyHeader
          isRefreshing={
            isLoading || isMutating
          }
          onRefresh={reload}
          onExport={exportAgencies}
          onAdd={() =>
            setIsFormOpen(true)
          }
        />

        <section className="mt-6">
          <AgencySummaryCards
            agencies={agencies}
          />
        </section>

        <section className="mt-6 rounded-[24px] border border-slate-200 bg-white px-5 shadow-sm">
          <AgencyStatusTabs
            activeStatus={filters.status}
            agencies={agencies}
            onChange={(status) =>
              updateFilter(
                'status',
                status,
              )
            }
          />
        </section>

        <section className="mt-4">
          <AgencyFilters
            filters={filters}
            cities={cities}
            states={states}
            companyTypes={
              companyTypes
            }
            onChange={updateFilter}
            onReset={resetFilters}
          />
        </section>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center">
          {isLoading ? (
            <p className="text-sm font-black text-slate-400">
              Carregando agências...
            </p>
          ) : (
            <>
              <strong className="block text-lg font-black text-slate-800">
                {
                  filteredAgencies.length
                }{' '}
                agência(s) encontrada(s)
              </strong>

              <p className="mt-2 text-sm font-medium text-slate-500">
                A tabela completa será
                adicionada no bloco 2.2.
              </p>
            </>
          )}
        </section>
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">
              Cadastro de Agência
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-500">
              O Wizard completo será
              implementado na Parte 3.
            </p>

            <button
              type="button"
              onClick={() =>
                setIsFormOpen(false)
              }
              className="mt-6 h-11 w-full rounded-xl bg-slate-900 text-xs font-black text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
