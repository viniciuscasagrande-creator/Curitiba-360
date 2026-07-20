// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Importação do Layout Base
import Layout from './components/Layout';

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
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas (Não possuem o Menu Lateral) */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Privadas (Protegidas) */}
          <Route element={<PrivateRoute />}>
            {/* Validação de Ingressos geralmente fica em um tablet na portaria, 
                então faz sentido não ter o menu administrativo completo */}
            <Route path="/validacao" element={<ValidacaoIngressos />} />

            {/* Rotas Privadas (Envolvidas pelo Layout com o Menu Lateral) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Se você quiser usar o Dashboard com os cards (Dashboard.jsx) ou o Analytics (DashboardAnalytics.jsx) */}
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/analytics" element={<DashboardAnalytics />} />
              
              <Route path="/atracoes" element={<GestaoAtracoes />} />
              <Route path="/atracoes/nova" element={<CadastroAtracao />} />
              <Route path="/atracoes/:id/totais" element={<TotaisAtracao />} />
              <Route path="/atracoes/:id/ingressos" element={<GestaoIngressos />} />
              <Route path="/atracoes/:id/cupons" element={<GestaoCupons />} />
              
              <Route path="/pacotes" element={<GestaoPacotes />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
