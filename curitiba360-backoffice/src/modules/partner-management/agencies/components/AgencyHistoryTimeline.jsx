import {
  CheckCircle2,
  Clock3,
  Edit3,
  PlusCircle,
} from 'lucide-react';

import {
  formatDateTime,
} from '../../shared/utils/partnerFormatters';

const eventConfiguration = {
  created: {
    icon: PlusCircle,
    title: 'Agência cadastrada',
  },

  updated: {
    icon: Edit3,
    title: 'Cadastro atualizado',
  },

  approved: {
    icon: CheckCircle2,
    title: 'Agência aprovada',
  },

  status: {
    icon: Clock3,
    title: 'Status atualizado',
  },
};

export default function AgencyHistoryTimeline({
  agency,
}) {
  const history =
    agency.history?.length > 0
      ? agency.history
      : createDefaultHistory(agency);

  return (
    <div className="space-y-1 text-left">
      {history.map(
        (historyItem, index) => {
          const configuration =
            eventConfiguration[
              historyItem.type
            ] ??
            eventConfiguration.status;

          const Icon =
            configuration.icon;

          return (
            <article
              key={
                historyItem.id ??
                `${historyItem.type}-${index}`
              }
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {index <
                history.length - 1 && (
                <span className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-slate-200" />
              )}

              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500">
                <Icon size={16} />
              </span>

              <div className="pt-1">
                <strong className="block text-sm font-black text-slate-700">
                  {historyItem.title ??
                    configuration.title}
                </strong>

                {historyItem.description && (
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    {
                      historyItem.description
                    }
                  </p>
                )}

                <span className="mt-2 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {formatDateTime(
                    historyItem.createdAt,
                  )}
                </span>
              </div>
            </article>
          );
        },
      )}
    </div>
  );
}

function createDefaultHistory(agency) {
  const history = [
    {
      id: 'created',
      type: 'created',
      title: 'Agência cadastrada',
      description: `${agency.tradeName} foi cadastrada no Curitiba 360.`,
      createdAt: agency.createdAt,
    },
  ];

  if (
    agency.updatedAt &&
    agency.updatedAt !== agency.createdAt
  ) {
    history.unshift({
      id: 'updated',
      type: 'updated',
      title: 'Cadastro atualizado',
      description:
        'Os dados da agência foram atualizados.',
      createdAt: agency.updatedAt,
    });
  }

  if (agency.status) {
    history.unshift({
      id: 'status',
      type: 'status',
      title: `Status atual: ${agency.status}`,
      description:
        agency.statusReason ||
        'O cadastro está com este status no sistema.',
      createdAt:
        agency.updatedAt ??
        agency.createdAt,
    });
  }

  return history;
}
