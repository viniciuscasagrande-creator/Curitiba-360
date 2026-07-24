import {
  Timestamp,
} from 'firebase/firestore';

/**
 * Verifica se o valor recebido é um Timestamp do Firestore.
 */
export function isFirestoreTimestamp(
  value,
) {
  return (
    value instanceof Timestamp ||
    (
      value &&
      typeof value === 'object' &&
      typeof value.toDate === 'function'
    )
  );
}

/**
 * Converte Timestamp do Firestore para string ISO.
 *
 * Exemplo:
 * Timestamp -> "2026-07-24T12:30:00.000Z"
 */
export function timestampToISOString(
  value,
) {
  if (!value) {
    return null;
  }

  if (isFirestoreTimestamp(value)) {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string') {
    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? value
      : date.toISOString();
  }

  return value;
}

/**
 * Converte datas ISO ou Date para Timestamp.
 */
export function valueToTimestamp(
  value,
) {
  if (!value) {
    return null;
  }

  if (isFirestoreTimestamp(value)) {
    return value;
  }

  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }

  if (typeof value === 'string') {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return Timestamp.fromDate(date);
    }
  }

  return value;
}

/**
 * Percorre arrays e objetos convertendo todos os Timestamps
 * encontrados em strings ISO.
 */
export function normalizeFirestoreValue(
  value,
) {
  if (value === null || value === undefined) {
    return value;
  }

  if (isFirestoreTimestamp(value)) {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(
      normalizeFirestoreValue,
    );
  }

  if (
    typeof value === 'object'
  ) {
    return Object.entries(value).reduce(
      (result, [key, item]) => {
        result[key] =
          normalizeFirestoreValue(item);

        return result;
      },
      {},
    );
  }

  return value;
}

/**
 * Remove campos undefined.
 *
 * O Firestore não aceita undefined por padrão.
 */
export function removeUndefinedValues(
  value,
) {
  if (Array.isArray(value)) {
    return value
      .map(removeUndefinedValues)
      .filter(
        (item) =>
          item !== undefined,
      );
  }

  if (
    value &&
    typeof value === 'object' &&
    !(value instanceof Date) &&
    !isFirestoreTimestamp(value) &&
    !(value instanceof File)
  ) {
    return Object.entries(value).reduce(
      (result, [key, item]) => {
        if (item === undefined) {
          return result;
        }

        result[key] =
          removeUndefinedValues(item);

        return result;
      },
      {},
    );
  }

  return value;
}

/**
 * Remove arquivos locais antes de enviar o payload para o Firestore.
 *
 * Os arquivos serão enviados ao Firebase Storage na Parte 2.5.3.
 */
export function removeLocalFiles(
  value,
) {
  if (Array.isArray(value)) {
    return value.map(removeLocalFiles);
  }

  if (
    value &&
    typeof value === 'object' &&
    !(value instanceof Date) &&
    !isFirestoreTimestamp(value)
  ) {
    return Object.entries(value).reduce(
      (result, [key, item]) => {
        if (
          key === 'file' ||
          item instanceof File
        ) {
          return result;
        }

        result[key] =
          removeLocalFiles(item);

        return result;
      },
      {},
    );
  }

  return value;
}

/**
 * Prepara uma agência para ser salva no Firestore.
 */
export function serializeAgencyForFirestore(
  agency,
) {
  const withoutFiles =
    removeLocalFiles(agency);

  const sanitized =
    removeUndefinedValues(
      withoutFiles,
    );

  return {
    ...sanitized,

    tradeName:
      sanitized.tradeName?.trim() ?? '',

    corporateName:
      sanitized.corporateName?.trim() ??
      '',

    cnpj:
      sanitized.cnpj?.trim() ?? '',

    email:
      sanitized.email
        ?.trim()
        .toLowerCase() ?? '',

    city:
      sanitized.city?.trim() ?? '',

    state:
      sanitized.state
        ?.trim()
        .toUpperCase() ?? '',

    responsibleName:
      sanitized.responsibleName?.trim() ??
      '',

    documents:
      sanitized.documents ?? [],

    managers:
      sanitized.managers ?? [],

    bankAccount: {
      ...(sanitized.bankAccount ?? {}),
    },
  };
}

/**
 * Converte um documento do Firestore para o formato usado pela interface.
 */
export function deserializeAgencyFromFirestore(
  documentSnapshot,
) {
  if (!documentSnapshot?.exists()) {
    return null;
  }

  const data =
    normalizeFirestoreValue(
      documentSnapshot.data(),
    );

  return {
    id: documentSnapshot.id,
    ...data,

    documents:
      data.documents ?? [],

    managers:
      data.managers ?? [],

    bankAccount: {
      ...(data.bankAccount ?? {}),
    },

    createdAt:
      timestampToISOString(
        data.createdAt,
      ),

    updatedAt:
      timestampToISOString(
        data.updatedAt,
      ),

    approvedAt:
      timestampToISOString(
        data.approvedAt,
      ),

    suspendedAt:
      timestampToISOString(
        data.suspendedAt,
      ),

    inactivatedAt:
      timestampToISOString(
        data.inactivatedAt,
      ),
  };
}
