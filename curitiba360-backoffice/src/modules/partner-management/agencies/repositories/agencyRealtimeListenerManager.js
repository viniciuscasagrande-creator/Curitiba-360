const listeners = new Map();

function validateListenerKey(key) {
  const normalizedKey =
    String(key || '').trim();

  if (!normalizedKey) {
    throw new Error(
      'A chave do listener é obrigatória.',
    );
  }

  return normalizedKey;
}

export const agencyRealtimeListenerManager = {
  register(key, unsubscribe) {
    const normalizedKey =
      validateListenerKey(key);

    if (
      typeof unsubscribe !==
      'function'
    ) {
      throw new Error(
        'A função de cancelamento do listener é inválida.',
      );
    }

    this.stop(normalizedKey);

    listeners.set(
      normalizedKey,
      unsubscribe,
    );

    return unsubscribe;
  },

  has(key) {
    const normalizedKey =
      validateListenerKey(key);

    return listeners.has(
      normalizedKey,
    );
  },

  stop(key) {
    const normalizedKey =
      validateListenerKey(key);

    const unsubscribe =
      listeners.get(
        normalizedKey,
      );

    if (
      typeof unsubscribe ===
      'function'
    ) {
      try {
        unsubscribe();
      } finally {
        listeners.delete(
          normalizedKey,
        );
      }

      return true;
    }

    return false;
  },

  stopAll() {
    listeners.forEach(
      (unsubscribe) => {
        try {
          unsubscribe();
        } catch (error) {
          console.error(
            'Erro ao encerrar listener:',
            error,
          );
        }
      },
    );

    listeners.clear();
  },

  getActiveKeys() {
    return Array.from(
      listeners.keys(),
    );
  },

  get size() {
    return listeners.size;
  },
};

export default agencyRealtimeListenerManager;
