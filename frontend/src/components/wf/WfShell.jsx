// frontend/src/components/wf/WfShell.jsx
// Shell oficial clonado dos 71 wireframes (WF-001 a WF-064) com logos oficiais do Curitiba 360°
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Users, FileText, ClipboardList, Box, BarChart3,
  Settings, LogOut, MapPin, Tag, Search, Ticket, PieChart,
  Edit3, Building2, DollarSign, QrCode, ChevronDown, ChevronRight,
  Bell, Globe, ShieldAlert, RefreshCw, Eye, Layers
} from 'lucide-react';
import { screens } from '../../data/screens';

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
        <span style={{ color: '#94a3b8' }}>• Tela viva clonada e integrada ao Backend Curitiba 360°</span>
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
          onClick={() => navigate('/telas')}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
        >
          Galeria (71)
        </button>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{ backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontWeight: 600 }}
        >
          Menu Geral
        </button>
      </div>
    </div>
  );
}

export function WfSidebar({ mode = 'admin', activeMenu = 'dashboard', attractionName = 'Parque Jaime Lerner', attractionLocation = 'Pilarzinho - Curitiba', attractionImage = '/parque_jaime_lerner.jpg', userName = 'João da Silva', userRole = 'Administrador' }) {
  const navigate = useNavigate();
  const [finOpen, setFinOpen] = useState(true);
  const [relOpen, setRelOpen] = useState(true);
  const [negOpen, setNegOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(true);

  const goSlug = (slug) => navigate(`/tela/${slug}`);

  const itemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    backgroundColor: isActive ? '#eef1f5' : 'transparent',
    color: '#475569',
    fontWeight: isActive ? 700 : 500,
    fontSize: '13.5px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.15s'
  });

  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 'calc(100vh - 45px)',
      padding: '24px 14px',
      flexShrink: 0,
      boxSizing: 'border-box'
    }}>
      <div>
        {/* TOP LOGO / ATTRACTION BOX (Substitui o placeholder cinza pela logo oficial Curitiba 360°) */}
        {mode === 'attraction' ? (
          <div style={{ textAlign: 'center', marginBottom: '22px', padding: '0 6px' }}>
            <div style={{
              width: '100%',
              height: '138px',
              borderRadius: '6px',
              border: '1.5px solid #475569',
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '10px'
            }}>
              <img
                src={OFFICIAL_LOGO}
                alt="Curitiba 360°"
                style={{ width: '96px', height: '96px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#334155', marginBottom: '4px' }}>
              {attractionName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
              <MapPin size={13} />
              <span>{attractionLocation}</span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              onClick={() => goSlug('wf-004-perfil')}
              style={{
                width: '86px',
                height: '86px',
                borderRadius: '50%',
                border: '2px solid #475569',
                backgroundColor: '#f8fafc',
                margin: '0 auto 10px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
                padding: '6px',
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
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{userRole}</div>
          </div>
        )}

        {/* MENU DE NAVEGAÇÃO CONFORME PERFIL DO WIREFRAME */}
        {mode === 'agency' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button style={itemStyle(activeMenu === 'operacao')} onClick={() => goSlug('wf-051-operacao-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={17} /> Operação Comercial</span>
            </button>
            <button style={itemStyle(activeMenu === 'comissionamento')} onClick={() => goSlug('wf-052-comissionamento-agencia')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={17} /> Comissionamento e Repasse</span>
            </button>
            <button style={itemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={17} /> Meus Agentes</span>
            </button>
          </nav>
        ) : mode === 'partner' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button style={itemStyle(activeMenu === 'agencias')} onClick={() => goSlug('wf-048-gestao-de-agencias-visao-parceiro-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={17} /> Gestão de Agências</span>
            </button>
            <button style={itemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes-visao-parceiro-comercial')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={17} /> Gestão de Agentes</span>
            </button>
            <button style={itemStyle(activeMenu === 'atracoes')} onClick={() => goSlug('wf-012-gestao-de-atracoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={17} /> Gestão de Atrações</span>
            </button>
            <button style={itemStyle(activeMenu === 'relatorios')} onClick={() => goSlug('wf-063-relatorios-financeiros-globais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={17} /> Relatórios Financeiros</span>
            </button>
            <button style={itemStyle(activeMenu === 'anticambista')} onClick={() => goSlug('wf-060-painel-anti-cambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><RefreshCw size={17} /> Controle de Transferências</span>
            </button>
            <button style={itemStyle(activeMenu === 'notificacoes')} onClick={() => goSlug('wf-056-central-de-notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={17} /> Notificações</span>
            </button>
          </nav>
        ) : mode === 'attraction' ? (
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
                <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  <button style={itemStyle(false)} onClick={() => setRelOpen(!relOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12.5px' }}><PieChart size={14} /> Relatórios da Atração</span>
                    {relOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  {relOpen && (
                    <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                        <button
                          key={sub.key}
                          onClick={() => goSlug(sub.slug)}
                          style={{
                            ...itemStyle(activeMenu === sub.key),
                            padding: '7px 10px',
                            fontSize: '12px'
                          }}
                        >
                          <span>▣ {sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <button style={itemStyle(false)} onClick={() => setNegOpen(!negOpen)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12.5px' }}><DollarSign size={14} /> Negociação Financeira</span>
                    {negOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  </button>
                  {negOpen && (
                    <div style={{ paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button style={{ ...itemStyle(activeMenu === 'fin-condicoes'), padding: '7px 10px', fontSize: '12px' }} onClick={() => goSlug('wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais')}>
                        <span>▣ Condições Comerciais</span>
                      </button>
                      <button style={{ ...itemStyle(activeMenu === 'fin-info'), padding: '7px 10px', fontSize: '12px' }} onClick={() => goSlug('wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras')}>
                        <span>▣ Informações Financeiras</span>
                      </button>
                    </div>
                  )}

                  <button style={{ ...itemStyle(activeMenu === 'fin-despesas'), padding: '8px 10px', fontSize: '12.5px' }} onClick={() => goSlug('wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas')}>
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
          /* MENU ADMINISTRADOR PADRÃO (WF-002, WF-005, WF-048..WF-064) */
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <button style={itemStyle(activeMenu === 'dashboard')} onClick={() => goSlug('wf-002-dashboard')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LayoutGrid size={17} /> Dashboard</span>
            </button>
            <button style={itemStyle(activeMenu === 'usuarios')} onClick={() => goSlug('wf-005-gestao-de-usuarios')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={17} /> Gestão de Usuários</span>
            </button>
            <button style={itemStyle(activeMenu === 'parceiros')} onClick={() => goSlug('wf-058-gestao-de-parceiros-comerciais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={17} /> Gestão de Parceiros Comerciais</span>
            </button>
            <button style={itemStyle(activeMenu === 'agencias')} onClick={() => goSlug('wf-048-gestao-de-agencias')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Building2 size={17} /> Gestão de Agências</span>
            </button>
            <button style={itemStyle(activeMenu === 'agentes')} onClick={() => goSlug('wf-050-gestao-de-agentes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Users size={17} /> Gestão de Agentes</span>
            </button>
            <button style={itemStyle(activeMenu === 'contratos')} onClick={() => goSlug('wf-007-gestao-de-contratos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={17} /> Gestão de Contratos</span>
            </button>
            <button style={itemStyle(activeMenu === 'condicoes')} onClick={() => goSlug('wf-009-configuracoes-comerciais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ClipboardList size={17} /> Configurações Comerciais</span>
            </button>
            <button style={itemStyle(activeMenu === 'atracoes')} onClick={() => goSlug('wf-012-gestao-de-atracoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Box size={17} /> Gestão de Atrações</span>
            </button>
            <button style={itemStyle(activeMenu === 'pacotes')} onClick={() => goSlug('wf-061-gestao-de-pacotes-de-ingressos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Layers size={17} /> Gestão de Pacotes</span>
            </button>
            <button style={itemStyle(activeMenu === 'reembolsos')} onClick={() => goSlug('wf-053-fila-de-reembolsos')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={17} /> Fila de Reembolsos</span>
            </button>
            <button style={itemStyle(activeMenu === 'relatorios')} onClick={() => goSlug('wf-063-relatorios-financeiros-globais')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><BarChart3 size={17} /> Relatórios Financeiros</span>
            </button>
            <button style={itemStyle(activeMenu === 'anticambista')} onClick={() => goSlug('wf-060-painel-anti-cambista')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ShieldAlert size={17} /> Controle de Transferências</span>
            </button>

            <div>
              <button style={itemStyle(activeMenu.startsWith('cms-'))} onClick={() => setCmsOpen(!cmsOpen)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Globe size={17} /> Conteúdo</span>
                {cmsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {cmsOpen && (
                <div style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button style={{ ...itemStyle(activeMenu === 'cms-institucional'), padding: '7px 10px', fontSize: '12.5px' }} onClick={() => goSlug('wf-054-cms-institucional')}>
                    <span>▣ Institucional</span>
                  </button>
                  <button style={{ ...itemStyle(activeMenu === 'cms-home'), padding: '7px 10px', fontSize: '12.5px' }} onClick={() => goSlug('wf-055-cms-home-e-curadoria-banners')}>
                    <span>▣ Home e Curadoria</span>
                  </button>
                </div>
              )}
            </div>

            <button style={itemStyle(activeMenu === 'notificacoes')} onClick={() => goSlug('wf-056-central-de-notificacoes')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Bell size={17} /> Notificações</span>
            </button>
          </nav>
        )}
      </div>

      {/* RODAPÉ DA SIDEBAR (Perfil / Configurações / Sign Out) */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button style={itemStyle(activeMenu === 'perfil')} onClick={() => goSlug('wf-004-perfil')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Settings size={17} /> Perfil</span>
          <ChevronRight size={14} />
        </button>
        <button style={itemStyle(false)} onClick={() => goSlug('wf-001-tela-de-login')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><LogOut size={17} /> Sign Out</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </aside>
  );
}

export function WfPagination({ total = 200, perPage = 10 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '24px', color: '#475569', fontSize: '13px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #94a3b8', borderRadius: '6px', padding: '6px 10px', backgroundColor: '#fff' }}>
        <span>{perPage}</span>
        <ChevronDown size={14} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ cursor: 'pointer', fontWeight: 700 }}>«</span>
        <span style={{ cursor: 'pointer', fontWeight: 700 }}>‹</span>
        <span>1 a {perPage} de {total}</span>
        <span style={{ cursor: 'pointer', fontWeight: 700 }}>›</span>
        <span style={{ cursor: 'pointer', fontWeight: 700 }}>»</span>
      </div>
    </div>
  );
}

export function WfStatusPill({ status }) {
  const darkStatuses = ['Ativo', 'Ativa', 'Validado', 'Administrador', 'Editor', 'Leitor', 'Parque Jaime Lerner', 'Receita', 'Recebido', 'Bloqueio Financeiro', 'Bloqueada', 'Confirmado', 'Fechado', 'Repasse Pago'];
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
      border: status === 'Cancelado' || status === 'Erro de leitura' || status === 'Despesas' ? '1px solid #718096' : 'none'
    }}>
      {status}
    </span>
  );
}
