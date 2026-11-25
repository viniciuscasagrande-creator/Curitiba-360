import { INITIAL_BI_DATA } from "../data/biMockData";

// Extended mock structures inside repository
export const initialPipelinesList = [
  {
    id: "pipe-vendas",
    name: "Carga fato_vendas_ingressos",
    source: "PostgreSQL - Transacional",
    destination: "BigQuery - fato_vendas_ingressos",
    mode: "batch",
    status: "succeeded",
    processedRecords: 24500,
    rejectedRecords: 0,
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    finishedAt: new Date(Date.now() - 3600000 + 45000).toISOString(),
    lastSuccessfulRunAt: new Date(Date.now() - 3600000).toISOString(),
    nextRunAt: new Date(Date.now() + 3600000).toISOString(),
    errorMessage: null
  },
  {
    id: "pipe-acesso",
    name: "Carga fato_acesso_smart_venue",
    source: "IoT Sensors Hub",
    destination: "BigQuery - fato_acesso_smart_venue",
    mode: "streaming",
    status: "running",
    processedRecords: 128500,
    rejectedRecords: 12,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    lastSuccessfulRunAt: new Date(Date.now() - 60000).toISOString(),
    nextRunAt: null,
    errorMessage: null
  }
];

export const initialDataQualityRules = [
  {
    id: "dq-001",
    tableName: "fato_vendas_ingressos",
    columnName: "valor_pago",
    ruleType: "not_null",
    status: "passed",
    lastChecked: new Date().toISOString()
  },
  {
    id: "dq-002",
    tableName: "dim_turistas_segmentacao",
    columnName: "cidade_origem",
    ruleType: "min_length_3",
    status: "failed",
    lastChecked: new Date().toISOString()
  }
];

export const initialBusinessMetrics = [
  {
    id: "met-001",
    name: "Receita Líquida",
    slug: "receita_liquida",
    description: "Receita bruta menos descontos, cashback, estornos e taxas aplicáveis.",
    domain: "financial",
    formula: "SUM(gross_revenue) - SUM(discount) - SUM(cashback) - SUM(fees)",
    aggregation: "sum",
    dimensions: ["dim_date", "dim_partner", "dim_organization"],
    ownerTeam: "Finance Core",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "met-002",
    name: "No-Show Geral",
    slug: "no_show_rate",
    description: "Proporção de ingressos válidos emitidos que não foram validados no check-in.",
    domain: "operations",
    formula: "1 - (COUNT(fact_checkins.id) / COUNT(fact_tickets.id))",
    aggregation: "ratio",
    dimensions: ["dim_date", "dim_event", "dim_partner"],
    ownerTeam: "Operations",
    status: "approved",
    createdAt: new Date().toISOString()
  }
];

export const PIPELINES_KEY = "curitiba360:bi_pipelines";
export const RULES_KEY = "curitiba360:bi_dq_rules";
export const METRICS_KEY = "curitiba360:bi_business_metrics";
export const BI_CHANGED_EVENT = "curitiba360:bi-data-changed";

function emitChange(detail) {
  window.dispatchEvent(new CustomEvent(BI_CHANGED_EVENT, { detail }));
}

export async function getPipelinesRepository() {
  const stored = localStorage.getItem(PIPELINES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PIPELINES_KEY, JSON.stringify(initialPipelinesList));
  return initialPipelinesList;
}

export async function getDataQualityRulesRepository() {
  const stored = localStorage.getItem(RULES_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(RULES_KEY, JSON.stringify(initialDataQualityRules));
  return initialDataQualityRules;
}

export async function getBusinessMetricsRepository() {
  const stored = localStorage.getItem(METRICS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(METRICS_KEY, JSON.stringify(initialBusinessMetrics));
  return initialBusinessMetrics;
}

export async function triggerPipelineRunRepository(id) {
  const list = await getPipelinesRepository();
  const index = list.findIndex(p => p.id === id);
  if (index !== -1) {
    list[index].status = "running";
    list[index].startedAt = new Date().toISOString();
    localStorage.setItem(PIPELINES_KEY, JSON.stringify(list));
    emitChange({ type: "pipelines", data: list });
    
    // Simulate pipeline completion
    setTimeout(() => {
      list[index].status = "succeeded";
      list[index].finishedAt = new Date().toISOString();
      list[index].lastSuccessfulRunAt = new Date().toISOString();
      localStorage.setItem(PIPELINES_KEY, JSON.stringify(list));
      emitChange({ type: "pipelines", data: list });
    }, 2000);
  }
  return list;
}

export async function toggleDQRuleRepository(id) {
  const list = await getDataQualityRulesRepository();
  const index = list.findIndex(r => r.id === id);
  if (index !== -1) {
    list[index].status = list[index].status === "passed" ? "failed" : "passed";
    localStorage.setItem(RULES_KEY, JSON.stringify(list));
    emitChange({ type: "dq_rules", data: list });
  }
  return list;
}
