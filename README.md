# Curitiba 360° — Ecossistema Completo (Site, Frontend/Backoffice e Backend)

Este diretório contém exclusivamente os projetos e recursos da plataforma **Curitiba 360°**, organizados em módulos claros:

---

## 📁 Estrutura de Diretórios

```text
360/
├── site/                  # 🌐 Portal Público do Turista (React + Vite + Tailwind + Express API + Supabase)
├── frontend/              # 🖥️ Backoffice & Business OS Enterprise (React 19 + Vite + Tailwind 4 + Firebase)
├── backend/               # ⚙️ Backend, Cloud Functions, API Server e Banco de Dados
│   ├── api-site/          # API REST de Atrações, Categorias, Landmarks, Pedidos e Parceiros
│   ├── database/          # Schema PostgreSQL / Supabase (schema.sql)
│   ├── functions/         # Firebase Cloud Functions (Autenticação, Pedidos, Check-in QR Code, Rate Limit)
│   ├── data/              # Base JSON local para simulação e estatísticas (database.json)
│   ├── firestore.rules    # Regras de segurança do Cloud Firestore
│   ├── firebase.json      # Configuração do Firebase Hosting, Firestore e Functions
│   └── server.js          # Servidor HTTP Node.js e agregador de métricas em tempo real
├── docs-e-backups/        # 📚 Documentação técnica, SRS, Wireframes e Backups (.zip)
│   ├── arquitetura-docs/  # MasterPlan, Arquitetura, Design System, Backlog, MVP, IA e Roadmap
│   ├── especificacoes-srs/# Documentos SRS (Backoffice, Público e Parque Jaime Lerner)
│   ├── wireframes/        # Telas de referência oficiais (Mobile, Desktop e Galeria React)
│   ├── zips-e-backups/    # Pacotes .zip de versões e entregas anteriores
│   └── prototipos-legados/# Versões intermediárias arquivadas sem node_modules
├── curitiba360.code-workspace # Arquivo de Workspace Multi-Root para o VS Code
└── package.json           # Scripts centralizados para rodar qualquer módulo a partir da raiz
```

---

## 🚀 Como Executar Cada Módulo

Você pode rodar os comandos diretamente da raiz (`E:\Projetos Vs Code\360`) ou entrar na pasta de cada módulo:

### 1. 🌐 Site Público (`site/`)
Portal voltado ao turista com catálogo de atrações, roteiros, hotéis, agências, assistente IA e carrinho de ingressos.
```bash
npm run dev:site
# Ou para rodar o Site + API Visual Explorer simultaneamente:
npm run dev:site:full
```

### 2. 🖥️ Frontend / Backoffice (`frontend/`)
Painel administrativo e operacional completo (Gestão de Atrações, Parceiros, Agências, Ingressos, Validação QR Code, Anti-Cambista, Financeiro, CRM e Governança).
```bash
npm run dev:frontend
```

### 3. ⚙️ Backend (`backend/`)
Servidores de API, Cloud Functions e banco de dados.
```bash
# Iniciar servidor Node.js principal:
npm run dev:backend

# Servir Firebase Cloud Functions localmente:
cd backend && npm run functions:serve
```
