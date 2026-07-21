import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from '../components/auth/RoleRoute';
import AdminLayout from '../components/layout/AdminLayout';

// Auth Pages (Static Import)
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Phase 29 Business Operating System (Business OS) Pages (Lazy Loaded)
const ExecutiveOperatingCenterPage = lazy(() => import('../pages/admin/businessos/ExecutiveOperatingCenterPage'));
const ExecutiveAiBoardPage = lazy(() => import('../pages/admin/businessos/ExecutiveAiBoardPage'));

// Phase 28 Autonomous Enterprise & Scenario Simulator Pages (Lazy Loaded)
const EnterpriseCommandCenterPage = lazy(() => import('../pages/admin/autonomous/EnterpriseCommandCenterPage'));
const ScenarioSimulatorPage = lazy(() => import('../pages/admin/autonomous/ScenarioSimulatorPage'));

// Phase 27 Global Federation & Multi-Cloud Pages (Lazy Loaded)
const GlobalFederationPage = lazy(() => import('../pages/admin/federation/GlobalFederationPage'));
const MultiCloudPage = lazy(() => import('../pages/admin/federation/MultiCloudPage'));

// Phase 25 & 26 Business Hub, BaaS, Marketplace & Agentic AI Pages (Lazy Loaded)
const BusinessHubPage = lazy(() => import('../pages/admin/business/BusinessHubPage'));
const MarketplacePage = lazy(() => import('../pages/admin/business/MarketplacePage'));
const BankingServicePage = lazy(() => import('../pages/admin/business/BankingServicePage'));
const AiCommandCenterPage = lazy(() => import('../pages/admin/agentic/AiCommandCenterPage'));
const AgentsLibraryPage = lazy(() => import('../pages/admin/agentic/AgentsLibraryPage'));

// Phase 22, 23 & 24 AI Copilot, IDP & Executive BI Pages (Lazy Loaded)
const CopilotStudioPage = lazy(() => import('../pages/admin/ai/CopilotStudioPage'));
const DigitalTwinPage = lazy(() => import('../pages/admin/ai/DigitalTwinPage'));
const InternalDeveloperPlatformPage = lazy(() => import('../pages/admin/engineering/InternalDeveloperPlatformPage'));
const ServiceCatalogPage = lazy(() => import('../pages/admin/engineering/ServiceCatalogPage'));
const MlOpsRegistryPage = lazy(() => import('../pages/admin/data/MlOpsRegistryPage'));
const ExecutiveCockpitPage = lazy(() => import('../pages/admin/data/ExecutiveCockpitPage'));

// Phase 21 Platform Ecosystem, Developer Hub, API Gateway & Webhooks (Lazy Loaded)
const DeveloperHubPage = lazy(() => import('../pages/admin/developer/DeveloperHubPage'));
const ApiGatewayPage = lazy(() => import('../pages/admin/developer/ApiGatewayPage'));
const WebhooksPage = lazy(() => import('../pages/admin/developer/WebhooksPage'));
const PluginsMarketplacePage = lazy(() => import('../pages/admin/developer/PluginsMarketplacePage'));
const WorkflowsPage = lazy(() => import('../pages/admin/developer/WorkflowsPage'));
const IntegrationsPage = lazy(() => import('../pages/admin/developer/IntegrationsPage'));
const SdkDownloadsPage = lazy(() => import('../pages/admin/developer/SdkDownloadsPage'));
const ApiMonitorPage = lazy(() => import('../pages/admin/developer/ApiMonitorPage'));

// Phase 20 FinOps, SLA Center, Capacity, Contracts & Global Operations (Lazy Loaded)
const FinOpsPage = lazy(() => import('../pages/admin/scale/FinOpsPage'));
const SlaCenterPage = lazy(() => import('../pages/admin/scale/SlaCenterPage'));
const CapacityPlanningPage = lazy(() => import('../pages/admin/scale/CapacityPlanningPage'));
const VendorContractsPage = lazy(() => import('../pages/admin/scale/VendorContractsPage'));
const GlobalOperationsPage = lazy(() => import('../pages/admin/scale/GlobalOperationsPage'));

// Phase 19 Reliability, Compliance & Incident Pages (Lazy Loaded)
const ReliabilityCenterPage = lazy(() => import('../pages/admin/scale/ReliabilityCenterPage'));
const IncidentsPage = lazy(() => import('../pages/admin/scale/IncidentsPage'));
const CompliancePrivacyPage = lazy(() => import('../pages/admin/scale/CompliancePrivacyPage'));
const DisasterRecoveryPage = lazy(() => import('../pages/admin/scale/DisasterRecoveryPage'));
const ReleaseGovernancePage = lazy(() => import('../pages/admin/scale/ReleaseGovernancePage'));

