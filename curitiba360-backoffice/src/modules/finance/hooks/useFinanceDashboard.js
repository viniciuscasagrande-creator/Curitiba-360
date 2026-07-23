import { useState, useEffect, useCallback } from "react";
import { financeService } from "../services/financeService";

export function useFinanceDashboard() {
  const [summary, setSummary] = useState(null);
  const [cashFlow, setCashFlow] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [payables, setPayables] = useState([]);
  const [receivables, setReceivables] = useState([]);
  const [splitRules, setSplitRules] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await financeService.getDashboard();
    if (res.success && res.data) {
      const { summary, cashFlow, settlements, alerts, transactions, payables, receivables, splitRules, subscriptions, invoices, budgets, costCenters } = res.data;
      setSummary(summary || null);
      setCashFlow(cashFlow || []);
      setSettlements(settlements || []);
      setAlerts(alerts || []);
      setTransactions(transactions || []);
      setPayables(payables || []);
      setReceivables(receivables || []);
      setSplitRules(splitRules || []);
      setSubscriptions(subscriptions || []);
      setInvoices(invoices || []);
      setBudgets(budgets || []);
      setCostCenters(costCenters || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const savePayable = async (payable) => {
    const res = await financeService.savePayable(payable);
    if (res.success && res.data) {
      setPayables(res.data.payables);
      setSummary(res.data.summary);
    }
  };

  const saveSplitRule = async (rule) => {
    const res = await financeService.saveSplitRule(rule);
    if (res.success && res.data) {
      setSplitRules(res.data.splitRules);
    }
  };

  const saveBudget = async (budget) => {
    const res = await financeService.saveBudget(budget);
    if (res.success && res.data) {
      setBudgets(res.data.budgets);
    }
  };

  return {
    summary,
    cashFlow,
    settlements,
    alerts,
    transactions,
    payables,
    receivables,
    splitRules,
    subscriptions,
    invoices,
    budgets,
    costCenters,
    loading,
    savePayable,
    saveSplitRule,
    saveBudget,
    reload: loadData
  };
}
