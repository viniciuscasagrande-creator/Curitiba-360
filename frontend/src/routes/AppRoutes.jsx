import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Guards & Route Protectors
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import { AdminGuard } from "../guards/AdminGuard";
import { PartnerGuard } from "../guards/PartnerGuard";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

// Layouts
import { AuthLayout } from "../layouts/AuthLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { AppLayout } from "../layouts/AppLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";

// Centralized paths
import { ROUTES } from "./routePaths";

// Auth Pages (SuperApp & Admin)
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// SuperApp & Tourist Public Pages
import { LandingPage } from "../modules/home/pages/LandingPage";
import HomePage from "../modules/home/pages/HomePage";
import { ExplorePage } from "../modules/search/pages/ExplorePage";

import { EventsPage } from "../modules/events/pages/EventsPage";
import { EventDetailsPage } from "../modules/events/pages/EventDetailsPage";
import { TicketSelectionPage } from "../modules/events/pages/TicketSelectionPage";
import { CartPage } from "../modules/events/pages/CartPage";
import { CheckoutPage } from "../modules/events/pages/CheckoutPage";
import { OrderSuccessPage } from "../modules/events/pages/OrderSuccessPage";
import { DigitalTicketPage } from "../modules/events/pages/DigitalTicketPage";
import { TicketsPage } from "../modules/tickets/pages/TicketsPage";
import { TicketDetailsPage } from "../modules/tickets/pages/TicketDetailsPage";

import { TourismPage } from "../modules/tourism/pages/TourismPage";
import { AttractionDetailsPage } from "../modules/tourism/pages/AttractionDetailsPage";
import { ReservationPage } from "../modules/tourism/pages/ReservationPage";
import { ReservationConfirmationPage } from "../modules/tourism/pages/ReservationConfirmationPage";
import { MyReservationsPage } from "../modules/tourism/pages/MyReservationsPage";
import { TourismMapPage } from "../modules/tourism/pages/TourismMapPage";
import { PlacesPage } from "../modules/tourism/pages/PlacesPage";
import { PlaceDetailsPage } from "../modules/tourism/pages/PlaceDetailsPage";

import { WalletPage } from "../modules/wallet/pages/WalletPage";
import { CashbackPage } from "../modules/wallet/pages/CashbackPage";
import { BenefitsPage } from "../modules/wallet/pages/BenefitsPage";
import { CouponsPage } from "../modules/wallet/pages/CouponsPage";
import { PixPage } from "../modules/wallet/pages/PixPage";
import { CardsPage } from "../modules/wallet/pages/CardsPage";
import { StatementPage } from "../modules/wallet/pages/StatementPage";
import { FavoritesPage } from "../modules/profile/pages/FavoritesPage";
import ProfilePage from "../modules/profile/pages/ProfilePage";

// Admin Core Pages (Modular)
import OperationalDashboardPage from "../modules/admin/dashboard/pages/OperationalDashboardPage";
import AdminUsersPage from "../modules/admin/users/pages/AdminUsersPage";
import UserEditorPage from "../modules/admin/users/pages/UserEditorPage";
import AdminContractsPage from "../modules/admin/contracts/pages/AdminContractsPage";
import ContractEditorPage from "../modules/admin/contracts/pages/ContractEditorPage";
import CommercialConditionsPage from "../modules/admin/commercial/pages/CommercialConditionsPage";
import AdminAttractionsPage from "../modules/admin/attractions/pages/AdminAttractionsPage";
import AttractionWizardPage from "../modules/admin/attractions/pages/AttractionWizardPage";
import AdminAttractionDetailsPage from "../modules/admin/attractions/pages/AttractionDetailsPage";
import AttractionCategoriesPage from "../modules/admin/attractions/pages/AttractionCategoriesPage";
import AttractionTicketsPage from "../modules/admin/attractions/pages/AttractionTicketsPage";
import FinancialReportsPage from "../modules/admin/financial/pages/FinancialReportsPage";
import UserProfilePage from "../modules/admin/profile/pages/UserProfilePage";
import { AttractionTotalsPage } from "../modules/admin/attractions/pages/AttractionTotalsPage";
import { ProfilePage as AdminProfilePage } from "../modules/account/pages/ProfilePage";
import { AdminEventsPage } from "../modules/admin/pages/AdminEventsPage";
import AdminOrdersPage from "../modules/admin/pages/AdminOrdersPage";

