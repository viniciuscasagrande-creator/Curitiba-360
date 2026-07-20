// src/components/Layout.jsx
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Lista de rotas do menu lateral administrativo
  const menuItems = [
    { id: 'dashboard', icon: '🗃️', label: 'Dashboard', path: '/dashboard' },
    { id: 'usuarios', icon: '👥', label: 'Gestão de Usuários', path: '/usuarios' },
    { id: 'contratos', icon: '📅', label: 'Gestão de Contratos', path: '/comercial/contratos' },
    { id: 'condicoes', icon: '📋', label: 'Condições Comerciais', path: '/comercial/configuracoes' },
    { id: 'atracoes', icon: '📦', label: 'Gestão de Atrações', path: '/atracoes' },
    { id: 'relatorios', icon: '📊', label: 'Relatórios Financeiros', path: '/financeiro/relatorios' },
    { id: 'pacotes', icon: '🎫', label: 'Gestão de Pacotes', path: '/pacotes' },
    { id: 'agentes', icon: '🤝', label: 'Gestão de Agentes', path: '/comercial/agentes' },
    { id: 'pesquisar', icon: '🔎', label: 'Pesquisar Ingresso', path: '/atendimento/pesquisar' },
    { id: 'fluxo', icon: '🚧', label: 'Fluxo de Entrada', path: '/fluxo-entrada' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', color: '#374151' }}>
      
      {/* ================= BARRA LATERAL (SIDEBAR) ================= */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'sticky', 
        top: 0, 
        height: '100vh' 
      }}>
        
        {/* Perfil do Usuário */}
        <div style={{ padding: '2rem 1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ccc', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <span style={{ color: '#9ca3af', fontSize: '2rem' }}>👤</span>
          </div>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#111827' }}>João da Silva</h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Administrador</p>
        </div>

        {/* Navegação Principal */}
        <nav style={{ flex: 1, padding: '0 1rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      backgroundColor: isActive ? '#f3f4f6' : 'transparent', 
                      border: 'none', 
                      borderRadius: '8px', 
                      textAlign: 'left', 
                      fontWeight: isActive ? 'bold' : 'normal', 
                      color: isActive ? '#111827' : '#4b5563', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Navegação Inferior */}
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <span>⚙️</span> Configurações
          </button>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem' }}
          >
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* ================= ÁREA DE CONTEÚDO PRINCIPAL ================= */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>
        {/* O <Outlet /> é substituído pelo componente da rota ativa */}
        <Outlet />
      </main>

    </div>
  );
}
