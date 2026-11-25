export const INITIAL_CMS_DATA = {
  summary: {
    publishedPages: 142,
    pagesInReview: 3,
    scheduledPages: 5,
    publishedPosts: 380,
    seoScore: 94.8,
    indexedPages: 512,
    organicCtr: 4.2,
    avgPosition: 3.8,
    organicSessions: 45000,
    conversionRate: 3.1,
    activeExperiments: 2,
    coreWebVitals: {
      lcp: "1.8s",
      cls: "0.08",
      inp: "80ms",
      ttfb: "120ms",
      fcp: "0.9s"
    }
  },

  pages: [
    { id: "page-01", title: "Guia Turístico da Linha Turismo", slug: "linha-turismo", template: "Cidade", status: "publicado", publishedAt: "2026-07-20T10:00:00Z" },
    { id: "page-02", title: "Festival de Inverno Curitiba 2026", slug: "festival-inverno", template: "Campanha", status: "agendado", publishedAt: "2026-07-25T00:00:00Z" },
    { id: "page-03", title: "Novo Portal de Atrativos do MON", slug: "mon-atrativos", template: "Parceiro", status: "em_revisao", publishedAt: null }
  ],

  banners: [
    { id: "ban-01", title: "Promoção Dia dos Pais", imageUrl: null, targetUrl: "/promocao-pais", clickCount: 840, active: true },
    { id: "ban-02", title: "Alerta de Chuva - Visite MON", imageUrl: null, targetUrl: "/atracao/mon", clickCount: 1500, active: true }
  ],

  redirects: [
    { id: "red-01", sourcePath: "/old-turismo", targetPath: "/linha-turismo", code: 301 },
    { id: "red-02", sourcePath: "/promo-anterior", targetPath: "/festival-inverno", code: 302 }
  ],

  experiments: [
    { id: "exp-01", name: "Cor do CTA do Checkout", variants: ["A (Verde)", "B (Roxo)"], goal: "Conversão de Venda", trafficPct: 50, status: "ativo", winner: null },
    { id: "exp-02", name: "Banner Principal Clima Quente", variants: ["A (Parque Barigui)", "B (Jardim Botânico)"], goal: "CTR do Banner", trafficPct: 100, status: "concluido", winner: "Variant B" }
  ],

  personalizationRules: [
    { id: "rule-01", name: "Segmento Clima Chuvoso", parameter: "clima == chuva", targetContent: "Exibir Widget de Museus e Gastronomia interna" },
    { id: "rule-02", name: "Segmento Turista Estrangeiro", parameter: "idioma != pt-BR", targetContent: "Exibir tradução automática en-US/es-ES" }
  ],

  translations: [
    { id: "tr-01", key: "welcome_message", pt: "Bem-vindo a Curitiba", en: "Welcome to Curitiba", es: "Bienvenido a Curitiba" },
    { id: "tr-02", key: "buy_ticket", pt: "Comprar Ingresso", en: "Buy Ticket", es: "Comprar Entrada" }
  ],

  calendarEvents: [
    { id: "cal-01", title: "Post: 5 Melhores Parques no Inverno", publishDate: "2026-07-23", type: "post" },
    { id: "cal-02", title: "Página: Especial Gastronomia Curitibana", publishDate: "2026-07-28", type: "page" }
  ]
};
