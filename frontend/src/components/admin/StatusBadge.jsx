const styles = {
  pending: 'bg-yellow-100 text-yellow-700',
  pendente: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  approved: 'bg-green-100 text-green-700',
  aprovado: 'bg-green-100 text-green-700',
  pago: 'bg-green-100 text-green-700',
  active: 'bg-blue-100 text-blue-700',
  ativo: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  cancelado: 'bg-red-100 text-red-700',
  refunded: 'bg-purple-100 text-purple-700',
  reembolsado: 'bg-purple-100 text-purple-700',
  declined: 'bg-red-100 text-red-700',
  recusado: 'bg-red-100 text-red-700',
  requested: 'bg-yellow-100 text-yellow-700',
  solicitado: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  concluido: 'bg-green-100 text-green-700'
};

const labels = {
  pending: 'Pendente',
  pendente: 'Pendente',
  paid: 'Pago',
  approved: 'Aprovado',
  aprovado: 'Aprovado',
  pago: 'Pago',
  active: 'Ativo',
  ativo: 'Ativo',
  cancelled: 'Cancelado',
  cancelado: 'Cancelado',
  refunded: 'Reembolsado',
  reembolsado: 'Reembolsado',
  declined: 'Recusado',
  recusado: 'Recusado',
  requested: 'Solicitado',
  solicitado: 'Solicitado',
  completed: 'Concluído',
  concluido: 'Concluído'
};

export default function StatusBadge({ status }) {
  const normalizedStatus = String(status || '').toLowerCase();
  return (
    <span
      className={`
        inline-flex rounded-full
        px-3 py-1
        text-xs font-semibold
        ${styles[normalizedStatus] || 'bg-gray-100 text-gray-600'}
      `}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
}
