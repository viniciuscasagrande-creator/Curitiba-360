// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';

import GestaoUsuarios from './pages/GestaoUsuarios';
import CadastroUsuario from './pages/CadastroUsuario';
import GestaoAgencias from './pages/GestaoAgencias';
import CadastroAgencia from './pages/CadastroAgencia';
import GestaoParceiros from './pages/GestaoParceiros';
import CadastroParceiro from './pages/CadastroParceiro';
import OperacaoComercial from './pages/OperacaoComercial';
import Comissionamento from './pages/Comissionamento';
import FilaReembolsos from './pages/FilaReembolsos';
import CMSInstitucional from './pages/CMSInstitucional';
import CMSHomeCuradoria from './pages/CMSHomeCuradoria';
import CentralNotificacoes from './pages/CentralNotificacoes';
import GestaoAtracoes from './pages/GestaoAtracoes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas Privadas (Protegidas pelo Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<GestaoUsuarios />} />
          <Route path="/usuarios/novo" element={<CadastroUsuario />} />
          <Route path="/parceiros" element={<GestaoParceiros />} />
          <Route path="/parceiros/novo" element={<CadastroParceiro />} />
          <Route path="/agencias" element={<GestaoAgencias />} />
          <Route path="/agencias/novo" element={<CadastroAgencia />} />
          <Route path="/configuracoes" element={<OperacaoComercial />} />
          <Route path="/comissionamento" element={<Comissionamento />} />
          <Route path="/reembolsos" element={<FilaReembolsos />} />
          <Route path="/conteudo" element={<CMSInstitucional />} />
          <Route path="/conteudo/curadoria" element={<CMSHomeCuradoria />} />
          <Route path="/notificacoes" element={<CentralNotificacoes />} />
          <Route path="/atracoes" element={<GestaoAtracoes />} />
          {/* Adicionaremos as outras rotas aqui conforme o documento */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
