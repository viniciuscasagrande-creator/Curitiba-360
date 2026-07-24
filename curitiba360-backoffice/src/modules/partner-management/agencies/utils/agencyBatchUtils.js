const DEFAULT_BATCH_SIZE = 400;

/**
 * Remove IDs inválidos e duplicados.
 */
export function normalizeAgencyIds(ids = []) {
  if (!Array.isArray(ids)) {
    return [];
  }

  return [
    ...new Set(
      ids
        .map((id) => String(id || '').trim())
        .filter(Boolean),
    ),
  ];
}

/**
 * Divide uma lista em blocos menores.
 *
 * Isso evita enviar operações demais em um único batch.
 */
export function splitIntoChunks(
  items = [],
  chunkSize = DEFAULT_BATCH_SIZE,
) {
  if (!Array.isArray(items)) {
    return [];
  }

  const safeChunkSize =
    Number.isInteger(chunkSize) && chunkSize > 0
      ? chunkSize
      : DEFAULT_BATCH_SIZE;

  const chunks = [];

  for (
    let index = 0;
    index < items.length;
    index += safeChunkSize
  ) {
    chunks.push(
      items.slice(index, index + safeChunkSize),
    );
  }

  return chunks;
}

/**
 * Garante que existem agências selecionadas.
 */
export function validateAgencyIds(ids) {
  const normalizedIds = normalizeAgencyIds(ids);

  if (normalizedIds.length === 0) {
    throw new Error(
      'Selecione pelo menos uma agência.',
    );
  }

  return normalizedIds;
}

/**
 * Normaliza metadados da operação.
 */
export function normalizeBatchMetadata(
  metadata = {},
) {
  return {
    actorId: metadata.actorId || null,
    actorName: metadata.actorName || null,
    actorEmail: metadata.actorEmail || null,
    source: metadata.source || 'backoffice',
    reason: String(metadata.reason || '').trim(),
  };
}

/**
 * Cria um resultado padronizado para a interface.
 */
export function createBatchResult({
  requested = 0,
  processed = 0,
  failed = 0,
  batches = 0,
  errors = [],
} = {}) {
  return {
    requested,
    processed,
    failed,
    batches,
    success: failed === 0,
    partialSuccess:
      processed > 0 && failed > 0,
    errors,
  };
}
