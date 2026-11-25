// frontend/src/components/wf/WfScreensPart1.jsx
// Implementação fiel e funcional das telas WF-001 a WF-027 com logos oficiais do Curitiba 360°
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, Edit3, Trash2, Check, X, Eye, QrCode,
  MapPin, Share2, Link2, Download, Calendar, Clock, Copy
} from 'lucide-react';
import {
  WfSidebar, WfPagination, WfStatusPill,
  OFFICIAL_LOGO, OFFICIAL_HORIZONTAL_LOGO
} from './WfShell';

// ============================================================================
// WF-001: TELA DE LOGIN
// ============================================================================
export function Wf001Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('mattsmith@mail.com');
  const [password, setPassword] = useState('12345678');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/tela/wf-002-dashboard');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 45px)',
      backgroundColor: '#98a2b3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 64px',
      gap: '48px',
      boxSizing: 'border-box'
    }}>
      {/* Left box: Logo Oficial Curitiba 360° no lugar do placeholder */}
      <div style={{
        flex: 1,
        maxWidth: '720px',
        height: '520px',
        backgroundColor: '#eef1f5',
        border: '2px solid #475467',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <img
          src={OFFICIAL_LOGO}
          alt="Curitiba 360°"
          style={{ width: '280px', height: '280px', objectFit: 'contain', marginBottom: '16px' }}
        />
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#475467', letterSpacing: '0.06em' }}>
          PLATAFORMA OFICIAL DE GESTÃO TURÍSTICA • CURITIBA 360°
        </span>
      </div>

      {/* Right white card: Welcome back! */}
      <form
        onSubmit={handleLogin}
        style={{
          width: '390px',
          minHeight: '640px',
          backgroundColor: '#ffffff',
          borderRadius: '22px',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
            <img src={OFFICIAL_HORIZONTAL_LOGO} alt="Curitiba 360°" style={{ height: '46px', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#475467', textAlign: 'center', margin: '0 0 8px 0' }}>
            Welcome back!
          </h1>
          <p style={{ fontSize: '14px', color: '#667085', margin: '0 0 24px 0' }}>
            Login below or <span onClick={() => navigate('/cadastro')} style={{ fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', color: '#475467' }}>create an account</span>
          </p>

          <label style={{ display: 'block', fontSize: '13px', color: '#475467', fontWeight: 600, marginBottom: '6px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '13px 14px',
              borderRadius: '8px',
              border: '1.5px solid #475467',
              fontSize: '14px',
              color: '#344054',
              marginBottom: '20px',
              boxSizing: 'border-box'
            }}
          />

          <label style={{ display: 'block', fontSize: '13px', color: '#475467', fontWeight: 600, marginBottom: '6px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '13px 40px 13px 14px',
                borderRadius: '8px',
                border: '1.5px solid #475467',
                fontSize: '14px',
                color: '#344054',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475467' }}
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#4e5a6b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Sign In
          </button>
          <span
            onClick={() => navigate('/recuperar-senha')}
            style={{ fontSize: '14px', fontWeight: 700, color: '#475467', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Forgot Password
          </span>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// WF-002: DASHBOARD
// ============================================================================
export function Wf002Dashboard({ store }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [search, setSearch] = useState('');

  const items = store.attractions.filter((a) => {
    const matchTab = tab === 'Todos' || (tab === 'Ativos' ? a.status === 'Ativo' : a.status !== 'Ativo');
    const matchSearch = !search || a.nome.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="dashboard" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Dashboard</h1>
          <div style={{ position: 'relative', width: '340px' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter search terms"
              style={{ width: '100%', padding: '10px 36px 10px 14px', borderRadius: '8px', border: '1.5px solid #475467', fontSize: '13.5px', boxSizing: 'border-box' }}
            />
            <Search size={17} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#475467' }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '28px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '3px solid #3b4758' : '3px solid transparent',
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? '#3b4758' : '#64748b',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 3x2 Attraction Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
          {items.map((atr, i) => (
            <div
              key={i}
              onClick={() => navigate('/tela/wf-003-detalhes-da-atracao-totais-da-atracao')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{
                height: '185px',
                backgroundColor: '#e9edf2',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '14px',
                position: 'relative',
                border: '1px solid #d0d7e2'
              }}>
                <img
                  src={OFFICIAL_LOGO}
                  alt={atr.nome}
                  style={{ width: '95px', height: '95px', objectFit: 'contain' }}
                />
              </div>
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#3b4758' }}>{atr.nome}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>
                  <MapPin size={14} /> {atr.local}
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vendidos</span><strong>{atr.vendidos}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cortesias</span><strong>{atr.cortesias}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total</span><strong>{atr.total}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Receita</span><strong>{atr.receita}</strong></div>
              </div>

              {/* Bar chart replica */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '120px', padding: '10px 8px 0 28px', borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '9px', color: '#94a3b8' }}>
                  <span>$4k</span><span>$3k</span><span>$2k</span><span>$1k</span><span>$0</span>
                </div>
                <div style={{ flex: 1, height: '68%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                <div style={{ flex: 1, height: '80%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                <div style={{ flex: 1, height: '92%', backgroundColor: '#94a0b2', borderRadius: '4px 4px 0 0' }} />
                <div style={{ flex: 1, height: '60%', backgroundColor: '#4e5a6b', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#eef1f5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: '#3b4758', whiteSpace: 'nowrap' }}>
                    $2.488
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-003: DETALHES DA ATRAÇÃO — TOTAIS DA ATRAÇÃO
// ============================================================================
export function Wf003TotaisAtracao() {
  const [period, setPeriod] = useState('Tudo');

  const cards = [
    { title: 'Ingessos Vendidos', sub: 'Ingessos Vendidos no período', icon: '$', qty: 224, unitLabel: 'Unidades Vendidas', b1Label: 'Valor das Vendas', b1Val: 'R$ 3.900,00', b2Label: 'Ticket Médio', b2Val: 'R$ 17,41', star: 'Acima da meta', bar: true },
    { title: 'Ingressos Emitidos', sub: 'Ingressos Emitidos no período', icon: '🎟', qty: 224, unitLabel: 'Unidades Emitidas', b1Label: 'Cortesias', b1Val: '2', b2Label: 'Total', b2Val: '226' },
    { title: 'Ingressos Reservados', sub: 'Ingressos Reservados no período', icon: '💾', qty: 0, unitLabel: 'Unidades Reservados', b1Label: 'Quantidade', b1Val: 'R$ 3.900,00', b2Label: 'Total', b2Val: 'R$ 17,41' },
    { title: 'Ingressos Validação', sub: 'Ingessos Validados no período', icon: '✓', qty: 224, unitLabel: 'Unidades Validados', b1Label: 'Validados', b1Val: '2', b2Label: 'Pendentes', b2Val: '226', bar: true },
    { title: 'Vendas no Dinheiro', sub: 'Vendas em dinheiro no período', icon: '💵', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' },
    { title: 'Vendas no C. Débito', sub: 'Vendas no cartão débito no período', icon: '💳', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' },
    { title: 'Vendas no C. Crédito', sub: 'Vendas no cartão crédito no período', icon: '💳', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' },
    { title: 'Vendas no C. Crédito Parcelado', sub: 'Vendas no cartão crédito no período', icon: '💳', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' },
    { title: 'Vendas no PIX', sub: 'Vendas no Pix no período', icon: '❖', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' },
    { title: 'Vendas por depósito, TED, etc...', sub: 'Vendas por depósito no período', icon: '🏛', qty: 0, unitLabel: 'Unidades Vendidas', b1Label: 'Quantidade', b1Val: '125', b2Label: 'Total', b2Val: 'R$ 2.125,00' }
  ];

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="totais" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: '0 0 18px 0' }}>
          Atração Parque Jaime Lerner
        </h1>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
          {['Tudo', 'Hoje', '7 Dias', '30 Dias', '📅 Período'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: period === p ? '#4e5a6b' : '#eef1f5',
                color: period === p ? '#ffffff' : '#3b4758',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '18px' }}>
          {cards.map((c, idx) => (
            <div key={idx} style={{ border: '1.5px solid #64748b', borderRadius: '14px', padding: '16px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', border: '1.5px solid #f59e0b', backgroundColor: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '17px' }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#3b4758' }}>{c.title}</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>{c.sub}</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#eef1f5', border: '1px solid #64748b', borderRadius: '10px', padding: '12px 14px', marginBottom: '12px', position: 'relative' }}>
                <span style={{ position: 'absolute', right: 12, top: 12, fontSize: '11.5px', fontWeight: 700, color: '#f59e0b' }}>↑+8%</span>
                <div style={{ fontSize: '12px', color: '#475569' }}>Quantidade de Ingressos</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: '#3b4758', margin: '4px 0' }}>{c.qty}</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>{c.unitLabel}</div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, backgroundColor: '#eef1f5', border: '1px solid #64748b', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>{c.b1Label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#3b4758' }}>{c.b1Val}</div>
                  {c.bar && (
                    <div style={{ height: '4px', backgroundColor: '#cbd5e1', borderRadius: '2px', marginTop: '10px' }}>
                      <div style={{ width: '65%', height: '100%', backgroundColor: '#4e5a6b', borderRadius: '2px' }} />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, backgroundColor: '#eef1f5', border: '1px solid #64748b', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>{c.b2Label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#3b4758' }}>{c.b2Val}</div>
                  {c.star && (
                    <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 700, marginTop: '8px' }}>☆ {c.star}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-005 & WF-004 & WF-006 & WF-026 & WF-027: GESTÃO DE USUÁRIOS + MODAIS PERFIL E NOVO USUÁRIO
// ============================================================================
export function Wf005Users({ store, updateStore, modalMode = null, isAttractionContext = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([2798, 2799, 2800]);
  const [profileForm, setProfileForm] = useState(store.profile);
  const [newUser, setNewUser] = useState({
    firstName: 'João',
    lastName: 'da Silva',
    cpf: '999.999.999-99',
    email: 'email@email.com',
    phone: '(41) 99999-9999',
    language: 'Português Brasil',
    perfil: 'Parceiro Comercial',
    razaoSocial: 'Instituto Jaime Lerner',
    nomeFantasia: 'Parque Jaime Lerner',
    cnpj: '72.096.639/0001-23',
    ie: 'Isento',
    ativo: true
  });

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSaveUser = () => {
    updateStore((prev) => ({
      ...prev,
      users: [
        {
          id: Math.floor(2810 + Math.random() * 900),
          nome: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          perfil: newUser.perfil,
          status: newUser.ativo ? 'Ativo' : 'Inativo',
          dataCriacao: new Date().toLocaleString('pt-BR'),
          ultimoLogin: new Date().toLocaleString('pt-BR')
        },
        ...prev.users
      ]
    }));
    navigate(isAttractionContext ? '/tela/wf-026-detalhes-da-atracao-usuarios' : '/tela/wf-005-gestao-de-usuarios');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar
        mode={isAttractionContext ? 'attraction' : 'admin'}
        activeMenu={isAttractionContext ? 'usuarios-atracao' : 'usuarios'}
      />

      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>
              {isAttractionContext ? 'Usuários' : 'Gestão de Usuários'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              {isAttractionContext ? 'Gerencie os usuários da atração' : 'Gerencie os usuários do sistema'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter search terms"
                style={{ width: '100%', padding: '10px 34px 10px 14px', borderRadius: '8px', border: '1.5px solid #475467', fontSize: '13.5px', boxSizing: 'border-box' }}
              />
              <Search size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#475467' }} />
            </div>
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1.5px solid #475467', backgroundColor: '#fff', color: '#3b4758', fontWeight: 600, fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              Filtro <Filter size={15} />
            </button>
            <button
              onClick={() => navigate(isAttractionContext ? '/tela/wf-027-detalhes-da-atracao-gestao-de-usuarios-adicionar-usuario' : '/tela/wf-006-adicionar-usuarios')}
              style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              Adicionar usuário <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '3px solid #3b4758' : '3px solid transparent',
                fontWeight: tab === t ? 700 : 500,
                color: tab === t ? '#3b4758' : '#64748b',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Selection Bar */}
        {selected.length > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', marginBottom: '16px', overflow: 'hidden' }}>
            <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', color: '#3b4758', borderRight: '1px solid #e2e8f0' }}>
              Selecionados {selected.length}
            </span>
            <button
              onClick={() => navigate('/tela/wf-006-adicionar-usuarios')}
              style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
            >
              <Edit3 size={14} /> Editar
            </button>
            <button
              onClick={() => {
                updateStore((prev) => ({ ...prev, users: prev.users.filter((u) => !selected.includes(u.id)) }));
                setSelected([]);
              }}
              style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
            >
              <Trash2 size={14} /> Excluir
            </button>
            <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <span style={{ width: 28, height: 15, backgroundColor: '#4e5a6b', borderRadius: 99, position: 'relative', display: 'inline-block' }}>
                <span style={{ width: 11, height: 11, backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }} />
              </span>
              Inativar selecionados
            </button>
          </div>
        )}

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', borderRadius: '8px 0 0 8px' }}><input type="checkbox" checked={selected.length > 0} onChange={() => setSelected(selected.length ? [] : store.users.map((u) => u.id))} /></th>
              <th style={{ padding: '12px 14px' }}>User ID ↕</th>
              <th style={{ padding: '12px 14px' }}>Nome ↕</th>
              <th style={{ padding: '12px 14px' }}>Perfil ↕</th>
              <th style={{ padding: '12px 14px' }}>Data de criação ↕</th>
              <th style={{ padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>Último login ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.users
              .filter((u) => !search || u.nome.toLowerCase().includes(search.toLowerCase()))
              .map((u, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '14px' }}>
                    <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
                  </td>
                  <td style={{ padding: '14px', color: '#475569' }}>{u.id}</td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={OFFICIAL_LOGO} alt="" style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #475467', padding: 2, backgroundColor: '#fff' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#3b4758' }}>{u.nome}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <WfStatusPill status={isAttractionContext && idx === 0 ? 'Editor' : isAttractionContext && idx === 1 ? 'Leitor' : u.perfil} />
                  </td>
                  <td style={{ padding: '14px', color: '#475569' }}>{u.dataCriacao}</td>
                  <td style={{ padding: '14px', color: '#475569' }}>{u.ultimoLogin}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <WfPagination />
      </div>

      {/* MODAL WF-004: PERFIL */}
      {modalMode === 'perfil' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Perfil</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie suas configurações de perfil</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-005-gestao-de-usuarios')} style={{ padding: '9px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}>
                  Sair ↗
                </button>
                <button
                  onClick={() => {
                    updateStore((prev) => ({ ...prev, profile: profileForm }));
                    navigate('/tela/wf-005-gestao-de-usuarios');
                  }}
                  style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Salvar ✓
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img src={OFFICIAL_LOGO} alt="Curitiba 360°" style={{ width: '82px', height: '82px', borderRadius: '50%', border: '2px solid #475467', padding: '6px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#3b4758' }}>Foto de Perfil</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>PNG, JPEG menor que 5MB</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Carregar nova foto ⊕</button>
                <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Apagar 🗑</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #cbd5e1' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 6 }}>Primeiro nome</label>
                <input value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 6 }}>Último nome</label>
                <input value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #cbd5e1' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#3b4758', marginBottom: 6 }}>CPF/CNPJ</label>
              <input value={profileForm.cpfCnpj} onChange={(e) => setProfileForm({ ...profileForm, cpfCnpj: e.target.value })} style={{ width: '280px', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #cbd5e1' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758' }}>Email de contato</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 8 }}>Gerencie o email da sua conta para contato.</div>
                <input value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} style={{ width: '280px', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <button style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Adicionar outro email ⊕</button>
            </div>

            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #cbd5e1' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758' }}>Telefone</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 8 }}>Adiciona o telefone para contato</div>
              <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} style={{ width: '280px', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758' }}>Integração da conta</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 8 }}>Gerencie sua integração atual da conta</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #475467', borderRadius: '10px', padding: '12px 16px' }}>
                <span style={{ fontWeight: 600, fontSize: '13.5px', color: '#3b4758' }}>📊 Google Analytics</span>
                <span style={{ backgroundColor: '#4e5a6b', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 700 }}>Conectado 🔗</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL WF-006 / WF-027: NOVO/EDITAR USUÁRIO */}
      {modalMode === 'novo-usuario' && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '740px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Novo/Editar Usuário</h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>Preencha os campos obrigatórios para adicionar um usuário</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate(isAttractionContext ? '/tela/wf-026-detalhes-da-atracao-usuarios' : '/tela/wf-005-gestao-de-usuarios')}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}
                >
                  Descartar 🗑
                </button>
                <button
                  onClick={handleSaveUser}
                  style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Salvar ✓
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={OFFICIAL_LOGO} alt="Curitiba 360°" style={{ width: '74px', height: '74px', borderRadius: '50%', border: '2px solid #475467', padding: '5px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#3b4758' }}>Foto de Perfil</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>PNG, JPEG menor que 5MB</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, fontSize: '12.5px' }}>Carregar nova foto ⊕</button>
                <button style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, fontSize: '12.5px' }}>Apagar 🗑</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>Primeiro nome</label>
                <input value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>Último nome</label>
                <input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>CPF/CNPJ</label>
                <input value={newUser.cpf} onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>Email</label>
                <input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>Telefone</label>
                <input value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4 }}>Perfil</label>
                <select value={newUser.perfil} onChange={(e) => setNewUser({ ...newUser, perfil: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }}>
                  <option>Parceiro Comercial</option>
                  <option>Administrador</option>
                  <option>Agência</option>
                  <option>Agente</option>
                  <option>Editor</option>
                  <option>Leitor</option>
                </select>
              </div>
            </div>

            {newUser.perfil === 'Parceiro Comercial' && (
              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px', marginTop: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#3b4758', marginBottom: '10px' }}>Dados da empresa (Parceiro Comercial)</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: '#475569', marginBottom: 4 }}>Razão Social</label>
                    <input value={newUser.razaoSocial} onChange={(e) => setNewUser({ ...newUser, razaoSocial: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: '#475569', marginBottom: 4 }}>Nome Fantasia</label>
                    <input value={newUser.nomeFantasia} onChange={(e) => setNewUser({ ...newUser, nomeFantasia: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: '#475569', marginBottom: 4 }}>CNPJ</label>
                    <input value={newUser.cnpj} onChange={(e) => setNewUser({ ...newUser, cnpj: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', color: '#475569', marginBottom: 4 }}>Inscrição Estadual</label>
                    <input value={newUser.ie} onChange={(e) => setNewUser({ ...newUser, ie: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WF-007 & WF-008: GESTÃO DE CONTRATOS & ADICIONAR CONTRATO
// ============================================================================
export function Wf007Contracts({ store, isAddMode = false }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Ativos');
  const [rightTab, setRightTab] = useState('info');

  if (isAddMode) {
    return (
      <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
        <WfSidebar mode="admin" activeMenu="contratos" />
        <div style={{ flex: 1, padding: '28px 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Contratos</h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os contratos do sistema</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => window.print()} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}>Preview 👁</button>
              <button onClick={() => navigate('/tela/wf-007-gestao-de-contratos')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar ✓</button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', backgroundColor: '#4e5a6b' }} />
            </div>
            <span>✓</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '22px', flexWrap: 'wrap' }}>
            <div style={{ width: '250px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Parceiro Comercial</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option>Parque Jaime Lerner</option>
                <option>Serra Verde Express</option>
              </select>
            </div>
            <div style={{ width: '250px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Atração</label>
              <select style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option>Ópera de Arame</option>
                <option>Jardim Botânico</option>
              </select>
            </div>
            <div style={{ width: '110px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>ID do contrato</label>
              <input value="1234" readOnly style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#eef1f5' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            <div style={{ backgroundColor: '#eef1f5', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '22px', fontSize: '13px', color: '#3b4758', lineHeight: 1.65 }}>
              <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '12px' }}>Acknowledg Letter / Minuta Contratual Curitiba 360°</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '12px' }}>
                <strong>Subject:</strong>
                <span style={{ backgroundColor: '#4e5a6b', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>1</span>
                <input defaultValue="Curitiba 360" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', backgroundColor: '#fff' }} />
              </div>
              <p>Dear Receivers Name,</p>
              <p>We thank you for your communication, the receipt of which we hereby acknowledge. We look forward to working with you and meeting the requirements of CNPJ <strong>12.341.235/0001-00</strong>.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '14px 0' }}>
                {[3, 4, 5].map((n) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{n - 2}.</span>
                    <span style={{ backgroundColor: '#4e5a6b', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{n}</span>
                    <input placeholder="Cláusula contratual..." style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1', backgroundColor: '#fff' }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '16px' }}>
                <button onClick={() => setRightTab('info')} style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: rightTab === 'info' ? '2.5px solid #3b4758' : 'none', fontWeight: 700, cursor: 'pointer' }}>Informações do contrato</button>
                <button onClick={() => setRightTab('cond')} style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: rightTab === 'cond' ? '2.5px solid #3b4758' : 'none', fontWeight: 700, cursor: 'pointer' }}>Condições</button>
              </div>
              {rightTab === 'info' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#475569' }}>Razão social</label>
                    <input defaultValue="Curitiba 360" style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#475569' }}>CNPJ</label>
                    <input defaultValue="12.341.235/0001-90" style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#475569' }}>Endereço</label>
                    <input defaultValue="Rua XV de Novembro, 123 - Centro, Curitiba/PR" style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#475569' }}>Condições comerciais</label>
                    <select style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}>
                      <option>Padrão 10%</option>
                      <option>Parceiro Premium 12%</option>
                    </select>
                  </div>
                  <button onClick={() => navigate('/tela/wf-010-configuracoes-comerciais-condicao-comercial')} style={{ padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Criar condição ⊕</button>
                  <button onClick={() => navigate('/tela/wf-011-configuracoes-comerciais-informacao-financeira')} style={{ padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Criar informação financeira ⊕</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="admin" activeMenu="contratos" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão de Contratos</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie os contratos do sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '260px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-008-gestao-de-contratos-adicionar-contrato')} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar Contrato ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        {/* Action bar */}
        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#ffffff', marginBottom: '18px', overflow: 'hidden' }}>
          <span style={{ padding: '10px 16px', fontWeight: 700, fontSize: '13px', borderRight: '1px solid #e2e8f0' }}>Selecionados 3</span>
          <button onClick={() => alert('Contrato enviado para assinatura via DocuSign!')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>📤 Enviar Docusign</button>
          <button onClick={() => window.print()} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>⬇ Download PDF</button>
          <button onClick={() => navigate('/tela/wf-008-gestao-de-contratos-adicionar-contrato')} style={{ padding: '10px 16px', background: 'none', border: 'none', borderRight: '1px solid #e2e8f0', fontSize: '13px', cursor: 'pointer' }}>✎ Editar</button>
          <button style={{ padding: '10px 16px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer' }}>🗑 Excluir</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}></th>
              <th style={{ padding: '12px 14px' }}>User ID ↕</th>
              <th style={{ padding: '12px 14px' }}>Nome Parceiro Comercial ↕</th>
              <th style={{ padding: '12px 14px' }}>Tipo ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.contracts.map((group, idx) => (
              <React.Fragment key={idx}>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '14px' }}>⌄</td>
                  <td style={{ padding: '14px' }}>{group.partnerId}</td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={OFFICIAL_LOGO} alt="" style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #475467', padding: 2 }} />
                      <strong>{group.partnerName}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}><WfStatusPill status={group.type} /></td>
                </tr>
                {idx === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: '0 0 14px 48px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}><input type="checkbox" defaultChecked /></th>
                            <th style={{ padding: '10px' }}>Contrato ID ↕</th>
                            <th style={{ padding: '10px' }}>Nome Atração ↕</th>
                            <th style={{ padding: '10px' }}>Status ↕</th>
                            <th style={{ padding: '10px' }}>Data Expiração ↕</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.items.map((it, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                              <td style={{ padding: '10px' }}><input type="checkbox" defaultChecked /></td>
                              <td style={{ padding: '10px' }}>{it.id}</td>
                              <td style={{ padding: '10px', fontWeight: 700 }}>{it.atracao}</td>
                              <td style={{ padding: '10px' }}><WfStatusPill status={it.status} /></td>
                              <td style={{ padding: '10px' }}>{it.expiracao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>
    </div>
  );
}

// ============================================================================
// WF-009, WF-010, WF-011: CONFIGURAÇÕES COMERCIAIS + MODAIS
// ============================================================================
export function Wf009CommercialConfig({ store, modalMode = null }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Condições comerciais');

  return (
    <div style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', position: 'relative' }}>
      <WfSidebar mode="admin" activeMenu="condicoes" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Configurações Comerciais</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Gerencie as condições comerciais do sistema</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Enter search terms" style={{ width: '240px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 600 }}>Filtro ▽</button>
            <button onClick={() => navigate('/tela/wf-011-configuracoes-comerciais-informacao-financeira')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}>Adicionar informação financeira ⊕</button>
            <button onClick={() => navigate('/tela/wf-010-configuracoes-comerciais-condicao-comercial')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Adicionar condição ⊕</button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Condições comerciais', 'Informações financeiras', 'Ativos', 'Inativos', 'Todos'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}><input type="checkbox" defaultChecked /></th>
              <th style={{ padding: '12px' }}>ID ↕</th>
              <th style={{ padding: '12px' }}>Apelido ↕</th>
              <th style={{ padding: '12px' }}>Status ↕</th>
              <th style={{ padding: '12px' }}>Porcentagem/Valor ↕</th>
              <th style={{ padding: '12px' }}>Valor ↕</th>
              <th style={{ padding: '12px' }}>Tx C.Crédito a Vista ↕</th>
              <th style={{ padding: '12px' }}>Tx C.Crédito Parcelado ↕</th>
              <th style={{ padding: '12px' }}>Tx Pix ↕</th>
              <th style={{ padding: '12px' }}>Tx Antecipação ↕</th>
              <th style={{ padding: '12px' }}>Prazo pagamento ↕</th>
              <th style={{ padding: '12px' }}>Tx Internacional ↕</th>
            </tr>
          </thead>
          <tbody>
            {store.commercialConditions.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '12px' }}><input type="checkbox" defaultChecked={idx < 2} /></td>
                <td style={{ padding: '12px' }}>{c.id}</td>
                <td style={{ padding: '12px', fontWeight: 700 }}>{c.apelido}</td>
                <td style={{ padding: '12px' }}><WfStatusPill status={c.status} /></td>
                <td style={{ padding: '12px' }}><span style={{ border: '1px solid #475467', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>{c.tipo}</span></td>
                <td style={{ padding: '12px', fontWeight: 700 }}>{c.valor}</td>
                <td style={{ padding: '12px' }}>{c.txCreditoVista}</td>
                <td style={{ padding: '12px' }}>{c.txCreditoParcelado}</td>
                <td style={{ padding: '12px' }}>{c.txPix}</td>
                <td style={{ padding: '12px' }}>{c.txAntecipacao}</td>
                <td style={{ padding: '12px' }}>{c.prazoPagamento}</td>
                <td style={{ padding: '12px' }}>{c.txInternacional}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>

      {/* MODAL WF-010 / WF-011 */}
      {modalMode && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '18px', width: '100%', maxWidth: '680px', padding: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#3b4758', margin: 0 }}>
                  {modalMode === 'condicao' ? 'Nova Condições Comercial' : 'Nova Informação Financeira'}
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '4px 0 0 0' }}>
                  Preencha os campos obrigatórios para adicionar {modalMode === 'condicao' ? 'uma condição comercial' : 'uma informação financeira'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => navigate('/tela/wf-009-configuracoes-comerciais')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Descartar 🗑</button>
                <button onClick={() => navigate('/tela/wf-009-configuracoes-comerciais')} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Salvar ✓</button>
              </div>
            </div>

            {modalMode === 'condicao' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>ID da condição</label>
                  <input value="1234" readOnly style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#eef1f5', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Apelido</label>
                  <input defaultValue="Padrão 10%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Porcentagem/Valor</label>
                  <select style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4 }}><option>Porcentagem</option><option>Valor</option></select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Valor</label>
                  <input defaultValue="10%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Prazo pagamento (dias)</label>
                  <input defaultValue="15" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Tx. C.Crédito a Vista</label>
                  <input defaultValue="1,5%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Tx. C.Crédito Parcelado</label>
                  <input defaultValue="1,5%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Tx. Pix</label>
                  <input defaultValue="1,5%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>ID da informação financeira</label>
                  <input value="1234" readOnly style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#eef1f5', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Apelido</label>
                  <input defaultValue="Padrão 10%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Percentual liberado para saque</label>
                  <input defaultValue="10%" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Valor liberado para saque</label>
                  <input defaultValue="R$ 10.000,00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Desconto Pix</label>
                  <input defaultValue="R$ 0,15" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700 }}>Desconto TED</label>
                  <input defaultValue="R$ 0,15" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
