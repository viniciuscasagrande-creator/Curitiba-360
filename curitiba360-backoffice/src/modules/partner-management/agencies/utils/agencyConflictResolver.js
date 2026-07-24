function toTimestamp(value) {
  if (!value) {
    return 0;
  }

  if (
    typeof value.toMillis ===
    'function'
  ) {
    return value.toMillis();
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  return Number.isNaN(
    date.getTime(),
  )
    ? 0
    : date.getTime();
}

export function compareAgencyVersions(
  localAgency,
  remoteAgency,
) {
  if (
    !localAgency &&
    !remoteAgency
  ) {
    return {
      winner: null,
      reason: 'empty',
    };
  }

  if (!localAgency) {
    return {
      winner:
        remoteAgency,

      reason:
        'remote-only',
    };
  }

  if (!remoteAgency) {
    return {
      winner:
        localAgency,

      reason:
        'local-only',
    };
  }

  const localVersion =
    Number(
      localAgency.version || 0,
    );

  const remoteVersion =
    Number(
      remoteAgency.version || 0,
    );

  if (
    remoteVersion >
    localVersion
  ) {
    return {
      winner:
        remoteAgency,

      reason:
        'remote-version-newer',
    };
  }

  if (
    localVersion >
    remoteVersion
  ) {
    return {
      winner:
        localAgency,

      reason:
        'local-version-newer',
    };
  }

  const localUpdatedAt =
    toTimestamp(
      localAgency.updatedAt,
    );

  const remoteUpdatedAt =
    toTimestamp(
      remoteAgency.updatedAt,
    );

  if (
    remoteUpdatedAt >=
    localUpdatedAt
  ) {
    return {
      winner:
        remoteAgency,

      reason:
        'remote-date-newer',
    };
  }

  return {
    winner:
      localAgency,

    reason:
      'local-date-newer',
  };
}

export function mergeAgencyVersions(
  localAgency,
  remoteAgency,
) {
  const comparison =
    compareAgencyVersions(
      localAgency,
      remoteAgency,
    );

  if (!comparison.winner) {
    return null;
  }

  return {
    ...localAgency,
    ...remoteAgency,
    ...comparison.winner,

    conflictResolution: {
      reason:
        comparison.reason,

      resolvedAt:
        new Date().toISOString(),
    },
  };
}

export function applyAgencyConflictResolution(
  currentAgencies = [],
  incomingAgency,
) {
  if (!incomingAgency?.id) {
    return currentAgencies;
  }

  const currentIndex =
    currentAgencies.findIndex(
      (agency) =>
        agency.id ===
        incomingAgency.id,
    );

  if (currentIndex === -1) {
    return [
      incomingAgency,
      ...currentAgencies,
    ];
  }

  const nextAgencies = [
    ...currentAgencies,
  ];

  nextAgencies[currentIndex] =
    mergeAgencyVersions(
      currentAgencies[
        currentIndex
      ],
      incomingAgency,
    );

  return nextAgencies;
}
