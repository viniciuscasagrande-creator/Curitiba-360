import {
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Star,
  UserRound,
} from 'lucide-react';

export const AGENT_TABLE_COLUMNS = [
  {
    id: 'agent',
    label: 'Agente',
    icon: UserRound,
    sortable: true,
    sortField: 'name',
    className:
      'min-w-[280px]',
  },

  {
    id: 'agency',
    label: 'Agência',
    sortable: false,
    className:
      'min-w-[190px]',
  },

  {
    id: 'location',
    label: 'Localização',
    icon: MapPin,
    sortable: false,
    className:
      'min-w-[160px]',
  },

  {
    id: 'status',
    label: 'Status',
    sortable: true,
    sortField: 'status',
    className:
      'min-w-[170px]',
  },

  {
    id: 'events',
    label: 'Eventos',
    icon: CalendarDays,
    sortable: true,
    sortField:
      'eventsCount',
    align: 'right',
    className:
      'min-w-[105px]',
  },

  {
    id: 'sales',
    label: 'Vendas',
    icon: CircleDollarSign,
    sortable: true,
    sortField:
      'salesAmount',
    align: 'right',
    className:
      'min-w-[140px]',
  },

  {
    id: 'performance',
    label: 'Performance',
    icon: Star,
    sortable: true,
    sortField:
      'performanceScore',
    align: 'right',
    className:
      'min-w-[130px]',
  },

  {
    id: 'actions',
    label: '',
    sortable: false,
    align: 'right',
    className:
      'w-[72px]',
  },
];

export function getAgentColumnById(
  columnId,
) {
  return (
    AGENT_TABLE_COLUMNS.find(
      (column) =>
        column.id === columnId,
    ) || null
  );
}

export default AGENT_TABLE_COLUMNS;
