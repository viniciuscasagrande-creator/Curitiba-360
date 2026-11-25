// src/components/Layout.jsx
import { useContext, useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { platformSyncService } from '../services/platformSyncService';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [openGroup, setOpenGroup] = useState('comercial');
  const [activeRole, setActiveRole] = useState(() => platformSyncService.getActiveRole());

  useEffect(() => {
    return platformSyncService.subscribe(() => {
      setActiveRole(platformSyncService.getActiveRole());
    });
  }, []);

  const handleRoleChange = (newRole) => {
    platformSyncService.setActiveRole(newRole);
    setActiveRole(newRole);
  };

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
      label: 'Dashboard Principal',
      path: '/dashboard',
      icon: '📊'
    },
    {
      id: 'site-cwb-360',
      label: 'Portal Público CWB 360 (/site)',
      path: '/site',
      icon: '🌐'
    },
    {
      id: 'enterprise-admin',
      label: 'Painel Enterprise (Admin 360)',
      path: '/admin',
      icon: '🚀'
    },
    {
      id: 'superapp-turista',
      label: 'SuperApp Cidadão & Turista',
      path: '/home',
      icon: '🌆'
    },
    {
      id: 'wireframes-gallery',
      label: 'Galeria de Telas & Wireframes',
      icon: '🖼️',
      items: [
        { label: 'Galeria 71 Telas Oficiais', path: '/telas' },
        { label: 'Visualizador de Wireframes', path: '/wireframes' }
      ]
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
        { label: 'Executivo Comercial 360', path: '/comercial' },
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
      label: 'Parceiros, Agências & Agentes',
      icon: '🤝',
      items: [
        { label: 'Gestão de Agências', path: '/agencias' },
        { label: 'Nova Agência', path: '/agencias/novo' },
        { label: 'Dashboard de Agentes (MOD-06)', path: '/agentes' },
        { label: 'CRM de Agentes', path: '/agentes/crm' },
        { label: 'Funil & Oportunidades', path: '/agentes/funil' },
        { label: 'Metas & Ranking', path: '/agentes/ranking' },
        { label: 'Copiloto IA Comercial', path: '/agentes/copiloto' },
        { label: 'Omnichannel & Chat', path: '/agentes/omnichannel' },
        { label: 'Performance 360 Agente', path: '/agentes/performance-360' },
        { label: 'Gestão de Parceiros', path: '/parceiros' },
        { label: 'Novo Parceiro', path: '/parceiros/novo' }
      ]
    },
    {
      id: 'eventos-mod07',
      label: 'Gestão de Eventos 360 (MOD-07)',
      icon: '🎟️',
      items: [
        { label: 'Lista de Eventos 360', path: '/eventos-360' },
        { label: 'Novo Evento', path: '/eventos/novo' },
        { label: 'Performance & BI de Eventos', path: '/eventos/performance' }
      ]
    },
    {
      id: 'mobile-mod08',
      label: 'Ecossistema Mobile (MOD-08)',
      icon: '📱',
      items: [
        { label: 'Hub Mobile Consolidado', path: '/mobile/app' },
        { label: 'App do Produtor', path: '/mobile/produtor' },
        { label: 'App da Equipe / Staff', path: '/mobile/staff' },
        { label: 'Check-in Offline & Scanner', path: '/checkin' },
        { label: 'Comunicação & Push', path: '/communication' },
        { label: 'Monitoramento Real-Time', path: '/monitoring' },
        { label: 'Segurança & Biometria', path: '/security' },
        { label: 'Relatórios Mobile', path: '/reports' }
      ]
    },
    {
      id: 'vendas',
      label: 'Vendas, Financeiro & Atendimento',
      icon: '🛒',
      items: [
        { label: 'Centro Financeiro 360', path: '/financeiro/centro-financeiro-360' },
        { label: 'Operação Comercial', path: '/comercial/vendas' },
        { label: 'Comissionamento', path: '/financeiro/comissionamento' },
        { label: 'Fila de Reembolsos', path: '/financeiro/reembolsos' },
        { label: 'Fila Financeira (MOD-05)', path: '/financeiro/fila-financeira' },
        { label: 'Pesquisar Ingresso', path: '/atendimento/pesquisar' },
        { label: 'Validação / Catraca', path: '/validacao' },
        { label: 'Scanner Mobile', path: '/access' }
      ]
    },
    {
      id: 'plataformas-mod09-26',
      label: 'Plataformas Avançadas (MOD 09-26)',
      icon: '⚡',
      items: [
        { label: 'API Docs & Webhooks (MOD-09)', path: '/api-docs' },
        { label: 'Developer Portal & Sandbox', path: '/developer/portal' },
        { label: 'Hub de Integrações CRM/ERP', path: '/integracoes' },
        { label: 'Arquitetura Enterprise (MOD-10)', path: '/enterprise' },
        { label: 'Central de IA & Fraude (MOD-11)', path: '/ai/hub' },
        { label: 'Multi-Tenant & SaaS (MOD-12)', path: '/tenant' },
        { label: 'Omnichannel & Loyalty (MOD-13)', path: '/omnichannel/participant' },
        { label: 'Smart Venue NOC & IoT (MOD-14)', path: '/smartvenue/noc' },
        { label: 'BI & Decision Center (MOD-15)', path: '/bi' },
        { label: 'Governança & Compliance (MOD-16)', path: '/governance' },
        { label: 'CRM 360 Sales Hub (MOD-18)', path: '/crm360' },
        { label: 'Marketing Growth Hub (MOD-19)', path: '/marketing' },
        { label: 'Patrocínios & Cotas (MOD-20)', path: '/sponsorship' },
        { label: 'Marketplace B2B (MOD-21)', path: '/b2b' },
        { label: 'Smart Destination Tourism (MOD-22)', path: '/tourism' },
        { label: 'Smart City & Licenciamento (MOD-23)', path: '/smartcity' },
        { label: 'ESG & Carbono (MOD-24)', path: '/esg' },
        { label: 'Agentes Autônomos IA (MOD-25)', path: '/aiagents' },
        { label: 'Global & Fiscal (MOD-26)', path: '/global' }
      ]
    },
    {
      id: 'seguranca',
      label: 'Segurança & Notificações',
      icon: '🛡️',
      items: [
        { label: 'Painel Anti-Cambista', path: '/comercial/anti-cambista' },
        { label: 'Controle de Transferências', path: '/controle-transferencias' },
        { label: 'Fluxo de Entrada', path: '/fluxo-entrada' },
        { label: 'Central de Notificações', path: '/notificacoes-backoffice' }
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
      label: 'Relatórios & Analytics',
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
        { label: 'Pass Curitiba 360', path: '/pass' },
        { label: 'Carteira Digital', path: '/wallet' },
        { label: 'Assistente IA Concierge', path: '/ai' },
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
        width: '285px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        flexShrink: 0 
      }}>
        
        {/* Perfil Header + Seletor RBAC Multi-Perfil */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f0f2f5', flexShrink: 0 }}>
          <div 
            onClick={() => navigate('/perfil-admin')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', marginBottom: '0.75rem' }}
          >
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#718096', fontSize: '1.15rem' }}>👤</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0, color: '#1e293b' }}>
                {user ? (user.displayName || user.name) : 'João da Silva'}
              </h2>
              <p style={{ fontSize: '0.7rem', color: '#059669', fontWeight: '700', margin: 0 }}>
                Perfil: {activeRole}
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '0.45rem 0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '3px' }}>
              🔐 Alternar Visão RBAC:
            </label>
            <select
              value={activeRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '3px 6px', fontSize: '0.75rem', fontWeight: '700', color: '#0f172a', backgroundColor: 'white', cursor: 'pointer' }}
            >
              <option value="ADMINISTRADOR">👑 Administrador 360</option>
              <option value="PARCEIRO">🏛️ Parceiro / Atração</option>
              <option value="AGENCIA">🏨 Hotel / Agência B2B</option>
              <option value="AGENTE">💼 Agente Comercial</option>
              <option value="PORTARIA">📷 Operador de Catraca</option>
            </select>
          </div>
        </div>

        {/* Menu Principal */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {menuGroups.map(group => {
            if (group.path) {
              const isActive = location.pathname === group.path;
              return (
                <Link
                  key={group.id}
                  to={group.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 1rem', borderRadius: '8px',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    color: isActive ? '#1d4ed8' : '#4b5563',
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '0.85rem', textDecoration: 'none',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{group.icon}</span>
                  <span>{group.label}</span>
                </Link>
              );
            }

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
                    fontSize: '0.85rem', fontWeight: '600', textAlign: 'left',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingLeft: '2.25rem', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
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
      <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', height: '100vh', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <Outlet />
      </main>

    </div>
  );
}
