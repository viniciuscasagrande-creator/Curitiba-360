import {
  partnerFinancialMock,
} from "../mocks/partnerFinancialMock";

export const FINANCIAL_STORAGE_KEY =
  "curitiba360:partner-financial";

export const FINANCIAL_CHANGED_EVENT =
  "curitiba360:partner-financial-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitFinancialChanged(data) {
  window.dispatchEvent(
    new CustomEvent(
      FINANCIAL_CHANGED_EVENT,
      {
        detail: clone(data),
      }
    )
  );
}

function saveFinancialData(data) {
  const nextData = {
    ...data,
    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    FINANCIAL_STORAGE_KEY,
    JSON.stringify(nextData)
  );

  emitFinancialChanged(nextData);

  return clone(nextData);
}

export async function getFinancialRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 180)
  );

  try {
    const stored =
      localStorage.getItem(
        FINANCIAL_STORAGE_KEY
      );

    if (stored) {
      return clone(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      FINANCIAL_STORAGE_KEY
    );
  }

  return saveFinancialData(
    partnerFinancialMock
  );
}

export async function createPayoutRepository(
  payout
) {
  const data =
    await getFinancialRepository();

  const amount =
    Number(
      payout.requestedAmount
    );

  const nextPayout = {
    id: Math.random().toString(),

    code: `REP-${new Date().getFullYear()}-${String(
      data.payouts.length + 1
    ).padStart(4, "0")}`,

    type: "manual",
    status: "requested",

    deductions: {
      payoutFee: 0,
      anticipationFee: 0,
      withholding: 0,
      adjustment: 0,
    },

    netAmount: amount,
    receivableIds: [],

    requestedAt:
      new Date().toISOString(),

    approvedAt: null,
    processedAt: null,
    paidAt: null,

    failureReason: null,
    provider: "pix",
    providerReference: null,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),

    ...payout,
  };

  const account = {
    ...data.account,

    balance: {
      ...data.account.balance,

      available:
        data.account.balance
          .available -
        amount,

      requested:
        data.account.balance
          .requested +
        amount,
    },

    updatedAt:
      new Date().toISOString(),
  };

  return saveFinancialData({
    ...data,
    account,
    payouts: [
      nextPayout,
      ...data.payouts,
    ],
  });
}
