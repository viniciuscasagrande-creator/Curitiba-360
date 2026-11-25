// frontend/src/components/wf/WfShell.jsx
// Shell oficial clonado dos 71 wireframes (WF-001 a WF-064) com logos oficiais do Curitiba 360° e todos os menus e submenus 100% interativos
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div style={{
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
    }}>
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

        <button
          type="button"
          onClick={() => prev && navigate(`/tela/${prev.slug}`)}
          disabled={!prev}
          style={{ backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: prev ? 'pointer' : 'not-allowed', opacity: prev ? 1 : 0.4 }}
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={() => next && navigate(`/tela/${next.slug}`)}
          disabled={!next}
          style={{ backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: next ? 'pointer' : 'not-allowed', opacity: next ? 1 : 0.4 }}
        >
          Próxima →
        </button>
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
          {showOverlay ? 'Voltar para Tela Viva' : 'Comparar PNG Original'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/site')}
          style={{ backgroundColor: '#00a896', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 700 }}
        >
          🌐 Portal Público (/site)
        </button>
        <button
          type="button"
          onClick={() => navigate('/telas')}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
        >
          Galeria (71)
        </button>
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
  const [atrSubOpen, setAtrSubOpen] = useState(
    activeMenu === 'atracoes' || activeMenu === 'totais' || activeMenu === 'categorias' ||
    activeMenu === 'pesquisar' || activeMenu === 'ingressos' || activeMenu === 'cupons' ||
    activeMenu === 'analytics' || activeMenu.startsWith('fin-') || activeMenu === 'validar'
  );
  const [comSubOpen, setComSubOpen] = useState(
    activeMenu === 'agencias' || activeMenu === 'agentes' || activeMenu === 'parceiros' ||
    activeMenu === 'operacao' || activeMenu === 'comissionamento'
  );

  useEffect(() => {
    return backofficeStore.subscribe((next) => setStore(next));
  }, []);

  const selectedAttraction = store.attractions?.find((a) => a.id === store.selectedAttractionId) || store.attractions?.[0] || {
    id: 1,
    nome: 'Parque Jaime Lerner',
    local: 'Pilarzinho - Curitiba'
  };

  const displayAttractionName = attractionName || selectedAttraction.nome;
  const displayAttractionLoc = attractionLocation || selectedAttraction.local;

  const goSlug = (slug) => navigate(`/tela/${slug}`);

  const handleSelectAttraction = (newId) => {
    backofficeStore.setState((prev) => ({ ...prev, selectedAttractionId: Number(newId) }));
  };

  const handleSwitchMode = (targetMode) => {
    if (targetMode === 'admin') goSlug('wf-002-dashboard');
    else if (targetMode === 'attraction') goSlug('wf-003-detalhes-da-atracao-totais-da-atracao');
    else if (targetMode === 'partner') goSlug('wf-048-gestao-de-agencias-visao-parceiro-comercial');
    else if (targetMode === 'agency') goSlug('wf-051-operacao-comercial');
  };

  const itemStyle = (isActive) => ({
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
    transition: 'background 0.15s'
  });

  const subItemStyle = (isActive) => ({
    ...itemStyle(isActive),
    padding: '6.5px 10px',
    fontSize: '12px'
  });

  return (
    <aside style={{
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
    }}>
      <div>
        {/* TOP LOGO / ATTRACTION BOX */}
        {mode === 'attraction' ? (
          <div style={{ textAlign: 'center', marginBottom: '16px', padding: '0 4px' }}>
            <div
              onClick={() => goSlug('wf-003-detalhes-da-atracao-totais-da-atracao')}
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
                cursor: 'pointer'
              }}
            >
              <img
                src={OFFICIAL_LOGO}
                alt="Curitiba 360°"
                style={{ width: '88px', height: '88px', objectFit: 'contain' }}
              />
            </div>
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
            <div
              onClick={() => goSlug('wf-004-perfil')}
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
                cursor: 'pointer',
                padding: '5px',
                boxSizing: 'border-box'
              }}
            >
              <img
                src={OFFICIAL_LOGO}
                alt="Logo Curitiba 360°"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
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

        {/* MENU DE NAVEGAÇÃO COMPLETO COM TODOS OS SUBMENUS ATIVOS */}
        {mode === 'agency' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button style={itemStyle(activeMenu === 'operacao')} onClick={() => goSlug('wf-051-operacao-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> Operação Comercial (WF-051)</span>
            </button>
            <button style={itemStyle(activeMenu === 'comissionamento')} onClick={() => goSlug('wf-052-comissionamento-agencia')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><DollarSign size={16} /> Comissionamento e Repasse</span>
            </button>
            <button style={itemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> Meus Agentes (WF-050)</span>
            </button>
            <button style={itemStyle(false)} onClick={() => goSlug('wf-064-cadastro-de-agente')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Edit3 size={16} /> + Cadastrar Novo Agente</span>
            </button>
            <button style={itemStyle(false)} onClick={() => goSlug('wf-057-tela-inicial-por-perfil')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Briefcase size={16} /> Tela Inicial Agência (WF-057)</span>
            </button>
            <button style={itemStyle(false)} onClick={() => goSlug('wf-002-dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> ← Voltar ao Dashboard Admin</span>
            </button>
          </nav>
        ) : mode === 'partner' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button style={itemStyle(activeMenu === 'agencias')} onClick={() => goSlug('wf-048-gestao-de-agencias-visao-parceiro-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> Gestão de Agências</span>
            </button>
            <button style={itemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes-visao-parceiro-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> Gestão de Agentes</span>
            </button>
            <button style={itemStyle(activeMenu === 'atracoes')} onClick={() => goSlug('wf-012-gestao-de-atracoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={16} /> Gestão de Atrações</span>
            </button>
            <button style={itemStyle(false)} onClick={() => goSlug('wf-003-detalhes-da-atracao-totais-da-atracao')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PieChart size={16} /> Detalhes & Relatórios da Atração</span>
            </button>
            <button style={itemStyle(activeMenu === 'relatorios')} onClick={() => goSlug('wf-063-relatorios-financeiros-globais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> Relatórios Financeiros</span>
            </button>
            <button style={itemStyle(activeMenu === 'anticambista')} onClick={() => goSlug('wf-060-painel-anti-cambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><RefreshCw size={16} /> Controle de Transferências</span>
            </button>
            <button style={itemStyle(activeMenu === 'notificacoes')} onClick={() => goSlug('wf-056-central-de-notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={16} /> Notificações</span>
            </button>
            <button style={itemStyle(false)} onClick={() => goSlug('wf-002-dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> ← Voltar ao Dashboard Admin</span>
            </button>
          </nav>
        ) : mode === 'attraction' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button style={itemStyle(activeMenu === 'dashboard')} onClick={() => goSlug('wf-002-dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> Dashboard</span>
            </button>
            <button style={itemStyle(activeMenu === 'totais')} onClick={() => goSlug('wf-003-detalhes-da-atracao-totais-da-atracao')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> Totais da Atração</span>
            </button>
            <button style={itemStyle(activeMenu === 'categorias')} onClick={() => goSlug('wf-016-detalhes-da-atracao-categorias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> Categorias</span>
            </button>
            <button style={itemStyle(activeMenu === 'pesquisar')} onClick={() => goSlug('wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Search size={16} /> Pesquisar Ingresso</span>
            </button>
            <button style={itemStyle(activeMenu === 'ingressos')} onClick={() => goSlug('wf-019-detalhes-da-atracao-gestao-de-ingresso')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Ticket size={16} /> Gestão de Ingresso</span>
            </button>
            <button style={itemStyle(activeMenu === 'cupons')} onClick={() => goSlug('wf-021-detalhes-da-atracao-gestao-de-cupons')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Tag size={16} /> Gestão de Cupons</span>
            </button>
            <button style={itemStyle(activeMenu === 'analytics')} onClick={() => goSlug('wf-025-detalhes-da-atracao-graficos-analytics')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PieChart size={16} /> Gráficos Analytics</span>
            </button>
            <button style={itemStyle(activeMenu === 'editar')} onClick={() => goSlug('wf-013-gestao-de-atracoes-adicionar-atracao-1')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Edit3 size={16} /> Editar da Atração</span>
            </button>
            <button style={itemStyle(activeMenu === 'agencias')} onClick={() => goSlug('wf-048-gestao-de-agencias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> Agencias e Agentes</span>
            </button>
            <button style={itemStyle(activeMenu === 'usuarios-atracao')} onClick={() => goSlug('wf-026-detalhes-da-atracao-usuarios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> Usuários</span>
            </button>

            {/* Submenu Gestão Financeira da Atração */}
            <div>
              <button style={itemStyle(activeMenu.startsWith('fin-'))} onClick={() => setFinOpen(!finOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><DollarSign size={16} /> Gestão Financeira</span>
                {finOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {finOpen && (
                <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <button style={subItemStyle(false)} onClick={() => setRelOpen(!relOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PieChart size={14} /> Relatórios da Atração</span>
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
                        { key: 'fin-pagamentos', label: 'Vendas por Pagamentos', slug: 'wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas' },
                        { key: 'fin-bordero', label: 'Borderô Resumido', slug: 'wf-046-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido' }
                      ].map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => goSlug(sub.slug)}
                          style={subItemStyle(activeMenu === sub.key)}
                        >
                          <span>▣ {sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <button style={subItemStyle(false)} onClick={() => setNegOpen(!negOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DollarSign size={14} /> Negociação Financeira</span>
                    {negOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  {negOpen && (
                    <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button style={subItemStyle(activeMenu === 'fin-condicoes')} onClick={() => goSlug('wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais')}>
                        <span>▣ Condições Comerciais</span>
                      </button>
                      <button style={subItemStyle(activeMenu === 'fin-info')} onClick={() => goSlug('wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras')}>
                        <span>▣ Informações Financeiras</span>
                      </button>
                    </div>
                  )}

                  <button style={subItemStyle(activeMenu === 'fin-despesas')} onClick={() => goSlug('wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas')}>
                    <span>▣ Resumo das Despesas</span>
                  </button>
                </div>
              )}
            </div>

            <button style={itemStyle(activeMenu === 'validar')} onClick={() => goSlug('wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><QrCode size={16} /> Validar Ingressos</span>
            </button>
          </nav>
        ) : (
          /* MENU ADMINISTRADOR PADRÃO COMPLETO COM SUBMENUS EXPANSÍVEIS PARA TODAS AS 71 TELAS */
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <button style={itemStyle(activeMenu === 'dashboard')} onClick={() => goSlug('wf-002-dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={16} /> Dashboard</span>
            </button>

            <button style={itemStyle(activeMenu === 'usuarios')} onClick={() => goSlug('wf-005-gestao-de-usuarios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={16} /> Gestão de Usuários</span>
              <ChevronRight size={13} />
            </button>

            {/* Grupo Parceiros, Agências, Agentes e Operação B2B */}
            <div>
              <button style={itemStyle(comSubOpen)} onClick={() => setComSubOpen(!comSubOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={16} /> Parceiros, Agências & B2B</span>
                {comSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {comSubOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <button style={subItemStyle(activeMenu === 'parceiros')} onClick={() => goSlug('wf-058-gestao-de-parceiros-comerciais')}>
                    <span>▣ Parceiros Comerciais (WF-058)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-059-cadastro-de-parceiro-comercial')}>
                    <span>▣ + Novo Parceiro (WF-059)</span>
                  </button>
                  <button style={subItemStyle(activeMenu === 'agencias')} onClick={() => goSlug('wf-048-gestao-de-agencias')}>
                    <span>▣ Gestão de Agências (WF-048)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-048-gestao-de-agencias-estado-2-pendente-de-aprovacao')}>
                    <span>▣ Agências Pendentes (WF-048)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa')}>
                    <span>▣ + Nova Agência 1/3..3/3 (WF-049)</span>
                  </button>
                  <button style={subItemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes')}>
                    <span>▣ Gestão de Agentes (WF-050)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-064-cadastro-de-agente')}>
                    <span>▣ + Novo Agente (WF-064)</span>
                  </button>
                  <button style={subItemStyle(activeMenu === 'operacao')} onClick={() => goSlug('wf-051-operacao-comercial')}>
                    <span>▣ Operação Comercial (WF-051)</span>
                  </button>
                  <button style={subItemStyle(activeMenu === 'comissionamento')} onClick={() => goSlug('wf-052-comissionamento-agencia')}>
                    <span>▣ Comissionamento (WF-052)</span>
                  </button>
                </div>
              )}
            </div>

            <button style={itemStyle(activeMenu === 'contratos')} onClick={() => goSlug('wf-007-gestao-de-contratos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> Gestão de Contratos</span>
            </button>
            <button style={itemStyle(activeMenu === 'condicoes')} onClick={() => goSlug('wf-009-configuracoes-comerciais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ClipboardList size={16} /> Configurações Comerciais</span>
            </button>

            {/* Grupo Gestão de Atrações + Submenus Internos da Atração */}
            <div>
              <button
                style={itemStyle(activeMenu === 'atracoes' || atrSubOpen)}
                onClick={() => {
                  setAtrSubOpen(!atrSubOpen);
                  if (!atrSubOpen) goSlug('wf-012-gestao-de-atracoes');
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={16} /> Gestão de Atrações</span>
                {atrSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {atrSubOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <button style={subItemStyle(activeMenu === 'atracoes')} onClick={() => goSlug('wf-012-gestao-de-atracoes')}>
                    <span>▣ Lista de Atrações (WF-012)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-013-gestao-de-atracoes-adicionar-atracao-1')}>
                    <span>▣ + Nova Atração 1/3..3/3 (WF-013)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-003-detalhes-da-atracao-totais-da-atracao')}>
                    <span>▣ Totais da Atração (WF-003)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-016-detalhes-da-atracao-categorias')}>
                    <span>▣ Categorias da Atração (WF-016)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador')}>
                    <span>▣ Pesquisar Ingresso (WF-017/018)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-019-detalhes-da-atracao-gestao-de-ingresso')}>
                    <span>▣ Lotes de Ingresso (WF-019/020)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-021-detalhes-da-atracao-gestao-de-cupons')}>
                    <span>▣ Gestão de Cupons & QR (WF-021..024)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-025-detalhes-da-atracao-graficos-analytics')}>
                    <span>▣ Gráficos Analytics (WF-025)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas')}>
                    <span>▣ Despesas & Repasse (WF-030)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas')}>
                    <span>▣ Relatórios & PDFs (WF-032..047)</span>
                  </button>
                  <button style={subItemStyle(false)} onClick={() => goSlug('wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos')}>
                    <span>▣ Validar Ingressos QR (WF-031)</span>
                  </button>
                </div>
              )}
            </div>

            <button style={itemStyle(activeMenu === 'pacotes')} onClick={() => goSlug('wf-061-gestao-de-pacotes-de-ingressos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Layers size={16} /> Gestão de Pacotes</span>
            </button>
            <button style={itemStyle(activeMenu === 'reembolsos')} onClick={() => goSlug('wf-053-fila-de-reembolsos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={16} /> Fila de Reembolsos</span>
            </button>
            <button style={itemStyle(activeMenu === 'relatorios')} onClick={() => goSlug('wf-063-relatorios-financeiros-globais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={16} /> Relatórios Financeiros</span>
            </button>
            <button style={itemStyle(activeMenu === 'anticambista')} onClick={() => goSlug('wf-060-painel-anti-cambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ShieldAlert size={16} /> Controle de Transferências</span>
            </button>

            <div>
              <button style={itemStyle(activeMenu.startsWith('cms-'))} onClick={() => setCmsOpen(!cmsOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Globe size={16} /> Conteúdo (CMS)</span>
                {cmsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {cmsOpen && (
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button style={subItemStyle(activeMenu === 'cms-institucional')} onClick={() => goSlug('wf-054-cms-institucional')}>
                    <span>▣ Institucional (WF-054)</span>
                  </button>
                  <button style={subItemStyle(activeMenu === 'cms-home')} onClick={() => goSlug('wf-055-cms-home-e-curadoria-banners')}>
                    <span>▣ Home e Curadoria (WF-055)</span>
                  </button>
                </div>
              )}
            </div>

            <button style={itemStyle(activeMenu === 'notificacoes')} onClick={() => goSlug('wf-056-central-de-notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={16} /> Notificações</span>
            </button>
          </nav>
        )}
      </div>

      {/* RODAPÉ DA SIDEBAR (Perfil / Configurações / Sign Out) */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <button style={itemStyle(activeMenu === 'perfil')} onClick={() => goSlug('wf-004-perfil')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Settings size={16} /> Perfil / Configurações</span>
          <ChevronRight size={14} />
        </button>
        <button style={itemStyle(false)} onClick={() => goSlug('wf-001-tela-de-login')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LogOut size={16} /> Sign Out</span>
          <ChevronRight size={14} />
        </button>
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
      {status}
    </span>
  );
}
