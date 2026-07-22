import { loyaltyMock } from "../mocks/loyaltyMock";

export const LOYALTY_STORAGE_KEY =
  "curitiba360:loyalty";

export const LOYALTY_CHANGED_EVENT =
  "curitiba360:loyalty-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitLoyaltyChanged(account) {
  window.dispatchEvent(
    new CustomEvent(
      LOYALTY_CHANGED_EVENT,
      {
        detail: clone(account),
      }
    )
  );
}

function saveAccount(account) {
  const nextAccount = {
    ...account,
    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    LOYALTY_STORAGE_KEY,
    JSON.stringify(nextAccount)
  );

  emitLoyaltyChanged(nextAccount);

  return clone(nextAccount);
}

export async function getLoyaltyAccountRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 180)
  );

  try {
    const stored =
      localStorage.getItem(
        LOYALTY_STORAGE_KEY
      );

    if (stored) {
      return clone(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      LOYALTY_STORAGE_KEY
    );
  }

  return saveAccount(loyaltyMock);
}

export async function updateLoyaltyAccountRepository(
  updates
) {
  const account =
    await getLoyaltyAccountRepository();

  return saveAccount({
    ...account,
    ...updates,
  });
}

export async function addLoyaltyTransactionRepository(
  transaction
) {
  const account =
    await getLoyaltyAccountRepository();

  return saveAccount({
    ...account,

    transactions: [
      {
        ...transaction,
        id:
          transaction.id ||
          crypto.randomUUID(),
        createdAt:
          transaction.createdAt ||
          new Date().toISOString(),
      },

      ...(account.transactions || []),
    ],
  });
}