// Phase 18 Scale & Production Pages (Lazy Loaded)
const TenantsPage = lazy(() => import('../pages/admin/scale/TenantsPage'));
const FeatureFlagsPage = lazy(() => import('../pages/admin/scale/FeatureFlagsPage'));
const BackgroundJobsPage = lazy(() => import('../pages/admin/scale/BackgroundJobsPage'));
const SecurityCenterPage = lazy(() => import('../pages/admin/scale/SecurityCenterPage'));
const DeploymentsPage = lazy(() => import('../pages/admin/scale/DeploymentsPage'));

// Admin Dashboard & Core Modules (Lazy Loaded)
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UsersList = lazy(() => import('../pages/admin/users/UsersList'));
const EventsList = lazy(() => import('../pages/admin/events/EventsList'));
const TicketsList = lazy(() => import('../pages/admin/tickets/TicketsList'));
const OrdersList = lazy(() => import('../pages/admin/orders/OrdersList'));
const OrderDetails = lazy(() => import('../pages/admin/orders/OrderDetails'));
const PaymentsList = lazy(() => import('../pages/admin/payments/PaymentsList'));
const RefundsList = lazy(() => import('../pages/admin/refunds/RefundsList'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const Settings = lazy(() => import('../pages/admin/Settings'));

// Phase 5 Access & Check-in Operations (Lazy Loaded)
const AccessScanner = lazy(() => import('../pages/access/AccessScanner'));
const AccessDashboard = lazy(() => import('../pages/access/AccessDashboard'));
const CheckinDashboard = lazy(() => import('../pages/admin/CheckinDashboard'));
const TicketTransfer = lazy(() => import('../pages/public/TicketTransfer'));
const RefundRequest = lazy(() => import('../pages/public/RefundRequest'));

// Phase 7 Ecosystem, Pass & Partner Modules (Lazy Loaded)
const PassCatalog = lazy(() => import('../pages/public/PassCatalog'));
const DigitalWalletPage = lazy(() => import('../pages/public/DigitalWalletPage'));
const AttractionForm = lazy(() => import('../pages/admin/attractions/AttractionForm'));
const PartnersList = lazy(() => import('../pages/admin/partners/PartnersList'));

// Phase 8 Omnichannel, Mobile & PWA Pages (Lazy Loaded)
const ExplorePage = lazy(() => import('../pages/public/ExplorePage'));
const UserProfilePage = lazy(() => import('../pages/public/UserProfilePage'));

// Phase 9 AI Assistant & AI Studio Pages (Lazy Loaded)
const AIAssistantPage = lazy(() => import('../pages/public/AIAssistantPage'));
const AIStudioPage = lazy(() => import('../pages/admin/AIStudioPage'));

// Phase 10 Financial Platform, Ledger & Payout Pages (Lazy Loaded)
const FinancialDashboardPage = lazy(() => import('../pages/admin/finance/FinancialDashboardPage'));
const PartnerPayoutsPage = lazy(() => import('../pages/admin/finance/PartnerPayoutsPage'));
const ReconciliationPage = lazy(() => import('../pages/admin/finance/ReconciliationPage'));

// Phase 11 Command Center, CRM & Support Pages (Lazy Loaded)
const CommandCenterPage = lazy(() => import('../pages/admin/operations/CommandCenterPage'));
const CustomerCRMPage = lazy(() => import('../pages/admin/crm/CustomerCRMPage'));
const SupportTicketsPage = lazy(() => import('../pages/admin/support/SupportTicketsPage'));

// Phase 12 Data Platform, BI & Executive Control Tower Pages (Lazy Loaded)
const ControlTowerPage = lazy(() => import('../pages/admin/analytics/ControlTowerPage'));

// Phase 16 Marketing Automation, Affiliates, Partner Portal & Audit Pages (Lazy Loaded)
const MarketingAutomationPage = lazy(() => import('../pages/admin/marketing/MarketingAutomationPage'));
const AffiliatesPage = lazy(() => import('../pages/admin/marketing/AffiliatesPage'));
const PartnerPortalDashboardPage = lazy(() => import('../pages/admin/partners/PartnerPortalDashboardPage'));
const AuditLogsPage = lazy(() => import('../pages/admin/audit/AuditLogsPage'));

// Phase 17 Observability, AI Predictive, Data Quality & Risk Pages (Lazy Loaded)
const ObservabilityPage = lazy(() => import('../pages/admin/analytics/ObservabilityPage'));
const PredictiveIntelligencePage = lazy(() => import('../pages/admin/ai/PredictiveIntelligencePage'));
const DataQualityPage = lazy(() => import('../pages/admin/analytics/DataQualityPage'));
const RiskIntelligencePage = lazy(() => import('../pages/admin/risk/RiskIntelligencePage'));

// Phase 3 Public Sales & Wallet Pages (Lazy Loaded)
const Cart = lazy(() => import('../pages/public/Cart'));
const Checkout = lazy(() => import('../pages/public/Checkout'));
const MyTickets = lazy(() => import('../pages/public/MyTickets'));

// Layout & Private Route Legados/Sistemas (Lazy Loaded)
const Layout = lazy(() => import('../components/Layout'));
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));

