// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';

import GestaoUsuarios from './pages/GestaoUsuarios';
import CadastroUsuario from './pages/CadastroUsuario';
import GestaoParceiros from './pages/GestaoParceiros';

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
          {/* Adicionaremos as outras rotas aqui conforme o documento */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
