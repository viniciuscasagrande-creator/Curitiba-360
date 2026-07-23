import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Guards
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import { AdminGuard } from "../guards/AdminGuard";
import { PartnerGuard } from "../guards/PartnerGuard";

// Layouts
import { AuthLayout } from "../layouts/AuthLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { AppLayout } from "../layouts/AppLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Centralized paths
import { ROUTES } from "./routePaths";

// Pages
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import ForgotPasswordPage from "../modules/auth/pages/ForgotPasswordPage";

import { LandingPage } from "../modules/home/pages/LandingPage";
import HomePage from "../modules/home/pages/HomePage";
import { ExplorePage } from "../modules/search/pages/ExplorePage";

import { EventsPage } from "../modules/events/pages/EventsPage";
import { EventDetailsPage } from "../modules/events/pages/EventDetailsPage";
import { CartPage } from "../modules/events/pages/CartPage";
import { CheckoutPage } from "../modules/payment/pages/CheckoutPage";
import { OrderResultPage } from "../modules/orders/pages/OrderResultPage";
import { TicketsPage } from "../modules/tickets/pages/TicketsPage";
import { TicketDetailsPage } from "../modules/tickets/pages/TicketDetailsPage";

import { PlacesPage } from "../modules/tourism/pages/PlacesPage";
import { PlaceDetailsPage } from "../modules/tourism/pages/PlaceDetailsPage";

import { WalletPage } from "../modules/wallet/pages/WalletPage";
import { FavoritesPage } from "../modules/profile/pages/FavoritesPage";
import ProfilePage from "../modules/profile/pages/ProfilePage";

import AdminDashboardPage from "../modules/admin/pages/AdminDashboardPage";
import { AdminEventsPage } from "../modules/admin/pages/AdminEventsPage";
import AdminOrdersPage from "../modules/admin/pages/AdminOrdersPage";

// Lazy loaded page components
// WF-045 — Plataforma Smart City e Digital Twin
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

// WF-046 — Gestão de Ecossistema, Parceiros e Marketplace B2B
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

// WF-047 — Gestão de Inovação, Portfólio e Projetos Estratégicos
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

// WF-048 — Plataforma de Governança Executiva e Performance Corporativa
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

// WF-049 — Plataforma de Inteligência Estratégica e Governo Digital
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

// WF-050 — Super App Curitiba 360 e Serviços Urbanos Digitais
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

export function AppRoutes() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0d0f14] text-gray-100">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-xs text-gray-400">Carregando módulo corporativo...</p>
        </div>
      </div>
    }>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas de Visitante */}
          <Route element={<PublicLayout />}>
            <Route path={ROUTES.public.landing} element={<LandingPage />} />
            <Route path={ROUTES.public.explore} element={<ExplorePage />} />
            <Route path={ROUTES.public.events} element={<EventsPage />} />
            <Route path={ROUTES.public.eventDetails(":eventId")} element={<EventDetailsPage />} />
            <Route path={ROUTES.public.places} element={<PlacesPage />} />
            <Route path={ROUTES.public.placeDetails(":placeId")} element={<PlaceDetailsPage />} />
          </Route>

          {/* Rotas de Autenticação (Apenas Visitantes Não Logados) */}
          <Route element={<GuestGuard />}>
            <Route element={<AuthLayout />}>
              <Route path={ROUTES.public.login} element={<LoginPage />} />
              <Route path={ROUTES.public.register} element={<RegisterPage />} />
              <Route path={ROUTES.public.forgotPassword} element={<ForgotPasswordPage />} />
            </Route>
          </Route>

          {/* Rotas Privadas (Requer Login) */}
          <Route element={<AuthGuard />}>
            {/* SuperApp do Cidadão */}
            <Route element={<AppLayout />}>
              <Route path={ROUTES.app.home} element={<HomePage />} />
              <Route path={ROUTES.app.cart} element={<CartPage />} />
              <Route path={ROUTES.app.checkout} element={<CheckoutPage />} />
              <Route path={ROUTES.app.order(":orderId")} element={<OrderResultPage />} />
              <Route path={ROUTES.app.tickets} element={<TicketsPage />} />
              <Route path={ROUTES.app.ticket(":ticketId")} element={<TicketDetailsPage />} />
              <Route path={ROUTES.app.wallet} element={<WalletPage />} />
              <Route path={ROUTES.app.favorites} element={<FavoritesPage />} />
              <Route path={ROUTES.app.profile} element={<ProfilePage />} />
            </Route>

            {/* Painel Administrativo de Parceiros */}
            <Route element={<PartnerGuard />}>
              {/* O ecossistema de parceiros pode estender rotas aqui se necessário */}
            </Route>

            {/* Console de Admin Global (Apenas Admin) */}
            <Route element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route path={ROUTES.admin.dashboard} element={<AdminDashboardPage />} />
                <Route path={ROUTES.admin.events} element={<AdminEventsPage />} />
                <Route path={ROUTES.admin.orders} element={<AdminOrdersPage />} />

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

          {/* Rota Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.public.landing} replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRoutes;
