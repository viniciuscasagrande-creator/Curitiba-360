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
const AgencyFormPage = lazy(() => import('../modules/agencies/pages/AgencyFormPage'));
const AgencyDetailPage = lazy(() => import('../modules/agencies/pages/AgencyDetailPage'));
const AgencyContractPage = lazy(() => import('../modules/agencies/pages/AgencyContractPage'));
const AgentListPage = lazy(() => import('../modules/agencies/pages/agents/AgentListPage'));
const AgentFormPage = lazy(() => import('../modules/agencies/pages/agents/AgentFormPage'));
const AgentDetailPage = lazy(() => import('../modules/agencies/pages/agents/AgentDetailPage'));
const AgentCommissionPage = lazy(() => import('../modules/agencies/pages/agents/AgentCommissionPage'));
const AgencyFinancialPage = lazy(() => import('../modules/agencies/pages/financial/AgencyFinancialPage'));
const AgencyReconciliationPage = lazy(() => import('../modules/agencies/pages/AgencyReconciliationPage'));
const RefundListPage = lazy(() => import('../modules/agencies/pages/refund/RefundListPage'));
const RefundDetailPage = lazy(() => import('../modules/agencies/pages/refund/RefundDetailPage'));
const RefundQueuePage = lazy(() => import('../modules/agencies/pages/refund/RefundQueuePage'));
const FinancialCenter360Page = lazy(() => import('../modules/agencies/pages/financial/FinancialCenter360Page'));
const FinanceCenter360Page = lazy(() => import('../modules/agencies/pages/FinanceCenter360Page'));
const AgentDashboardModulePage = lazy(() => import('../modules/agents/pages/AgentDashboardPage'));
const AgentCrmPage = lazy(() => import('../modules/agents/pages/crm/AgentCrmPage'));
const CustomerDetail360Page = lazy(() => import('../modules/agents/pages/crm/CustomerDetail360Page'));
const AgentOpportunitiesPage = lazy(() => import('../modules/agents/pages/crm/AgentOpportunitiesPage'));
const AgentPipelinePage = lazy(() => import('../modules/agents/pages/pipeline/AgentPipelinePage'));
const OpportunityDetailPage = lazy(() => import('../modules/agents/pages/pipeline/OpportunityDetailPage'));
const AgentGoalsPage = lazy(() => import('../modules/agents/pages/gamification/AgentGoalsPage'));
const AgentRankingPage = lazy(() => import('../modules/agents/pages/gamification/AgentRankingPage'));
const AgentCampaignsPage = lazy(() => import('../modules/agents/pages/gamification/AgentCampaignsPage'));
const AgentMissionsPage = lazy(() => import('../modules/agents/pages/gamification/AgentMissionsPage'));
const AgentCopilotPage = lazy(() => import('../modules/agents/pages/ai/AgentCopilotPage'));
const AgentAutomationsPage = lazy(() => import('../modules/agents/pages/ai/AgentAutomationsPage'));
const AgentOmnichannelPage = lazy(() => import('../modules/agents/pages/omnichannel/AgentOmnichannelPage'));
const OmnichannelTemplatesPage = lazy(() => import('../modules/agents/pages/omnichannel/OmnichannelTemplatesPage'));
const AgentAgendaPage = lazy(() => import('../modules/agents/pages/productivity/AgentAgendaPage'));
const AgentTasksPage = lazy(() => import('../modules/agents/pages/productivity/AgentTasksPage'));
const AgentPerformance360Page = lazy(() => import('../modules/agents/pages/performance/AgentPerformance360Page'));
const CommercialExecutivePage = lazy(() => import('../modules/agents/pages/executive/CommercialExecutivePage'));
const EventsListPage = lazy(() => import('../modules/events/pages/EventsListPage'));
const EventFormPage = lazy(() => import('../modules/events/pages/EventFormPage'));
const EventDetailPage = lazy(() => import('../modules/events/pages/EventDetailPage'));
const EventBatchesPage = lazy(() => import('../modules/events/pages/EventBatchesPage'));
const EventEditPage = lazy(() => import('../modules/events/pages/EventEditPage'));
const EventPublicationPage = lazy(() => import('../modules/events/pages/EventPublicationPage'));
const EventTicketingPage = lazy(() => import('../modules/events/ticketing/pages/EventTicketingPage'));
const EventMapDashboardPage = lazy(() => import('../modules/events/seating/pages/EventMapDashboardPage'));
const EventMapEditorPage = lazy(() => import('../modules/events/seating/pages/EventMapEditorPage'));
const EventMapPublicationPage = lazy(() => import('../modules/events/seating/pages/EventMapPublicationPage'));
const EventOperationsCenterPage = lazy(() => import('../modules/events/operation/pages/EventOperationsCenterPage'));
const EventStaffPage = lazy(() => import('../modules/events/operation/pages/EventStaffPage'));
const EventCredentialsPage = lazy(() => import('../modules/events/operation/pages/EventCredentialsPage'));
const EventProductionTimelinePage = lazy(() => import('../modules/events/operation/pages/EventProductionTimelinePage'));
const EventCheckinPage = lazy(() => import('../modules/events/checkin/pages/EventCheckinPage'));
const EventTurnstilesPage = lazy(() => import('../modules/events/checkin/pages/EventTurnstilesPage'));
const EventFinancialCenterPage = lazy(() => import('../modules/events/financial/pages/EventFinancialCenterPage'));
const EventDrePage = lazy(() => import('../modules/events/financial/pages/EventDrePage'));
const EventMarketingCenterPage = lazy(() => import('../modules/events/marketing/pages/EventMarketingCenterPage'));
const EventCouponsPage = lazy(() => import('../modules/events/marketing/pages/EventCouponsPage'));
const EventsPerformance360Page = lazy(() => import('../modules/events/performance/pages/EventsPerformance360Page'));
const MobileProducerAppPage = lazy(() => import('../modules/mobile/pages/MobileProducerAppPage'));
const MobileEventsListPage = lazy(() => import('../modules/mobile/pages/MobileEventsListPage'));
const MobileOperationsPage = lazy(() => import('../modules/mobile/pages/MobileOperationsPage'));
const MobileFinancialPage = lazy(() => import('../modules/mobile/pages/MobileFinancialPage'));
const MobileSettingsPage = lazy(() => import('../modules/mobile/pages/MobileSettingsPage'));
const StaffHomeScreen = lazy(() => import('../modules/mobile/staff/pages/StaffHomeScreen'));
const StaffTasksPage = lazy(() => import('../modules/mobile/staff/pages/StaffTasksPage'));
const StaffCredentialsPage = lazy(() => import('../modules/mobile/staff/pages/StaffCredentialsPage'));
const StaffIncidentsPage = lazy(() => import('../modules/mobile/staff/pages/StaffIncidentsPage'));
const OfflineCheckinHomeScreen = lazy(() => import('../modules/mobile/checkin/pages/OfflineCheckinHomeScreen'));
const OfflineScannerScreen = lazy(() => import('../modules/mobile/checkin/pages/OfflineScannerScreen'));
const OfflineManualScreen = lazy(() => import('../modules/mobile/checkin/pages/OfflineManualScreen'));
const OfflineHistoryScreen = lazy(() => import('../modules/mobile/checkin/pages/OfflineHistoryScreen'));
const OfflineSyncScreen = lazy(() => import('../modules/mobile/checkin/pages/OfflineSyncScreen'));
const CommunicationHomeScreen = lazy(() => import('../modules/mobile/communication/pages/CommunicationHomeScreen'));
const ChannelsScreen = lazy(() => import('../modules/mobile/communication/pages/ChannelsScreen'));
const ChatScreen = lazy(() => import('../modules/mobile/communication/pages/ChatScreen'));
const AlertsScreen = lazy(() => import('../modules/mobile/communication/pages/AlertsScreen'));
const PushNotificationsScreen = lazy(() => import('../modules/mobile/communication/pages/PushNotificationsScreen'));
const MonitoringHomeScreen = lazy(() => import('../modules/mobile/monitoring/pages/MonitoringHomeScreen'));
const RealtimeSalesScreen = lazy(() => import('../modules/mobile/monitoring/pages/RealtimeSalesScreen'));
const CheckinFlowScreen = lazy(() => import('../modules/mobile/monitoring/pages/CheckinFlowScreen'));
const SectorOccupancyScreen = lazy(() => import('../modules/mobile/monitoring/pages/SectorOccupancyScreen'));
const QueueMonitorScreen = lazy(() => import('../modules/mobile/monitoring/pages/QueueMonitorScreen'));
const LiveIncidentsScreen = lazy(() => import('../modules/mobile/monitoring/pages/LiveIncidentsScreen'));
const SecurityHomeScreen = lazy(() => import('../modules/mobile/security/pages/SecurityHomeScreen'));
const ProfileScreen = lazy(() => import('../modules/mobile/security/pages/ProfileScreen'));
const BiometricsScreen = lazy(() => import('../modules/mobile/security/pages/BiometricsScreen'));
const DevicesScreen = lazy(() => import('../modules/mobile/security/pages/DevicesScreen'));
const SessionsScreen = lazy(() => import('../modules/mobile/security/pages/SessionsScreen'));
const PermissionsScreen = lazy(() => import('../modules/mobile/security/pages/PermissionsScreen'));
const AuditScreen = lazy(() => import('../modules/mobile/security/pages/AuditScreen'));
const ReportsHomeScreen = lazy(() => import('../modules/mobile/reports/pages/ReportsHomeScreen'));
const ExecutiveReportsScreen = lazy(() => import('../modules/mobile/reports/pages/ExecutiveReportsScreen'));
const OperationalReportsScreen = lazy(() => import('../modules/mobile/reports/pages/OperationalReportsScreen'));
const FinancialReportsScreen = lazy(() => import('../modules/mobile/reports/pages/FinancialReportsScreen'));
const DocumentsScreen = lazy(() => import('../modules/mobile/reports/pages/DocumentsScreen'));
const DownloadsScreen = lazy(() => import('../modules/mobile/reports/pages/DownloadsScreen'));
const FavoritesScreen = lazy(() => import('../modules/mobile/reports/pages/FavoritesScreen'));
const MobileAppHubScreen = lazy(() => import('../modules/mobile/consolidation/pages/MobileAppHubScreen'));
const MobileLoginScreen = lazy(() => import('../modules/mobile/consolidation/pages/MobileLoginScreen'));
const MobileMoreModulesScreen = lazy(() => import('../modules/mobile/consolidation/pages/MobileMoreModulesScreen'));
const ApiDocsPage = lazy(() => import('../modules/developer/pages/ApiDocsPage'));
const ApiKeyManagementPage = lazy(() => import('../modules/developer/pages/ApiKeyManagementPage'));
const WebhooksManagementPage = lazy(() => import('../modules/developer/pages/WebhooksManagementPage'));
const OrdersApiPage = lazy(() => import('../modules/developer/api/pages/OrdersApiPage'));
const TicketsApiPage = lazy(() => import('../modules/developer/api/pages/TicketsApiPage'));
const CheckinsApiPage = lazy(() => import('../modules/developer/api/pages/CheckinsApiPage'));
const PaymentsApiPage = lazy(() => import('../modules/developer/financeApi/pages/PaymentsApiPage'));
const RefundsApiPage = lazy(() => import('../modules/developer/financeApi/pages/RefundsApiPage'));
const ReconciliationApiPage = lazy(() => import('../modules/developer/financeApi/pages/ReconciliationApiPage'));
const PayoutsApiPage = lazy(() => import('../modules/developer/financeApi/pages/PayoutsApiPage'));
const IntegrationsHubPage = lazy(() => import('../modules/integrations/pages/IntegrationsHubPage'));
const CrmIntegrationsPage = lazy(() => import('../modules/integrations/pages/CrmIntegrationsPage'));
const ErpIntegrationsPage = lazy(() => import('../modules/integrations/pages/ErpIntegrationsPage'));
const SyncLogsPage = lazy(() => import('../modules/integrations/pages/SyncLogsPage'));
const DeveloperPortalScreen = lazy(() => import('../modules/developer/portal/pages/DeveloperPortalScreen'));
const SdksDownloadScreen = lazy(() => import('../modules/developer/portal/pages/SdksDownloadScreen'));
const SandboxEnvironmentScreen = lazy(() => import('../modules/developer/portal/pages/SandboxEnvironmentScreen'));
const ApiPlaygroundScreen = lazy(() => import('../modules/developer/portal/pages/ApiPlaygroundScreen'));
const EnterpriseArchitectureScreen = lazy(() => import('../modules/enterprise/pages/EnterpriseArchitectureScreen'));
const MicroservicesPage = lazy(() => import('../modules/enterprise/pages/MicroservicesPage'));
const CloudInfraPage = lazy(() => import('../modules/enterprise/pages/CloudInfraPage'));
const EventBusPage = lazy(() => import('../modules/enterprise/pages/EventBusPage'));
const AiCenterHubPage = lazy(() => import('../modules/ai/pages/AiCenterHubPage'));
const AiProducerCopilotPage = lazy(() => import('../modules/ai/pages/AiProducerCopilotPage'));
const AiFraudDetectionPage = lazy(() => import('../modules/ai/pages/AiFraudDetectionPage'));
const AiAutomationsPage = lazy(() => import('../modules/ai/pages/AiAutomationsPage'));
const MultitenantHubScreen = lazy(() => import('../modules/multitenant/pages/MultitenantHubScreen'));
const SaasPlansScreen = lazy(() => import('../modules/multitenant/pages/SaasPlansScreen'));
const MarketplaceScreen = lazy(() => import('../modules/multitenant/pages/MarketplaceScreen'));
const SuperAdminConsoleScreen = lazy(() => import('../modules/multitenant/pages/SuperAdminConsoleScreen'));
const ParticipantExperiencePage = lazy(() => import('../modules/omnichannel/pages/ParticipantExperiencePage'));
const LoyaltyProgramPage = lazy(() => import('../modules/omnichannel/pages/LoyaltyProgramPage'));
const SmartVenueNocPage = lazy(() => import('../modules/smartvenue/pages/SmartVenueNocPage'));
const IotDevicesPage = lazy(() => import('../modules/smartvenue/pages/IotDevicesPage'));
const BiDashboardPage = lazy(() => import('../modules/bi/pages/BiDashboardPage'));
const GovernanceCompliancePage = lazy(() => import('../modules/governance/pages/GovernanceCompliancePage'));
const CrmSalesHubPage = lazy(() => import('../modules/crm/pages/CrmSalesHubPage'));
const MarketingCenterPage = lazy(() => import('../modules/marketing/pages/MarketingCenterPage'));
const SponsorsManagerPage = lazy(() => import('../modules/sponsorship/pages/SponsorsManagerPage'));
const B2bMarketplacePage = lazy(() => import('../modules/b2b/pages/B2bMarketplacePage'));
const SmartDestinationHubPage = lazy(() => import('../modules/tourism/pages/SmartDestinationHubPage'));
const ExperiencesPage = lazy(() => import('../modules/tourism/pages/ExperiencesPage'));
const SmartCityDashboardPage = lazy(() => import('../modules/smartcity/pages/SmartCityDashboardPage'));
const DigitalLicensingPage = lazy(() => import('../modules/smartcity/pages/DigitalLicensingPage'));
const EsgControlHubPage = lazy(() => import('../modules/esg/pages/EsgControlHubPage'));
const CarbonCalculatorPage = lazy(() => import('../modules/esg/pages/CarbonCalculatorPage'));
const AiControlCenterPage = lazy(() => import('../modules/aiagents/pages/AiControlCenterPage'));
const AgentStudioPage = lazy(() => import('../modules/aiagents/pages/AgentStudioPage'));
const GlobalDashboardPage = lazy(() => import('../modules/global/pages/GlobalDashboardPage'));
const GlobalFscalPage = lazy(() => import('../modules/global/pages/GlobalFscalPage'));
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
              <Route path="/agencias/novo" element={<AgencyFormPage />} />
              <Route path="/agencias/:agencyId" element={<AgencyDetailPage />} />
              <Route path="/agencias/:agencyId/editar" element={<AgencyFormPage />} />
              <Route path="/agencias/:agencyId/contrato" element={<AgencyContractPage />} />
              
              {/* Etapa 04: Gestão de Agentes */}
              <Route path="/agencias/:agencyId/agentes" element={<AgentListPage />} />
              <Route path="/agencias/:agencyId/agentes/novo" element={<AgentFormPage />} />
              <Route path="/agencias/:agencyId/agentes/:agentId" element={<AgentDetailPage />} />
              <Route path="/agencias/:agencyId/agentes/:agentId/editar" element={<AgentFormPage />} />
              <Route path="/agencias/:agencyId/agentes/:agentId/comissao" element={<AgentCommissionPage />} />

              {/* Etapa 05: Dados Bancários, Carteira & Repasses (Diagrama bo-07) */}
              <Route path="/agencias/:agencyId/financeiro" element={<AgencyFinancialPage />} />
              <Route path="/agencias/:agencyId/repasses/novo" element={<AgencyFinancialPage />} />
              <Route path="/agencias/:agencyId/extrato" element={<AgencyFinancialPage />} />

              {/* Etapa 06: Conciliação & Fechamento Financeiro */}
              <Route path="/agencias/:agencyId/financeiro/conciliacao" element={<AgencyReconciliationPage />} />

              {/* Etapa 07: Cancelamentos, Reembolsos & Fila Financeira (Diagramas bo-06 e bo-08) */}
              <Route path="/financeiro/cancelamentos" element={<RefundListPage />} />
              <Route path="/financeiro/reembolsos" element={<RefundListPage />} />
              <Route path="/financeiro/reembolsos/:refundId" element={<RefundDetailPage />} />
              <Route path="/financeiro/fila-financeira" element={<RefundQueuePage />} />

              {/* Etapa 08: Centro Financeiro 360 (Conclusão do MOD-05) */}
              <Route path="/financeiro/centro-financeiro-360" element={<FinancialCenter360Page />} />
              <Route path="/financeiro/centro-360" element={<FinanceCenter360Page />} />
              <Route path="/financeiro" element={<FinancialCenter360Page />} />

              {/* MOD-06 Etapa 01: Dashboard Operacional do Agente */}
              <Route path="/agentes" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/dashboard" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/:agentId" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/:agentId/dashboard" element={<AgentDashboardModulePage />} />

              {/* MOD-06 Etapa 02: CRM Avançado do Agente */}
              <Route path="/agentes/crm" element={<AgentCrmPage />} />
              <Route path="/agentes/:agentId/crm" element={<AgentCrmPage />} />
              <Route path="/agentes/crm/clientes/:customerId" element={<CustomerDetail360Page />} />
              <Route path="/agentes/:agentId/crm/clientes/:customerId" element={<CustomerDetail360Page />} />
              <Route path="/agentes/crm/oportunidades" element={<AgentOpportunitiesPage />} />
              <Route path="/agentes/:agentId/crm/oportunidades" element={<AgentOpportunitiesPage />} />
              <Route path="/crm/clientes" element={<AgentCrmPage />} />

              {/* MOD-06 Etapa 03: Funil Comercial e Gestão de Oportunidades */}
              <Route path="/agentes/funil" element={<AgentPipelinePage />} />
              <Route path="/agentes/:agentId/funil" element={<AgentPipelinePage />} />
              <Route path="/agentes/oportunidades" element={<AgentPipelinePage />} />
              <Route path="/agentes/:agentId/oportunidades" element={<AgentPipelinePage />} />
              <Route path="/agentes/oportunidades/:opportunityId" element={<OpportunityDetailPage />} />
              <Route path="/agentes/:agentId/oportunidades/:opportunityId" element={<OpportunityDetailPage />} />

              {/* MOD-06 Etapa 04: Metas, Ranking, Gamificação e Incentivos */}
              <Route path="/agentes/metas" element={<AgentGoalsPage />} />
              <Route path="/agentes/:agentId/metas" element={<AgentGoalsPage />} />
              <Route path="/agentes/ranking" element={<AgentRankingPage />} />
              <Route path="/agentes/campanhas" element={<AgentCampaignsPage />} />
              <Route path="/agentes/premiacoes" element={<AgentCampaignsPage />} />
              <Route path="/agentes/desafios" element={<AgentMissionsPage />} />

              {/* MOD-06 Etapa 05: IA Comercial, Automações e Copiloto de Vendas */}
              <Route path="/agentes/ia" element={<AgentCopilotPage />} />
              <Route path="/agentes/:agentId/ia" element={<AgentCopilotPage />} />
              <Route path="/agentes/copiloto" element={<AgentCopilotPage />} />
              <Route path="/agentes/:agentId/copiloto" element={<AgentCopilotPage />} />
              <Route path="/agentes/automacoes" element={<AgentAutomationsPage />} />
              <Route path="/agentes/:agentId/automacoes" element={<AgentAutomationsPage />} />

              {/* MOD-06 Etapa 06: Central de Comunicação Omnichannel */}
              <Route path="/agentes/comunicacao" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/:agentId/comunicacao" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/omnichannel" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/:agentId/omnichannel" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/omnichannel/templates" element={<OmnichannelTemplatesPage />} />
              <Route path="/agentes/omnichannel/campanhas" element={<OmnichannelTemplatesPage />} />

              {/* MOD-06 Etapa 07: Agenda, Tarefas, SLA e Produtividade Comercial */}
              <Route path="/agentes/agenda" element={<AgentAgendaPage />} />
              <Route path="/agentes/:agentId/agenda" element={<AgentAgendaPage />} />
              <Route path="/agentes/calendario" element={<AgentAgendaPage />} />
              <Route path="/agentes/tarefas" element={<AgentTasksPage />} />
              <Route path="/agentes/:agentId/tarefas" element={<AgentTasksPage />} />
              <Route path="/agentes/produtividade" element={<AgentTasksPage />} />
              <Route path="/agentes/:agentId/produtividade" element={<AgentTasksPage />} />
              <Route path="/agentes/followups" element={<AgentTasksPage />} />

              {/* MOD-06 Etapa 08: Centro de Performance 360 do Agente (Conclusão do MOD-06) */}
              <Route path="/agentes/performance-360" element={<AgentPerformance360Page />} />
              <Route path="/agentes/:agentId/performance-360" element={<AgentPerformance360Page />} />
              <Route path="/comercial" element={<CommercialExecutivePage />} />
              <Route path="/comercial/dashboard" element={<CommercialExecutivePage />} />
              <Route path="/comercial/performance" element={<CommercialExecutivePage />} />
              <Route path="/comercial/executivo" element={<CommercialExecutivePage />} />
              <Route path="/comercial/analytics" element={<CommercialExecutivePage />} />

              {/* MOD-07 Etapa 01: Gestão de Eventos 360 (Cadastro, Publicação, Lotes & Ciclo de Vida) */}
              <Route path="/eventos" element={<EventsListPage />} />
              <Route path="/eventos/dashboard" element={<EventsListPage />} />
              <Route path="/eventos/novo" element={<EventFormPage />} />
              <Route path="/eventos/:eventId" element={<EventDetailPage />} />
              <Route path="/eventos/:eventId/editar" element={<EventEditPage />} />
              <Route path="/eventos/:eventId/configuracoes" element={<EventEditPage />} />
              <Route path="/eventos/:eventId/publicacao" element={<EventPublicationPage />} />
              <Route path="/eventos/:eventId/lotes" element={<EventBatchesPage />} />

              {/* MOD-07 Etapa 02: Lotes, Ingressos, Preços, Capacidade e Canais de Venda */}
              <Route path="/eventos/:eventId/lotes/novo" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/lotes/:lotId" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/ingressos" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/canais-venda" element={<EventTicketingPage />} />

              {/* MOD-07 Etapa 03: Mapa de Setores, Assentos, Mesas e Capacidade Inteligente (Seat Management) */}
              <Route path="/eventos/:eventId/mapa" element={<EventMapDashboardPage />} />
              <Route path="/eventos/:eventId/mapa/editor" element={<EventMapEditorPage />} />
              <Route path="/eventos/:eventId/mapa/setores" element={<EventMapEditorPage />} />
              <Route path="/eventos/:eventId/mapa/publicacao" element={<EventMapPublicationPage />} />

              {/* MOD-07 Etapa 04: Gestão Operacional do Evento (Equipes, Fornecedores, Credenciamento & Cronograma) */}
              <Route path="/eventos/:eventId/operacao" element={<EventOperationsCenterPage />} />
              <Route path="/eventos/:eventId/equipe" element={<EventStaffPage />} />
              <Route path="/eventos/:eventId/operacao/equipe" element={<EventStaffPage />} />
              <Route path="/eventos/:eventId/fornecedores" element={<EventProductionTimelinePage />} />
              <Route path="/eventos/:eventId/operacao/fornecedores" element={<EventProductionTimelinePage />} />
              <Route path="/eventos/:eventId/credenciamento" element={<EventCredentialsPage />} />
              <Route path="/eventos/:eventId/operacao/credenciamento" element={<EventCredentialsPage />} />
              <Route path="/eventos/:eventId/cronograma" element={<EventProductionTimelinePage />} />
              <Route path="/eventos/:eventId/operacao/cronograma" element={<EventProductionTimelinePage />} />
              <Route path="/eventos/:eventId/operacao/checklists" element={<EventOperationsCenterPage />} />
              <Route path="/eventos/:eventId/operacao/comando" element={<EventOperationsCenterPage />} />

              {/* MOD-07 Etapa 05: Check-in, Controle de Acesso, QR Code, Catracas e Monitoramento em Tempo Real */}
              <Route path="/eventos/:eventId/checkin" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/catracas" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/scanner" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/scanner" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/acessos" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/dispositivos" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/checkin/monitoramento" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/checkin/ocorrencias" element={<EventCheckinPage />} />

              {/* MOD-07 Etapa 06: Financeiro Completo do Evento (Receita, Taxas, Custos, Repasses e DRE) */}
              <Route path="/eventos/:eventId/financeiro" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/dre" element={<EventDrePage />} />
              <Route path="/eventos/:eventId/financeiro/custos" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/repasses" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/receitas" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/despesas" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/fornecedores" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/orcamento" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/conciliacao" element={<EventFinancialCenterPage />} />
              <Route path="/eventos/:eventId/financeiro/relatorios" element={<EventDrePage />} />

              {/* MOD-07 Etapa 07: Marketing, CRM, Cupons, Afiliados e Analytics do Evento */}
              <Route path="/eventos/:eventId/marketing" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/cupons" element={<EventCouponsPage />} />
              <Route path="/eventos/:eventId/afiliados" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/utm" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/dashboard" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/campanhas" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/crm" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/cupons" element={<EventCouponsPage />} />
              <Route path="/eventos/:eventId/marketing/cashback" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/afiliados" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/analytics" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/pixels" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/automacoes" element={<EventMarketingCenterPage />} />
              <Route path="/eventos/:eventId/marketing/relatorios" element={<EventMarketingCenterPage />} />

              {/* MOD-07 Etapa 08: Centro de Performance 360 do Módulo de Eventos (Dashboard Executivo Consolidador) */}
              <Route path="/eventos/performance" element={<EventsPerformance360Page />} />
              <Route path="/eventos/analytics" element={<EventsPerformance360Page />} />
              <Route path="/eventos/executivo" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/executivo" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/bi" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/analytics" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/forecast" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/benchmark" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/insights" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/ia" element={<EventsPerformance360Page />} />
              <Route path="/eventos/:eventId/relatorios" element={<EventsPerformance360Page />} />

              {/* MOD-08 Etapa 01: Arquitetura Mobile & Aplicativo do Produtor */}
              <Route path="/mobile" element={<MobileProducerAppPage />} />
              <Route path="/mobile/produtor" element={<MobileProducerAppPage />} />
              <Route path="/mobile/eventos" element={<MobileEventsListPage />} />
              <Route path="/mobile/operacao" element={<MobileOperationsPage />} />
              <Route path="/mobile/financeiro" element={<MobileFinancialPage />} />
              <Route path="/mobile/configuracoes" element={<MobileSettingsPage />} />

              {/* MOD-08 Etapa 02: Aplicativo da Equipe / Staff */}
              <Route path="/staff" element={<StaffHomeScreen />} />
              <Route path="/mobile/staff" element={<StaffHomeScreen />} />
              <Route path="/tasks" element={<StaffTasksPage />} />
              <Route path="/checklists" element={<StaffTasksPage />} />
              <Route path="/mobile/staff/tarefas" element={<StaffTasksPage />} />
              <Route path="/credentials" element={<StaffCredentialsPage />} />
              <Route path="/mobile/staff/credenciamento" element={<StaffCredentialsPage />} />
              <Route path="/incidents" element={<StaffIncidentsPage />} />
              <Route path="/mobile/staff/ocorrencias" element={<StaffIncidentsPage />} />

              {/* MOD-08 Etapa 03: Aplicativo de Check-in Offline (SQLite Cache & Anti-Duplicidade) */}
              <Route path="/checkin" element={<OfflineCheckinHomeScreen />} />
              <Route path="/mobile/checkin" element={<OfflineCheckinHomeScreen />} />
              <Route path="/checkin/scanner" element={<OfflineScannerScreen />} />
              <Route path="/checkin/manual" element={<OfflineManualScreen />} />
              <Route path="/checkin/history" element={<OfflineHistoryScreen />} />
              <Route path="/checkin/sync" element={<OfflineSyncScreen />} />

              {/* MOD-08 Etapa 04: Comunicação Interna, Notificações Push, Chat Operacional e Central de Alertas */}
              <Route path="/communication" element={<CommunicationHomeScreen />} />
              <Route path="/mobile/comunicacao" element={<CommunicationHomeScreen />} />
              <Route path="/communication/channels" element={<ChannelsScreen />} />
              <Route path="/communication/chat" element={<ChatScreen />} />
              <Route path="/communication/alerts" element={<AlertsScreen />} />
              <Route path="/communication/notifications" element={<PushNotificationsScreen />} />
              <Route path="/communication/settings" element={<PushNotificationsScreen />} />

              {/* MOD-08 Etapa 05: Monitoramento Mobile em Tempo Real */}
              <Route path="/monitoring" element={<MonitoringHomeScreen />} />
              <Route path="/mobile/monitoramento" element={<MonitoringHomeScreen />} />
              <Route path="/monitoring/sales" element={<RealtimeSalesScreen />} />
              <Route path="/monitoring/checkin" element={<CheckinFlowScreen />} />
              <Route path="/monitoring/occupancy" element={<SectorOccupancyScreen />} />
              <Route path="/monitoring/queues" element={<QueueMonitorScreen />} />
              <Route path="/monitoring/incidents" element={<LiveIncidentsScreen />} />

              {/* MOD-08 Etapa 06: Perfil, Segurança, Biometria, Permissões e Gestão de Dispositivos */}
              <Route path="/security" element={<SecurityHomeScreen />} />
              <Route path="/mobile/seguranca" element={<SecurityHomeScreen />} />
              <Route path="/security/profile" element={<ProfileScreen />} />
              <Route path="/security/biometrics" element={<BiometricsScreen />} />
              <Route path="/security/devices" element={<DevicesScreen />} />
              <Route path="/security/sessions" element={<SessionsScreen />} />
              <Route path="/security/permissions" element={<PermissionsScreen />} />
              <Route path="/security/audit" element={<AuditScreen />} />

              {/* MOD-08 Etapa 07: Relatórios Mobile, Exportação, Compartilhamento e Central de Documentos */}
              <Route path="/reports" element={<ReportsHomeScreen />} />
              <Route path="/mobile/relatorios" element={<ReportsHomeScreen />} />
              <Route path="/reports/executive" element={<ExecutiveReportsScreen />} />
              <Route path="/reports/operational" element={<OperationalReportsScreen />} />
              <Route path="/reports/financial" element={<FinancialReportsScreen />} />
              <Route path="/reports/documents" element={<DocumentsScreen />} />
              <Route path="/reports/downloads" element={<DownloadsScreen />} />
              <Route path="/reports/favorites" element={<FavoritesScreen />} />

              {/* MOD-08 Etapa 08: Consolidação do Aplicativo, Firebase e Preparação para Publicação */}
              <Route path="/mobile/app" element={<MobileAppHubScreen />} />
              <Route path="/mobile/login" element={<MobileLoginScreen />} />
              <Route path="/mobile/mais" element={<MobileMoreModulesScreen />} />

              {/* MOD-09 Etapa 01: API Pública REST v1, Autenticação por API Key & Webhooks */}
              <Route path="/api-docs" element={<ApiDocsPage />} />
              <Route path="/v1" element={<ApiDocsPage />} />
              <Route path="/parceiros/api-keys" element={<ApiKeyManagementPage />} />
              <Route path="/v1/keys" element={<ApiKeyManagementPage />} />
              <Route path="/parceiros/webhooks" element={<WebhooksManagementPage />} />
              <Route path="/v1/webhooks" element={<WebhooksManagementPage />} />

              {/* MOD-09 Etapa 02: API de Pedidos, Ingressos, Participantes, Check-ins e Idempotência */}
              <Route path="/v1/orders" element={<OrdersApiPage />} />
              <Route path="/v1/tickets" element={<TicketsApiPage />} />
              <Route path="/v1/participants" element={<TicketsApiPage />} />
              <Route path="/v1/checkins" element={<CheckinsApiPage />} />

              {/* MOD-09 Etapa 03: Pagamentos, Reembolsos, Conciliação Financeira e Repasses via API */}
              <Route path="/v1/payments" element={<PaymentsApiPage />} />
              <Route path="/v1/refunds" element={<RefundsApiPage />} />
              <Route path="/v1/reconciliation" element={<ReconciliationApiPage />} />
              <Route path="/v1/payouts" element={<PayoutsApiPage />} />

              {/* MOD-09 Etapa 04: Integrações com CRM, Marketing, ERP e Parceiros Externos */}
              <Route path="/integracoes" element={<IntegrationsHubPage />} />
              <Route path="/integracoes/crm" element={<CrmIntegrationsPage />} />
              <Route path="/integracoes/erp" element={<ErpIntegrationsPage />} />
              <Route path="/integracoes/logs" element={<SyncLogsPage />} />

              {/* MOD-09 Etapa 05: Portal do Desenvolvedor, SDKs, Documentação Interativa e Ambiente Sandbox */}
              <Route path="/developer/portal" element={<DeveloperPortalScreen />} />
              <Route path="/developer" element={<DeveloperPortalScreen />} />
              <Route path="/developer/sdks" element={<SdksDownloadScreen />} />
              <Route path="/developer/sandbox" element={<SandboxEnvironmentScreen />} />
              <Route path="/developer/playground" element={<ApiPlaygroundScreen />} />

              {/* MOD-10 — Arquitetura Enterprise, Escalabilidade e Observabilidade */}
              <Route path="/enterprise" element={<EnterpriseArchitectureScreen />} />
              <Route path="/enterprise/architecture" element={<EnterpriseArchitectureScreen />} />
              <Route path="/enterprise/microservices" element={<MicroservicesPage />} />
              <Route path="/enterprise/cloud" element={<CloudInfraPage />} />
              <Route path="/enterprise/event-bus" element={<EventBusPage />} />

              {/* MOD-11 — Inteligência Artificial, Analytics Avançado e Automação */}
              <Route path="/ai" element={<AiCenterHubPage />} />
              <Route path="/ai/hub" element={<AiCenterHubPage />} />
              <Route path="/ai/copilot" element={<AiProducerCopilotPage />} />
              <Route path="/ai/fraud" element={<AiFraudDetectionPage />} />
              <Route path="/ai/automations" element={<AiAutomationsPage />} />

              {/* MOD-12 — Plataforma Multiempresa, Multi-tenant e Marketplace */}
              <Route path="/tenant" element={<MultitenantHubScreen />} />
              <Route path="/tenant/organizations" element={<MultitenantHubScreen />} />
              <Route path="/tenant/plans" element={<SaasPlansScreen />} />
              <Route path="/tenant/marketplace" element={<MarketplaceScreen />} />
              <Route path="/tenant/admin" element={<SuperAdminConsoleScreen />} />

              {/* MOD-13 — Plataforma Omnichannel, Mobile e Experiência do Participante */}
              <Route path="/omnichannel/participant" element={<ParticipantExperiencePage />} />
              <Route path="/omnichannel/loyalty" element={<LoyaltyProgramPage />} />

              {/* MOD-14 — Ecossistema Smart Venue, IoT e Operação Inteligente */}
              <Route path="/smartvenue/noc" element={<SmartVenueNocPage />} />
              <Route path="/smartvenue" element={<SmartVenueNocPage />} />
              <Route path="/smartvenue/iot" element={<IotDevicesPage />} />

              {/* MOD-15 — Business Intelligence (BI), Data Lake e Decision Center */}
              <Route path="/bi" element={<BiDashboardPage />} />
              <Route path="/bi/dashboard" element={<BiDashboardPage />} />

              {/* MOD-16 — Governança Corporativa, Compliance, Auditoria e Gestão de Riscos */}
              <Route path="/governance" element={<GovernanceCompliancePage />} />
              <Route path="/governance/compliance" element={<GovernanceCompliancePage />} />

              {/* MOD-18 — Plataforma Comercial, CRM 360º e Gestão do Relacionamento */}
              <Route path="/crm360" element={<CrmSalesHubPage />} />
              <Route path="/crm360/sales" element={<CrmSalesHubPage />} />

              {/* MOD-19 — Plataforma de Marketing Digital, Growth e Fidelização */}
              <Route path="/marketing" element={<MarketingCenterPage />} />
              <Route path="/marketing/hub" element={<MarketingCenterPage />} />

              {/* MOD-20 — Ecossistema de Patrocínios, Naming Rights e Monetização */}
              <Route path="/sponsorship" element={<SponsorsManagerPage />} />
              <Route path="/sponsorship/cotas" element={<SponsorsManagerPage />} />

              {/* MOD-21 — Plataforma de Ecossistema B2B, Marketplace e Parcerias */}
              <Route path="/b2b" element={<B2bMarketplacePage />} />
              <Route path="/b2b/marketplace" element={<B2bMarketplacePage />} />

              {/* MOD-22 — Plataforma de Experiências, Turismo e Destinos Inteligentes */}
              <Route path="/tourism" element={<SmartDestinationHubPage />} />
              <Route path="/tourism/destination" element={<SmartDestinationHubPage />} />
              <Route path="/tourism/experiences" element={<ExperiencesPage />} />

              {/* MOD-23 — Plataforma de Inteligência Urbana (Smart City) e Gestão Pública */}
              <Route path="/smartcity" element={<SmartCityDashboardPage />} />
              <Route path="/smartcity/dashboard" element={<SmartCityDashboardPage />} />
              <Route path="/smartcity/licensing" element={<DigitalLicensingPage />} />

              {/* MOD-24 — Plataforma de Governança ESG, Sustentabilidade e Impacto Social */}
              <Route path="/esg" element={<EsgControlHubPage />} />
              <Route path="/esg/hub" element={<EsgControlHubPage />} />
              <Route path="/esg/carbon" element={<CarbonCalculatorPage />} />

              {/* MOD-25 — Plataforma de Inteligência Artificial, Agentes Autônomos e Orquestração Digital */}
              <Route path="/aiagents" element={<AiControlCenterPage />} />
              <Route path="/aiagents/control" element={<AiControlCenterPage />} />
              <Route path="/aiagents/studio" element={<AgentStudioPage />} />

              {/* MOD-26 — Plataforma Global, Internacionalização e Ecossistema Mundial */}
              <Route path="/global" element={<GlobalDashboardPage />} />
              <Route path="/global/dashboard" element={<GlobalDashboardPage />} />
              <Route path="/global/fiscal" element={<GlobalFscalPage />} />

              <Route path="/comercial/agencies/new" element={<AgencyFormPage />} />

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
