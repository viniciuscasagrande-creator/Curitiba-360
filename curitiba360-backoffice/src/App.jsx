// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';

// Componentes temporários (vamos criar arquivos para eles depois)
function Dashboard() { return <h2>Página: Dashboard (RF-003)</h2>; }
function GestaoUsuarios() { return <h2>Página: Gestão de Usuários (RF-006)</h2>; }

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
          {/* Adicionaremos as outras rotas aqui conforme o documento */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
