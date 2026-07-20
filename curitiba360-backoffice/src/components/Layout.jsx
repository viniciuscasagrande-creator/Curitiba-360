// src/components/Layout.jsx
import { useContext, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [navAberto, setNavAberto] = useState(false);

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

      {/* BOTÃO FLUTUANTE DO NAVEGADOR DE TELAS */}
      <button 
        onClick={() => setNavAberto(!navAberto)}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          backgroundColor: '#3b82f6', color: 'white',
          border: 'none', borderRadius: '50px',
          padding: '0.75rem 1.5rem', fontWeight: 'bold',
          boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
          cursor: 'pointer', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: 'transform 0.2s'
        }}
      >
        <span>📂</span> Mapa de Telas (Acesso Rápido)
      </button>

      {/* DRAWER DO MAPA DE TELAS */}
      {navAberto && (
        <div style={{
          position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh',
          backgroundColor: 'white', boxShadow: '-10px 0 25px rgba(0,0,0,0.1)',
          zIndex: 9998, padding: '2rem', overflowY: 'auto', boxSizing: 'border-box',
          borderLeft: '1px solid #e5e7eb', fontFamily: 'sans-serif', textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f0f2f5', paddingBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Mapa de Telas</h3>
            <button onClick={() => setNavAberto(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af' }}>&times;</button>
          </div>

          {/* LINK DESTACADO PARA O COMPARADOR DE WIREFRAMES */}
          <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1d4ed8', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Comparador de Telas</span>
            <Link 
              to="/wireframes" 
              onClick={() => setNavAberto(false)} 
              style={{ textDecoration: 'none', color: '#1e40af', fontWeight: 'bold', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              🔎 Abrir Visualizador das 64 Telas →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Administrativo (Sidebar)</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/dashboard" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Dashboard (WF-002)</Link></li>
                <li><Link to="/usuarios" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Usuários (WF-005)</Link></li>
                <li><Link to="/usuarios/novo" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Adicionar Usuário (WF-006)</Link></li>
                <li><Link to="/comercial/contratos" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Contratos (WF-007)</Link></li>
                <li><Link to="/comercial/contratos/novo" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Adicionar Contrato (WF-008)</Link></li>
                <li><Link to="/comercial/configuracoes" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Condições Comerciais (WF-009/10/11)</Link></li>
                <li><Link to="/atracoes" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Atrações (WF-012)</Link></li>
                <li><Link to="/financeiro/relatorios" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Relatórios Financeiros (WF-063)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Parceiros & Agências</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/agencias" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Agências (WF-048)</Link></li>
                <li><Link to="/agencias/novo" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Cadastro de Agência (WF-049)</Link></li>
                <li><Link to="/comercial/agentes" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Agentes (WF-050)</Link></li>
                <li><Link to="/comercial/agentes/novo" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Cadastro de Agente (WF-064)</Link></li>
                <li><Link to="/parceiros" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Parceiros (WF-058)</Link></li>
                <li><Link to="/parceiros/novo" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Cadastro de Parceiro (WF-059)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. Vendas & Atendimento</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/comercial/vendas" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Operação Comercial (WF-051)</Link></li>
                <li><Link to="/financeiro/comissionamento" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Comissionamento Agências (WF-052)</Link></li>
                <li><Link to="/financeiro/reembolsos" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Fila de Reembolsos (WF-053)</Link></li>
                <li><Link to="/atendimento/pesquisar" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Pesquisar Ingresso (WF-017/18)</Link></li>
                <li><Link to="/validacao" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Tela de Catraca / Validação</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>4. Segurança & Notificações</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/comercial/anti-cambista" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Painel Anti-Cambista (WF-060)</Link></li>
                <li><Link to="/notificacoes" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Central de Notificações (WF-056)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>5. CMS e Pacotes</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/cms/institucional" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 CMS Institucional (WF-054)</Link></li>
                <li><Link to="/cms/home" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 CMS Banners (WF-055)</Link></li>
                <li><Link to="/pacotes" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Gestão de Pacotes (WF-061/62)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>6. Detalhes de Atração (Jaime Lerner)</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/atracoes/1/totais" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Totais da Atração (WF-003)</Link></li>
                <li><Link to="/atracoes/1/ingressos" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Lotes de Ingressos (WF-019/20)</Link></li>
                <li><Link to="/atracoes/1/cupons" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Cupons de Desconto (WF-021/22/23/24)</Link></li>
                <li><Link to="/atracoes/1/relatorios" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Relatórios & Negociação (WF-028 a WF-047)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>7. Perfil</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/perfil" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Perfil de Usuário (WF-004)</Link></li>
              </ul>
            </div>

            {/* Categoria */}
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>8. Portal Público</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.50rem' }}>
                <li><Link to="/portal" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Home Portal (WF-PUB-002A-F)</Link></li>
                <li><Link to="/portal/login" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Login Portal (WF-PUB-001)</Link></li>
                <li><Link to="/portal/recuperar-senha" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Esqueci Senha (WF-PUB-001A)</Link></li>
                <li><Link to="/portal/criar-senha" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Criar Nova Senha (WF-PUB-001C)</Link></li>
                <li><Link to="/portal/criar-conta" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Criar Conta (WF-PUB-003A-B)</Link></li>
                <li><Link to="/portal/confirmacao-cadastro" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 Confirmação Cadastro (WF-PUB-003C)</Link></li>
                <li><Link to="/portal/email-recuperar-senha" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 E-mail Mock: Recuperar Senha (WF-PUB-001B)</Link></li>
                <li><Link to="/portal/email-confirmacao" onClick={() => setNavAberto(false)} style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>📄 E-mail Mock: Confirmação Cadastro (WF-PUB-003D)</Link></li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}