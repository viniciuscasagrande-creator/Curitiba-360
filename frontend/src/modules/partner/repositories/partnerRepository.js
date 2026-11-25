import { partnerMock } from "../mocks/partnerMock";

export const PARTNER_STORAGE_KEY =
  "curitiba360:partner";

export const PARTNER_CHANGED_EVENT =
  "curitiba360:partner-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitPartnerChanged(partner) {
  window.dispatchEvent(
    new CustomEvent(PARTNER_CHANGED_EVENT, {
      detail: clone(partner),
    })
  );
}

function savePartner(partner) {
  const nextPartner = {
    ...partner,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    PARTNER_STORAGE_KEY,
    JSON.stringify(nextPartner)
  );

  emitPartnerChanged(nextPartner);

  return clone(nextPartner);
}

export async function getPartnerRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 180)
  );

  try {
    const stored = localStorage.getItem(
      PARTNER_STORAGE_KEY
    );

    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(
      PARTNER_STORAGE_KEY
    );
  }

  return savePartner(partnerMock);
}

export async function updatePartnerRepository(
  updates
) {
  const partner =
    await getPartnerRepository();

  return savePartner({
    ...partner,
    ...updates,
  });
}

export async function replacePartnerRepository(
  partner
) {
  return savePartner(partner);
}
