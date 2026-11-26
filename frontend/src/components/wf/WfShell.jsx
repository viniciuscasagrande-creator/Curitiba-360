// frontend/src/components/wf/WfShell.jsx
// Shell oficial clonado dos 71 wireframes (WF-001 a WF-064) com <Link> nativos (à prova de Google Translate) e logos oficiais do Curitiba 360°
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, FileText, ClipboardList, Box, BarChart3,
  Settings, LogOut, MapPin, Tag, Search, Ticket, PieChart,
  Edit3, Building2, DollarSign, QrCode, ChevronDown, ChevronRight,
  Bell, Globe, ShieldAlert, RefreshCw, Eye, Layers, Briefcase
} from 'lucide-react';
import { screens } from '../../data/screens';
import { backofficeStore } from '../../services/backofficeStore';

export const OFFICIAL_LOGO = '/logos/official_emblem_logo.png';
export const OFFICIAL_HORIZONTAL_LOGO = '/logos/official_curitiba360_horizontal.png';

export function WfTopReferenceBar({ currentScreen, showOverlay, setShowOverlay }) {
  const navigate = useNavigate();
  const idx = screens.findIndex((s) => s.slug === currentScreen?.slug);
  const prev = screens[idx - 1];
  const next = screens[idx + 1];

  return (
    <div
      className="notranslate"
      translate="no"
      style={{
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        padding: '8px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        fontSize: '12px',
        borderBottom: '1px solid #334155',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <img src={OFFICIAL_LOGO} alt="Curitiba 360°" style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#fff', padding: 2 }} />
        <span style={{ backgroundColor: '#3b82f6', color: '#fff', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
          {currentScreen?.id || 'WF'}
        </span>
        <strong style={{ color: '#fff', fontSize: '13px' }}>{currentScreen?.title}</strong>
        <span style={{ color: '#34d399', fontWeight: 600 }}>• Menus & Submenus 100% Ativos</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <select
          value={currentScreen?.slug || ''}
          onChange={(e) => navigate(`/tela/${e.target.value}`)}
          style={{
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            border: '1px solid #475569',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: '12px',
            maxWidth: 260,
            cursor: 'pointer'
          }}
        >
          {screens.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.id} — {s.title}
            </option>
          ))}
        </select>

        {prev ? (
          <Link
            to={`/tela/${prev.slug}`}
            style={{ backgroundColor: '#334155', color: '#fff', textDecoration: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}
          >
            ← Anterior
          </Link>
        ) : (
          <span style={{ backgroundColor: '#334155', color: '#fff', borderRadius: 6, padding: '4px 10px', opacity: 0.4 }}>← Anterior</span>
        )}

        {next ? (
          <Link
            to={`/tela/${next.slug}`}
            style={{ backgroundColor: '#334155', color: '#fff', textDecoration: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}
          >
            Próxima →
          </Link>
        ) : (
          <span style={{ backgroundColor: '#334155', color: '#fff', borderRadius: 6, padding: '4px 10px', opacity: 0.4 }}>Próxima →</span>
        )}

        <button
          type="button"
          onClick={() => setShowOverlay(!showOverlay)}
          style={{
            backgroundColor: showOverlay ? '#f59e0b' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '4px 10px',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Eye size={13} />
          <span>{showOverlay ? 'Voltar para Tela Viva' : 'Comparar PNG Original'}</span>
        </button>

        <Link
          to="/site"
          style={{ backgroundColor: '#00a896', color: '#fff', textDecoration: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 700 }}
        >
          🌐 Portal Público (/site)
        </Link>
        <Link
          to="/telas"
          style={{ backgroundColor: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}
        >
          Galeria (71)
        </Link>
      </div>
    </div>
  );
}

export function WfSidebar({ mode = 'admin', activeMenu = 'dashboard', attractionName, attractionLocation, userName = 'João da Silva', userRole = 'Administrador' }) {
  const navigate = useNavigate();
  const [store, setStore] = useState(() => backofficeStore.getState());
  const [finOpen, setFinOpen] = useState(true);
  const [relOpen, setRelOpen] = useState(true);
  const [negOpen, setNegOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(true);
  const [atrSubOpen, setAtrSubOpen] = useState(true);
  const [comSubOpen, setComSubOpen] = useState(true);

  useEffect(() => {
    return backofficeStore.subscribe((next) => setStore(next));
  }, []);

  const selectedAttraction = store.attractions?.find((a) => a.id === store.selectedAttractionId) || store.attractions?.[0] || {
    id: 1,
    nome: 'Parque Jaime Lerner',
    local: 'Pilarzinho - Curitiba'
  };

  const displayAttractionLoc = attractionLocation || selectedAttraction.local;

  const handleSelectAttraction = (newId) => {
    backofficeStore.setState((prev) => ({ ...prev, selectedAttractionId: Number(newId) }));
  };

  const handleSwitchMode = (targetMode) => {
    if (targetMode === 'admin') navigate('/tela/wf-002-dashboard');
    else if (targetMode === 'attraction') navigate('/tela/wf-003-detalhes-da-atracao-totais-da-atracao');
    else if (targetMode === 'partner') navigate('/tela/wf-048-gestao-de-agencias-visao-parceiro-comercial');
    else if (targetMode === 'agency') navigate('/tela/wf-051-operacao-comercial');
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#eef1f5' : 'transparent',
    color: isActive ? '#1e293b' : '#475569',
    fontWeight: isActive ? 700 : 500,
    fontSize: '13px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    textDecoration: 'none',
    boxSizing: 'border-box',
    transition: 'background 0.15s'
  });

  const subLinkStyle = (isActive) => ({
    ...linkStyle(isActive),
    padding: '6.5px 10px',
    fontSize: '12px'
  });

  return (
    <aside
      className="notranslate"
      translate="no"
      style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 45px)',
        padding: '20px 12px',
        flexShrink: 0,
        boxSizing: 'border-box'
      }}
    >
      <div>
        {/* TOP LOGO / ATTRACTION BOX */}
        {mode === 'attraction' ? (
          <div style={{ textAlign: 'center', marginBottom: '16px', padding: '0 4px' }}>
            <Link
              to="/tela/wf-003-detalhes-da-atracao-totais-da-atracao"
              style={{
                width: '100%',
                height: '124px',
                borderRadius: '8px',
                border: '1.5px solid #475569',
                backgroundColor: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '8px',
                textDecoration: 'none'
              }}
            >
              <img
                src={OFFICIAL_LOGO}
                alt="Curitiba 360°"
                style={{ width: '88px', height: '88px', objectFit: 'contain' }}
              />
            </Link>
            <select
              value={selectedAttraction.id}
              onChange={(e) => handleSelectAttraction(e.target.value)}
              style={{
                width: '100%',
                padding: '5px 8px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontWeight: 700,
                fontSize: '13px',
                color: '#334155',
                backgroundColor: '#fff',
                marginBottom: '4px',
                cursor: 'pointer'
              }}
            >
              {(store.attractions || []).map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11.5px', color: '#64748b' }}>
              <MapPin size={12} />
              <span>{displayAttractionLoc}</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Link
              to="/tela/wf-004-perfil"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '2px solid #475569',
                backgroundColor: '#f8fafc',
                margin: '0 auto 8px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '5px',
                boxSizing: 'border-box',
                textDecoration: 'none'
              }}
            >
              <img
                src={OFFICIAL_LOGO}
                alt="Logo Curitiba 360°"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Link>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#334155' }}>{userName}</div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>{userRole}</div>
          </div>
        )}

        {/* SELETOR RÁPIDO DE MODO DE VISÃO DO BACKOFFICE */}
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 8px', marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
            Alternar Menu / Perfil WF:
          </label>
          <select
            value={mode}
            onChange={(e) => handleSwitchMode(e.target.value)}
            style={{ width: '100%', padding: '5px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11.5px', fontWeight: 700, color: '#1e293b', backgroundColor: '#fff', cursor: 'pointer' }}
          >
            <option value="admin">👑 Administrador Geral (WF-002..064)</option>
            <option value="attraction">🏛️ Gestão da Atração (WF-003..047)</option>
            <option value="partner">🤝 Visão Parceiro Comercial (WF-048/050)</option>
            <option value="agency">🏨 Visão Agência B2B (WF-051/052/057)</option>
          </select>
        </div>

        {/* MENU DE NAVEGAÇÃO COMPLETO COM <Link> NATIVO */}
        {mode === 'agency' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link to="/tela/wf-051-operacao-comercial" style={linkStyle(activeMenu === 'operacao')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> <span>Operação Comercial</span></span>
            </Link>
            <Link to="/tela/wf-052-comissionamento-agencia" style={linkStyle(activeMenu === 'comissionamento')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><DollarSign size={16} /> <span>Comissionamento e Repasse</span></span>
            </Link>
            <Link to="/tela/wf-050-gestao-de-agentes" style={linkStyle(activeMenu === 'agentes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> <span>Meus Agentes</span></span>
            </Link>
            <Link to="/tela/wf-064-cadastro-de-agente" style={linkStyle(false)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Edit3 size={16} /> <span>+ Cadastrar Novo Agente</span></span>
            </Link>
            <Link to="/tela/wf-057-tela-inicial-por-perfil" style={linkStyle(false)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Briefcase size={16} /> <span>Tela Inicial Agência</span></span>
            </Link>
            <Link to="/tela/wf-002-dashboard" style={linkStyle(false)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> <span>← Voltar ao Dashboard Admin</span></span>
            </Link>
          </nav>
        ) : mode === 'partner' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link to="/tela/wf-048-gestao-de-agencias-visao-parceiro-comercial" style={linkStyle(activeMenu === 'agencias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> <span>Gestão de Agências</span></span>
            </Link>
            <Link to="/tela/wf-050-gestao-de-agentes-visao-parceiro-comercial" style={linkStyle(activeMenu === 'agentes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> <span>Gestão de Agentes</span></span>
            </Link>
            <Link to="/tela/wf-012-gestao-de-atracoes" style={linkStyle(activeMenu === 'atracoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={16} /> <span>Gestão de Atrações</span></span>
            </Link>
            <Link to="/tela/wf-003-detalhes-da-atracao-totais-da-atracao" style={linkStyle(false)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PieChart size={16} /> <span>Detalhes & Relatórios da Atração</span></span>
            </Link>
            <Link to="/tela/wf-063-relatorios-financeiros-globais" style={linkStyle(activeMenu === 'relatorios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> <span>Relatórios Financeiros</span></span>
            </Link>
            <Link to="/tela/wf-060-painel-anti-cambista" style={linkStyle(activeMenu === 'anticambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><RefreshCw size={16} /> <span>Controle de Transferências</span></span>
            </Link>
            <Link to="/tela/wf-056-central-de-notificacoes" style={linkStyle(activeMenu === 'notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={16} /> <span>Notificações</span></span>
            </Link>
            <Link to="/tela/wf-002-dashboard" style={linkStyle(false)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> <span>← Voltar ao Dashboard Admin</span></span>
            </Link>
          </nav>
        ) : mode === 'attraction' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link to="/tela/wf-002-dashboard" style={linkStyle(activeMenu === 'dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> <span>Dashboard</span></span>
            </Link>
            <Link to="/tela/wf-003-detalhes-da-atracao-totais-da-atracao" style={linkStyle(activeMenu === 'totais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> <span>Totais da Atração</span></span>
            </Link>
            <Link to="/tela/wf-016-detalhes-da-atracao-categorias" style={linkStyle(activeMenu === 'categorias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> <span>Categorias</span></span>
            </Link>
            <Link to="/tela/wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador" style={linkStyle(activeMenu === 'pesquisar')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Search size={16} /> <span>Pesquisar Ingresso</span></span>
            </Link>
            <Link to="/tela/wf-019-detalhes-da-atracao-gestao-de-ingresso" style={linkStyle(activeMenu === 'ingressos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Ticket size={16} /> <span>Gestão de Ingresso</span></span>
            </Link>
            <Link to="/tela/wf-021-detalhes-da-atracao-gestao-de-cupons" style={linkStyle(activeMenu === 'cupons')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tag size={16} /> <span>Gestão de Cupons</span></span>
            </Link>
            <Link to="/tela/wf-025-detalhes-da-atracao-graficos-analytics" style={linkStyle(activeMenu === 'analytics')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PieChart size={16} /> <span>Gráficos Analytics</span></span>
            </Link>
            <Link to="/tela/wf-013-gestao-de-atracoes-adicionar-atracao-1" style={linkStyle(activeMenu === 'editar')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Edit3 size={16} /> <span>Editar da Atração</span></span>
            </Link>
            <Link to="/tela/wf-048-gestao-de-agencias" style={linkStyle(activeMenu === 'agencias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> <span>Agências e Agentes</span></span>
            </Link>
            <Link to="/tela/wf-026-detalhes-da-atracao-usuarios" style={linkStyle(activeMenu === 'usuarios-atracao')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> <span>Usuários</span></span>
            </Link>

            {/* Submenu Gestão Financeira da Atração */}
            <div>
              <button type="button" style={linkStyle(activeMenu.startsWith('fin-'))} onClick={() => setFinOpen(!finOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><DollarSign size={16} /> <span>Gestão Financeira</span></span>
                {finOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {finOpen && (
                <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <button type="button" style={subLinkStyle(false)} onClick={() => setRelOpen(!relOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PieChart size={14} /> <span>Relatórios da Atração</span></span>
                    {relOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  {relOpen && (
                    <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {[
                        { key: 'fin-vendas', label: 'Vendas', slug: 'wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas' },
                        { key: 'fin-abandono', label: 'Abandono de Carrinho', slug: 'wf-034-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-abandono-de-carrinho' },
                        { key: 'fin-detalhado', label: 'Ingresso Detalhado', slug: 'wf-036-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-ingresso-detalhado' },
                        { key: 'fin-categorias', label: 'Categorias', slug: 'wf-038-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-categorias' },
                        { key: 'fin-cortesias', label: 'Cortesias Emitidas', slug: 'wf-040-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-cortesias-emitidas' },
                        { key: 'fin-validacoes', label: 'Validação', slug: 'wf-042-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-validacoes' },
                        { key: 'fin-comissoes', label: 'Comissões', slug: 'wf-044-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-comissoes' },
                        { key: 'fin-bordero', label: 'Borderô Resumido', slug: 'wf-046-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido' }
                      ].map((sub) => (
                        <Link
                          key={sub.key}
                          to={`/tela/${sub.slug}`}
                          style={subLinkStyle(activeMenu === sub.key)}
                        >
                          <span>▣ {sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  <button type="button" style={subLinkStyle(false)} onClick={() => setNegOpen(!negOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DollarSign size={14} /> <span>Negociação Financeira</span></span>
                    {negOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  {negOpen && (
                    <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <Link to="/tela/wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais" style={subLinkStyle(activeMenu === 'fin-condicoes')}>
                        <span>▣ Condições Comerciais</span>
                      </Link>
                      <Link to="/tela/wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras" style={subLinkStyle(activeMenu === 'fin-info')}>
                        <span>▣ Informações Financeiras</span>
                      </Link>
                    </div>
                  )}

                  <Link to="/tela/wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas" style={subLinkStyle(activeMenu === 'fin-despesas')}>
                    <span>▣ Resumo das Despesas</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/tela/wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos" style={linkStyle(activeMenu === 'validar')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><QrCode size={16} /> <span>Validar Ingressos</span></span>
            </Link>
          </nav>
        ) : (
          /* MENU ADMINISTRADOR PADRÃO COMPLETO COM <Link> NATIVO */
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link to="/tela/wf-002-dashboard" style={linkStyle(activeMenu === 'dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> <span>Dashboard</span></span>
            </Link>

            <Link to="/tela/wf-005-gestao-de-usuarios" style={linkStyle(activeMenu === 'usuarios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> <span>Gestão de Usuários</span></span>
              <ChevronRight size={13} />
            </Link>

            {/* Grupo Parceiros, Agências, Agentes e Operação B2B */}
            <div>
              <button type="button" style={linkStyle(comSubOpen)} onClick={() => setComSubOpen(!comSubOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> <span>Parceiros, Agências & B2B</span></span>
                {comSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {comSubOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <Link to="/tela/wf-058-gestao-de-parceiros-comerciais" style={subLinkStyle(activeMenu === 'parceiros')}>
                    <span>▣ Parceiros Comerciais (WF-058)</span>
                  </Link>
                  <Link to="/tela/wf-059-cadastro-de-parceiro-comercial" style={subLinkStyle(false)}>
                    <span>▣ + Novo Parceiro (WF-059)</span>
                  </Link>
                  <Link to="/tela/wf-048-gestao-de-agencias" style={subLinkStyle(activeMenu === 'agencias')}>
                    <span>▣ Gestão de Agências (WF-048)</span>
                  </Link>
                  <Link to="/tela/wf-048-gestao-de-agencias-estado-2-pendente-de-aprovacao" style={subLinkStyle(false)}>
                    <span>▣ Agências Pendentes (WF-048)</span>
                  </Link>
                  <Link to="/tela/wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa" style={subLinkStyle(false)}>
                    <span>▣ + Nova Agência 1/3..3/3 (WF-049)</span>
                  </Link>
                  <Link to="/tela/wf-050-gestao-de-agentes" style={subLinkStyle(activeMenu === 'agentes')}>
                    <span>▣ Gestão de Agentes (WF-050)</span>
                  </Link>
                  <Link to="/tela/wf-064-cadastro-de-agente" style={subLinkStyle(false)}>
                    <span>▣ + Novo Agente (WF-064)</span>
                  </Link>
                  <Link to="/tela/wf-051-operacao-comercial" style={subLinkStyle(activeMenu === 'operacao')}>
                    <span>▣ Operação Comercial (WF-051)</span>
                  </Link>
                  <Link to="/tela/wf-052-comissionamento-agencia" style={subLinkStyle(activeMenu === 'comissionamento')}>
                    <span>▣ Comissionamento (WF-052)</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/tela/wf-007-gestao-de-contratos" style={linkStyle(activeMenu === 'contratos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> <span>Gestão de Contratos</span></span>
            </Link>
            <Link to="/tela/wf-009-configuracoes-comerciais" style={linkStyle(activeMenu === 'condicoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ClipboardList size={16} /> <span>Configurações Comerciais</span></span>
            </Link>

            {/* Grupo Gestão de Atrações + Submenus Internos da Atração */}
            <div>
              <button
                type="button"
                style={linkStyle(activeMenu === 'atracoes' || atrSubOpen)}
                onClick={() => setAtrSubOpen(!atrSubOpen)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={16} /> <span>Gestão de Atrações</span></span>
                {atrSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {atrSubOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <Link to="/tela/wf-012-gestao-de-atracoes" style={subLinkStyle(activeMenu === 'atracoes')}>
                    <span>▣ Lista de Atrações (WF-012)</span>
                  </Link>
                  <Link to="/tela/wf-013-gestao-de-atracoes-adicionar-atracao-1" style={subLinkStyle(false)}>
                    <span>▣ + Nova Atração 1/3..3/3 (WF-013)</span>
                  </Link>
                  <Link to="/tela/wf-003-detalhes-da-atracao-totais-da-atracao" style={subLinkStyle(false)}>
                    <span>▣ Totais da Atração (WF-003)</span>
                  </Link>
                  <Link to="/tela/wf-016-detalhes-da-atracao-categorias" style={subLinkStyle(false)}>
                    <span>▣ Categorias da Atração (WF-016)</span>
                  </Link>
                  <Link to="/tela/wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador" style={subLinkStyle(false)}>
                    <span>▣ Pesquisar Ingresso (WF-017/018)</span>
                  </Link>
                  <Link to="/tela/wf-019-detalhes-da-atracao-gestao-de-ingresso" style={subLinkStyle(false)}>
                    <span>▣ Lotes de Ingresso (WF-019/020)</span>
                  </Link>
                  <Link to="/tela/wf-021-detalhes-da-atracao-gestao-de-cupons" style={subLinkStyle(false)}>
                    <span>▣ Gestão de Cupons & QR (WF-021..024)</span>
                  </Link>
                  <Link to="/tela/wf-025-detalhes-da-atracao-graficos-analytics" style={subLinkStyle(false)}>
                    <span>▣ Gráficos Analytics (WF-025)</span>
                  </Link>
                  <Link to="/tela/wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas" style={subLinkStyle(false)}>
                    <span>▣ Despesas & Repasse (WF-030)</span>
                  </Link>
                  <Link to="/tela/wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas" style={subLinkStyle(false)}>
                    <span>▣ Relatórios & PDFs (WF-032..047)</span>
                  </Link>
                  <Link to="/tela/wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos" style={subLinkStyle(false)}>
                    <span>▣ Validar Ingressos QR (WF-031)</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/tela/wf-061-gestao-de-pacotes-de-ingressos" style={linkStyle(activeMenu === 'pacotes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Layers size={16} /> <span>Gestão de Pacotes</span></span>
            </Link>
            <Link to="/tela/wf-053-fila-de-reembolsos" style={linkStyle(activeMenu === 'reembolsos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> <span>Fila de Reembolsos</span></span>
            </Link>
            <Link to="/tela/wf-063-relatorios-financeiros-globais" style={linkStyle(activeMenu === 'relatorios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> <span>Relatórios Financeiros</span></span>
            </Link>
            <Link to="/tela/wf-060-painel-anti-cambista" style={linkStyle(activeMenu === 'anticambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ShieldAlert size={16} /> <span>Controle de Transferências</span></span>
            </Link>

            <div>
              <button type="button" style={linkStyle(activeMenu.startsWith('cms-'))} onClick={() => setCmsOpen(!cmsOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Globe size={16} /> <span>Conteúdo (CMS)</span></span>
                {cmsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {cmsOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Link to="/tela/wf-054-cms-institucional" style={subLinkStyle(activeMenu === 'cms-institucional')}>
                    <span>▣ Institucional (WF-054)</span>
                  </Link>
                  <Link to="/tela/wf-055-cms-home-e-curadoria-banners" style={subLinkStyle(activeMenu === 'cms-home')}>
                    <span>▣ Home e Curadoria (WF-055)</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/tela/wf-056-central-de-notificacoes" style={linkStyle(activeMenu === 'notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={16} /> <span>Notificações</span></span>
            </Link>
          </nav>
        )}
      </div>

      {/* RODAPÉ DA SIDEBAR (Perfil / Configurações / Sign Out) */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <Link to="/tela/wf-004-perfil" style={linkStyle(activeMenu === 'perfil')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Settings size={16} /> <span>Perfil / Configurações</span></span>
          <ChevronRight size={14} />
        </Link>
        <Link to="/tela/wf-001-tela-de-login" style={linkStyle(false)}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LogOut size={16} /> <span>Sign Out</span></span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </aside>
  );
}

export function WfPagination({ total = 200, perPage: initialPerPage = 10, page: externalPage, onPageChange }) {
  const [page, setPage] = useState(externalPage || 1);
  const [perPage, setPerPage] = useState(initialPerPage);
  const maxPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);

  const changePage = (next) => {
    const clamped = Math.max(1, Math.min(maxPage, next));
    setPage(clamped);
    if (onPageChange) onPageChange(clamped);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '24px', color: '#475569', fontSize: '13px' }}>
      <select
        value={perPage}
        onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
        style={{ border: '1px solid #94a3b8', borderRadius: '6px', padding: '6px 10px', backgroundColor: '#fff', fontSize: '13px', cursor: 'pointer' }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button type="button" onClick={() => changePage(1)} disabled={page === 1} style={{ background: 'none', border: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: page === 1 ? 0.4 : 1 }}>«</button>
        <button type="button" onClick={() => changePage(page - 1)} disabled={page === 1} style={{ background: 'none', border: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: page === 1 ? 0.4 : 1 }}>‹</button>
        <span>{start} a {end} de {total}</span>
        <button type="button" onClick={() => changePage(page + 1)} disabled={page === maxPage} style={{ background: 'none', border: 'none', cursor: page === maxPage ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: page === maxPage ? 0.4 : 1 }}>›</button>
        <button type="button" onClick={() => changePage(maxPage)} disabled={page === maxPage} style={{ background: 'none', border: 'none', cursor: page === maxPage ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: page === maxPage ? 0.4 : 1 }}>»</button>
      </div>
    </div>
  );
}

export function WfStatusPill({ status }) {
  const darkStatuses = ['Ativo', 'Ativa', 'Validado', 'Administrador', 'Editor', 'Leitor', 'Parque Jaime Lerner', 'Receita', 'Recebido', 'Bloqueio Financeiro', 'Bloqueada', 'Confirmado', 'Fechado', 'Repasse Pago', 'Aprovado'];
  const isDark = darkStatuses.includes(status);
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 14px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: isDark ? '#4a5568' : '#edf2f7',
      color: isDark ? '#ffffff' : '#4a5568',
      border: status === 'Cancelado' || status === 'Erro de leitura' || status === 'Despesas' || status === 'Rejeitado' ? '1px solid #718096' : 'none'
    }}>
      <span>{status}</span>
    </span>
  );
}
