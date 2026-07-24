const agencyTabs = [
  {
    value: 'Ativa',
    label: 'Ativas',
  },
  {
    value: 'Aguardando Contrato',
    label: 'Aguardando Contrato',
  },
  {
    value: 'Pendente de Aprovação',
    label: 'Pendente Aprovação',
  },
  {
    value: 'Suspensa',
    label: 'Suspensas',
  },
  {
    value: 'Inativa',
    label: 'Inativas',
  },
  {
    value: 'Todas',
    label: 'Todas',
  },
];

export default function AgencyStatusTabs({
  activeStatus,
  agencies,
  onChange,
}) {
  function countStatus(status) {
    if (status === 'Todas') {
      return agencies.length;
    }

    return agencies.filter(
      (agency) =>
        agency.status === status,
    ).length;
  }

  return (
    <div className="overflow-x-auto text-left">
      <div className="flex min-w-max border-b border-slate-200">
        {agencyTabs.map((tab) => {
          const active =
            activeStatus === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() =>
                onChange(tab.value)
              }
              className={[
                'flex items-center gap-2 border-b-4 px-5 py-4 text-sm font-black transition',
                active
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700',
              ].join(' ')}
            >
              {tab.label}

              <span
                className={[
                  'rounded-full px-2 py-0.5 text-[10px] font-black',
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-500',
                ].join(' ')}
              >
                {countStatus(tab.value)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
