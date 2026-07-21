import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Admin Dashboard & Phase 2/4 Modules
import AdminDashboard from '../pages/admin/Dashboard';
import UsersList from '../pages/admin/users/UsersList';
import EventsList from '../pages/admin/events/EventsList';
import TicketsList from '../pages/admin/tickets/TicketsList';
import OrdersList from '../pages/admin/orders/OrdersList';
import OrderDetails from '../pages/admin/orders/OrderDetails';
import PaymentsList from '../pages/admin/payments/PaymentsList';
import RefundsList from '../pages/admin/refunds/RefundsList';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

// Phase 5 Access, Check-in & Participant Operations
import AccessScanner from '../pages/access/AccessScanner';
import CheckinDashboard from '../pages/admin/CheckinDashboard';
import TicketTransfer from '../pages/public/TicketTransfer';
import RefundRequest from '../pages/public/RefundRequest';

// Phase 3 Public Sales & Wallet Pages
import Cart from '../pages/public/Cart';
import Checkout from '../pages/public/Checkout';
import MyTickets from '../pages/public/MyTickets';

// Layout & Private Route Legados/Sistemas
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';

// Páginas do Portal Público
import PortalHome from '../pages/portal/PortalHome';
import PortalLogin from '../pages/portal/PortalLogin';
import PortalRecuperarSenha from '../pages/portal/PortalRecuperarSenha';
import PortalCriarSenha from '../pages/portal/PortalCriarSenha';
import PortalCriarConta from '../pages/portal/PortalCriarConta';
import PortalConfirmacaoCadastro from '../pages/portal/PortalConfirmacaoCadastro';
import PortalEmailMock from '../pages/portal/PortalEmailMock';

// Páginas Principais do Backoffice Legado
import Dashboard from '../pages/Dashboard';
import DashboardAnalytics from '../pages/DashboardAnalytics';
import GestaoUsuarios from '../pages/GestaoUsuarios';
import CadastroUsuario from '../pages/CadastroUsuario';
import GestaoAtracoes from '../pages/GestaoAtracoes';
import CadastroAtracao from '../pages/CadastroAtracao';
import TotaisAtracao from '../pages/TotaisAtracao';
import GestaoIngressos from '../pages/GestaoIngressos';
import GestaoPacotes from '../pages/GestaoPacotes';
import ValidacaoIngressos from '../pages/ValidacaoIngressos';
import ControleTransferencias from '../pages/ControleTransferencias';
import GestaoFluxoEntrada from '../pages/GestaoFluxoEntrada';
import ConfiguracoesComerciais from '../pages/ConfiguracoesComerciais';
import GestaoContratos from '../pages/GestaoContratos';
import GestaoAgentes from '../pages/GestaoAgentes';
import GestaoCupons from '../pages/GestaoCupons';
import GestaoRelatoriosFinanceiros from '../pages/GestaoRelatoriosFinanceiros';
import PesquisarIngresso from '../pages/PesquisarIngresso';
import CentralNotificacoes from '../pages/CentralNotificacoes';
import CMSHomeCuradoria from '../pages/CMSHomeCuradoria';
import CMSInstitucional from '../pages/CMSInstitucional';
import GestaoAgencias from '../pages/GestaoAgencias';
import CadastroAgencia from '../pages/CadastroAgencia';
import GestaoParceiros from '../pages/GestaoParceiros';
import CadastroParceiro from '../pages/CadastroParceiro';
import OperacaoComercial from '../pages/OperacaoComercial';
import ComISSIONAMENTO from '../pages/Comissionamento';
import FilaReembolsos from '../pages/FilaReembolsos';
import Perfil from '../pages/Perfil';
import CadastroContrato from '../pages/CadastroContrato';
import CadastroAgente from '../pages/CadastroAgente';
import PainelAntiCambista from '../pages/PainelAntiCambista';
import RelatoriosAtracao from '../pages/RelatoriosAtracao';
import VisualizadorWireframes from '../pages/VisualizadorWireframes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === ROTAS DE AUTENTICAÇÃO === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* === FASE 5: OPERAÇÃO DE ACESSO MOBILE === */}
        <Route path="/access" element={<AccessScanner />} />

        {/* === ROTAS DO PARTICIPANTE (CARRINHO, CHECKOUT E CARTEIRA DIGITAL) === */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/ticket-transfer" element={<TicketTransfer />} />
          <Route path="/refund-request" element={<RefundRequest />} />

          {/* === ROTAS PROTEGIDAS DO BACKOFFICE MODERNO (FASE 2, 4 & 5) === */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="checkin" element={<CheckinDashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="events" element={<EventsList />} />
            <Route path="tickets" element={<TicketsList />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="payments" element={<PaymentsList />} />
            <Route path="refunds" element={<RefundsList />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
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
            <Route path="/financeiro/comissionamento" element={<ComISSIONAMENTO />} />
            <Route path="/financeiro/reembolsos" element={<FilaReembolsos />} />

            <Route path="/atendimento/pesquisar" element={<PesquisarIngresso />} />
            <Route path="/notificacoes" element={<CentralNotificacoes />} />

            <Route path="/cms/home" element={<CMSHomeCuradoria />} />
            <Route path="/cms/institucional" element={<CMSInstitucional />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
