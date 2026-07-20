// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Páginas Públicas
import Login from './pages/Login';

// Páginas do Portal Público (Nativo/Nova Coleção)
import PortalHome from './pages/portal/PortalHome';
import PortalLogin from './pages/portal/PortalLogin';
import PortalRecuperarSenha from './pages/portal/PortalRecuperarSenha';
import PortalCriarSenha from './pages/portal/PortalCriarSenha';
import PortalCriarConta from './pages/portal/PortalCriarConta';
import PortalConfirmacaoCadastro from './pages/portal/PortalConfirmacaoCadastro';
import PortalEmailMock from './pages/portal/PortalEmailMock';

// Páginas Privadas
import Dashboard from './pages/Dashboard';
import DashboardAnalytics from './pages/DashboardAnalytics';
import GestaoUsuarios from './pages/GestaoUsuarios';
import CadastroUsuario from './pages/CadastroUsuario';
import GestaoAtracoes from './pages/GestaoAtracoes';
import CadastroAtracao from './pages/CadastroAtracao';
import TotaisAtracao from './pages/TotaisAtracao';
import GestaoIngressos from './pages/GestaoIngressos';
import GestaoPacotes from './pages/GestaoPacotes';
import ValidacaoIngressos from './pages/ValidacaoIngressos';
import ControleTransferencias from './pages/ControleTransferencias';
import GestaoFluxoEntrada from './pages/GestaoFluxoEntrada';
import ConfiguracoesComerciais from './pages/ConfiguracoesComerciais';
import GestaoContratos from './pages/GestaoContratos';
import GestaoAgentes from './pages/GestaoAgentes';
import GestaoCupons from './pages/GestaoCupons';
import GestaoRelatoriosFinanceiros from './pages/GestaoRelatoriosFinanceiros';
import PesquisarIngresso from './pages/PesquisarIngresso';
import CentralNotificacoes from './pages/CentralNotificacoes';
import CMSHomeCuradoria from './pages/CMSHomeCuradoria';
import CMSInstitucional from './pages/CMSInstitucional';

// Novas Páginas Comercial & Financeiro
import GestaoAgencias from './pages/GestaoAgencias';
import CadastroAgencia from './pages/CadastroAgencia';
import GestaoParceiros from './pages/GestaoParceiros';
import CadastroParceiro from './pages/CadastroParceiro';
import OperacaoComercial from './pages/OperacaoComercial';
import Comissionamento from './pages/Comissionamento';
import FilaReembolsos from './pages/FilaReembolsos';

// Páginas de Wireframes Adicionais
import Perfil from './pages/Perfil';
import CadastroContrato from './pages/CadastroContrato';
import CadastroAgente from './pages/CadastroAgente';
import PainelAntiCambista from './pages/PainelAntiCambista';
import RelatoriosAtracao from './pages/RelatoriosAtracao';
import VisualizadorWireframes from './pages/VisualizadorWireframes';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas do Backoffice */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas Públicas do Portal */}
          <Route path="/portal" element={<PortalHome />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/recuperar-senha" element={<PortalRecuperarSenha />} />
          <Route path="/portal/criar-senha" element={<PortalCriarSenha />} />
          <Route path="/portal/criar-conta" element={<PortalCriarConta />} />
          <Route path="/portal/confirmacao-cadastro" element={<PortalConfirmacaoCadastro />} />
          <Route path="/portal/email-recuperar-senha" element={<PortalEmailMock />} />
          <Route path="/portal/email-confirmacao" element={<PortalEmailMock />} />
          
          {/* Rota semi-pública */}
          <Route path="/validacao" element={<ValidacaoIngressos />} />

          {/* === ROTAS PROTEGIDAS (Exigem Login) === */}
          <Route element={<PrivateRoute />}>
            
            {/* O Layout contém o Menu Lateral e renderiza os filhos no <Outlet /> */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/analytics" element={<DashboardAnalytics />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/wireframes" element={<VisualizadorWireframes />} />
              
              {/* Usuários */}
              <Route path="/usuarios" element={<GestaoUsuarios />} />
              <Route path="/usuarios/novo" element={<CadastroUsuario />} />
              
              {/* Agências */}
              <Route path="/agencias" element={<GestaoAgencias />} />
              <Route path="/agencias/novo" element={<CadastroAgencia />} />
              
              {/* Parceiros */}
              <Route path="/parceiros" element={<GestaoParceiros />} />
              <Route path="/parceiros/novo" element={<CadastroParceiro />} />
              
              {/* Atrações */}
              <Route path="/atracoes" element={<GestaoAtracoes />} />
              <Route path="/atracoes/nova" element={<CadastroAtracao />} />
              <Route path="/atracoes/:id/totais" element={<TotaisAtracao />} />
              <Route path="/atracoes/:id/ingressos" element={<GestaoIngressos />} />
              <Route path="/atracoes/:id/cupons" element={<GestaoCupons />} />
              <Route path="/atracoes/:id/relatorios" element={<RelatoriosAtracao />} />
              
              {/* Pacotes & Operações */}
              <Route path="/pacotes" element={<GestaoPacotes />} />
              <Route path="/controle-transferencias" element={<ControleTransferencias />} />
              <Route path="/fluxo-entrada" element={<GestaoFluxoEntrada />} />
              
              {/* Comercial & Contratos */}
              <Route path="/comercial/configuracoes" element={<ConfiguracoesComerciais />} />
              <Route path="/comercial/contratos" element={<GestaoContratos />} />
              <Route path="/comercial/contratos/novo" element={<CadastroContrato />} />
              <Route path="/comercial/agentes" element={<GestaoAgentes />} />
              <Route path="/comercial/agentes/novo" element={<CadastroAgente />} />
              <Route path="/comercial/anti-cambista" element={<PainelAntiCambista />} />
              <Route path="/comercial/vendas" element={<OperacaoComercial />} />
              
              {/* Financeiro */}
              <Route path="/financeiro/relatorios" element={<GestaoRelatoriosFinanceiros />} />
              <Route path="/financeiro/comissionamento" element={<Comissionamento />} />
              <Route path="/financeiro/reembolsos" element={<FilaReembolsos />} />
              
              {/* Atendimento & Notificações */}
              <Route path="/atendimento/pesquisar" element={<PesquisarIngresso />} />
              <Route path="/notificacoes" element={<CentralNotificacoes />} />
              
              {/* CMS */}
              <Route path="/cms/home" element={<CMSHomeCuradoria />} />
              <Route path="/cms/institucional" element={<CMSInstitucional />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
