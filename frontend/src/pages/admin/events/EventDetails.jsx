import Badge from '../../../components/ui/Badge';
import { formatDateTime } from '../../../utils/formatDate';
import { eventStatusMap, getStatusBadge } from '../../../utils/status';

export default function EventDetails({ event }) {
  if (!event) return null;
  const statusInfo = getStatusBadge(event.status, eventStatusMap);

  return (
    <div className="space-y-6 text-gray-700">
      {event.image && (
        <div className="h-48 w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
          <Badge variant={statusInfo.color}>{statusInfo.label}</Badge>
        </div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{event.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 border border-gray-100">
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Localização</span>
          <span className="font-semibold text-gray-800">{event.location}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Capacidade</span>
          <span className="font-semibold text-gray-800">{event.capacity} ingressos</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Início</span>
          <span className="text-sm font-medium text-gray-700">{formatDateTime(event.start_date)}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase text-gray-400">Término</span>
          <span className="text-sm font-medium text-gray-700">{formatDateTime(event.end_date)}</span>
        </div>
      </div>
    </div>
  );
}
