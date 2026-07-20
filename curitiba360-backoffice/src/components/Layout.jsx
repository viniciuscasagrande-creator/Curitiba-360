// src/components/Layout.jsx
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Button from './ui/Button';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Lista de rotas do menu lateral administrativo
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { id: 'usuarios', icon: '👥', label: 'Gestão de Usuários', path: '/usuarios' },
    { id: 'contratos', icon: '📜', label: 'Gestão de Contratos', path: '/comercial/contratos' },
    { id: 'condicoes', icon: '⚙️', label: 'Condições Comerciais', path: '/comercial/configuracoes' },
    { id: 'atracoes', icon: '🎟️', label: 'Gestão de Atrações', path: '/atracoes' },
    { id: 'relatorios', icon: '📈', label: 'Relatórios Financeiros', path: '/financeiro/relatorios' },
    { id: 'pacotes', icon: '🎁', label: 'Gestão de Pacotes', path: '/pacotes' },
    { id: 'agentes', icon: '🤝', label: 'Gestão de Agentes', path: '/comercial/agentes' },
    { id: 'pesquisar', icon: '🔍', label: 'Pesquisar Ingresso', path: '/atendimento/pesquisar' },
    { id: 'fluxo', icon: '🚧', label: 'Fluxo de Entrada', path: '/fluxo-entrada' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Inter", sans-serif', color: '#0f172a' }}>
      
      {/* ================= BARRA LATERAL (SIDEBAR) PREMIUM ================= */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#0f172a', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'sticky', 
        top: 0, 
        height: '100vh',
        boxShadow: '4px 0 24px rgba(15, 23, 42, 0.15)',
        zIndex: 10
      }}>
        
        {/* Logo/Cabeçalho da Sidebar */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem', backgroundColor: '#10b981', padding: '0.4rem 0.6rem', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>C360</span>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>Curitiba 360</h2>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Backoffice V1.2</p>
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#334155' }}>
              <span style={{ fontSize: '1.5rem' }}>👨‍💼</span>
            </div>
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', border: '2px solid #0f172a' }}></span>
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#f8fafc', margin: '0 0 0.15rem 0' }}>João da Silva</h3>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '12px' }}>
              Administrador
            </span>
          </div>
        </div>

        {/* Navegação Principal */}
        <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {menuItems.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.06)' : 'transparent', 
                      borderRadius: '8px', 
                      fontWeight: isActive ? '600' : 'normal', 
                      color: isActive ? '#f8fafc' : '#94a3b8', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      borderLeft: isActive ? '3px solid #10b981' : '3px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#f8fafc';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.125rem' }}>{item.icon}</span> {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Navegação Inferior (Logout) */}
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #1e293b' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              borderRadius: '8px',
              textAlign: 'center', 
              color: '#f87171', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.5rem', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* ================= ÁREA DE CONTEÚDO PRINCIPAL COM CABEÇALHO SUPERIOR ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* Cabecalho Superior (Top Nav) */}
        <header style={{ 
          height: '70px', 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e2e8f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 3rem',
          flexShrink: 0
        }}>
          {/* Breadcrumbs / Nome da Rota */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
            <span>Portal Backoffice</span>
            <span>/</span>
            <strong style={{ color: '#0f172a', fontWeight: '600' }}>
              {menuItems.find(item => location.pathname.startsWith(item.path))?.label || 'Início'}
            </strong>
          </div>

          {/* Ações Rápidas Direita */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Seletor de Idioma */}
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
              <span style={{ cursor: 'pointer', opacity: '1' }}>🇧🇷 PT</span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ cursor: 'pointer', opacity: '0.4' }}>🇺🇸 EN</span>
            </div>
            
            {/* Ícone Notificações */}
            <button style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', position: 'relative' }}>
              🔔
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
            </button>

            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />

            {/* Link de Ajuda */}
            <a href="#" style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600', textDecoration: 'none' }}>
              Suporte 💬
            </a>
          </div>
        </header>

        {/* Área onde as telas filhas são injetadas (Scrollable) */}
        <main style={{ flex: 1, padding: '3rem', overflowY: 'auto', boxSizing: 'border-box' }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
