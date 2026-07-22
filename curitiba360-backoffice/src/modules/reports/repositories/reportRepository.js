export const reportMock = {
  kpis: [
    { id: "receita-bruta", title: "Receita Bruta", value: 42850.7, previousValue: 39500.0, variation: 8.4, trend: "up", color: "emerald" },
    { id: "receita-liquida", title: "Receita Líquida", value: 38400.2, previousValue: 35000.0, variation: 9.7, trend: "up", color: "emerald" },
    { id: "pedidos", title: "Pedidos Aprovados", value: 432, previousValue: 400, variation: 8.0, trend: "up", color: "emerald" },
    { id: "ingressos", title: "Ingressos vendidos", value: 842, previousValue: 800, variation: 5.25, trend: "up", color: "emerald" },
    { id: "ticket-medio", title: "Ticket Médio", value: 99.19, previousValue: 98.75, variation: 0.44, trend: "stable", color: "blue" },
    { id: "conversao", title: "Conversão Funil", value: 3.42, previousValue: 3.2, variation: 6.87, trend: "up", color: "emerald" }
  ],
  salesData: [
    { date: "01/07", value: 1200, orders: 12 },
    { date: "05/07", value: 3400, orders: 35 },
    { date: "10/07", value: 8900, orders: 88 },
    { date: "15/07", value: 15400, orders: 150 },
    { date: "20/07", value: 28400, orders: 280 },
    { date: "25/07", value: 42850.7, orders: 432 }
  ],
  conversionFunnel: [
    { stage: "Visitantes", count: 12600, percentage: 100 },
    { stage: "Visualizou Produto", count: 6800, percentage: 53.9 },
    { stage: "Adicionou Carrinho", count: 1400, percentage: 11.1 },
    { stage: "Checkout", count: 850, percentage: 6.7 },
    { stage: "Compra Aprovada", count: 432, percentage: 3.4 }
  ],
  channelDistribution: [
    { name: "Site / Web", value: 55, color: "#10b981" },
    { name: "App Curitiba 360", value: 30, color: "#3b82f6" },
    { name: "Bilheteria Física", value: 10, color: "#f59e0b" },
    { name: "Parcerias / B2B", value: 5, color: "#8b5cf6" }
  ],
  occupancyStats: {
    totalCapacity: 1000,
    issued: 842,
    checkedIn: 438,
    pending: 404,
    rate: 43.8
  }
};

export async function getReportsData() {
  // Simulate API delay
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  return reportMock;
}
