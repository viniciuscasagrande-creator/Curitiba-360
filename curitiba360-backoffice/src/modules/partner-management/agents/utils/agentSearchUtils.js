export function normalizeAgentSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      '',
    )
    .replace(
      /[^a-zA-Z0-9\s@.-]/g,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function createAgentSearchTerms(
  agent = {},
) {
  const values = [
    agent.name,
    agent.socialName,
    agent.registrationNumber,
    agent.agencyName,
    agent.contact?.email,
    agent.contact?.phone,
    agent.contact?.mobilePhone,
    agent.documents?.cpf,
    agent.address?.city,
    agent.address?.state,
    ...(agent.specialties || []),
    ...(agent.regions || []),
    ...(agent.tags || []),
  ];

  return Array.from(
    new Set(
      values
        .flatMap((value) =>
          normalizeAgentSearchText(value)
            .split(' '),
        )
        .filter(
          (term) =>
            term.length >= 2,
        ),
    ),
  );
}

export function matchesAgentSearch(
  agent,
  search,
) {
  const normalizedSearch =
    normalizeAgentSearchText(search);

  if (!normalizedSearch) {
    return true;
  }

  const searchableText =
    normalizeAgentSearchText(
      [
        agent.name,
        agent.socialName,
        agent.registrationNumber,
        agent.agencyName,
        agent.contact?.email,
        agent.contact?.phone,
        agent.contact?.mobilePhone,
        agent.documents?.cpf,
        agent.address?.city,
        agent.address?.state,
        ...(agent.specialties || []),
        ...(agent.regions || []),
        ...(agent.tags || []),
      ].join(' '),
    );

  return searchableText.includes(
    normalizedSearch,
  );
}

export function countActiveAgentFilters(
  filters = {},
  {
    ignoreKeys = [
      'search',
    ],
  } = {},
) {
  return Object.entries(
    filters,
  ).reduce(
    (
      total,
      [
        key,
        value,
      ],
    ) => {
      if (
        ignoreKeys.includes(
          key,
        )
      ) {
        return total;
      }

      if (
        Array.isArray(value)
      ) {
        return (
          total +
          (value.length > 0
            ? 1
            : 0)
        );
      }

      if (
        typeof value ===
        'boolean'
      ) {
        return (
          total +
          (value ? 1 : 0)
        );
      }

      if (
        value !== null &&
        value !== undefined &&
        String(value).trim() !==
          ''
      ) {
        return total + 1;
      }

      return total;
    },
    0,
  );
}
