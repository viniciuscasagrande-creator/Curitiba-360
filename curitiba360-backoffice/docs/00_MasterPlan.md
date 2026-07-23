# 📌 Curitiba 360 — Documento Mestre (Master Plan)

Este é o documento de partida e referência estratégica para o projeto **Curitiba 360**. Ele orienta o desenvolvimento técnico, metodológico e operacional da plataforma.

---

## 🎯 1. Objetivo do Produto

O **Curitiba 360** visa integrar a principal plataforma de turismo, eventos, marketplace e serviços da cidade de Curitiba, unificando a experiência para cidadãos, turistas, empresas parceiras e administradores governamentais.

---

## 🏗️ 2. Arquitetura Geral

O ecossistema é dividido em dois grandes ambientes integrados:

```text
                   Curitiba 360
                       │
───────────────────────┼────────────────────────
        APP                     ADMIN
        │                         │
        ▼                         ▼
  Usuários (B2C)           Administradores (B2B)
  - Turistas               - Prefeitura de Curitiba
  - Moradores              - Empresas e Produtores
  - Visitantes             - Parceiros e Agências
```

---

## 📂 3. Estrutura do Projeto

O código-fonte do projeto segue a estrutura padrão de pastas no ecossistema React/Vite:

```text
src/
 ├── app/           # Configuração de inicialização global e provedores
 ├── components/    # Componentes globais compartilhados do Design System
 ├── layouts/       # Componentes de estrutura de tela (Header, Sidebar, etc.)
 ├── modules/       # Divisão de módulos funcionais encapsulados
 ├── hooks/         # Hooks reativos globais e de estado
 ├── services/      # Integrações com APIs externas e Firebase
 ├── repositories/  # Gerenciamento de persistência local/remota de dados
 ├── providers/     # Context Providers globais
 ├── guards/        # Controladores de rota e RBAC (Role Based Access Control)
 ├── routes/        # Mapeamento e controle de rotas
 ├── assets/        # Imagens estáticas, vetores e mídias
 ├── styles/        # Estilização global e tokens CSS
 └── utils/         # Helpers e utilitários javascript de uso comum
```

---

## 🔄 4. Fluxo Principal do Usuário

O fluxo do participante segue um caminho direto e linear, otimizado para conversão de vendas e engajamento local:

```text
Login / Criar Conta
        │
        ▼
   Home (App)
        │
        ▼
Explorar Curitiba (Busca)
        │
        ▼
Detalhes da Atração / Evento
        │
        ▼
Seleção de Lotes e Quantidade
        │
        ▼
Carrinho de Compras
        │
        ▼
Pagamento (Checkout Pix/Cartão)
        │
        ▼
Voucher / Ingresso Digital Ativo
```

---

## 📱 5. Navegação e Menus do Aplicativo (App)

### A. Home (Hub Inteligente)
* **Destaques**: Banner dinâmico com curadoria.
* **Busca Global**: Input com autocompletar e categorias rápidas.
* **Seções Rápidas**: Eventos, Turismo, Gastronomia, Hospedagem, Marketplace, Benefícios, Carteira, Perfil.

### B. Eventos
* **Filtros e Busca**: Busca por data, proximidade e categoria.
* **Destaques**: Banner dinâmico e próximos eventos.
* **Favoritos**: Acesso rápido a itens salvos.

### C. Turismo
* **Pontos Turísticos**: Detalhamento e geolocalização.
* **Roteiros e Parques**: Curadorias temáticas de passeios na cidade.

### D. Carteira (Wallet)
* **Gestão de Valores**: Saldo de créditos e Cashback acumulado.
* **Facilidades**: Pagamentos via Pix, cartões cadastrados e histórico.

### E. Perfil
* **Dados Pessoais**: Endereço, informações de contato e preferências.
* **Histórico**: Listagem de pedidos, reservas e ingressos ativos.

---

## 🖥️ 6. Navegação e Painel Administrativo (Admin Console)

O console administrativo consolida as seguintes seções operacionais de controle:

* **Dashboard**: KPIs executivos e monitor de faturamento.
* **Eventos & Lotes**: Cadastro de atrações e disponibilidade de lotes.
* **Pedidos & Vendas**: Rastreamento de transações comerciais.
* **Clientes & CRM**: Banco de dados de participantes e tickets de suporte.
* **Parceiros B2B**: Aprovação de produtores, comitês e contratos ativos.
* **Financeiro**: Split de pagamentos, conciliação e tarifas de comissão.
* **Marketing**: Campanhas de remarketing, cupons e afiliados.
* **Relatórios**: BI, Data Lake, métricas de ocupação e logs de auditoria.
* **Configurações**: Cadastro de planos e acessos de segurança.

---

## 🛠️ 7. Stack Tecnológica e Ferramentas

### Frontend
* **Core**: React v18+ & Vite
* **Estilização**: CSS Vanilla (Design System estruturado)
* **Formulários & Validação**: React Hook Form & Zod
* **Rotas**: React Router v6
* **Ícones**: Lucide React
* **Gráficos**: Recharts
* **Queries e Cache**: TanStack Query (opcional/planejado)

### Backend & Cloud Services
* **Autenticação**: Firebase Authentication
* **Banco de Dados**: Firestore NoSQL
* **Armazenamento**: Firebase Cloud Storage
* **Processamento**: Cloud Functions
* **Notificações**: Firebase Cloud Messaging (Push Notifications)

---

## 🚀 8. Ciclo de Implementação de Telas

Cada nova funcionalidade do projeto seguirá rigorosamente o seguinte fluxo de maturidade:

```text
1. Estrutura da Tela (HTML/JSX)
        │
        ▼
2. Configuração de Rotas e Navegação
        │
        ▼
3. Refinamento de Componentes (Aesthetics & Design System)
        │
        ▼
4. Implementação de Mocks e Hooks de Estado
        │
        ▼
5. Integração com Firebase / Firestore
        │
        ▼
6. Inteligência Preditiva e Recursos IA
        │
        ▼
7. Otimização de Performance e Auditoria (Lighthouse)
```
