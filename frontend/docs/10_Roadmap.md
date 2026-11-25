# 🗺️ Cronograma & Roadmap Evolutivo — Curitiba 360

Este documento consolida as etapas de evolução do projeto **Curitiba 360** a médio e longo prazo, detalhando o que é construído em cada marco de entrega.

---

## 📍 1. Visão Geral das Fases

```text
Fase 0: Auditoria Geral ➔ Fase 1: Mapa de Navegação ➔ Fase 2: Design System ➔ Fase 3: MVP ➔ Fase 4: Admin ➔ Fase 5: Integrações ➔ Fase 6: Inteligência
```

---

## 📅 2. Detalhamento Cronológico das Entregas

### 🔍 Fase 0 — Auditoria Técnica (Concluído)
* **Objetivo**: Levantar a base tecnológica atual, caminhos de importação, rotas configuradas e integridade do repositório.
* **Resultado**: Identificação e sincronização das rotas do Super App em ambos os workspaces. Geração de arquivo ZIP contendo apenas o código-fonte limpo para análises externas rápidas.

### 📐 Fase 1 — Arquitetura de Navegação (Concluído)
* **Objetivo**: Mapeamento detalhado de rotas do aplicativo (B2C) e do backoffice administrativo (B2B), definindo fluxos contínuos sem telas isoladas.
* **Resultado**: Criação deste repositório de documentos de arquitetura e tabela de rotas React.

### 🎨 Fase 2 — Design System (Em Andamento)
* **Objetivo**: Unificar botões, inputs, modais e layouts de telas em um padrão visual comum baseado em variáveis CSS (HSL) e ícones Lucide.
* **Resultado**: Padronização dos componentes e aplicação de micro-animações.

### 📱 Fase 3 — MVP do Usuário (Próxima Fase)
* **Objetivos Principais**:
  * Autenticação e telas de Login / Cadastro.
  * Home Hub do Super App.
  * Jornada completa de Ticketing (Lista de Eventos ➔ Detalhe ➔ Seleção de Lote ➔ Carrinho ➔ Checkout Simulado ➔ Confirmação ➔ Exibição do E-ticket).
  * Turismo com mapa interativo e Pins funcionais.

### 🖥️ Fase 4 — Administração & Backoffice
* **Objetivo**: Consolidar a visualização de KPIs executivos (faturamento, ocupação, ticket médio) e fluxos operacionais de cadastro de produtos para os parceiros comerciais.

### 🔌 Fase 5 — Integrações Reais
* **Objetivo**: Ligar o frontend às conexões em tempo real do Firebase Authentication, Firestore, Cloud Storage e APIs de gateways financeiros de adquirentes e parceiros.

### 🤖 Fase 6 — Inteligência Preditiva & Smart City
* **Objetivo**: Integrar o Concierge AI baseada em RAG/LLM, sugestão dinâmica de tarifas de venda por modelo cognitivo, monitoramento de telemetria urbana ativa e recursos anti-fraude.
