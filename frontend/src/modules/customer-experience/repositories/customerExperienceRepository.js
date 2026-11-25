import { customerExperienceMock } from "../mocks/customerExperienceMock";

const EXPERIENCE_STORAGE_KEY = "curitiba360:customer-experience";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getExperienceDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(EXPERIENCE_STORAGE_KEY);
    }
  }
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(customerExperienceMock));
  return clone(customerExperienceMock);
}

export async function saveCustomerRepository(customer) {
  const data = await getExperienceDashboard();
  const newCustomer = {
    id: `cust-${Date.now()}`,
    status: "active",
    engagementScore: 50,
    churnRiskScore: 10,
    lifetimeValue: 0,
    tags: [],
    lastInteractionAt: new Date().toISOString().split("T")[0],
    ...customer
  };
  data.customers.unshift(newCustomer);
  data.summary.activeCustomers = data.customers.length;
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveCampaignRepository(campaign) {
  const data = await getExperienceDashboard();
  const newCampaign = {
    id: `campaign-${Date.now()}`,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    status: "draft",
    ...campaign
  };
  data.campaigns.unshift(newCampaign);
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveCouponRepository(coupon) {
  const data = await getExperienceDashboard();
  const newCoupon = {
    id: `coup-${Date.now()}`,
    status: "active",
    ...coupon
  };
  data.coupons.unshift(newCoupon);
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}
