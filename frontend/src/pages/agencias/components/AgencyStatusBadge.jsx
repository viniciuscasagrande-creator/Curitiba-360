import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function AgencyStatusBadge({ status }) {
  const getBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativa':
      case 'ativo':
      case 'aprovado':
        return {
          bg: '#ecfdf5',
          color: '#047857',
          border: '#a7f3d0',
          icon: <CheckCircle2 size={14} />
        };
      case 'pendente':
      case 'análise':
      case 'analise':
        return {
          bg: '#fffbeb',
          color: '#b45309',
          border: '#fde68a',
          icon: <Clock size={14} />
        };
      case 'inativa':
      case 'inativo':
      case 'suspensa':
      case 'suspenso':
        return {
          bg: '#fef2f2',
          color: '#b91c1c',
          border: '#fecaca',
          icon: <XCircle size={14} />
        };
      default:
        return {
          bg: '#f1f5f9',
          color: '#475569',
          border: '#cbd5e1',
          icon: <AlertCircle size={14} />
        };
    }
  };

  const style = getBadgeStyle(status);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.25rem 0.65rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      backgroundColor: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`
    }}>
      {style.icon}
      {status || 'Pendente'}
    </span>
  );
}
