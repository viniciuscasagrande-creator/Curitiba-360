// src/components/Layout.jsx
import { useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="5" x="2" y="3" rx="1"/>
          <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
          <line x1="10" x2="14" y1="12" y2="12"/>
        </svg>
      )
    },
    {
      id: 'usuarios',
      label: 'Gestão de Usuários',
      path: '/usuarios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      id: 'contratos',
      label: 'Gestão de Contratos',
      path: '/comercial/contratos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      )
    },
    {
      id: 'condicoes',
      label: 'Condições Comerciais',
      path: '/comercial/configuracoes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        </svg>
      )
    },
    {
      id: 'atracoes',
      label: 'Gestão de Atrações',
      path: '/atracoes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" x2="12" y1="22.08" y2="12"/>
        </svg>
      )
    },
    {
      id: 'relatorios',
      label: 'Relatórios Financeiros',
      path: '/financeiro/relatorios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <line x1="9" x2="9" y1="17" y2="9"/>
          <line x1="13" x2="13" y1="17" y2="13"/>
          <line x1="17" x2="17" y1="17" y2="7"/>
          <line x1="5" x2="19" y1="17" y2="17"/>
        </svg>
      )
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', color: '#374151' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }}>
        
        {/* Perfil */}
        <div 
          onClick={() => navigate('/perfil')}
          style={{ padding: '2rem 1.5rem 1.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #f0f2f5', flexShrink: 0, cursor: 'pointer' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#718096', fontSize: '1.25rem' }}>👤</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0, color: '#374151' }}>
              {user ? user.name : 'João da Silva'}
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#718096', margin: 0 }}>
              {user ? user.role : 'Administrador'}
            </p>
          </div>
        </div>

        {/* Menu Principal */}
        <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {menuItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    style={{ 
                      width: '100%', padding: '0.75rem 1rem', 
                      backgroundColor: isActive ? '#f0f2f6' : 'transparent', 
                      border: 'none', borderRadius: '8px', textAlign: 'left', 
                      fontWeight: isActive ? '600' : '400', 
                      color: isActive ? '#374151' : '#718096', 
                      display: 'flex', alignItems: 'center', gap: '1rem', 
                      textDecoration: 'none', fontSize: '0.875rem',
                      boxSizing: 'border-box',
                      transition: 'background-color 0.2s, color 0.2s'
                    }}
                  >
                    <span style={{ color: isActive ? '#4a5568' : '#a0aec0', display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span> 
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Menu Inferior */}
        <div style={{ padding: '1rem', borderTop: '1px solid #f0f2f5', flexShrink: 0 }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem' }}
          >
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', height: '100vh', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <Outlet />
      </main>
    </div>
  );
}