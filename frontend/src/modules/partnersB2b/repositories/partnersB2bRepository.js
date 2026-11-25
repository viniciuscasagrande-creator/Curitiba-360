import { partnersB2bMock } from "../mocks/partnersB2bMock";

const PARTNERS_B2B_STORAGE_KEY = "curitiba360:partnersB2b-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getPartnersB2bDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(PARTNERS_B2B_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(PARTNERS_B2B_STORAGE_KEY);
    }
  }
  localStorage.setItem(PARTNERS_B2B_STORAGE_KEY, JSON.stringify(partnersB2bMock));
  return clone(partnersB2bMock);
}

export async function updateContractStatus(contractId, status) {
  const data = await getPartnersB2bDashboard();
  const contract = data.contracts.find(c => c.id === contractId);
  if (contract) {
    contract.status = status;
    localStorage.setItem(PARTNERS_B2B_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}

export async function addBooking(booking) {
  const data = await getPartnersB2bDashboard();
  data.bookings.push(booking);
  localStorage.setItem(PARTNERS_B2B_STORAGE_KEY, JSON.stringify(data));
  return data;
}