// Páginas do Portal Público (Lazy Loaded)
const PortalHome = lazy(() => import('../pages/portal/PortalHome'));
const PortalLogin = lazy(() => import('../pages/portal/PortalLogin'));
const PortalRecuperarSenha = lazy(() => import('../pages/portal/PortalRecuperarSenha'));
const PortalCriarSenha = lazy(() => import('../pages/portal/PortalCriarSenha'));
const PortalCriarConta = lazy(() => import('../pages/portal/PortalCriarConta'));
const PortalConfirmacaoCadastro = lazy(() => import('../pages/portal/PortalConfirmacaoCadastro'));
const PortalEmailMock = lazy(() => import('../pages/portal/PortalEmailMock'));

// Páginas Principais do Backoffice Legado (Lazy Loaded)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const DashboardAnalytics = lazy(() => import('../pages/DashboardAnalytics'));
const GestaoUsuarios = lazy(() => import('../pages/GestaoUsuarios'));
const CadastroUsuario = lazy(() => import('../pages/CadastroUsuario'));
const GestaoAtracoes = lazy(() => import('../pages/GestaoAtracoes'));
const CadastroAtracao = lazy(() => import('../pages/CadastroAtracao'));
const TotaisAtracao = lazy(() => import('../pages/TotaisAtracao'));
const GestaoIngressos = lazy(() => import('../pages/GestaoIngressos'));
const GestaoPacotes = lazy(() => import('../pages/GestaoPacotes'));
const ValidacaoIngressos = lazy(() => import('../pages/ValidacaoIngressos'));
const ControleTransferencias = lazy(() => import('../pages/ControleTransferencias'));
const GestaoFluxoEntrada = lazy(() => import('../pages/GestaoFluxoEntrada'));
const ConfiguracoesComerciais = lazy(() => import('../pages/ConfiguracoesComerciais'));
const GestaoContratos = lazy(() => import('../pages/GestaoContratos'));
const GestaoAgentes = lazy(() => import('../pages/GestaoAgentes'));
const GestaoCupons = lazy(() => import('../pages/GestaoCupons'));
const GestaoRelatoriosFinanceiros = lazy(() => import('../pages/GestaoRelatoriosFinanceiros'));
const PesquisarIngresso = lazy(() => import('../pages/PesquisarIngresso'));
const CentralNotificacoes = lazy(() => import('../pages/CentralNotificacoes'));
const CMSHomeCuradoria = lazy(() => import('../pages/CMSHomeCuradoria'));
const CMSInstitucional = lazy(() => import('../pages/CMSInstitucional'));
const GestaoAgencias = lazy(() => import('../pages/GestaoAgencias'));
const CadastroAgencia = lazy(() => import('../pages/CadastroAgencia'));
const GestaoParceiros = lazy(() => import('../pages/GestaoParceiros'));
const CadastroParceiro = lazy(() => import('../pages/CadastroParceiro'));
const OperacaoComercial = lazy(() => import('../pages/OperacaoComercial'));
const ComISSIONAMENTO = lazy(() => import('../pages/Comissionamento'));
const FilaReembolsos = lazy(() => import('../pages/FilaReembolsos'));
const Perfil = lazy(() => import('../pages/Perfil'));
const CadastroContrato = lazy(() => import('../pages/CadastroContrato'));
const CadastroAgente = lazy(() => import('../pages/CadastroAgente'));
const PainelAntiCambista = lazy(() => import('../pages/PainelAntiCambista'));
const RelatoriosAtracao = lazy(() => import('../pages/RelatoriosAtracao'));
const VisualizadorWireframes = lazy(() => import('../pages/VisualizadorWireframes'));

function SuspenseFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto" />
        <p className="text-xs text-slate-400 font-semibold animate-pulse">Carregando módulo sob demanda...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          {/* === ROTAS DE AUTENTICAÇÃO === */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* === FASE 5: OPERAÇÃO DE ACESSO MOBILE === */}
          <Route path="/access" element={<AccessScanner />} />
          <Route path="/access/scanner" element={<AccessScanner />} />
          <Route path="/access/dashboard" element={<AccessDashboard />} />

          {/* === FASE 9: ASSISTENTE DE IA DO CONCIERGE === */}
          <Route path="/ai" element={<AIAssistantPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />

          {/* === ROTAS DA FASE 7 (PASS DIGITAL E CARTEIRA INTEGRADA) === */}
          <Route path="/pass" element={<PassCatalog />} />
          <Route path="/wallet" element={<DigitalWalletPage />} />

          {/* === ROTAS DA FASE 8 (OMNICHANNEL & MOBILE) === */}
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<UserProfilePage />} />

          {/* === ROTAS DO PARTICIPANTE (CARRINHO, CHECKOUT E CARTEIRA DIGITAL) === */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/ticket-transfer" element={<TicketTransfer />} />
            <Route path="/refund-request" element={<RefundRequest />} />

            {/* === ROTAS PROTEGIDAS DO BACKOFFICE MODERNO COM RBAC === */}
            <Route element={<RoleRoute roles={['operator', 'manager', 'admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="business-os" element={<ExecutiveOperatingCenterPage />} />
                <Route path="executive-board" element={<ExecutiveAiBoardPage />} />
                <Route path="enterprise-command" element={<EnterpriseCommandCenterPage />} />
                <Route path="scenarios" element={<ScenarioSimulatorPage />} />
                <Route path="federation" element={<GlobalFederationPage />} />
                <Route path="multi-cloud" element={<MultiCloudPage />} />
                <Route path="business-hub" element={<BusinessHubPage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="banking" element={<BankingServicePage />} />
                <Route path="ai-command" element={<AiCommandCenterPage />} />
                <Route path="agents" element={<AgentsLibraryPage />} />
                <Route path="copilot" element={<CopilotStudioPage />} />
                <Route path="digital-twin" element={<DigitalTwinPage />} />
                <Route path="platform" element={<InternalDeveloperPlatformPage />} />
                <Route path="service-catalog" element={<ServiceCatalogPage />} />
                <Route path="mlops" element={<MlOpsRegistryPage />} />
                <Route path="executive" element={<ExecutiveCockpitPage />} />
                <Route path="developers" element={<DeveloperHubPage />} />
                <Route path="api-gateway" element={<ApiGatewayPage />} />
                <Route path="webhooks" element={<WebhooksPage />} />
                <Route path="plugins" element={<PluginsMarketplacePage />} />
                <Route path="workflows" element={<WorkflowsPage />} />
                <Route path="integrations" element={<IntegrationsPage />} />
                <Route path="sdk" element={<SdkDownloadsPage />} />
                <Route path="api-monitor" element={<ApiMonitorPage />} />
                <Route path="finops" element={<FinOpsPage />} />
                <Route path="sla-center" element={<SlaCenterPage />} />
                <Route path="capacity" element={<CapacityPlanningPage />} />
                <Route path="contracts" element={<VendorContractsPage />} />
                <Route path="global-operations" element={<GlobalOperationsPage />} />
                <Route path="reliability" element={<ReliabilityCenterPage />} />
                <Route path="backups" element={<DisasterRecoveryPage />} />
                <Route path="disaster-recovery" element={<DisasterRecoveryPage />} />
                <Route path="incidents" element={<IncidentsPage />} />
                <Route path="compliance" element={<CompliancePrivacyPage />} />
                <Route path="releases" element={<ReleaseGovernancePage />} />
                <Route path="release-governance" element={<ReleaseGovernancePage />} />
                <Route path="tenants" element={<TenantsPage />} />
                <Route path="feature-flags" element={<FeatureFlagsPage />} />
                <Route path="jobs" element={<BackgroundJobsPage />} />
                <Route path="security" element={<SecurityCenterPage />} />
                <Route path="deployments" element={<DeploymentsPage />} />
                <Route path="control-tower" element={<ControlTowerPage />} />
                <Route path="command-center" element={<CommandCenterPage />} />
                <Route path="observability" element={<ObservabilityPage />} />
                <Route path="predictive" element={<PredictiveIntelligencePage />} />
                <Route path="predictive-ai" element={<PredictiveIntelligencePage />} />
                <Route path="data-quality" element={<DataQualityPage />} />
                <Route path="risk" element={<RiskIntelligencePage />} />
                <Route path="marketing-automation" element={<MarketingAutomationPage />} />
                <Route path="affiliates" element={<AffiliatesPage />} />
                <Route path="partner-portal" element={<PartnerPortalDashboardPage />} />
                <Route path="audit" element={<AuditLogsPage />} />
                <Route path="crm" element={<CustomerCRMPage />} />
                <Route path="support" element={<SupportTicketsPage />} />
                <Route path="finance" element={<FinancialDashboardPage />} />
                <Route path="payouts" element={<PartnerPayoutsPage />} />
                <Route path="reconciliation" element={<ReconciliationPage />} />
                <Route path="ai-studio" element={<AIStudioPage />} />
                <Route path="checkin" element={<CheckinDashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="events" element={<EventsList />} />
                <Route path="attractions/new" element={<AttractionForm />} />
                <Route path="partners" element={<PartnersList />} />
                <Route path="tickets" element={<TicketsList />} />
                <Route path="orders" element={<OrdersList />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="payments" element={<PaymentsList />} />
                <Route path="refunds" element={<RefundsList />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          {/* === ROTAS DO PORTAL PÚBLICO (TURISTA) === */}
          <Route path="/portal" element={<PortalHome />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/recuperar-senha" element={<PortalRecuperarSenha />} />
          <Route path="/portal/criar-senha" element={<PortalCriarSenha />} />
          <Route path="/portal/criar-conta" element={<PortalCriarConta />} />
          <Route path="/portal/confirmacao-cadastro" element={<PortalConfirmacaoCadastro />} />
          <Route path="/portal/email-recuperar-senha" element={<PortalEmailMock />} />
          <Route path="/portal/email-confirmacao" element={<PortalEmailMock />} />

          {/* === ROTAS DO BACKOFFICE INTEGRADO === */}
          <Route path="/validacao" element={<ValidacaoIngressos />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<DashboardAnalytics />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/wireframes" element={<VisualizadorWireframes />} />

              <Route path="/usuarios" element={<GestaoUsuarios />} />
              <Route path="/usuarios/novo" element={<CadastroUsuario />} />

              <Route path="/agencias" element={<GestaoAgencias />} />
              <Route path="/agencias/novo" element={<CadastroAgencia />} />

              <Route path="/parceiros" element={<GestaoParceiros />} />
              <Route path="/parceiros/novo" element={<CadastroParceiro />} />

              <Route path="/atracoes" element={<GestaoAtracoes />} />
              <Route path="/atracoes/nova" element={<CadastroAtracao />} />
              <Route path="/atracoes/:id/totais" element={<TotaisAtracao />} />
              <Route path="/atracoes/:id/ingressos" element={<GestaoIngressos />} />
              <Route path="/atracoes/:id/cupons" element={<GestaoCupons />} />
              <Route path="/atracoes/:id/relatorios" element={<RelatoriosAtracao />} />

              <Route path="/pacotes" element={<GestaoPacotes />} />
              <Route path="/controle-transferencias" element={<ControleTransferencias />} />
              <Route path="/fluxo-entrada" element={<GestaoFluxoEntrada />} />

              <Route path="/comercial/configuracoes" element={<ConfiguracoesComerciais />} />
              <Route path="/comercial/contratos" element={<GestaoContratos />} />
              <Route path="/comercial/contratos/novo" element={<CadastroContrato />} />
              <Route path="/comercial/agentes" element={<GestaoAgentes />} />
              <Route path="/comercial/agentes/novo" element={<CadastroAgente />} />
              <Route path="/comercial/anti-cambista" element={<PainelAntiCambista />} />
              <Route path="/comercial/vendas" element={<OperacaoComercial />} />

              <Route path="/financeiro/relatorios" element={<GestaoRelatoriosFinanceiros />} />
              <Route path="/financeiro/comISSIONAMENTO" element={<ComISSIONAMENTO />} />
              <Route path="/financeiro/reembolsos" element={<FilaReembolsos />} />

              <Route path="/atendimento/pesquisar" element={<PesquisarIngresso />} />
              <Route path="/notificacoes" element={<CentralNotificacoes />} />

              <Route path="/cms/home" element={<CMSHomeCuradoria />} />
              <Route path="/cms/institucional" element={<CMSInstitucional />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
