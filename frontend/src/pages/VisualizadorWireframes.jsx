// src/pages/VisualizadorWireframes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { screens } from '../data/screens';
import TouristPortal360Modal from '../modules/sitePublico/components/TouristPortal360Modal';

export default function VisualizadorWireframes() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [modalImagem, setModalImagem] = useState(null);
  const [abaVisualizador, setAbaVisualizador] = useState('backoffice'); // backoffice, portal-desktop, portal-mobile
  const [touristModalOpen, setTouristModalOpen] = useState(false);
  const [touristModalTab, setTouristModalTab] = useState('ingressos');

  const handleOpenLivePortalWf = (wf) => {
    const code = (wf.code || '').toUpperCase();
    if (code.includes('004')) {
      setTouristModalTab('autocadastro');
      setTouristModalOpen(true);
    } else if (code.includes('014')) {
      setTouristModalTab('ingressos');
      setTouristModalOpen(true);
    } else if (code.includes('015')) {
      setTouristModalTab('conta');
      setTouristModalOpen(true);
    } else if (code.includes('016')) {
      setTouristModalTab('reembolso');
      setTouristModalOpen(true);
    } else if (code.includes('021')) {
      setTouristModalTab('favoritos');
      setTouristModalOpen(true);
    } else if (code.includes('022')) {
      setTouristModalTab('transferir');
      setTouristModalOpen(true);
    } else {
      navigate('/site');
    }
  };

  const ROUTE_BY_WF_ID = {
    'WF-001': '/login',
    'WF-002': '/dashboard',
    'WF-003': '/atracoes/1/totais',
    'WF-004': '/perfil-admin',
    'WF-005': '/usuarios',
    'WF-006': '/usuarios/novo',
    'WF-007': '/comercial/contratos',
    'WF-008': '/comercial/contratos/novo',
    'WF-009': '/comercial/configuracoes',
    'WF-010': '/comercial/configuracoes',
    'WF-011': '/comercial/configuracoes',
    'WF-012': '/atracoes',
    'WF-013': '/atracoes/nova',
    'WF-014': '/atracoes/nova',
    'WF-015': '/atracoes/nova',
    'WF-016': '/atracoes/1/ingressos',
    'WF-017': '/atendimento/pesquisar',
    'WF-018': '/atendimento/pesquisar',
    'WF-019': '/atracoes/1/ingressos',
    'WF-020': '/atracoes/1/ingressos',
    'WF-021': '/atracoes/1/cupons',
    'WF-022': '/atracoes/1/cupons',
    'WF-023': '/atracoes/1/cupons',
    'WF-024': '/atracoes/1/cupons',
    'WF-025': '/analytics',
    'WF-048': '/agencias',
    'WF-049': '/agencias/novo',
    'WF-050': '/comercial/agentes',
    'WF-051': '/comercial/vendas',
    'WF-052': '/financeiro/comissionamento',
    'WF-053': '/financeiro/reembolsos',
    'WF-054': '/cms/institucional',
    'WF-055': '/cms/home',
    'WF-056': '/notificacoes-backoffice',
    'WF-057': '/dashboard',
    'WF-058': '/parceiros',
    'WF-059': '/parceiros/novo',
    'WF-060': '/comercial/anti-cambista',
    'WF-061': '/pacotes',
    'WF-062': '/pacotes',
    'WF-063': '/financeiro/relatorios',
    'WF-064': '/comercial/agentes/novo'
  };

  // 1. Backoffice Wireframes (71 referências oficiais com caminhos de imagem 100% válidos e tela clonada viva em /tela/:slug)
  const backofficeWireframes = screens.map((s) => ({
    code: s.id,
    name: s.title,
    slug: s.slug,
    route: `/tela/${s.slug}`,
    legacyRoute: ROUTE_BY_WF_ID[s.id] || '/atracoes/1/relatorios',
    img: s.image
  }));

  // 2. Public Portal - Desktop Wireframes
  const portalDesktopWireframes = [
    { code: 'WF-001', name: 'Portal - Tela de login', route: '/portal/login', img: '/wireframes/WF-001 - Tela de login.png' },
    { code: 'WF-001A', name: 'Portal - Recuperar Senha', route: '/portal/recuperar-senha', img: '/wireframes/WF-001A - Recuperar Senha.png' },
    { code: 'WF-001B', name: 'Portal - Email Recuperar Senha', route: '/portal/email-recuperar-senha', img: '/wireframes/WF-001B - Email Recuperar Senha.png' },
    { code: 'WF-001C', name: 'Portal - Criar Nova Senha', route: '/portal/criar-senha', img: '/wireframes/WF-001C - Recuperar Senha Criar senha.png' },
    { code: 'WF-002', name: 'Portal - Página Inicial', route: '/portal', img: '/wireframes/WF-002 - Página Inicial.png' },
    { code: 'WF-002B', name: 'Portal - Página Inicial dropdown perfil', route: '/portal', img: '/wireframes/WF-002B - Página Inicial dropdown perfil.png' },
    { code: 'WF-003', name: 'Portal - Criar conta', route: '/portal/criar-conta', img: '/wireframes/WF-003- Criar conta.png' },
    { code: 'WF-003A', name: 'Portal - Email Confirmação de Cadastro', route: '/portal/email-confirmacao', img: '/wireframes/WF-003A - Email Confirmação de Cadastro.png' },
    { code: 'WF-003B', name: 'Portal - Confirmação de Cadastro', route: '/portal/confirmacao-cadastro', img: '/wireframes/WF-003B - Confirmação de Cadastro.png' },
    { code: 'WF-004', name: 'Portal - Cadastro de Parceiro Comercial', route: '/portal', img: '/wireframes/WF-004 - Cadastro de Parceiro Comercial.png' },
    { code: 'WF-004A', name: 'Portal - Cadastro de Agência', route: '/portal', img: '/wireframes/WF-004A - Cadastro de Agência.png' },
    { code: 'WF-004A-C', name: 'Portal - Auto-cadastro Agência - Conclusão', route: '/portal', img: '/wireframes/WF-004A - Auto-cadastro Agência — Conclusão.png' },
    { code: 'WF-004B-E1', name: 'Portal - Auto-cadastro Parceiro - Etapa 1', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 1 (Dados da Empresa).png' },
    { code: 'WF-004B-E2', name: 'Portal - Auto-cadastro Parceiro - Etapa 2', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 2 (Dados do Responsável).png' },
    { code: 'WF-004B-E3', name: 'Portal - Auto-cadastro Parceiro - Etapa 3', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Etapa 3 (Documentos e Informações Complementares).png' },
    { code: 'WF-004B-C', name: 'Portal - Auto-cadastro Parceiro - Conclusão', route: '/portal', img: '/wireframes/WF-004B - Auto-cadastro Parceiro Comercial — Conclusão (Solicitação enviada).png' },
    { code: 'WF-005', name: 'Portal - Resultados da Pesquisa', route: '/portal', img: '/wireframes/WF-005 - Resultados da Pesquisa.png' },
    { code: 'WF-006', name: 'Portal - Pacotes de atrações', route: '/portal', img: '/wireframes/WF-006 - Pacotes de atrações.png' },
    { code: 'WF-007', name: 'Portal - Conhecendo Curitiba', route: '/portal', img: '/wireframes/WF-007 - Conhecendo Curitiba.png' },
    { code: 'WF-008', name: 'Portal - Detalhes da Atração', route: '/portal', img: '/wireframes/WF-008 - Detalhes da Atração.png' },
    { code: 'WF-0080C', name: 'Portal - Detalhes da Atração exibir imagem', route: '/portal', img: '/wireframes/WF-0080C - Detalhes da Atração exibir imagem.png' },
    { code: 'WF-008A', name: 'Portal - Detalhes da Atração adicionado ao carrinho', route: '/portal', img: '/wireframes/WF-008A - Detalhes da Atração adicionado ao carrinho.png' },
    { code: 'WF-008B', name: 'Portal - Detalhes da Atração pedido de login', route: '/portal', img: '/wireframes/WF-008B - Detalhes da Atração pedido de login.png' },
    { code: 'WF-008D', name: 'Portal - Detalhes da Atração exibir imagem galeria', route: '/portal', img: '/wireframes/WF-008D - Detalhes da Atração exibir imagem galeria.png' },
    { code: 'WF-010', name: 'Portal - Carrinho de Compras', route: '/portal', img: '/wireframes/WF-010 - Carrinho.png' },
    { code: 'WF-011', name: 'Portal - Pedido (Checkout)', route: '/portal', img: '/wireframes/WF-011 - Pedido.png' },
    { code: 'WF-012', name: 'Portal - Pagamento Cartão', route: '/portal', img: '/wireframes/WF-012 - Pagamento Cartão.png' },
    { code: 'WF-012A', name: 'Portal - Pagamento Google Pay', route: '/portal', img: '/wireframes/WF-012A - Pagamento Google Pay.png' },
    { code: 'WF-012B', name: 'Portal - Pagamento Pix', route: '/portal', img: '/wireframes/WF-012B - Pagamento Pix.png' },
    { code: 'WF-013', name: 'Portal - Pagamento Confirmado', route: '/portal', img: '/wireframes/WF-013 - Pagamento Confirmado.png' },
    { code: 'WF-013A', name: 'Portal - Email Pagamento Confirmado', route: '/portal/email-confirmacao', img: '/wireframes/WF-013A - Email Pagamento Confirmado.png' },
    { code: 'WF-014', name: 'Portal - Meus ingressos', route: '/portal', img: '/wireframes/WF-014 - Meus ingressos.png' },
    { code: 'WF-014A', name: 'Portal - Meus ingressos resumo do pedido', route: '/portal', img: '/wireframes/WF-014A - Meus ingressos resumo do pedido.png' },
    { code: 'WF-014B', name: 'Portal - Meus ingressos ver no mapa', route: '/portal', img: '/wireframes/WF-014B - Meus ingressos ver no mapa.png' },
    { code: 'WF-015', name: 'Portal - Configurações dados pessoais', route: '/portal', img: '/wireframes/WF-015 - Configurações dados pessoais.png' },
    { code: 'WF-015A', name: 'Portal - Configurações notificações', route: '/portal', img: '/wireframes/WF-015A - Configurações notificações.png' },
    { code: 'WF-015B', name: 'Portal - Configurações Cartões Salvos', route: '/portal', img: '/wireframes/WF-015B - Configurações Cartões Salvos.png' },
    { code: 'WF-015C', name: 'Portal - Notificações (Inbox)', route: '/portal', img: '/wireframes/WF-015C - Notificações.png' },
    { code: 'WF-016', name: 'Portal - Solicitação de Reembolso', route: '/portal', img: '/wireframes/WF-016 - Solicitação de Reembolso.png' },
    { code: 'WF-016A', name: 'Portal - Email Confirmação de Reembolso', route: '/portal', img: '/wireframes/WF-016A - Email Confirmacao de Reembolso.png' },
    { code: 'WF-016B', name: 'Portal - E-mail de Rejeição de Reembolso', route: '/portal', img: '/wireframes/WF-016B - E-mail de Rejeição de Reembolso.png' },
    { code: 'WF-017', name: 'Portal - Política de Privacidade', route: '/portal', img: '/wireframes/WF-017 - Política de Privacidade.png' },
    { code: 'WF-018', name: 'Portal - Condições de uso do site', route: '/portal', img: '/wireframes/WF-018 - Condições de uso do site.png' },
    { code: 'WF-019', name: 'Portal - FAQ - Perguntas frequentes', route: '/portal', img: '/wireframes/WF-019 - FAQ - Perguntas frequentes.png' },
    { code: 'WF-020', name: 'Portal - Sobre Nós', route: '/portal', img: '/wireframes/WF-020 - Sobre Nós.png' },
    { code: 'WF-021-V', name: 'Portal - Meus Favoritos — Estado Vazio', route: '/portal', img: '/wireframes/WF-021 - Meus Favoritos — Estado Vazio.png' },
    { code: 'WF-021', name: 'Portal - Meus Favoritos', route: '/portal', img: '/wireframes/WF-021 - Meus Favoritos.png' },
    { code: 'WF-022-S1', name: 'Portal - Transferência de Ingresso — Estado 1', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 1.png' },
    { code: 'WF-022-S2', name: 'Portal - Transferência de Ingresso — Estado 2', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 2.png' },
    { code: 'WF-022-S3', name: 'Portal - Transferência de Ingresso — Estado 3', route: '/portal', img: '/wireframes/WF-022 - Transferência de Ingresso — Estado 3.png' }
  ];

  // 3. Public Portal - Smartphone (Mobile) Wireframes
  const portalMobileWireframes = [
    { code: 'MWF-001', name: 'Mobile - Tela de login', route: '/portal/login', img: '/wireframes/Mobile WF-001 - Tela de login.png' },
    { code: 'MWF-001A', name: 'Mobile - Recuperar Senha', route: '/portal/recuperar-senha', img: '/wireframes/Mobile WF-001A - Recuperar Senha.png' },
    { code: 'MWF-001B', name: 'Mobile - Email Recuperar Senha', route: '/portal/email-recuperar-senha', img: '/wireframes/Mobile WF-001B - Email Recuperar Senha.png' },
    { code: 'MWF-001C', name: 'Mobile - Criar Nova Senha', route: '/portal/criar-senha', img: '/wireframes/Mobile WF-001C - Recuperar Senha Criar senha.png' },
    { code: 'MWF-002', name: 'Mobile - Página Inicial', route: '/portal', img: '/wireframes/Mobile WF-002 - Página Inicial.png' },
    { code: 'MWF-003', name: 'Mobile - Criar conta', route: '/portal/criar-conta', img: '/wireframes/Mobile WF-003- Criar conta.png' },
    { code: 'MWF-003A', name: 'Mobile - Email Confirmação de Cadastro', route: '/portal/email-confirmacao', img: '/wireframes/Mobile WF-003A - Email Confirmação de Cadastro.png' },
    { code: 'MWF-003B', name: 'Mobile - Confirmação de Cadastro', route: '/portal/confirmacao-cadastro', img: '/wireframes/Mobile WF-003B - Confirmação de Cadastro.png' },
    { code: 'MWF-004', name: 'Mobile - Cadastro de Parceiro', route: '/portal', img: '/wireframes/Mobile WF-004 - Cadastro de Parceiro Comercial.png' },
    { code: 'MWF-005', name: 'Mobile - Resultados da Pesquisa', route: '/portal', img: '/wireframes/Mobile WF-005 - Resultados da Pesquisa.png' },
    { code: 'MWF-007', name: 'Mobile - Conhecendo Curitiba', route: '/portal', img: '/wireframes/Mobile WF-007 - Conhecendo Curitiba.png' },
    { code: 'MWF-008', name: 'Mobile - Detalhes da Atração', route: '/portal', img: '/wireframes/Mobile WF-008 - Detalhes da Atração.png' },
    { code: 'MWF-0080C', name: 'Mobile - Detalhes da Atração exibir imagem', route: '/portal', img: '/wireframes/Mobile WF-0080C - Detalhes da Atração exibir imagem.png' },
    { code: 'MWF-008B', name: 'Mobile - Detalhes da Atração pedido de login', route: '/portal', img: '/wireframes/Mobile WF-008B - Detalhes da Atração pedido de login.png' },
    { code: 'MWF-008D', name: 'Mobile - Detalhes da Atração exibir imagem galeria', route: '/portal', img: '/wireframes/Mobile WF-008D - Detalhes da Atração exibir imagem galeria.png' },
    { code: 'MWF-010', name: 'Mobile - Carrinho', route: '/portal', img: '/wireframes/Mobile WF-010 - Carrinho.png' },
    { code: 'MWF-011', name: 'Mobile - Pedido', route: '/portal', img: '/wireframes/Mobile WF-011 - Pedido.png' },
    { code: 'MWF-012', name: 'Mobile - Pagamento Cartão', route: '/portal', img: '/wireframes/Mobile WF-012 - Pagamento Cartão.png' },
    { code: 'MWF-012A', name: 'Mobile - Pagamento Google Pay', route: '/portal', img: '/wireframes/Mobile WF-012A - Pagamento Google Pay.png' },
    { code: 'MWF-012B', name: 'Mobile - Pagamento Pix', route: '/portal', img: '/wireframes/Mobile WF-012B - Pagamento Pix.png' },
    { code: 'MWF-013', name: 'Mobile - Pagamento Confirmado', route: '/portal', img: '/wireframes/Mobile WF-013 - Pagamento Confirmado.png' },
    { code: 'MWF-013A', name: 'Mobile - Email Pagamento Confirmado', route: '/portal/email-confirmacao', img: '/wireframes/Mobile WF-013A - Pagamento Confirmado.png' },
    { code: 'MWF-014', name: 'Mobile - Meus ingressos', route: '/portal', img: '/wireframes/Mobile WF-014 - Meus ingressos.png' },
    { code: 'MWF-014A', name: 'Mobile - Meus ingressos resumo do pedido', route: '/portal', img: '/wireframes/Mobile WF-014A - Meus ingressos resumo do pedido.png' },
    { code: 'MWF-014B', name: 'Mobile - Meus ingressos ver no mapa', route: '/portal', img: '/wireframes/Mobile WF-014B - Meus ingressos ver no mapa.png' },
    { code: 'MWF-015', name: 'Mobile - Configurações dados pessoais', route: '/portal', img: '/wireframes/Mobile WF-015 - Configurações dados pessoais.png' },
    { code: 'MWF-015A', name: 'Mobile - Configurações notificações', route: '/portal', img: '/wireframes/Mobile WF-015A - Configurações notificações.png' },
    { code: 'MWF-015B', name: 'Mobile - Configurações Cartões Salvos', route: '/portal', img: '/wireframes/Mobile WF-015B - Configurações Cartões Salvos.png' },
    { code: 'MWF-015C', name: 'Mobile - Notificações (Inbox)', route: '/portal', img: '/wireframes/Mobile WF-015C - Notificações.png' },
    { code: 'MWF-016', name: 'Mobile - Solicitação de Reembolso', route: '/portal', img: '/wireframes/Mobile WF-016 - Solicitação de Reembolso.png' },
    { code: 'MWF-016A', name: 'Mobile - Email Confirmação de Reembolso', route: '/portal', img: '/wireframes/Mobile WF-016A - Email Confirmacao de Reembolso.png' },
    { code: 'MWF-017', name: 'Mobile - Política de Privacidade', route: '/portal', img: '/wireframes/Mobile WF-017 - Política de Privacidade.png' },
    { code: 'MWF-018', name: 'Mobile - Condições de uso do site', route: '/portal', img: '/wireframes/Mobile WF-018 - Condições de uso do site.png' },
    { code: 'MWF-019', name: 'Mobile - FAQ - Perguntas frequentes', route: '/portal', img: '/wireframes/Mobile WF-019 - FAQ - Perguntas frequentes.png' },
    { code: 'MWF-020', name: 'Mobile - Sobre Nós', route: '/portal', img: '/wireframes/Mobile WF-020 - Sobre Nós.png' }
  ];

  // Get active array based on tab
  const getActiveArray = () => {
    if (abaVisualizador === 'portal-desktop') return portalDesktopWireframes;
    if (abaVisualizador === 'portal-mobile') return portalMobileWireframes;
    return backofficeWireframes;
  };

  const wireframesAtivos = getActiveArray();

  const filtrados = wireframesAtivos.filter(wf => 
    wf.code.toLowerCase().includes(busca.toLowerCase()) || 
    wf.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Navegador de Wireframes & Validação</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Visualize todas as telas e mockups do projeto e acesse diretamente as rotas live correspondentes.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => { setAbaVisualizador('backoffice'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'backoffice' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'backoffice' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          💼 Backoffice (Admin - 71 Telas)
        </button>
        <button
          onClick={() => { setAbaVisualizador('portal-desktop'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'portal-desktop' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'portal-desktop' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          🖥️ Portal Público (Desktop - 50 Telas)
        </button>
        <button
          onClick={() => { setAbaVisualizador('portal-mobile'); setBusca(''); }}
          style={{
            padding: '0.5rem 1.25rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
            backgroundColor: abaVisualizador === 'portal-mobile' ? '#3b82f6' : 'transparent',
            color: abaVisualizador === 'portal-mobile' ? 'white' : '#4b5563',
            fontWeight: 'bold', fontSize: '0.875rem', transition: 'all 0.2s'
          }}
        >
          📱 Portal Público (Smartphone - 35 Telas)
        </button>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Buscar por código (ex: WF-005) ou nome do wireframe..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }}
        />
      </div>

      {/* Grid de Wireframes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filtrados.map((wf) => (
          <div key={wf.code + '-' + wf.name} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6', backgroundColor: '#eff6ff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                {wf.code}
              </span>
              <button 
                onClick={() => setModalImagem(wf)}
                style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                👁️ Ampliar
              </button>
            </div>

            <div
              onClick={() => setModalImagem(wf)}
              style={{ height: '150px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', cursor: 'pointer' }}
            >
              <img src={wf.img} alt={wf.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>

            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#1f2937' }}>{wf.name}</h3>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rota: {wf.route}</span>
            </div>

            <button 
              onClick={() => abaVisualizador === 'backoffice' ? navigate(wf.route) : handleOpenLivePortalWf(wf)}
              style={{ width: '100%', padding: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8125rem' }}
            >
              🔗 {abaVisualizador === 'backoffice' ? 'Abrir Tela Viva Clonada' : 'Abrir Tela Viva do Portal'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal de visualização do Wireframe PNG */}
      {modalImagem && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000 }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', maxWidth: '90%', maxHeight: '90%', display: 'flex', flexDirection: 'column', gap: '1rem', width: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>{modalImagem.code} - {modalImagem.name}</h3>
              <button onClick={() => setModalImagem(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>
            <div style={{ overflow: 'auto', flex: 1, backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
              <img src={modalImagem.img} alt={modalImagem.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                onClick={() => setModalImagem(null)}
                style={{ padding: '0.5rem 1.5rem', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
              >
                Fechar
              </button>
              <button 
                onClick={() => {
                  setModalImagem(null);
                  navigate(modalImagem.route);
                }}
                style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Acessar Rota Live
              </button>
            </div>
          </div>
        </div>
      )}

      <TouristPortal360Modal
        isOpen={touristModalOpen}
        onClose={() => setTouristModalOpen(false)}
        initialTab={touristModalTab}
      />
    </div>
  );
}
