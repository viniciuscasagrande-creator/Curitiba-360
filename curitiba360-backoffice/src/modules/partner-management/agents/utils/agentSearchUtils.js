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
