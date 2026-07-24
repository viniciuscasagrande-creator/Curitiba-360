import {
  AGENT_AVAILABILITY_LABELS,
  AGENT_STATUS_LABELS,
  AGENT_TYPE_LABELS,
} from '../constants';

export function formatAgentStatus(status) {
  return (
    AGENT_STATUS_LABELS[status] ||
    status ||
    'Não informado'
  );
}

export function formatAgentAvailability(availability) {
  return (
    AGENT_AVAILABILITY_LABELS[availability] ||
    availability ||
    'Não informado'
  );
}

export function formatAgentType(type) {
  return (
    AGENT_TYPE_LABELS[type] ||
    type ||
    'Não informado'
  );
}

export function formatAgentCpf(value) {
  const digits = String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11);

  return digits
    .replace(
      /(\d{3})(\d)/,
      '$1.$2',
    )
    .replace(
      /(\d{3})(\d)/,
      '$1.$2',
    )
    .replace(
      /(\d{3})(\d{1,2})$/,
      '$1-$2',
    );
}

export function formatAgentPhone(value) {
  const digits = String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(
        /(\d{2})(\d)/,
        '($1) $2',
      )
      .replace(
        /(\d{4})(\d)/,
        '$1-$2',
      );
  }

  return digits
    .replace(
      /(\d{2})(\d)/,
      '($1) $2',
    )
    .replace(
      /(\d{5})(\d)/,
      '$1-$2',
    );
}

export function formatAgentCurrency(
  value,
  currency = 'BRL',
) {
  const number = Number(value || 0);

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency,
    },
  ).format(number);
}

export function formatAgentPercentage(
  value,
  maximumFractionDigits = 1,
) {
  const number = Number(value || 0);

  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits,
    },
  ).format(number / 100);
}

export function formatAgentDate(
  value,
  options = {},
) {
  if (!value) {
    return '—';
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...options,
    },
  ).format(date);
}

export function getAgentInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) {
    return 'AG';
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return [
    parts[0][0],
    parts[parts.length - 1][0],
  ]
    .join('')
    .toUpperCase();
}
