export function normalizeSearchText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function createSearchTerms(...values) {
  const normalizedValues = values
    .filter(Boolean)
    .map(normalizeSearchText)
    .filter(Boolean);

  const terms = new Set();

  normalizedValues.forEach((value) => {
    terms.add(value);

    const words = value
      .split(/\s+/)
      .filter(Boolean);

    words.forEach((word) => {
      terms.add(word);
    });

    for (let index = 1; index <= value.length; index += 1) {
      const prefix = value.slice(0, index);

      if (prefix.length >= 2) {
        terms.add(prefix);
      }
    }
  });

  return Array.from(terms).slice(0, 200);
}

export function buildAgencySearchFields(agency = {}) {
  const tradeName = normalizeSearchText(
    agency.tradeName,
  );

  const corporateName = normalizeSearchText(
    agency.corporateName,
  );

  const responsibleName = normalizeSearchText(
    agency.responsibleName,
  );

  const email = normalizeSearchText(
    agency.email,
  );

  const cnpj = String(agency.cnpj || '')
    .replace(/\D/g, '');

  return {
    searchTradeName: tradeName,
    searchCorporateName: corporateName,
    searchResponsibleName: responsibleName,
    searchEmail: email,
    searchCnpj: cnpj,

    searchTerms: createSearchTerms(
      tradeName,
      corporateName,
      responsibleName,
      email,
      cnpj,
    ),
  };
}

export function normalizeAgencyFilters(filters = {}) {
  return {
    search: normalizeSearchText(
      filters.search,
    ),

    status:
      filters.status &&
      filters.status !== 'Todos'
        ? filters.status
        : '',

    city: normalizeSearchText(
      filters.city,
    ),

    state: String(
      filters.state || '',
    )
      .trim()
      .toUpperCase(),

    companyType:
      filters.companyType &&
      filters.companyType !== 'Todos'
        ? filters.companyType
        : '',

    createdFrom:
      filters.createdFrom || null,

    createdTo:
      filters.createdTo || null,

    hasDocuments:
      typeof filters.hasDocuments ===
      'boolean'
        ? filters.hasDocuments
        : null,
  };
}
