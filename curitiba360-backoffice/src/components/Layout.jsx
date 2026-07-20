// src/components/Layout.jsx
import { useContext } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // Define os itens de menu e as rotas correspondentes
  const menuItems = [
    { rota: '/dashboard', icone: '🗃️', label: 'Dashboard' },
    { rota: '/atracoes', icone: '📦', label: 'Gestão de Atrações' },
    { rota: '/pacotes', icone: '🎒', label: 'Gestão de Pacotes' },
    { rota: '/validacao', icone: '🎟️', label: 'Validação Ingressos' },
    { rota: '/controle-transferencias', icone: '🔄', label: 'Anti-Cambista' },
    { rota: '/fluxo-entrada', icone: '🚦', label: 'Fluxo de Entrada' },
    { rota: '/comercial/contratos', icone: '📅', label: 'Gestão de Contratos' },
    { rota: '/comercial/agentes', icone: '👥', label: 'Gestão de Agentes' },
    { rota: '/comercial/configuracoes', icone: '📋', label: 'Condições Comerciais' },
    { rota: '/financeiro/relatorios', icone: '📊', label: 'Relatórios Financeiros' },
    { rota: '/atendimento/pesquisar', icone: '🔍', label: 'Pesquisar Ingresso' },
    { rota: '/notificacoes', icone: '🔔', label: 'Notificações' },
    { rota: '/cms/institucional', icone: '📝', label: 'CMS Institucional' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', color: '#374151' }}>
      
      {/* ================= BARRA LATERAL (SIDEBAR) ================= */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        
        {/* Perfil do Usuário */}
        <div style={{ padding: '1.5rem 1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #3b82f6', margin: '0 auto 0.75rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eff6ff', overflow: 'hidden' }}>
            <span style={{ fontSize: '1.5rem' }}>👨‍💻</span>
          </div>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#111827' }}>
            {user ? user.name : 'Visitante'}
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
            {user ? user.role : 'Aguardando Login'}
          </p>
        </div>

        {/* Navegação Principal */}
        <nav style={{ flex: 1, padding: '0 0.75rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {menuItems.map((item) => {
              const ativo = location.pathname === item.rota;
              return (
                <li key={item.rota}>
                  <Link 
                    to={item.rota} 
                    style={{ 
                      width: '100%', 
                      padding: '0.6rem 0.75rem', 
                      backgroundColor: ativo ? '#eff6ff' : 'transparent', 
                      border: 'none', 
                      borderRadius: '8px', 
                      textAlign: 'left', 
                      fontWeight: ativo ? 'bold' : 'normal', 
                      color: ativo ? '#1d4ed8' : '#4b5563', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>{item.icone}</span> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Navegação Inferior */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
          <button 
            onClick={handleSignOut} 
            style={{ 
              width: '100%', 
              padding: '0.6rem 0.75rem', 
              backgroundColor: 'transparent', 
              border: 'none', 
              textAlign: 'left', 
              color: '#ef4444', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}
          >
            <span>🚪</span> Sair da Conta
          </button>
        </div>
      </aside>

      {/* ================= ÁREA PRINCIPAL ================= */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        <Outlet />
      </main>

    </div>
  );
}