// === LAZY LOADED ENTERPRISE & BUSINESS OS PAGES (Phases 3 - 29) ===
const ExecutiveOperatingCenterPage = lazy(() => import("../pages/admin/businessos/ExecutiveOperatingCenterPage"));
const ExecutiveAiBoardPage = lazy(() => import("../pages/admin/businessos/ExecutiveAiBoardPage"));
const EnterpriseCommandCenterPage = lazy(() => import("../pages/admin/autonomous/EnterpriseCommandCenterPage"));
const ScenarioSimulatorPage = lazy(() => import("../pages/admin/autonomous/ScenarioSimulatorPage"));
const GlobalFederationPage = lazy(() => import("../pages/admin/federation/GlobalFederationPage"));
const MultiCloudPage = lazy(() => import("../pages/admin/federation/MultiCloudPage"));
const BusinessHubPage = lazy(() => import("../pages/admin/business/BusinessHubPage"));
const MarketplacePage = lazy(() => import("../pages/admin/business/MarketplacePage"));
const BankingServicePage = lazy(() => import("../pages/admin/business/BankingServicePage"));
const AiCommandCenterPage = lazy(() => import("../pages/admin/agentic/AiCommandCenterPage"));
const AgentsLibraryPage = lazy(() => import("../pages/admin/agentic/AgentsLibraryPage"));
const CopilotStudioPage = lazy(() => import("../pages/admin/ai/CopilotStudioPage"));
const DigitalTwinPage = lazy(() => import("../pages/admin/ai/DigitalTwinPage"));
const InternalDeveloperPlatformPage = lazy(() => import("../pages/admin/engineering/InternalDeveloperPlatformPage"));
const ServiceCatalogPage = lazy(() => import("../pages/admin/engineering/ServiceCatalogPage"));
const MlOpsRegistryPage = lazy(() => import("../pages/admin/data/MlOpsRegistryPage"));
const ExecutiveCockpitPage = lazy(() => import("../pages/admin/data/ExecutiveCockpitPage"));
const DeveloperHubPage = lazy(() => import("../pages/admin/developer/DeveloperHubPage"));
const ApiGatewayPage = lazy(() => import("../pages/admin/developer/ApiGatewayPage"));
const WebhooksPage = lazy(() => import("../pages/admin/developer/WebhooksPage"));
const PluginsMarketplacePage = lazy(() => import("../pages/admin/developer/PluginsMarketplacePage"));
const WorkflowsPage = lazy(() => import("../pages/admin/developer/WorkflowsPage"));
const IntegrationsPage = lazy(() => import("../pages/admin/developer/IntegrationsPage"));
const SdkDownloadsPage = lazy(() => import("../pages/admin/developer/SdkDownloadsPage"));
const ApiMonitorPage = lazy(() => import("../pages/admin/developer/ApiMonitorPage"));
const FinOpsPage = lazy(() => import("../pages/admin/scale/FinOpsPage"));
const SlaCenterPage = lazy(() => import("../pages/admin/scale/SlaCenterPage"));
const CapacityPlanningPage = lazy(() => import("../pages/admin/scale/CapacityPlanningPage"));
const VendorContractsPage = lazy(() => import("../pages/admin/scale/VendorContractsPage"));
const GlobalOperationsPage = lazy(() => import("../pages/admin/scale/GlobalOperationsPage"));
const ReliabilityCenterPage = lazy(() => import("../pages/admin/scale/ReliabilityCenterPage"));
const IncidentsPage = lazy(() => import("../pages/admin/scale/IncidentsPage"));
const CompliancePrivacyPage = lazy(() => import("../pages/admin/scale/CompliancePrivacyPage"));
const DisasterRecoveryPage = lazy(() => import("../pages/admin/scale/DisasterRecoveryPage"));
const ReleaseGovernancePage = lazy(() => import("../pages/admin/scale/ReleaseGovernancePage"));
const TenantsPage = lazy(() => import("../pages/admin/scale/TenantsPage"));
const FeatureFlagsPage = lazy(() => import("../pages/admin/scale/FeatureFlagsPage"));
const BackgroundJobsPage = lazy(() => import("../pages/admin/scale/BackgroundJobsPage"));
const SecurityCenterPage = lazy(() => import("../pages/admin/scale/SecurityCenterPage"));
const DeploymentsPage = lazy(() => import("../pages/admin/scale/DeploymentsPage"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const UsersList = lazy(() => import("../pages/admin/users/UsersList"));
const EventsList = lazy(() => import("../pages/admin/events/EventsList"));
const TicketsList = lazy(() => import("../pages/admin/tickets/TicketsList"));
const OrdersList = lazy(() => import("../pages/admin/orders/OrdersList"));
const OrderDetails = lazy(() => import("../pages/admin/orders/OrderDetails"));
const PaymentsList = lazy(() => import("../pages/admin/payments/PaymentsList"));
const RefundsList = lazy(() => import("../pages/admin/refunds/RefundsList"));
const Reports = lazy(() => import("../pages/admin/Reports"));
const Settings = lazy(() => import("../pages/admin/Settings"));
const AccessScanner = lazy(() => import("../pages/access/AccessScanner"));
const AccessDashboard = lazy(() => import("../pages/access/AccessDashboard"));
const CheckinDashboard = lazy(() => import("../pages/admin/CheckinDashboard"));
const TicketTransfer = lazy(() => import("../pages/public/TicketTransfer"));
const RefundRequest = lazy(() => import("../pages/public/RefundRequest"));
const PassCatalog = lazy(() => import("../pages/public/PassCatalog"));
const DigitalWalletPage = lazy(() => import("../pages/public/DigitalWalletPage"));
const AttractionForm = lazy(() => import("../pages/admin/attractions/AttractionForm"));
const PartnersList = lazy(() => import("../pages/admin/partners/PartnersList"));
const LegacyExplorePage = lazy(() => import("../pages/public/ExplorePage"));
const LegacyUserProfilePage = lazy(() => import("../pages/public/UserProfilePage"));
const AIAssistantPage = lazy(() => import("../pages/public/AIAssistantPage"));
const AIStudioPage = lazy(() => import("../pages/admin/AIStudioPage"));
const FinancialDashboardPage = lazy(() => import("../pages/admin/finance/FinancialDashboardPage"));
const PartnerPayoutsPage = lazy(() => import("../pages/admin/finance/PartnerPayoutsPage"));
const ReconciliationPage = lazy(() => import("../pages/admin/finance/ReconciliationPage"));
const CommandCenterPage = lazy(() => import("../pages/admin/operations/CommandCenterPage"));
const CustomerCRMPage = lazy(() => import("../pages/admin/crm/CustomerCRMPage"));
const SupportTicketsPage = lazy(() => import("../pages/admin/support/SupportTicketsPage"));
const ControlTowerPage = lazy(() => import("../pages/admin/analytics/ControlTowerPage"));
const MarketingAutomationPage = lazy(() => import("../pages/admin/marketing/MarketingAutomationPage"));
const AffiliatesPage = lazy(() => import("../pages/admin/marketing/AffiliatesPage"));
const PartnerPortalDashboardPage = lazy(() => import("../pages/admin/partners/PartnerPortalDashboardPage"));
const AuditLogsPage = lazy(() => import("../pages/admin/audit/AuditLogsPage"));
const ObservabilityPage = lazy(() => import("../pages/admin/analytics/ObservabilityPage"));
const PredictiveIntelligencePage = lazy(() => import("../pages/admin/ai/PredictiveIntelligencePage"));
const DataQualityPage = lazy(() => import("../pages/admin/analytics/DataQualityPage"));
const RiskIntelligencePage = lazy(() => import("../pages/admin/risk/RiskIntelligencePage"));
const Cart = lazy(() => import("../pages/public/Cart"));
const Checkout = lazy(() => import("../pages/public/Checkout"));
const MyTickets = lazy(() => import("../pages/public/MyTickets"));

// === WF-045: SMART CITY & DIGITAL TWIN ===
const DigitalTwinDashboardPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinDashboardPage"));
const DigitalTwinMapPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinMapPage"));
const DigitalTwinCityPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinCityPage"));
const DigitalTwinEventsPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinEventsPage"));
const DigitalTwinAttractionsPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinAttractionsPage"));
const DigitalTwinMobilityPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinMobilityPage"));
const DigitalTwinParkingPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinParkingPage"));
const DigitalTwinSecurityPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinSecurityPage"));
const DigitalTwinEnvironmentPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinEnvironmentPage"));
const DigitalTwinIotPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinIotPage"));
const DigitalTwinSimulationsPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinSimulationsPage"));
const DigitalTwinForecastPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinForecastPage"));
const DigitalTwinReportsPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinReportsPage"));
const DigitalTwinSettingsPage = lazy(() => import("../modules/digitalTwin/pages/DigitalTwinSettingsPage"));

// === WF-046: PARCEIROS & MARKETPLACE B2B ===
const PartnersB2bDashboardPage = lazy(() => import("../modules/partnersB2b/pages/DashboardPage"));
const PartnersB2bMarketplacePage = lazy(() => import("../modules/partnersB2b/pages/MarketplacePage"));
const PartnersB2bHotelsPage = lazy(() => import("../modules/partnersB2b/pages/HotelsPage"));
const PartnersB2bRestaurantsPage = lazy(() => import("../modules/partnersB2b/pages/RestaurantsPage"));
const PartnersB2bGuidesPage = lazy(() => import("../modules/partnersB2b/pages/GuidesPage"));
const PartnersB2bAgenciesPage = lazy(() => import("../modules/partnersB2b/pages/AgenciesPage"));
const PartnersB2bTransportPage = lazy(() => import("../modules/partnersB2b/pages/TransportPage"));
const PartnersB2bContractsPage = lazy(() => import("../modules/partnersB2b/pages/ContractsPage"));
const PartnersB2bCatalogPage = lazy(() => import("../modules/partnersB2b/pages/CatalogPage"));
const PartnersB2bSplitPage = lazy(() => import("../modules/partnersB2b/pages/SplitPage"));
const PartnersB2bAffiliatesPage = lazy(() => import("../modules/partnersB2b/pages/AffiliatesPage"));
const PartnersB2bIntegrationsPage = lazy(() => import("../modules/partnersB2b/pages/IntegrationsPage"));
const PartnersB2bBookingsPage = lazy(() => import("../modules/partnersB2b/pages/BookingsPage"));
const PartnersB2bPackagesPage = lazy(() => import("../modules/partnersB2b/pages/PackagesPage"));
const PartnersB2bPricingPage = lazy(() => import("../modules/partnersB2b/pages/PricingPage"));
const PartnersB2bReviewsPage = lazy(() => import("../modules/partnersB2b/pages/ReviewsPage"));

// === WF-047: INOVAÇÃO, PORTFÓLIO & PROJETOS ESTRATÉGICOS ===
const PortfolioDashboardPage = lazy(() => import("../modules/portfolio/pages/PortfolioDashboardPage"));
const PortfolioIdeasPage = lazy(() => import("../modules/portfolio/pages/PortfolioIdeasPage"));
const PortfolioBusinessCasesPage = lazy(() => import("../modules/portfolio/pages/PortfolioBusinessCasesPage"));
const PortfolioProjectsPage = lazy(() => import("../modules/portfolio/pages/PortfolioProjectsPage"));
const PortfolioProgramsPage = lazy(() => import("../modules/portfolio/pages/PortfolioProgramsPage"));
const PortfolioStructurePage = lazy(() => import("../modules/portfolio/pages/PortfolioStructurePage"));
const PortfolioRoadmapsPage = lazy(() => import("../modules/portfolio/pages/PortfolioRoadmapsPage"));
const PortfolioKanbanPage = lazy(() => import("../modules/portfolio/pages/PortfolioKanbanPage"));
const PortfolioBacklogPage = lazy(() => import("../modules/portfolio/pages/PortfolioBacklogPage"));
const PortfolioSprintsPage = lazy(() => import("../modules/portfolio/pages/PortfolioSprintsPage"));
const PortfolioResourcesPage = lazy(() => import("../modules/portfolio/pages/PortfolioResourcesPage"));
const PortfolioRisksPage = lazy(() => import("../modules/portfolio/pages/PortfolioRisksPage"));
const PortfolioBenefitsPage = lazy(() => import("../modules/portfolio/pages/PortfolioBenefitsPage"));
const PortfolioChangePage = lazy(() => import("../modules/portfolio/pages/PortfolioChangePage"));
const PortfolioReportsPage = lazy(() => import("../modules/portfolio/pages/PortfolioReportsPage"));
const PortfolioSettingsPage = lazy(() => import("../modules/portfolio/pages/PortfolioSettingsPage"));

// === WF-048: GOVERNANÇA EXECUTIVA & PERFORMANCE CORPORATIVA ===
const CorpGovDashboardPage = lazy(() => import("../modules/governance/pages/CorpGovDashboardPage"));
const CorpGovExecutiveCockpitPage = lazy(() => import("../modules/governance/pages/CorpGovExecutiveCockpitPage"));
const CorpGovStrategicPlanningPage = lazy(() => import("../modules/governance/pages/CorpGovStrategicPlanningPage"));
const CorpGovStrategyMapPage = lazy(() => import("../modules/governance/pages/CorpGovStrategyMapPage"));
const CorpGovBalancedScorecardPage = lazy(() => import("../modules/governance/pages/CorpGovBalancedScorecardPage"));
const CorpGovCorporateObjectivesPage = lazy(() => import("../modules/governance/pages/CorpGovCorporateObjectivesPage"));
const CorpGovCorporateOkrsPage = lazy(() => import("../modules/governance/pages/CorpGovCorporateOkrsPage"));
const CorpGovExecutiveKpisPage = lazy(() => import("../modules/governance/pages/CorpGovExecutiveKpisPage"));
const CorpGovCouncilsPage = lazy(() => import("../modules/governance/pages/CorpGovCouncilsPage"));
const CorpGovCouncilDetailsPage = lazy(() => import("../modules/governance/pages/CorpGovCouncilDetailsPage"));
const CorpGovCommitteesPage = lazy(() => import("../modules/governance/pages/CorpGovCommitteesPage"));
const CorpGovMeetingsPage = lazy(() => import("../modules/governance/pages/CorpGovMeetingsPage"));
const CorpGovMeetingDetailsPage = lazy(() => import("../modules/governance/pages/CorpGovMeetingDetailsPage"));
const CorpGovResolutionsPage = lazy(() => import("../modules/governance/pages/CorpGovResolutionsPage"));
const CorpGovActionPlansPage = lazy(() => import("../modules/governance/pages/CorpGovActionPlansPage"));
const CorpGovCorporateRisksPage = lazy(() => import("../modules/governance/pages/CorpGovCorporateRisksPage"));
const CorpGovInternalControlsPage = lazy(() => import("../modules/governance/pages/CorpGovInternalControlsPage"));
const CorpGovCompliancePage = lazy(() => import("../modules/governance/pages/CorpGovCompliancePage"));
const CorpGovLgpdGovernancePage = lazy(() => import("../modules/governance/pages/CorpGovLgpdGovernancePage"));
const CorpGovPoliciesPage = lazy(() => import("../modules/governance/pages/CorpGovPoliciesPage"));
const CorpGovAuditsPage = lazy(() => import("../modules/governance/pages/CorpGovAuditsPage"));
const CorpGovApprovalsPage = lazy(() => import("../modules/governance/pages/CorpGovApprovalsPage"));
const CorpGovExecutiveReportsPage = lazy(() => import("../modules/governance/pages/CorpGovExecutiveReportsPage"));
const CorpGovAuditPage = lazy(() => import("../modules/governance/pages/CorpGovAuditPage"));
const CorpGovSettingsPage = lazy(() => import("../modules/governance/pages/CorpGovSettingsPage"));

// === WF-049: INTELIGÊNCIA ESTRATÉGICA & GOVERNO DIGITAL ===
const GovDashboardPage = lazy(() => import("../modules/government/pages/GovDashboardPage"));
const GovBudgetPage = lazy(() => import("../modules/government/pages/GovBudgetPage"));
const GovCitizenPage = lazy(() => import("../modules/government/pages/GovCitizenPage"));
const GovContractsPage = lazy(() => import("../modules/government/pages/GovContractsPage"));
const GovGoalsPage = lazy(() => import("../modules/government/pages/GovGoalsPage"));
const GovHearingsPage = lazy(() => import("../modules/government/pages/GovHearingsPage"));
const GovIndicatorsPage = lazy(() => import("../modules/government/pages/GovIndicatorsPage"));
const GovObservatoryPage = lazy(() => import("../modules/government/pages/GovObservatoryPage"));
const GovOpenDataPage = lazy(() => import("../modules/government/pages/GovOpenDataPage"));
const GovOuvidoriaPage = lazy(() => import("../modules/government/pages/GovOuvidoriaPage"));
const GovProcurementPage = lazy(() => import("../modules/government/pages/GovProcurementPage"));
const GovProgramsPage = lazy(() => import("../modules/government/pages/GovProgramsPage"));
const GovProjectsPage = lazy(() => import("../modules/government/pages/GovProjectsPage"));
const GovPublicServicesPage = lazy(() => import("../modules/government/pages/GovPublicServicesPage"));
const GovReportsPage = lazy(() => import("../modules/government/pages/GovReportsPage"));
const GovSettingsPage = lazy(() => import("../modules/government/pages/GovSettingsPage"));
const GovTransparencyPage = lazy(() => import("../modules/government/pages/GovTransparencyPage"));
const GovAgreementsPage = lazy(() => import("../modules/government/pages/GovAgreementsPage"));

// === WF-050: SUPER APP CURITIBA 360 & SERVIÇOS URBANOS DIGITAIS ===
const SuperAppHomePage = lazy(() => import("../modules/superApp/pages/SuperAppHomePage"));
const SuperAppExplorePage = lazy(() => import("../modules/superApp/pages/ExplorePage"));
const SuperAppSmartMapPage = lazy(() => import("../modules/superApp/pages/SmartMapPage"));
const SuperAppEventsPage = lazy(() => import("../modules/superApp/pages/EventsPage"));
const SuperAppEventDetailsPage = lazy(() => import("../modules/superApp/pages/EventDetailsPage"));
const SuperAppAttractionsPage = lazy(() => import("../modules/superApp/pages/AttractionsPage"));
const SuperAppReservationsPage = lazy(() => import("../modules/superApp/pages/ReservationsPage"));
const SuperAppTicketsPage = lazy(() => import("../modules/superApp/pages/TicketsPage"));
const SuperAppWalletPage = lazy(() => import("../modules/superApp/pages/WalletPage"));
const SuperAppMobilityPage = lazy(() => import("../modules/superApp/pages/MobilityPage"));
const SuperAppParkingPage = lazy(() => import("../modules/superApp/pages/ParkingPage"));
const SuperAppMarketplacePage = lazy(() => import("../modules/superApp/pages/MarketplacePage"));
const SuperAppLoyaltyPage = lazy(() => import("../modules/superApp/pages/LoyaltyPage"));
const SuperAppBenefitsPage = lazy(() => import("../modules/superApp/pages/BenefitsPage"));
const SuperAppCityServicesPage = lazy(() => import("../modules/superApp/pages/CityServicesPage"));
const SuperAppProtocolsPage = lazy(() => import("../modules/superApp/pages/ProtocolsPage"));
const SuperAppOuvidoriaPage = lazy(() => import("../modules/superApp/pages/OuvidoriaPage"));
const SuperAppEmergencyPage = lazy(() => import("../modules/superApp/pages/EmergencyPage"));
const SuperAppNotificationsPage = lazy(() => import("../modules/superApp/pages/NotificationsPage"));
const SuperAppAssistantPage = lazy(() => import("../modules/superApp/pages/AssistantPage"));
const SuperAppMiniAppsPage = lazy(() => import("../modules/superApp/pages/MiniAppsPage"));
const SuperAppProfilePage = lazy(() => import("../modules/superApp/pages/ProfilePage"));
const SuperAppSettingsPage = lazy(() => import("../modules/superApp/pages/SettingsPage"));

// === PORTAL PÚBLICO LEGADO & BACKOFFICE CLÁSSICO + MOD-05 A MOD-26 ===
const PortalHome = lazy(() => import("../pages/portal/PortalHome"));
const PortalLogin = lazy(() => import("../pages/portal/PortalLogin"));
const PortalRecuperarSenha = lazy(() => import("../pages/portal/PortalRecuperarSenha"));
const PortalCriarSenha = lazy(() => import("../pages/portal/PortalCriarSenha"));
const PortalCriarConta = lazy(() => import("../pages/portal/PortalCriarConta"));
const PortalConfirmacaoCadastro = lazy(() => import("../pages/portal/PortalConfirmacaoCadastro"));
const PortalEmailMock = lazy(() => import("../pages/portal/PortalEmailMock"));

const Dashboard = lazy(() => import("../pages/Dashboard"));
const DashboardAnalytics = lazy(() => import("../pages/DashboardAnalytics"));
const GestaoUsuarios = lazy(() => import("../pages/GestaoUsuarios"));
const CadastroUsuario = lazy(() => import("../pages/CadastroUsuario"));
const GestaoAtracoes = lazy(() => import("../pages/GestaoAtracoes"));
const CadastroAtracao = lazy(() => import("../pages/CadastroAtracao"));
const TotaisAtracao = lazy(() => import("../pages/TotaisAtracao"));
const GestaoIngressos = lazy(() => import("../pages/GestaoIngressos"));
const GestaoPacotes = lazy(() => import("../pages/GestaoPacotes"));
const ValidacaoIngressos = lazy(() => import("../pages/ValidacaoIngressos"));
const ControleTransferencias = lazy(() => import("../pages/ControleTransferencias"));
const GestaoFluxoEntrada = lazy(() => import("../pages/GestaoFluxoEntrada"));
const ConfiguracoesComerciais = lazy(() => import("../pages/ConfiguracoesComerciais"));
const GestaoContratos = lazy(() => import("../pages/GestaoContratos"));
const GestaoAgentes = lazy(() => import("../pages/GestaoAgentes"));
const GestaoCupons = lazy(() => import("../pages/GestaoCupons"));
const GestaoRelatoriosFinanceiros = lazy(() => import("../pages/GestaoRelatoriosFinanceiros"));
const PesquisarIngresso = lazy(() => import("../pages/PesquisarIngresso"));
const CentralNotificacoes = lazy(() => import("../pages/CentralNotificacoes"));
const CMSHomeCuradoria = lazy(() => import("../pages/CMSHomeCuradoria"));
const CMSInstitucional = lazy(() => import("../pages/CMSInstitucional"));
const GestaoAgencias = lazy(() => import("../pages/GestaoAgencias"));
const CadastroAgencia = lazy(() => import("../pages/CadastroAgencia"));
const AgencyFormPage = lazy(() => import("../modules/agencies/pages/AgencyFormPage"));
const AgencyDetailPage = lazy(() => import("../modules/agencies/pages/AgencyDetailPage"));
const AgencyContractPage = lazy(() => import("../modules/agencies/pages/AgencyContractPage"));
const AgentListPage = lazy(() => import("../modules/agencies/pages/agents/AgentListPage"));
const AgentFormPage = lazy(() => import("../modules/agencies/pages/agents/AgentFormPage"));
const AgentDetailPage = lazy(() => import("../modules/agencies/pages/agents/AgentDetailPage"));
const AgentCommissionPage = lazy(() => import("../modules/agencies/pages/agents/AgentCommissionPage"));
const AgencyFinancialPage = lazy(() => import("../modules/agencies/pages/financial/AgencyFinancialPage"));
const AgencyReconciliationPage = lazy(() => import("../modules/agencies/pages/AgencyReconciliationPage"));
const RefundListPage = lazy(() => import("../modules/agencies/pages/refund/RefundListPage"));
const RefundDetailPage = lazy(() => import("../modules/agencies/pages/refund/RefundDetailPage"));
const RefundQueuePage = lazy(() => import("../modules/agencies/pages/refund/RefundQueuePage"));
const FinancialCenter360Page = lazy(() => import("../modules/agencies/pages/financial/FinancialCenter360Page"));
const FinanceCenter360Page = lazy(() => import("../modules/agencies/pages/FinanceCenter360Page"));
const AgentDashboardModulePage = lazy(() => import("../modules/agents/pages/AgentDashboardPage"));
const AgentCrmPage = lazy(() => import("../modules/agents/pages/crm/AgentCrmPage"));
const CustomerDetail360Page = lazy(() => import("../modules/agents/pages/crm/CustomerDetail360Page"));
const AgentOpportunitiesPage = lazy(() => import("../modules/agents/pages/crm/AgentOpportunitiesPage"));
const AgentPipelinePage = lazy(() => import("../modules/agents/pages/pipeline/AgentPipelinePage"));
const OpportunityDetailPage = lazy(() => import("../modules/agents/pages/pipeline/OpportunityDetailPage"));
const AgentGoalsPage = lazy(() => import("../modules/agents/pages/gamification/AgentGoalsPage"));
const AgentRankingPage = lazy(() => import("../modules/agents/pages/gamification/AgentRankingPage"));
const AgentCampaignsPage = lazy(() => import("../modules/agents/pages/gamification/AgentCampaignsPage"));
const AgentMissionsPage = lazy(() => import("../modules/agents/pages/gamification/AgentMissionsPage"));
const AgentCopilotPage = lazy(() => import("../modules/agents/pages/ai/AgentCopilotPage"));
const AgentAutomationsPage = lazy(() => import("../modules/agents/pages/ai/AgentAutomationsPage"));
const AgentOmnichannelPage = lazy(() => import("../modules/agents/pages/omnichannel/AgentOmnichannelPage"));
const OmnichannelTemplatesPage = lazy(() => import("../modules/agents/pages/omnichannel/OmnichannelTemplatesPage"));
const AgentAgendaPage = lazy(() => import("../modules/agents/pages/productivity/AgentAgendaPage"));
const AgentTasksPage = lazy(() => import("../modules/agents/pages/productivity/AgentTasksPage"));
const AgentPerformance360Page = lazy(() => import("../modules/agents/pages/performance/AgentPerformance360Page"));
const CommercialExecutivePage = lazy(() => import("../modules/agents/pages/executive/CommercialExecutivePage"));
const EventsListPage = lazy(() => import("../modules/events/pages/EventsListPage"));
const EventFormPage = lazy(() => import("../modules/events/pages/EventFormPage"));
const EventDetailPage = lazy(() => import("../modules/events/pages/EventDetailPage"));
const EventBatchesPage = lazy(() => import("../modules/events/pages/EventBatchesPage"));
const EventEditPage = lazy(() => import("../modules/events/pages/EventEditPage"));
const EventPublicationPage = lazy(() => import("../modules/events/pages/EventPublicationPage"));
const EventTicketingPage = lazy(() => import("../modules/events/ticketing/pages/EventTicketingPage"));
const EventMapDashboardPage = lazy(() => import("../modules/events/seating/pages/EventMapDashboardPage"));
const EventMapEditorPage = lazy(() => import("../modules/events/seating/pages/EventMapEditorPage"));
const EventMapPublicationPage = lazy(() => import("../modules/events/seating/pages/EventMapPublicationPage"));
const EventOperationsCenterPage = lazy(() => import("../modules/events/operation/pages/EventOperationsCenterPage"));
const EventStaffPage = lazy(() => import("../modules/events/operation/pages/EventStaffPage"));
const EventCredentialsPage = lazy(() => import("../modules/events/operation/pages/EventCredentialsPage"));
const EventProductionTimelinePage = lazy(() => import("../modules/events/operation/pages/EventProductionTimelinePage"));
const EventCheckinPage = lazy(() => import("../modules/events/checkin/pages/EventCheckinPage"));
const EventTurnstilesPage = lazy(() => import("../modules/events/checkin/pages/EventTurnstilesPage"));
const EventFinancialCenterPage = lazy(() => import("../modules/events/financial/pages/EventFinancialCenterPage"));
const EventDrePage = lazy(() => import("../modules/events/financial/pages/EventDrePage"));
const EventMarketingCenterPage = lazy(() => import("../modules/events/marketing/pages/EventMarketingCenterPage"));
const EventCouponsPage = lazy(() => import("../modules/events/marketing/pages/EventCouponsPage"));
const EventsPerformance360Page = lazy(() => import("../modules/events/performance/pages/EventsPerformance360Page"));
const MobileProducerAppPage = lazy(() => import("../modules/mobile/pages/MobileProducerAppPage"));
const MobileEventsListPage = lazy(() => import("../modules/mobile/pages/MobileEventsListPage"));
const MobileOperationsPage = lazy(() => import("../modules/mobile/pages/MobileOperationsPage"));
const MobileFinancialPage = lazy(() => import("../modules/mobile/pages/MobileFinancialPage"));
const MobileSettingsPage = lazy(() => import("../modules/mobile/pages/MobileSettingsPage"));
const StaffHomeScreen = lazy(() => import("../modules/mobile/staff/pages/StaffHomeScreen"));
const StaffTasksPage = lazy(() => import("../modules/mobile/staff/pages/StaffTasksPage"));
const StaffCredentialsPage = lazy(() => import("../modules/mobile/staff/pages/StaffCredentialsPage"));
const StaffIncidentsPage = lazy(() => import("../modules/mobile/staff/pages/StaffIncidentsPage"));
const OfflineCheckinHomeScreen = lazy(() => import("../modules/mobile/checkin/pages/OfflineCheckinHomeScreen"));
const OfflineScannerScreen = lazy(() => import("../modules/mobile/checkin/pages/OfflineScannerScreen"));
const OfflineManualScreen = lazy(() => import("../modules/mobile/checkin/pages/OfflineManualScreen"));
const OfflineHistoryScreen = lazy(() => import("../modules/mobile/checkin/pages/OfflineHistoryScreen"));
const OfflineSyncScreen = lazy(() => import("../modules/mobile/checkin/pages/OfflineSyncScreen"));
const CommunicationHomeScreen = lazy(() => import("../modules/mobile/communication/pages/CommunicationHomeScreen"));
const ChannelsScreen = lazy(() => import("../modules/mobile/communication/pages/ChannelsScreen"));
const ChatScreen = lazy(() => import("../modules/mobile/communication/pages/ChatScreen"));
const AlertsScreen = lazy(() => import("../modules/mobile/communication/pages/AlertsScreen"));
const PushNotificationsScreen = lazy(() => import("../modules/mobile/communication/pages/PushNotificationsScreen"));
const MonitoringHomeScreen = lazy(() => import("../modules/mobile/monitoring/pages/MonitoringHomeScreen"));
const RealtimeSalesScreen = lazy(() => import("../modules/mobile/monitoring/pages/RealtimeSalesScreen"));
const CheckinFlowScreen = lazy(() => import("../modules/mobile/monitoring/pages/CheckinFlowScreen"));
const SectorOccupancyScreen = lazy(() => import("../modules/mobile/monitoring/pages/SectorOccupancyScreen"));
const QueueMonitorScreen = lazy(() => import("../modules/mobile/monitoring/pages/QueueMonitorScreen"));
const LiveIncidentsScreen = lazy(() => import("../modules/mobile/monitoring/pages/LiveIncidentsScreen"));
const SecurityHomeScreen = lazy(() => import("../modules/mobile/security/pages/SecurityHomeScreen"));
const ProfileScreen = lazy(() => import("../modules/mobile/security/pages/ProfileScreen"));
const BiometricsScreen = lazy(() => import("../modules/mobile/security/pages/BiometricsScreen"));
const DevicesScreen = lazy(() => import("../modules/mobile/security/pages/DevicesScreen"));
const SessionsScreen = lazy(() => import("../modules/mobile/security/pages/SessionsScreen"));
const PermissionsScreen = lazy(() => import("../modules/mobile/security/pages/PermissionsScreen"));
const AuditScreen = lazy(() => import("../modules/mobile/security/pages/AuditScreen"));
const ReportsHomeScreen = lazy(() => import("../modules/mobile/reports/pages/ReportsHomeScreen"));
const ExecutiveReportsScreen = lazy(() => import("../modules/mobile/reports/pages/ExecutiveReportsScreen"));
const OperationalReportsScreen = lazy(() => import("../modules/mobile/reports/pages/OperationalReportsScreen"));
const FinancialReportsScreen = lazy(() => import("../modules/mobile/reports/pages/FinancialReportsScreen"));
const DocumentsScreen = lazy(() => import("../modules/mobile/reports/pages/DocumentsScreen"));
const DownloadsScreen = lazy(() => import("../modules/mobile/reports/pages/DownloadsScreen"));
const FavoritesScreen = lazy(() => import("../modules/mobile/reports/pages/FavoritesScreen"));
const MobileAppHubScreen = lazy(() => import("../modules/mobile/consolidation/pages/MobileAppHubScreen"));
const MobileLoginScreen = lazy(() => import("../modules/mobile/consolidation/pages/MobileLoginScreen"));
const MobileMoreModulesScreen = lazy(() => import("../modules/mobile/consolidation/pages/MobileMoreModulesScreen"));
const ApiDocsPage = lazy(() => import("../modules/developer/pages/ApiDocsPage"));
const ApiKeyManagementPage = lazy(() => import("../modules/developer/pages/ApiKeyManagementPage"));
const WebhooksManagementPage = lazy(() => import("../modules/developer/pages/WebhooksManagementPage"));
const OrdersApiPage = lazy(() => import("../modules/developer/api/pages/OrdersApiPage"));
const TicketsApiPage = lazy(() => import("../modules/developer/api/pages/TicketsApiPage"));
const CheckinsApiPage = lazy(() => import("../modules/developer/api/pages/CheckinsApiPage"));
const PaymentsApiPage = lazy(() => import("../modules/developer/financeApi/pages/PaymentsApiPage"));
const RefundsApiPage = lazy(() => import("../modules/developer/financeApi/pages/RefundsApiPage"));
const ReconciliationApiPage = lazy(() => import("../modules/developer/financeApi/pages/ReconciliationApiPage"));
const PayoutsApiPage = lazy(() => import("../modules/developer/financeApi/pages/PayoutsApiPage"));
const IntegrationsHubPage = lazy(() => import("../modules/integrations/pages/IntegrationsHubPage"));
const CrmIntegrationsPage = lazy(() => import("../modules/integrations/pages/CrmIntegrationsPage"));
const ErpIntegrationsPage = lazy(() => import("../modules/integrations/pages/ErpIntegrationsPage"));
const SyncLogsPage = lazy(() => import("../modules/integrations/pages/SyncLogsPage"));
const DeveloperPortalScreen = lazy(() => import("../modules/developer/portal/pages/DeveloperPortalScreen"));
const SdksDownloadScreen = lazy(() => import("../modules/developer/portal/pages/SdksDownloadScreen"));
const SandboxEnvironmentScreen = lazy(() => import("../modules/developer/portal/pages/SandboxEnvironmentScreen"));
const ApiPlaygroundScreen = lazy(() => import("../modules/developer/portal/pages/ApiPlaygroundScreen"));
const EnterpriseArchitectureScreen = lazy(() => import("../modules/enterprise/pages/EnterpriseArchitectureScreen"));
const MicroservicesPage = lazy(() => import("../modules/enterprise/pages/MicroservicesPage"));
const CloudInfraPage = lazy(() => import("../modules/enterprise/pages/CloudInfraPage"));
const EventBusPage = lazy(() => import("../modules/enterprise/pages/EventBusPage"));
const AiCenterHubPage = lazy(() => import("../modules/ai/pages/AiCenterHubPage"));
const AiProducerCopilotPage = lazy(() => import("../modules/ai/pages/AiProducerCopilotPage"));
const AiFraudDetectionPage = lazy(() => import("../modules/ai/pages/AiFraudDetectionPage"));
const AiAutomationsPage = lazy(() => import("../modules/ai/pages/AiAutomationsPage"));
const MultitenantHubScreen = lazy(() => import("../modules/multitenant/pages/MultitenantHubScreen"));
const SaasPlansScreen = lazy(() => import("../modules/multitenant/pages/SaasPlansScreen"));
const MarketplaceScreen = lazy(() => import("../modules/multitenant/pages/MarketplaceScreen"));
const SuperAdminConsoleScreen = lazy(() => import("../modules/multitenant/pages/SuperAdminConsoleScreen"));
const ParticipantExperiencePage = lazy(() => import("../modules/omnichannel/pages/ParticipantExperiencePage"));
const LoyaltyProgramPage = lazy(() => import("../modules/omnichannel/pages/LoyaltyProgramPage"));
const SmartVenueNocPage = lazy(() => import("../modules/smartvenue/pages/SmartVenueNocPage"));
const IotDevicesPage = lazy(() => import("../modules/smartvenue/pages/IotDevicesPage"));
const BiDashboardPage = lazy(() => import("../modules/bi/pages/BiDashboardPage"));
const GovernanceCompliancePage = lazy(() => import("../modules/governance/pages/GovernanceCompliancePage"));
const CrmSalesHubPage = lazy(() => import("../modules/crm/pages/CrmSalesHubPage"));
const MarketingCenterPage = lazy(() => import("../modules/marketing/pages/MarketingCenterPage"));
const SponsorsManagerPage = lazy(() => import("../modules/sponsorship/pages/SponsorsManagerPage"));
const B2bMarketplacePage = lazy(() => import("../modules/b2b/pages/B2bMarketplacePage"));
const SmartDestinationHubPage = lazy(() => import("../modules/tourism/pages/SmartDestinationHubPage"));
const ExperiencesPage = lazy(() => import("../modules/tourism/pages/ExperiencesPage"));
const SmartCityDashboardPage = lazy(() => import("../modules/smartcity/pages/SmartCityDashboardPage"));
const DigitalLicensingPage = lazy(() => import("../modules/smartcity/pages/DigitalLicensingPage"));
const EsgControlHubPage = lazy(() => import("../modules/esg/pages/EsgControlHubPage"));
const CarbonCalculatorPage = lazy(() => import("../modules/esg/pages/CarbonCalculatorPage"));
const AiControlCenterPage = lazy(() => import("../modules/aiagents/pages/AiControlCenterPage"));
const AgentStudioPage = lazy(() => import("../modules/aiagents/pages/AgentStudioPage"));
const GlobalDashboardPage = lazy(() => import("../modules/global/pages/GlobalDashboardPage"));
const GlobalFscalPage = lazy(() => import("../modules/global/pages/GlobalFscalPage"));
const GestaoParceiros = lazy(() => import("../pages/GestaoParceiros"));
const CadastroParceiro = lazy(() => import("../pages/CadastroParceiro"));
const OperacaoComercial = lazy(() => import("../pages/OperacaoComercial"));
const Comissionamento = lazy(() => import("../pages/Comissionamento"));
const FilaReembolsos = lazy(() => import("../pages/FilaReembolsos"));
const Perfil = lazy(() => import("../pages/Perfil"));
const CadastroContrato = lazy(() => import("../pages/CadastroContrato"));
const CadastroAgente = lazy(() => import("../pages/CadastroAgente"));
const PainelAntiCambista = lazy(() => import("../pages/PainelAntiCambista"));
const RelatoriosAtracao = lazy(() => import("../pages/RelatoriosAtracao"));
const VisualizadorWireframes = lazy(() => import("../pages/VisualizadorWireframes"));
const Gallery = lazy(() => import("../pages/Gallery"));
const ScreenViewer = lazy(() => import("../pages/ScreenViewer"));

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#0d0f14] text-gray-100">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-xs text-gray-400">Carregando módulo Curitiba 360...</p>
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          {/* === GALERIA DE WIREFRAMES E TELAS OFICIAIS === */}
          <Route path="/telas" element={<Gallery />} />
          <Route path="/tela/:slug" element={<ScreenViewer />} />
          <Route path="/wireframes" element={<VisualizadorWireframes />} />

          {/* === ROTAS DE AUTENTICAÇÃO === */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-admin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/criar-conta" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
          <Route path="/esqueci-minha-senha" element={<ForgotPasswordPage />} />

          {/* === OPERAÇÃO DE ACESSO MOBILE & ASSISTENTE IA & CARTEIRA === */}
          <Route path="/access" element={<AccessScanner />} />
          <Route path="/access/scanner" element={<AccessScanner />} />
          <Route path="/access/dashboard" element={<AccessDashboard />} />
          <Route path="/ai" element={<AIAssistantPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/pass" element={<PassCatalog />} />
          <Route path="/wallet" element={<DigitalWalletPage />} />
          <Route path="/explore" element={<LegacyExplorePage />} />
          <Route path="/profile" element={<LegacyUserProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/validacao" element={<ValidacaoIngressos />} />

          {/* === ROTAS DO PORTAL PÚBLICO LEGADO (TURISTA) === */}
          <Route path="/portal" element={<PortalHome />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/recuperar-senha" element={<PortalRecuperarSenha />} />
          <Route path="/portal/criar-senha" element={<PortalCriarSenha />} />
          <Route path="/portal/criar-conta" element={<PortalCriarConta />} />
          <Route path="/portal/confirmacao-cadastro" element={<PortalConfirmacaoCadastro />} />
          <Route path="/portal/email-recuperar-senha" element={<PortalEmailMock />} />
          <Route path="/portal/email-confirmacao" element={<PortalEmailMock />} />

          {/* === ROTAS PÚBLICAS DO APLICATIVO SUPERAPP === */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path={ROUTES.public.explore} element={<ExplorePage />} />
            <Route path={ROUTES.public.events} element={<EventsPage />} />
            <Route path={ROUTES.public.eventDetails(":eventId")} element={<EventDetailsPage />} />
            <Route path={ROUTES.public.ticketSelection(":id")} element={<TicketSelectionPage />} />
            <Route path={ROUTES.public.places} element={<PlacesPage />} />
            <Route path={ROUTES.public.placeDetails(":placeId")} element={<PlaceDetailsPage />} />
            <Route path={ROUTES.public.tourism} element={<TourismPage />} />
            <Route path={ROUTES.public.tourismMap} element={<TourismMapPage />} />
            <Route path={ROUTES.public.attraction(":id")} element={<AttractionDetailsPage />} />
            <Route path={ROUTES.public.reservation(":id")} element={<ReservationPage />} />
          </Route>

          {/* === ROTAS PRIVADAS DO SUPERAPP DO CIDADÃO === */}
          <Route element={<AuthGuard />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.app.cart} element={<CartPage />} />
              <Route path={ROUTES.app.checkout} element={<CheckoutPage />} />
              <Route path={ROUTES.app.order(":id")} element={<OrderSuccessPage />} />
              <Route path={ROUTES.app.tickets} element={<TicketsPage />} />
              <Route path={ROUTES.app.ticket(":id")} element={<DigitalTicketPage />} />
              <Route path={ROUTES.app.reservations} element={<MyReservationsPage />} />
              <Route path="/reservas/confirmacao/:id" element={<ReservationConfirmationPage />} />
              <Route path={ROUTES.app.wallet} element={<WalletPage />} />
              <Route path="/carteira/cashback" element={<CashbackPage />} />
              <Route path="/carteira/beneficios" element={<BenefitsPage />} />
              <Route path="/carteira/cupons" element={<CouponsPage />} />
              <Route path="/carteira/pix" element={<PixPage />} />
              <Route path="/carteira/cartoes" element={<CardsPage />} />
              <Route path="/carteira/extrato" element={<StatementPage />} />
              <Route path={ROUTES.app.favorites} element={<FavoritesPage />} />
              <Route path={ROUTES.app.profile} element={<ProfilePage />} />
            </Route>
          </Route>

          {/* === CONSOLE DE ADMIN GLOBAL UNIFICADO (FASES 1 A 29 + WF-045 A WF-050) === */}
          <Route element={<AuthGuard />}>
            <Route element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route path={ROUTES.admin.root} element={<OperationalDashboardPage />} />
                <Route path={ROUTES.admin.dashboard} element={<OperationalDashboardPage />} />
                <Route path="/admin/commercial-dashboard" element={<AdminDashboard />} />

                {/* Fases 18 a 29: Business OS, AI Board, Command Center, Federation, Developer Hub, FinOps, Scale */}
                <Route path="/admin/business-os" element={<ExecutiveOperatingCenterPage />} />
                <Route path="/admin/executive-board" element={<ExecutiveAiBoardPage />} />
                <Route path="/admin/enterprise-command" element={<EnterpriseCommandCenterPage />} />
                <Route path="/admin/scenarios" element={<ScenarioSimulatorPage />} />
                <Route path="/admin/federation" element={<GlobalFederationPage />} />
                <Route path="/admin/multi-cloud" element={<MultiCloudPage />} />
                <Route path="/admin/business-hub" element={<BusinessHubPage />} />
                <Route path="/admin/marketplace" element={<MarketplacePage />} />
                <Route path="/admin/banking" element={<BankingServicePage />} />
                <Route path="/admin/ai-command" element={<AiCommandCenterPage />} />
                <Route path="/admin/agents" element={<AgentsLibraryPage />} />
                <Route path="/admin/copilot" element={<CopilotStudioPage />} />
                <Route path="/admin/digital-twin-ai" element={<DigitalTwinPage />} />
                <Route path="/admin/platform" element={<InternalDeveloperPlatformPage />} />
                <Route path="/admin/service-catalog" element={<ServiceCatalogPage />} />
                <Route path="/admin/mlops" element={<MlOpsRegistryPage />} />
                <Route path="/admin/executive" element={<ExecutiveCockpitPage />} />
                <Route path="/admin/developers" element={<DeveloperHubPage />} />
                <Route path="/admin/api-gateway" element={<ApiGatewayPage />} />
                <Route path="/admin/webhooks" element={<WebhooksPage />} />
                <Route path="/admin/plugins" element={<PluginsMarketplacePage />} />
                <Route path="/admin/workflows" element={<WorkflowsPage />} />
                <Route path="/admin/integrations" element={<IntegrationsPage />} />
                <Route path="/admin/sdk" element={<SdkDownloadsPage />} />
                <Route path="/admin/api-monitor" element={<ApiMonitorPage />} />
                <Route path="/admin/finops" element={<FinOpsPage />} />
                <Route path="/admin/sla-center" element={<SlaCenterPage />} />
                <Route path="/admin/capacity" element={<CapacityPlanningPage />} />
                <Route path="/admin/vendor-contracts" element={<VendorContractsPage />} />
                <Route path="/admin/global-operations" element={<GlobalOperationsPage />} />
                <Route path="/admin/reliability" element={<ReliabilityCenterPage />} />
                <Route path="/admin/backups" element={<DisasterRecoveryPage />} />
                <Route path="/admin/disaster-recovery" element={<DisasterRecoveryPage />} />
                <Route path="/admin/incidents" element={<IncidentsPage />} />
                <Route path="/admin/compliance" element={<CompliancePrivacyPage />} />
                <Route path="/admin/releases" element={<ReleaseGovernancePage />} />
                <Route path="/admin/release-governance" element={<ReleaseGovernancePage />} />
                <Route path="/admin/tenants" element={<TenantsPage />} />
                <Route path="/admin/feature-flags" element={<FeatureFlagsPage />} />
                <Route path="/admin/jobs" element={<BackgroundJobsPage />} />
                <Route path="/admin/security" element={<SecurityCenterPage />} />
                <Route path="/admin/deployments" element={<DeploymentsPage />} />
                <Route path="/admin/control-tower" element={<ControlTowerPage />} />
                <Route path="/admin/command-center" element={<CommandCenterPage />} />
                <Route path="/admin/observability" element={<ObservabilityPage />} />
                <Route path="/admin/predictive" element={<PredictiveIntelligencePage />} />
                <Route path="/admin/predictive-ai" element={<PredictiveIntelligencePage />} />
                <Route path="/admin/data-quality" element={<DataQualityPage />} />
                <Route path="/admin/risk" element={<RiskIntelligencePage />} />
                <Route path="/admin/marketing-automation" element={<MarketingAutomationPage />} />
                <Route path="/admin/affiliates" element={<AffiliatesPage />} />
                <Route path="/admin/partner-portal" element={<PartnerPortalDashboardPage />} />
                <Route path="/admin/audit" element={<AuditLogsPage />} />
                <Route path="/admin/crm" element={<CustomerCRMPage />} />
                <Route path="/admin/support" element={<SupportTicketsPage />} />
                <Route path="/admin/finance" element={<FinancialDashboardPage />} />
                <Route path="/admin/payouts" element={<PartnerPayoutsPage />} />
                <Route path="/admin/reconciliation" element={<ReconciliationPage />} />
                <Route path="/admin/ai-studio" element={<AIStudioPage />} />
                <Route path="/admin/checkin" element={<CheckinDashboard />} />
                <Route path="/admin/users-list" element={<UsersList />} />
                <Route path="/admin/events-list" element={<EventsList />} />
                <Route path="/admin/attractions/new" element={<AttractionForm />} />
                <Route path="/admin/partners" element={<PartnersList />} />
                <Route path="/admin/tickets" element={<TicketsList />} />
                <Route path="/admin/orders-list" element={<OrdersList />} />
                <Route path="/admin/orders/:id" element={<OrderDetails />} />
                <Route path="/admin/payments" element={<PaymentsList />} />
                <Route path="/admin/refunds" element={<RefundsList />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path={ROUTES.admin.settings} element={<Settings />} />

                {/* Gestão Operacional Core */}
                <Route path={ROUTES.admin.users} element={<AdminUsersPage />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path={ROUTES.admin.userCreate} element={<UserEditorPage />} />
                <Route path={ROUTES.admin.userDetails(":userId")} element={<UserEditorPage />} />
                <Route path="/admin/usuarios/novo" element={<UserEditorPage />} />
                <Route path="/admin/usuarios/:userId" element={<UserEditorPage />} />
                <Route path={ROUTES.admin.contracts} element={<AdminContractsPage />} />
                <Route path="/admin/contracts" element={<AdminContractsPage />} />
                <Route path={ROUTES.admin.contractCreate} element={<ContractEditorPage />} />
                <Route path={ROUTES.admin.contractDetails(":contractId")} element={<ContractEditorPage />} />
                <Route path="/admin/contratos/novo" element={<ContractEditorPage />} />
                <Route path="/admin/contratos/:contractId" element={<ContractEditorPage />} />
                <Route path={ROUTES.admin.commercialConditions} element={<CommercialConditionsPage />} />
                <Route path="/admin/condicoes-comerciais" element={<CommercialConditionsPage />} />
                <Route path={ROUTES.admin.commercialConditionCreate} element={<CommercialConditionsPage />} />
                <Route path="/admin/condicoes-comerciais/nova" element={<CommercialConditionsPage />} />
                <Route path="/admin/commercial" element={<CommercialConditionsPage />} />
                <Route path={ROUTES.admin.attractions} element={<AdminAttractionsPage />} />
                <Route path="/admin/atracoes" element={<AdminAttractionsPage />} />
                <Route path="/admin/attractions" element={<AdminAttractionsPage />} />
                <Route path={ROUTES.admin.attractionCreate} element={<AttractionWizardPage />} />
                <Route path="/admin/atracoes/nova" element={<AttractionWizardPage />} />
                <Route path="/admin/atracoes/:attractionId" element={<AdminAttractionDetailsPage />} />
                <Route path="/admin/atracoes/:attractionId/editar" element={<AttractionWizardPage />} />
                <Route path="/admin/atracoes/:attractionId/categorias" element={<AttractionCategoriesPage />} />
                <Route path="/admin/atracoes/:attractionId/ingressos" element={<AttractionTicketsPage />} />
                <Route path={ROUTES.admin.financialReports} element={<FinancialReportsPage />} />
                <Route path="/admin/financial" element={<FinancialReportsPage />} />
                <Route path={ROUTES.admin.profile} element={<UserProfilePage />} />
                <Route path="/admin/perfil" element={<UserProfilePage />} />
                <Route path={ROUTES.admin.myProfile} element={<AdminProfilePage />} />
                <Route path={ROUTES.admin.attractionTotals(":attractionId")} element={<AttractionTotalsPage />} />
                <Route path="/admin/atracoes/totais" element={<AttractionTotalsPage />} />
                <Route path="/admin/events" element={<AdminEventsPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />

                {/* === PLATAFORMA SMART CITY E DIGITAL TWIN (WF-045) === */}
                <Route path="/admin/digital-twin" element={<DigitalTwinDashboardPage />} />
                <Route path="/admin/digital-twin/dashboard" element={<DigitalTwinDashboardPage />} />
                <Route path="/admin/digital-twin/map" element={<DigitalTwinMapPage />} />
                <Route path="/admin/digital-twin/city" element={<DigitalTwinCityPage />} />
                <Route path="/admin/digital-twin/events" element={<DigitalTwinEventsPage />} />
                <Route path="/admin/digital-twin/attractions" element={<DigitalTwinAttractionsPage />} />
                <Route path="/admin/digital-twin/mobility" element={<DigitalTwinMobilityPage />} />
                <Route path="/admin/digital-twin/parking" element={<DigitalTwinParkingPage />} />
                <Route path="/admin/digital-twin/security" element={<DigitalTwinSecurityPage />} />
                <Route path="/admin/digital-twin/environment" element={<DigitalTwinEnvironmentPage />} />
                <Route path="/admin/digital-twin/iot" element={<DigitalTwinIotPage />} />
                <Route path="/admin/digital-twin/simulations" element={<DigitalTwinSimulationsPage />} />
                <Route path="/admin/digital-twin/forecast" element={<DigitalTwinForecastPage />} />
                <Route path="/admin/digital-twin/reports" element={<DigitalTwinReportsPage />} />
                <Route path="/admin/digital-twin/settings" element={<DigitalTwinSettingsPage />} />

                {/* === GESTÃO DE ECOSSISTEMA, PARCEIROS E MARKETPLACE B2B (WF-046) === */}
                <Route path="/admin/partners-b2b" element={<PartnersB2bDashboardPage />} />
                <Route path="/admin/partners-b2b/dashboard" element={<PartnersB2bDashboardPage />} />
                <Route path="/admin/partners-b2b/marketplace" element={<PartnersB2bMarketplacePage />} />
                <Route path="/admin/partners-b2b/hotels" element={<PartnersB2bHotelsPage />} />
                <Route path="/admin/partners-b2b/restaurants" element={<PartnersB2bRestaurantsPage />} />
                <Route path="/admin/partners-b2b/guides" element={<PartnersB2bGuidesPage />} />
                <Route path="/admin/partners-b2b/agencies" element={<PartnersB2bAgenciesPage />} />
                <Route path="/admin/partners-b2b/transport" element={<PartnersB2bTransportPage />} />
                <Route path="/admin/partners-b2b/contracts" element={<PartnersB2bContractsPage />} />
                <Route path="/admin/partners-b2b/catalog" element={<PartnersB2bCatalogPage />} />
                <Route path="/admin/partners-b2b/split" element={<PartnersB2bSplitPage />} />
                <Route path="/admin/partners-b2b/affiliates" element={<PartnersB2bAffiliatesPage />} />
                <Route path="/admin/partners-b2b/integrations" element={<PartnersB2bIntegrationsPage />} />
                <Route path="/admin/partners-b2b/bookings" element={<PartnersB2bBookingsPage />} />
                <Route path="/admin/partners-b2b/packages" element={<PartnersB2bPackagesPage />} />
                <Route path="/admin/partners-b2b/pricing" element={<PartnersB2bPricingPage />} />
                <Route path="/admin/partners-b2b/reviews" element={<PartnersB2bReviewsPage />} />

                {/* === GESTÃO DE INOVAÇÃO, PORTFÓLIO E PROJETOS ESTRATÉGICOS (WF-047) === */}
                <Route path="/admin/portfolio" element={<PortfolioDashboardPage />} />
                <Route path="/admin/portfolio/dashboard" element={<PortfolioDashboardPage />} />
                <Route path="/admin/portfolio/ideas" element={<PortfolioIdeasPage />} />
                <Route path="/admin/portfolio/business-cases" element={<PortfolioBusinessCasesPage />} />
                <Route path="/admin/portfolio/projects" element={<PortfolioProjectsPage />} />
                <Route path="/admin/portfolio/programs" element={<PortfolioProgramsPage />} />
                <Route path="/admin/portfolio/portfolio" element={<PortfolioStructurePage />} />
                <Route path="/admin/portfolio/roadmaps" element={<PortfolioRoadmapsPage />} />
                <Route path="/admin/portfolio/kanban" element={<PortfolioKanbanPage />} />
                <Route path="/admin/portfolio/backlog" element={<PortfolioBacklogPage />} />
                <Route path="/admin/portfolio/sprints" element={<PortfolioSprintsPage />} />
                <Route path="/admin/portfolio/resources" element={<PortfolioResourcesPage />} />
                <Route path="/admin/portfolio/risks" element={<PortfolioRisksPage />} />
                <Route path="/admin/portfolio/benefits" element={<PortfolioBenefitsPage />} />
                <Route path="/admin/portfolio/change" element={<PortfolioChangePage />} />
                <Route path="/admin/portfolio/reports" element={<PortfolioReportsPage />} />
                <Route path="/admin/portfolio/settings" element={<PortfolioSettingsPage />} />

                {/* === PLATAFORMA DE GOVERNANÇA EXECUTIVA E PERFORMANCE CORPORATIVA (WF-048) === */}
                <Route path="/admin/governance" element={<CorpGovDashboardPage />} />
                <Route path="/admin/governance/dashboard" element={<CorpGovDashboardPage />} />
                <Route path="/admin/governance/executive-cockpit" element={<CorpGovExecutiveCockpitPage />} />
                <Route path="/admin/governance/strategic-planning" element={<CorpGovStrategicPlanningPage />} />
                <Route path="/admin/governance/strategy-map" element={<CorpGovStrategyMapPage />} />
                <Route path="/admin/governance/balanced-scorecard" element={<CorpGovBalancedScorecardPage />} />
                <Route path="/admin/governance/objectives" element={<CorpGovCorporateObjectivesPage />} />
                <Route path="/admin/governance/okrs" element={<CorpGovCorporateOkrsPage />} />
                <Route path="/admin/governance/kpis" element={<CorpGovExecutiveKpisPage />} />
                <Route path="/admin/governance/councils" element={<CorpGovCouncilsPage />} />
                <Route path="/admin/governance/councils/:councilId" element={<CorpGovCouncilDetailsPage />} />
                <Route path="/admin/governance/committees" element={<CorpGovCommitteesPage />} />
                <Route path="/admin/governance/meetings" element={<CorpGovMeetingsPage />} />
                <Route path="/admin/governance/meetings/:meetingId" element={<CorpGovMeetingDetailsPage />} />
                <Route path="/admin/governance/resolutions" element={<CorpGovResolutionsPage />} />
                <Route path="/admin/governance/action-plans" element={<CorpGovActionPlansPage />} />
                <Route path="/admin/governance/risks" element={<CorpGovCorporateRisksPage />} />
                <Route path="/admin/governance/internal-controls" element={<CorpGovInternalControlsPage />} />
                <Route path="/admin/governance/compliance" element={<CorpGovCompliancePage />} />
                <Route path="/admin/governance/lgpd" element={<CorpGovLgpdGovernancePage />} />
                <Route path="/admin/governance/policies" element={<CorpGovPoliciesPage />} />
                <Route path="/admin/governance/audits" element={<CorpGovAuditsPage />} />
                <Route path="/admin/governance/approvals" element={<CorpGovApprovalsPage />} />
                <Route path="/admin/governance/reports" element={<CorpGovExecutiveReportsPage />} />
                <Route path="/admin/governance/audit" element={<CorpGovAuditPage />} />
                <Route path="/admin/governance/settings" element={<CorpGovSettingsPage />} />

                {/* === PLATAFORMA DE INTELIGÊNCIA ESTRATÉGICA E GOVERNO DIGITAL (WF-049) === */}
                <Route path="/admin/government" element={<GovDashboardPage />} />
                <Route path="/admin/government/dashboard" element={<GovDashboardPage />} />
                <Route path="/admin/government/budget" element={<GovBudgetPage />} />
                <Route path="/admin/government/citizen" element={<GovCitizenPage />} />
                <Route path="/admin/government/contracts" element={<GovContractsPage />} />
                <Route path="/admin/government/goals" element={<GovGoalsPage />} />
                <Route path="/admin/government/hearings" element={<GovHearingsPage />} />
                <Route path="/admin/government/indicators" element={<GovIndicatorsPage />} />
                <Route path="/admin/government/observatory" element={<GovObservatoryPage />} />
                <Route path="/admin/government/opendata" element={<GovOpenDataPage />} />
                <Route path="/admin/government/ouvidoria" element={<GovOuvidoriaPage />} />
                <Route path="/admin/government/procurement" element={<GovProcurementPage />} />
                <Route path="/admin/government/programs" element={<GovProgramsPage />} />
                <Route path="/admin/government/projects" element={<GovProjectsPage />} />
                <Route path="/admin/government/publicservices" element={<GovPublicServicesPage />} />
                <Route path="/admin/government/reports" element={<GovReportsPage />} />
                <Route path="/admin/government/settings" element={<GovSettingsPage />} />
                <Route path="/admin/government/transparency" element={<GovTransparencyPage />} />
                <Route path="/admin/government/agreements" element={<GovAgreementsPage />} />

                {/* === SUPER APP CURITIBA 360 E SERVIÇOS URBANOS DIGITAIS (WF-050) === */}
                <Route path="/admin/super-app" element={<SuperAppHomePage />} />
                <Route path="/admin/super-app/home" element={<SuperAppHomePage />} />
                <Route path="/admin/super-app/explore" element={<SuperAppExplorePage />} />
                <Route path="/admin/super-app/map" element={<SuperAppSmartMapPage />} />
                <Route path="/admin/super-app/events" element={<SuperAppEventsPage />} />
                <Route path="/admin/super-app/events/:eventId" element={<SuperAppEventDetailsPage />} />
                <Route path="/admin/super-app/attractions" element={<SuperAppAttractionsPage />} />
                <Route path="/admin/super-app/reservations" element={<SuperAppReservationsPage />} />
                <Route path="/admin/super-app/tickets" element={<SuperAppTicketsPage />} />
                <Route path="/admin/super-app/wallet" element={<SuperAppWalletPage />} />
                <Route path="/admin/super-app/mobility" element={<SuperAppMobilityPage />} />
                <Route path="/admin/super-app/parking" element={<SuperAppParkingPage />} />
                <Route path="/admin/super-app/marketplace" element={<SuperAppMarketplacePage />} />
                <Route path="/admin/super-app/loyalty" element={<SuperAppLoyaltyPage />} />
                <Route path="/admin/super-app/benefits" element={<SuperAppBenefitsPage />} />
                <Route path="/admin/super-app/cityservices" element={<SuperAppCityServicesPage />} />
                <Route path="/admin/super-app/protocols" element={<SuperAppProtocolsPage />} />
                <Route path="/admin/super-app/ouvidoria" element={<SuperAppOuvidoriaPage />} />
                <Route path="/admin/super-app/emergency" element={<SuperAppEmergencyPage />} />
                <Route path="/admin/super-app/notifications" element={<SuperAppNotificationsPage />} />
                <Route path="/admin/super-app/assistant" element={<SuperAppAssistantPage />} />
                <Route path="/admin/super-app/miniapps" element={<SuperAppMiniAppsPage />} />
                <Route path="/admin/super-app/profile" element={<SuperAppProfilePage />} />
                <Route path="/admin/super-app/settings" element={<SuperAppSettingsPage />} />
              </Route>
            </Route>
          </Route>

          {/* === ROTAS DO BACKOFFICE INTEGRADO & MOD-05 A MOD-26 === */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<DashboardAnalytics />} />
              <Route path="/perfil-admin" element={<Perfil />} />

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

              {/* Etapa 05 e 06: Dados Bancários, Carteira, Repasses & Conciliação */}
              <Route path="/agencias/:agencyId/financeiro" element={<AgencyFinancialPage />} />
              <Route path="/agencias/:agencyId/repasses/novo" element={<AgencyFinancialPage />} />
              <Route path="/agencias/:agencyId/extrato" element={<AgencyFinancialPage />} />
              <Route path="/agencias/:agencyId/financeiro/conciliacao" element={<AgencyReconciliationPage />} />

              {/* Etapa 07 e 08: Cancelamentos, Reembolsos & Centro Financeiro 360 */}
              <Route path="/financeiro/cancelamentos" element={<RefundListPage />} />
              <Route path="/financeiro/reembolsos" element={<FilaReembolsos />} />
              <Route path="/financeiro/reembolsos-mod" element={<RefundListPage />} />
              <Route path="/financeiro/reembolsos/:refundId" element={<RefundDetailPage />} />
              <Route path="/financeiro/fila-financeira" element={<RefundQueuePage />} />
              <Route path="/financeiro/centro-financeiro-360" element={<FinancialCenter360Page />} />
              <Route path="/financeiro/centro-360" element={<FinanceCenter360Page />} />
              <Route path="/financeiro" element={<FinancialCenter360Page />} />

              {/* MOD-06: Agentes Comerciais, CRM, Funil, Gamificação, IA, Omnichannel e Performance 360 */}
              <Route path="/agentes" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/dashboard" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/:agentId" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/:agentId/dashboard" element={<AgentDashboardModulePage />} />
              <Route path="/agentes/crm" element={<AgentCrmPage />} />
              <Route path="/agentes/:agentId/crm" element={<AgentCrmPage />} />
              <Route path="/agentes/crm/clientes/:customerId" element={<CustomerDetail360Page />} />
              <Route path="/agentes/:agentId/crm/clientes/:customerId" element={<CustomerDetail360Page />} />
              <Route path="/agentes/crm/oportunidades" element={<AgentOpportunitiesPage />} />
              <Route path="/agentes/:agentId/crm/oportunidades" element={<AgentOpportunitiesPage />} />
              <Route path="/crm/clientes" element={<AgentCrmPage />} />
              <Route path="/agentes/funil" element={<AgentPipelinePage />} />
              <Route path="/agentes/:agentId/funil" element={<AgentPipelinePage />} />
              <Route path="/agentes/oportunidades" element={<AgentPipelinePage />} />
              <Route path="/agentes/:agentId/oportunidades" element={<AgentPipelinePage />} />
              <Route path="/agentes/oportunidades/:opportunityId" element={<OpportunityDetailPage />} />
              <Route path="/agentes/:agentId/oportunidades/:opportunityId" element={<OpportunityDetailPage />} />
              <Route path="/agentes/metas" element={<AgentGoalsPage />} />
              <Route path="/agentes/:agentId/metas" element={<AgentGoalsPage />} />
              <Route path="/agentes/ranking" element={<AgentRankingPage />} />
              <Route path="/agentes/campanhas" element={<AgentCampaignsPage />} />
              <Route path="/agentes/premiacoes" element={<AgentCampaignsPage />} />
              <Route path="/agentes/desafios" element={<AgentMissionsPage />} />
              <Route path="/agentes/ia" element={<AgentCopilotPage />} />
              <Route path="/agentes/:agentId/ia" element={<AgentCopilotPage />} />
              <Route path="/agentes/copiloto" element={<AgentCopilotPage />} />
              <Route path="/agentes/:agentId/copiloto" element={<AgentCopilotPage />} />
              <Route path="/agentes/automacoes" element={<AgentAutomationsPage />} />
              <Route path="/agentes/:agentId/automacoes" element={<AgentAutomationsPage />} />
              <Route path="/agentes/comunicacao" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/:agentId/comunicacao" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/omnichannel" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/:agentId/omnichannel" element={<AgentOmnichannelPage />} />
              <Route path="/agentes/omnichannel/templates" element={<OmnichannelTemplatesPage />} />
              <Route path="/agentes/omnichannel/campanhas" element={<OmnichannelTemplatesPage />} />
              <Route path="/agentes/agenda" element={<AgentAgendaPage />} />
              <Route path="/agentes/:agentId/agenda" element={<AgentAgendaPage />} />
              <Route path="/agentes/calendario" element={<AgentAgendaPage />} />
              <Route path="/agentes/tarefas" element={<AgentTasksPage />} />
              <Route path="/agentes/:agentId/tarefas" element={<AgentTasksPage />} />
              <Route path="/agentes/produtividade" element={<AgentTasksPage />} />
              <Route path="/agentes/:agentId/produtividade" element={<AgentTasksPage />} />
              <Route path="/agentes/followups" element={<AgentTasksPage />} />
              <Route path="/agentes/performance-360" element={<AgentPerformance360Page />} />
              <Route path="/comercial" element={<CommercialExecutivePage />} />
              <Route path="/comercial/dashboard" element={<CommercialExecutivePage />} />
              <Route path="/comercial/performance" element={<CommercialExecutivePage />} />
              <Route path="/comercial/executivo" element={<CommercialExecutivePage />} />
              <Route path="/comercial/analytics" element={<CommercialExecutivePage />} />

              {/* MOD-07: Gestão de Eventos 360 */}
              <Route path="/eventos-360" element={<EventsListPage />} />
              <Route path="/eventos/dashboard" element={<EventsListPage />} />
              <Route path="/eventos/novo" element={<EventFormPage />} />
              <Route path="/eventos/:eventId/detalhes" element={<EventDetailPage />} />
              <Route path="/eventos/:eventId/editar" element={<EventEditPage />} />
              <Route path="/eventos/:eventId/configuracoes" element={<EventEditPage />} />
              <Route path="/eventos/:eventId/publicacao" element={<EventPublicationPage />} />
              <Route path="/eventos/:eventId/lotes" element={<EventBatchesPage />} />
              <Route path="/eventos/:eventId/lotes/novo" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/lotes/:lotId" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/canais-venda" element={<EventTicketingPage />} />
              <Route path="/eventos/:eventId/mapa" element={<EventMapDashboardPage />} />
              <Route path="/eventos/:eventId/mapa/editor" element={<EventMapEditorPage />} />
              <Route path="/eventos/:eventId/mapa/setores" element={<EventMapEditorPage />} />
              <Route path="/eventos/:eventId/mapa/publicacao" element={<EventMapPublicationPage />} />
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
              <Route path="/eventos/:eventId/checkin" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/catracas" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/scanner" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/scanner" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/acessos" element={<EventCheckinPage />} />
              <Route path="/eventos/:eventId/checkin/dispositivos" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/checkin/monitoramento" element={<EventTurnstilesPage />} />
              <Route path="/eventos/:eventId/checkin/ocorrencias" element={<EventCheckinPage />} />
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

              {/* MOD-08: Mobile Producer, Staff, Checkin Offline, Monitoramento */}
              <Route path="/mobile" element={<MobileProducerAppPage />} />
              <Route path="/mobile/produtor" element={<MobileProducerAppPage />} />
              <Route path="/mobile/eventos" element={<MobileEventsListPage />} />
              <Route path="/mobile/operacao" element={<MobileOperationsPage />} />
              <Route path="/mobile/financeiro" element={<MobileFinancialPage />} />
              <Route path="/mobile/configuracoes" element={<MobileSettingsPage />} />
              <Route path="/staff" element={<StaffHomeScreen />} />
              <Route path="/mobile/staff" element={<StaffHomeScreen />} />
              <Route path="/tasks" element={<StaffTasksPage />} />
              <Route path="/checklists" element={<StaffTasksPage />} />
              <Route path="/mobile/staff/tarefas" element={<StaffTasksPage />} />
              <Route path="/credentials" element={<StaffCredentialsPage />} />
              <Route path="/mobile/staff/credenciamento" element={<StaffCredentialsPage />} />
              <Route path="/incidents" element={<StaffIncidentsPage />} />
              <Route path="/mobile/staff/ocorrencias" element={<StaffIncidentsPage />} />
              <Route path="/checkin" element={<OfflineCheckinHomeScreen />} />
              <Route path="/mobile/checkin" element={<OfflineCheckinHomeScreen />} />
              <Route path="/checkin/scanner" element={<OfflineScannerScreen />} />
              <Route path="/checkin/manual" element={<OfflineManualScreen />} />
              <Route path="/checkin/history" element={<OfflineHistoryScreen />} />
              <Route path="/checkin/sync" element={<OfflineSyncScreen />} />
              <Route path="/communication" element={<CommunicationHomeScreen />} />
              <Route path="/mobile/comunicacao" element={<CommunicationHomeScreen />} />
              <Route path="/communication/channels" element={<ChannelsScreen />} />
              <Route path="/communication/chat" element={<ChatScreen />} />
              <Route path="/communication/alerts" element={<AlertsScreen />} />
              <Route path="/communication/notifications" element={<PushNotificationsScreen />} />
              <Route path="/communication/settings" element={<PushNotificationsScreen />} />
              <Route path="/monitoring" element={<MonitoringHomeScreen />} />
              <Route path="/mobile/monitoramento" element={<MonitoringHomeScreen />} />
              <Route path="/monitoring/sales" element={<RealtimeSalesScreen />} />
              <Route path="/monitoring/checkin" element={<CheckinFlowScreen />} />
              <Route path="/monitoring/occupancy" element={<SectorOccupancyScreen />} />
              <Route path="/monitoring/queues" element={<QueueMonitorScreen />} />
              <Route path="/monitoring/incidents" element={<LiveIncidentsScreen />} />
              <Route path="/security" element={<SecurityHomeScreen />} />
              <Route path="/mobile/seguranca" element={<SecurityHomeScreen />} />
              <Route path="/security/profile" element={<ProfileScreen />} />
              <Route path="/security/biometrics" element={<BiometricsScreen />} />
              <Route path="/security/devices" element={<DevicesScreen />} />
              <Route path="/security/sessions" element={<SessionsScreen />} />
              <Route path="/security/permissions" element={<PermissionsScreen />} />
              <Route path="/security/audit" element={<AuditScreen />} />
              <Route path="/reports" element={<ReportsHomeScreen />} />
              <Route path="/mobile/relatorios" element={<ReportsHomeScreen />} />
              <Route path="/reports/executive" element={<ExecutiveReportsScreen />} />
              <Route path="/reports/operational" element={<OperationalReportsScreen />} />
              <Route path="/reports/financial" element={<FinancialReportsScreen />} />
              <Route path="/reports/documents" element={<DocumentsScreen />} />
              <Route path="/reports/downloads" element={<DownloadsScreen />} />
              <Route path="/reports/favorites" element={<FavoritesScreen />} />
              <Route path="/mobile/app" element={<MobileAppHubScreen />} />
              <Route path="/mobile/login" element={<MobileLoginScreen />} />
              <Route path="/mobile/mais" element={<MobileMoreModulesScreen />} />

              {/* MOD-09 a MOD-26: API v1, Developer, Enterprise, AI, Multitenant, Omnichannel, SmartVenue, BI, Governance, CRM, Marketing, Sponsorship, B2B, Tourism, SmartCity, ESG, AIAgents, Global */}
              <Route path="/api-docs" element={<ApiDocsPage />} />
              <Route path="/v1" element={<ApiDocsPage />} />
              <Route path="/parceiros/api-keys" element={<ApiKeyManagementPage />} />
              <Route path="/v1/keys" element={<ApiKeyManagementPage />} />
              <Route path="/parceiros/webhooks" element={<WebhooksManagementPage />} />
              <Route path="/v1/webhooks" element={<WebhooksManagementPage />} />
              <Route path="/v1/orders" element={<OrdersApiPage />} />
              <Route path="/v1/tickets" element={<TicketsApiPage />} />
              <Route path="/v1/participants" element={<TicketsApiPage />} />
              <Route path="/v1/checkins" element={<CheckinsApiPage />} />
              <Route path="/v1/payments" element={<PaymentsApiPage />} />
              <Route path="/v1/refunds" element={<RefundsApiPage />} />
              <Route path="/v1/reconciliation" element={<ReconciliationApiPage />} />
              <Route path="/v1/payouts" element={<PayoutsApiPage />} />
              <Route path="/integracoes" element={<IntegrationsHubPage />} />
              <Route path="/integracoes/crm" element={<CrmIntegrationsPage />} />
              <Route path="/integracoes/erp" element={<ErpIntegrationsPage />} />
              <Route path="/integracoes/logs" element={<SyncLogsPage />} />
              <Route path="/developer/portal" element={<DeveloperPortalScreen />} />
              <Route path="/developer" element={<DeveloperPortalScreen />} />
              <Route path="/developer/sdks" element={<SdksDownloadScreen />} />
              <Route path="/developer/sandbox" element={<SandboxEnvironmentScreen />} />
              <Route path="/developer/playground" element={<ApiPlaygroundScreen />} />
              <Route path="/enterprise" element={<EnterpriseArchitectureScreen />} />
              <Route path="/enterprise/architecture" element={<EnterpriseArchitectureScreen />} />
              <Route path="/enterprise/microservices" element={<MicroservicesPage />} />
              <Route path="/enterprise/cloud" element={<CloudInfraPage />} />
              <Route path="/enterprise/event-bus" element={<EventBusPage />} />
              <Route path="/ai/hub" element={<AiCenterHubPage />} />
              <Route path="/ai/copilot" element={<AiProducerCopilotPage />} />
              <Route path="/ai/fraud" element={<AiFraudDetectionPage />} />
              <Route path="/ai/automations" element={<AiAutomationsPage />} />
              <Route path="/tenant" element={<MultitenantHubScreen />} />
              <Route path="/tenant/organizations" element={<MultitenantHubScreen />} />
              <Route path="/tenant/plans" element={<SaasPlansScreen />} />
              <Route path="/tenant/marketplace" element={<MarketplaceScreen />} />
              <Route path="/tenant/admin" element={<SuperAdminConsoleScreen />} />
              <Route path="/omnichannel/participant" element={<ParticipantExperiencePage />} />
              <Route path="/omnichannel/loyalty" element={<LoyaltyProgramPage />} />
              <Route path="/smartvenue/noc" element={<SmartVenueNocPage />} />
              <Route path="/smartvenue" element={<SmartVenueNocPage />} />
              <Route path="/smartvenue/iot" element={<IotDevicesPage />} />
              <Route path="/bi" element={<BiDashboardPage />} />
              <Route path="/bi/dashboard" element={<BiDashboardPage />} />
              <Route path="/governance" element={<GovernanceCompliancePage />} />
              <Route path="/governance/compliance" element={<GovernanceCompliancePage />} />
              <Route path="/crm360" element={<CrmSalesHubPage />} />
              <Route path="/crm360/sales" element={<CrmSalesHubPage />} />
              <Route path="/marketing" element={<MarketingCenterPage />} />
              <Route path="/marketing/hub" element={<MarketingCenterPage />} />
              <Route path="/sponsorship" element={<SponsorsManagerPage />} />
              <Route path="/sponsorship/cotas" element={<SponsorsManagerPage />} />
              <Route path="/b2b" element={<B2bMarketplacePage />} />
              <Route path="/b2b/marketplace" element={<B2bMarketplacePage />} />
              <Route path="/tourism" element={<SmartDestinationHubPage />} />
              <Route path="/tourism/destination" element={<SmartDestinationHubPage />} />
              <Route path="/tourism/experiences" element={<ExperiencesPage />} />
              <Route path="/smartcity" element={<SmartCityDashboardPage />} />
              <Route path="/smartcity/dashboard" element={<SmartCityDashboardPage />} />
              <Route path="/smartcity/licensing" element={<DigitalLicensingPage />} />
              <Route path="/esg" element={<EsgControlHubPage />} />
              <Route path="/esg/hub" element={<EsgControlHubPage />} />
              <Route path="/esg/carbon" element={<CarbonCalculatorPage />} />
              <Route path="/aiagents" element={<AiControlCenterPage />} />
              <Route path="/aiagents/control" element={<AiControlCenterPage />} />
              <Route path="/aiagents/studio" element={<AgentStudioPage />} />
              <Route path="/global" element={<GlobalDashboardPage />} />
              <Route path="/global/dashboard" element={<GlobalDashboardPage />} />
              <Route path="/global/fiscal" element={<GlobalFscalPage />} />
              <Route path="/comercial/agencies/new" element={<AgencyFormPage />} />

              {/* Backoffice Clássico */}
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
              <Route path="/financeiro/comissionamento" element={<Comissionamento />} />
              <Route path="/atendimento/pesquisar" element={<PesquisarIngresso />} />
              <Route path="/notificacoes-backoffice" element={<CentralNotificacoes />} />
              <Route path="/cms/home" element={<CMSHomeCuradoria />} />
              <Route path="/cms/institucional" element={<CMSInstitucional />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRoutes;
