import {
  adminMock,
} from "../mocks/adminMock";

export const ADMIN_STORAGE_KEY =
  "curitiba360:admin";

export const ADMIN_CHANGED_EVENT =
  "curitiba360:admin-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(
      ADMIN_CHANGED_EVENT,
      {
        detail: clone(data),
      }
    )
  );
}

function saveAdminData(data) {
  const nextData = {
    ...data,
    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify(nextData)
  );

  emitChanged(nextData);

  return clone(nextData);
}

export async function getAdminRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 180)
  );

  try {
    const stored =
      localStorage.getItem(
        ADMIN_STORAGE_KEY
      );

    if (stored) {
      return clone(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      ADMIN_STORAGE_KEY
    );
  }

  return saveAdminData(
    adminMock
  );
}

export async function approvePartnerRepository(partnerId, notes) {
  const data = await getAdminRepository();
  data.pendingPartners = data.pendingPartners.filter(p => p.id !== partnerId);
  return saveAdminData(data);
}
