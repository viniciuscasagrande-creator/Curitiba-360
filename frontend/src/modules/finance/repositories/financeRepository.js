import { financePlatformMock } from "../mocks/financePlatformMock";

const FINANCE_STORAGE_KEY = "curitiba360:finance-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getFinanceDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(FINANCE_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(FINANCE_STORAGE_KEY);
    }
  }
  localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(financePlatformMock));
  return clone(financePlatformMock);
}

export async function getTransactions() {
  const data = await getFinanceDashboard();
  return data.transactions;
}

export async function getPayables() {
  const data = await getFinanceDashboard();
  return data.payables;
}

export async function getReceivables() {
  const data = await getFinanceDashboard();
  return data.receivables;
}

export async function getSplitRules() {
  const data = await getFinanceDashboard();
  return data.splitRules;
}

export async function getSettlements() {
  const data = await getFinanceDashboard();
  return data.settlements;
}

export async function getSubscriptions() {
  const data = await getFinanceDashboard();
  return data.subscriptions;
}

export async function getInvoices() {
  const data = await getFinanceDashboard();
  return data.invoices;
}

export async function getBudgets() {
  const data = await getFinanceDashboard();
  return data.budgets;
}

export async function savePayableRepository(payable) {
  const data = await getFinanceDashboard();
  const newPayable = {
    id: `pay-${Date.now()}`,
    paidAmount: 0,
    status: "pending_approval",
    ...payable
  };
  data.payables.unshift(newPayable);
  data.summary.accountsPayable = data.payables.reduce((acc, curr) => acc + (curr.originalAmount - curr.paidAmount), 0);
  localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveSplitRuleRepository(rule) {
  const data = await getFinanceDashboard();
  const newRule = {
    id: `spl-${Date.now()}`,
    status: "draft",
    ...rule
  };
  data.splitRules.unshift(newRule);
  localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveBudgetRepository(budget) {
  const data = await getFinanceDashboard();
  const newBudget = {
    id: `bud-${Date.now()}`,
    committedAmount: 0,
    realizedAmount: 0,
    forecastAmount: budget.budgetedAmount,
    status: "draft",
    ...budget
  };
  data.budgets.unshift(newBudget);
  localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}
