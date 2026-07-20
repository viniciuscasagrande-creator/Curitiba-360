// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Importação das páginas que construímos
import Dashboard from './pages/Dashboard';
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
import DashboardAnalytics from './pages/DashboardAnalytics';
import Layout from './components/Layout';

// Página de Login (Criaremos a seguir se desejar)
const Login = () => <div style={{ padding: '2rem' }}><h1>Tela de Login Simples</h1></div>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota Pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Privadas (Protegidas) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<DashboardAnalytics />} />
            
            <Route path="/atracoes" element={<GestaoAtracoes />} />
            <Route path="/atracoes/nova" element={<CadastroAtracao />} />
            <Route path="/atracoes/:id/totais" element={<TotaisAtracao />} />
            <Route path="/atracoes/:id/ingressos" element={<GestaoIngressos />} />
            <Route path="/atracoes/:id/cupons" element={<GestaoCupons />} />
            
            <Route path="/pacotes" element={<GestaoPacotes />} />
            <Route path="/validacao" element={<ValidacaoIngressos />} />
            <Route path="/controle-transferencias" element={<ControleTransferencias />} />
            <Route path="/fluxo-entrada" element={<GestaoFluxoEntrada />} />
            
            <Route path="/comercial/configuracoes" element={<ConfiguracoesComerciais />} />
            <Route path="/comercial/contratos" element={<GestaoContratos />} />
            <Route path="/comercial/agentes" element={<GestaoAgentes />} />
            <Route path="/financeiro/relatorios" element={<GestaoRelatoriosFinanceiros />} />
            
            <Route path="/atendimento/pesquisar" element={<PesquisarIngresso />} />
            <Route path="/notificacoes" element={<CentralNotificacoes />} />
            
            <Route path="/cms/home" element={<CMSHomeCuradoria />} />
            <Route path="/cms/institucional" element={<CMSInstitucional />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
