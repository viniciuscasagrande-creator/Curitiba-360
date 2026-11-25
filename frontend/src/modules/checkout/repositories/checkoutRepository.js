import { INITIAL_CHECKOUT_STATE } from "../constants/checkoutConfig";

const CHECKOUT_STORAGE_KEY = "curitiba360:checkout";

export async function getCheckoutRepository() {
  try {
    const data = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_CHECKOUT_STATE;
  } catch {
    return INITIAL_CHECKOUT_STATE;
  }
}

export async function saveCheckoutRepository(state) {
  localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(state));
  return state;
}

export async function clearCheckoutRepository() {
  localStorage.removeItem(CHECKOUT_STORAGE_KEY);
  return INITIAL_CHECKOUT_STATE;
}
