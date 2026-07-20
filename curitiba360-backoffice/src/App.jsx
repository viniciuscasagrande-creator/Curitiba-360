// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';

import GestaoUsuarios from './pages/GestaoUsuarios';
import NovoUsuario from './pages/NovoUsuario';

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
          <Route path="/usuarios/novo" element={<NovoUsuario />} />
          {/* Adicionaremos as outras rotas aqui conforme o documento */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
