import {
  marketingMock,
} from "../mocks/marketingMock";

export const MARKETING_STORAGE_KEY =
  "curitiba360:marketing";

export const MARKETING_CHANGED_EVENT =
  "curitiba360:marketing-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(
      MARKETING_CHANGED_EVENT,
      {
        detail: clone(data),
      }
    )
  );
}

function saveMarketing(data) {
  const nextData = {
    ...data,
    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    MARKETING_STORAGE_KEY,
    JSON.stringify(nextData)
  );

  emitChanged(nextData);

  return clone(nextData);
}

export async function getMarketingRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 160)
  );

  try {
    const stored =
      localStorage.getItem(
        MARKETING_STORAGE_KEY
      );

    if (stored) {
      return clone(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      MARKETING_STORAGE_KEY
    );
  }

  return saveMarketing(
    marketingMock
  );
}

export async function createCampaignRepository(
  campaign
) {
  const data =
    await getMarketingRepository();

  const nextCampaign = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(),

    status: "draft",

    metrics: {
      impressions: 0,
      reach: 0,
      clicks: 0,
      ctr: 0,
      carts: 0,
      checkouts: 0,
      conversions: 0,
      conversionRate: 0,
      revenue: 0,
      investment: 0,
      roas: 0,
      cpa: 0,
    },

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),

    ...campaign,
  };

  return saveMarketing({
    ...data,

    campaigns: [
      nextCampaign,
      ...(data.campaigns || []),
    ],
  });
}
