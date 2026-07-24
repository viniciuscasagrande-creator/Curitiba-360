const DEFAULT_FILTER_VALUES = {
  search: '',
  status: '',
  statuses: [],
  availability: '',
  type: '',
  agencyId: '',
  specialty: '',
  specialties: [],
  state: '',
  city: '',
  region: '',
  minimumPerformance: '',
};

export const AGENT_FILTER_LABELS = {
  search: 'Pesquisa',
  status: 'Status',
  statuses: 'Status',
  availability: 'Disponibilidade',
  type: 'Tipo',
  agencyId: 'Agência',
  specialty: 'Especialidade',
  specialties: 'Especialidades',
  state: 'Estado',
  city: 'Cidade',
  region: 'Região',
  minimumPerformance: 'Performance mínima',
};

export const AGENT_STATUS_LABELS = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Pendente',
  blocked: 'Bloqueado',
};

export const AGENT_AVAILABILITY_LABELS = {
  available: 'Disponível',
  busy: 'Ocupado',
  unavailable: 'Indisponível',
  vacation: 'Férias',
};

export const AGENT_TYPE_LABELS = {
  internal: 'Agente interno',
  external: 'Agente externo',
  partner: 'Parceiro',
  freelancer: 'Freelancer',
  coordinator: 'Coordenador',
};

export const AGENT_SPECIALTY_LABELS = {
  events: 'Eventos',
  tourism: 'Turismo',
  hospitality: 'Hotelaria',
  commercial: 'Comercial',
  support: 'Atendimento',
  operations: 'Operações',
  corporate: 'Corporativo',
};

export const BRAZIL_STATE_LABELS = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export function isAgentFilterFilled(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (value === null || value === undefined) {
    return false;
  }

  return String(value).trim() !== '';
}

export function createEmptyAgentFilters(overrides = {}) {
  return {
    ...DEFAULT_FILTER_VALUES,
    ...overrides,
  };
}

export function countActiveAgentFilters(
  filters = {},
  options = {},
) {
  const {
    includeSearch = false,
    ignoredFields = [],
  } = options;

  return Object.entries(filters).reduce(
    (total, [field, value]) => {
      if (!includeSearch && field === 'search') {
        return total;
      }

      if (ignoredFields.includes(field)) {
        return total;
      }

      if (Array.isArray(value)) {
        return total + value.length;
      }

      return total + (isAgentFilterFilled(value) ? 1 : 0);
    },
    0,
  );
}

export function clearAgentFilter(filters = {}, field) {
  const currentValue = filters[field];

  return {
    ...filters,
    [field]: Array.isArray(currentValue) ? [] : '',
  };
}

export function removeAgentFilterValue(
  filters = {},
  field,
  value,
) {
  const currentValue = filters[field];

  if (!Array.isArray(currentValue)) {
    return clearAgentFilter(filters, field);
  }

  return {
    ...filters,
    [field]: currentValue.filter(
      (currentItem) => currentItem !== value,
    ),
  };
}

export function resetAgentFilters(overrides = {}) {
  return createEmptyAgentFilters(overrides);
}

export function resolveAgentFilterValueLabel(
  field,
  value,
  options = {},
) {
  const {
    agencies = [],
    statuses = AGENT_STATUS_LABELS,
    availability = AGENT_AVAILABILITY_LABELS,
    types = AGENT_TYPE_LABELS,
    specialties = AGENT_SPECIALTY_LABELS,
    states = BRAZIL_STATE_LABELS,
  } = options;

  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '';
  }

  if (field === 'status' || field === 'statuses') {
    return statuses[value] ?? value;
  }

  if (field === 'availability') {
    return availability[value] ?? value;
  }

  if (field === 'type') {
    return types[value] ?? value;
  }

  if (
    field === 'specialty' ||
    field === 'specialties'
  ) {
    return specialties[value] ?? value;
  }

  if (field === 'state') {
    return states[value] ?? value;
  }

  if (field === 'agencyId') {
    const agency = agencies.find((item) => {
      const agencyValue =
        item.value ??
        item.id ??
        item.code ??
        item.uid;

      return String(agencyValue) === String(value);
    });

    return (
      agency?.label ??
      agency?.name ??
      agency?.title ??
      value
    );
  }

  if (field === 'minimumPerformance') {
    return `${value}+ pontos`;
  }

  return String(value);
}

export function getAgentActiveFilterItems(
  filters = {},
  options = {},
) {
  const {
    includeSearch = false,
    ignoredFields = [],
  } = options;

  const items = [];

  Object.entries(filters).forEach(([field, value]) => {
    if (!includeSearch && field === 'search') {
      return;
    }

    if (ignoredFields.includes(field)) {
      return;
    }

    if (!isAgentFilterFilled(value)) {
      return;
    }

    const fieldLabel =
      AGENT_FILTER_LABELS[field] ?? field;

    if (Array.isArray(value)) {
      value.forEach((itemValue) => {
        items.push({
          id: `${field}-${itemValue}`,
          field,
          value: itemValue,
          fieldLabel,
          valueLabel: resolveAgentFilterValueLabel(
            field,
            itemValue,
            options,
          ),
          isMultiple: true,
        });
      });

      return;
    }

    items.push({
      id: `${field}-${value}`,
      field,
      value,
      fieldLabel,
      valueLabel: resolveAgentFilterValueLabel(
        field,
        value,
        options,
      ),
      isMultiple: false,
    });
  });

  return items;
}

export function sanitizeAgentFilters(filters = {}) {
  return Object.entries(filters).reduce(
    (result, [field, value]) => {
      if (!isAgentFilterFilled(value)) {
        return result;
      }

      return {
        ...result,
        [field]: value,
      };
    },
    {},
  );
}

export default {
  createEmptyAgentFilters,
  countActiveAgentFilters,
  clearAgentFilter,
  removeAgentFilterValue,
  resetAgentFilters,
  resolveAgentFilterValueLabel,
  getAgentActiveFilterItems,
  sanitizeAgentFilters,
};
