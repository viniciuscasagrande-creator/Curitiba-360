// src/components/Layout.jsx
import { useContext, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // State to track expanded menu section in sidebar
  const [openGroup, setOpenGroup] = useState('portal'); // Default open 'portal' group

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleGroup = (groupId) => {
    setOpenGroup(openGroup === groupId ? null : groupId);
  };

  const menuGroups = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊'
    },
    {
      id: 'usuarios',
      label: 'Gestão de Usuários',
      path: '/usuarios',
      icon: '👥'
    },
    {
      id: 'comercial',
      label: 'Comercial & Contratos',
      icon: '📝',
      items: [
        { label: 'Gestão de Contratos', path: '/comercial/contratos' },
        { label: 'Novo Contrato', path: '/comercial/contratos/novo' },
        { label: 'Condições Comerciais', path: '/comercial/configuracoes' }
      ]
    },
    {
      id: 'atracoes',
      label: 'Atrações & Pacotes',
      icon: '🌲',
      items: [
        { label: 'Gestão de Atrações', path: '/atracoes' },
        { label: 'Nova Atração', path: '/atracoes/nova' },
        { label: 'Gestão de Pacotes', path: '/pacotes' },
        { label: 'Totais da Atração', path: '/atracoes/1/totais' },
        { label: 'Lotes de Ingressos', path: '/atracoes/1/ingressos' },
        { label: 'Cupons de Desconto', path: '/atracoes/1/cupons' },
        { label: 'Relatórios da Atração', path: '/atracoes/1/relatorios' }
      ]
    },
    {
      id: 'parceiros',
      label: 'Parceiros & Agências',
      icon: '🤝',
      items: [
        { label: 'Gestão de Agências', path: '/agencias' },
        { label: 'Nova Agência', path: '/agencias/novo' },
        { label: 'Gestão de Agentes', path: '/comercial/agentes' },
        { label: 'Novo Agente', path: '/comercial/agentes/novo' },
        { label: 'Gestão de Parceiros', path: '/parceiros' },
        { label: 'Novo Parceiro', path: '/parceiros/novo' }
      ]
    },
    {
      id: 'vendas',
      label: 'Vendas & Atendimento',
      icon: '🛒',
      items: [
        { label: 'Operação Comercial', path: '/comercial/vendas' },
        { label: 'Comissionamento', path: '/financeiro/comissionamento' },
        { label: 'Fila de Reembolsos', path: '/financeiro/reembolsos' },
        { label: 'Pesquisar Ingresso', path: '/atendimento/pesquisar' },
        { label: 'Validação / Catraca', path: '/validacao' }
      ]
    },
    {
      id: 'seguranca',
      label: 'Segurança & Notificações',
      icon: '🛡️',
      items: [
        { label: 'Painel Anti-Cambista', path: '/comercial/anti-cambista' },
        { label: 'Central de Notificações', path: '/notificacoes' }
      ]
    },
    {
      id: 'cms',
      label: 'CMS Conteúdo',
      icon: '🌐',
      items: [
        { label: 'CMS Banners Home', path: '/cms/home' },
        { label: 'CMS Institucional', path: '/cms/institucional' }
      ]
    },
    {
      id: 'financeiro',
      label: 'Relatórios Financeiros',
      icon: '📈',
      items: [
        { label: 'Relatórios Globais', path: '/financeiro/relatorios' },
        { label: 'Analytics', path: '/analytics' }
      ]
    },
    {
      id: 'portal',
      label: 'Portal Público (Turista)',
      icon: '✨',
      items: [
        { label: 'Vitrine Principal', path: '/portal' },
        { label: 'Login do Turista', path: '/portal/login' },
        { label: 'Criar Conta Turista', path: '/portal/criar-conta' },
        { label: 'Esqueci a Senha', path: '/portal/recuperar-senha' },
        { label: 'E-mail Mock: Senha', path: '/portal/email-recuperar-senha' },
        { label: 'E-mail Mock: Cadastro', path: '/portal/email-confirmacao' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', color: '#374151' }}>
      
      {/* SIDEBAR */}
      <aside style={{ 
        width: '270px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        flexShrink: 0 
      }}>
        
        {/* Perfil Header */}
        <div 
          onClick={() => navigate('/perfil')}
          style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #f0f2f5', flexShrink: 0, cursor: 'pointer' }}
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
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {menuGroups.map(group => {
            if (group.path) {
              // Direct single link
              const isActive = location.pathname === group.path;
              return (
                <Link
                  key={group.id}
                  to={group.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: '8px',
                    backgroundColor: isActive ? '#f0f2f6' : 'transparent',
                    color: isActive ? '#1f2937' : '#4b5563',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '0.875rem', textDecoration: 'none',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{group.icon}</span>
                  <span>{group.label}</span>
                </Link>
              );
            }

            // Expandable menu group
            const isOpen = openGroup === group.id;
            const hasActiveChild = group.items?.some(sub => location.pathname.startsWith(sub.path));

            return (
              <div key={group.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  style={{
                    width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: 'none',
                    backgroundColor: hasActiveChild || isOpen ? '#eff6ff' : 'transparent',
                    color: hasActiveChild || isOpen ? '#1d4ed8' : '#4b5563',
                    fontSize: '0.875rem', fontWeight: '600', textAlign: 'left',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', boxSizing: 'border-box', transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{group.icon}</span>
                    {group.label}
                  </span>
                  <span style={{ fontSize: '0.7rem' }}>{isOpen ? '▼' : '▶'}</span>
                </button>

                {isOpen && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingLeft: '2.5rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                    {group.items.map((subItem, idx) => {
                      const isSubActive = location.pathname === subItem.path;
                      return (
                        <Link
                          key={idx}
                          to={subItem.path}
                          style={{
                            display: 'block', padding: '0.35rem 0.5rem', fontSize: '0.8rem',
                            color: isSubActive ? '#1d4ed8' : '#64748b',
                            fontWeight: isSubActive ? 'bold' : 'normal',
                            textDecoration: 'none', textAlign: 'left',
                            borderRadius: '6px', backgroundColor: isSubActive ? '#e0e7ff' : 'transparent',
                            transition: 'color 0.1s'
                          }}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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