import { aiPlatformMock } from "../mocks/aiPlatformMock";

const AI_STORAGE_KEY = "curitiba360:ai-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getAiDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(AI_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(AI_STORAGE_KEY);
    }
  }
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(aiPlatformMock));
  return clone(aiPlatformMock);
}

export async function getAiAgents() {
  const data = await getAiDashboard();
  return data.agents;
}

export async function getAiModels() {
  const data = await getAiDashboard();
  return data.models;
}

export async function getAiProviders() {
  const data = await getAiDashboard();
  return data.providers;
}

export async function getPromptLibrary() {
  const data = await getAiDashboard();
  return data.prompts;
}

export async function getKnowledgeBases() {
  const data = await getAiDashboard();
  return data.knowledgeBases;
}

export async function getAiExecutions() {
  const data = await getAiDashboard();
  return data.executions;
}

export async function getAiEvaluations() {
  const data = await getAiDashboard();
  return data.evaluations;
}

export async function getAiBudgets() {
  const data = await getAiDashboard();
  return data.budgets;
}

export async function getAiGuardrails() {
  const data = await getAiDashboard();
  return data.guardrails;
}

export async function saveAiAgentRepository(agent) {
  const data = await getAiDashboard();
  const newAgent = {
    id: `agent-${Date.now()}`,
    executionsToday: 0,
    successRate: 100.0,
    averageLatencyMs: 1200,
    status: "active",
    ...agent
  };
  data.agents.unshift(newAgent);
  data.summary.activeAgents = data.agents.length;
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function savePromptRepository(prompt) {
  const data = await getAiDashboard();
  const newPrompt = {
    id: `pr-${Date.now()}`,
    version: 1,
    status: "active",
    ...prompt
  };
  data.prompts.unshift(newPrompt);
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveKnowledgeBaseRepository(kb) {
  const data = await getAiDashboard();
  const newKb = {
    id: `kb-${Date.now()}`,
    documentCount: 0,
    chunkCount: 0,
    status: "indexing",
    ...kb
  };
  data.knowledgeBases.unshift(newKb);
  data.summary.indexedDocuments = data.knowledgeBases.reduce((acc, curr) => acc + curr.documentCount, 0);
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveBudgetRepository(bud) {
  const data = await getAiDashboard();
  const newBud = {
    id: `bud-${Date.now()}`,
    currentAmount: 0,
    status: "green",
    ...bud
  };
  data.budgets.unshift(newBud);
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data));
  return data;
}
