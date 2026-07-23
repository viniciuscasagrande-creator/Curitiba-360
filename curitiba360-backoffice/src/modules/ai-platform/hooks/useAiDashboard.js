import { useState, useEffect, useCallback } from "react";
import { aiGatewayService } from "../services/aiGatewayService";

export function useAiDashboard() {
  const [summary, setSummary] = useState(null);
  const [agents, setAgents] = useState([]);
  const [models, setModels] = useState([]);
  const [providers, setProviders] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [guardrails, setGuardrails] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await aiGatewayService.getDashboard();
    if (res.success && res.data) {
      const { summary, agents, models, providers, prompts, knowledgeBases, executions, evaluations, budgets, guardrails, alerts } = res.data;
      setSummary(summary || null);
      setAgents(agents || []);
      setModels(models || []);
      setProviders(providers || []);
      setPrompts(prompts || []);
      setKnowledgeBases(knowledgeBases || []);
      setExecutions(executions || []);
      setEvaluations(evaluations || []);
      setBudgets(budgets || []);
      setGuardrails(guardrails || []);
      setAlerts(alerts || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveAgent = async (agent) => {
    const res = await aiGatewayService.saveAgent(agent);
    if (res.success && res.data) {
      setAgents(res.data.agents);
      setSummary(res.data.summary);
    }
  };

  const savePrompt = async (prompt) => {
    const res = await aiGatewayService.savePrompt(prompt);
    if (res.success && res.data) {
      setPrompts(res.data.prompts);
    }
  };

  const saveKnowledgeBase = async (kb) => {
    const res = await aiGatewayService.saveKnowledgeBase(kb);
    if (res.success && res.data) {
      setKnowledgeBases(res.data.knowledgeBases);
      setSummary(res.data.summary);
    }
  };

  const saveBudget = async (budget) => {
    const res = await aiGatewayService.saveBudget(budget);
    if (res.success && res.data) {
      setBudgets(res.data.budgets);
    }
  };

  return {
    summary,
    agents,
    models,
    providers,
    prompts,
    knowledgeBases,
    executions,
    evaluations,
    budgets,
    guardrails,
    alerts,
    loading,
    saveAgent,
    savePrompt,
    saveKnowledgeBase,
    saveBudget,
    reload: loadData
  };
}
