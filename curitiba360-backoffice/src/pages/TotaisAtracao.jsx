// src/pages/TotaisAtracao.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TotaisAtracao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filtroTempo, setFiltroTempo] = useState('Tudo');

  // Mapeamento estrutural dos cards conforme WF-003
  const metricsData = [
    {
      id: 1, title: 'Ingressos Vendidos', subtitle: 'Ingressos Vendidos no período', icon: '💰',
      mainBox: { label: 'Quantidade de Ingressos', value: '224', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Valor das Vendas', value: 'R$ 3.900,00' },
        { label: 'Ticket Médio', value: 'R$ 17,41', badge: '⭐ Acima da meta' }
      ]
    },
    {
      id: 2, title: 'Ingressos Emitidos', subtitle: 'Ingressos Emitidos no período', icon: '🎫',
      mainBox: { label: 'Quantidade de Ingressos', value: '224', subtext: 'Unidades Emitidas', trend: '+8%' },
      subBoxes: [
        { label: 'Cortesias', value: '2' },
        { label: 'Total', value: '226' }
      ]
    },
    {
      id: 3, title: 'Ingressos Reservados', subtitle: 'Ingressos Reservados no período', icon: '💾',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Reservados', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: 'R$ 3.900,00' }, // Conforme dummy data do mockup
        { label: 'Total', value: 'R$ 17,41' }
      ]
    },
    {
      id: 4, title: 'Ingressos Validação', subtitle: 'Ingressos Validados no período', icon: '✓',
      mainBox: { label: 'Quantidade de Ingressos', value: '224', subtext: 'Unidades Validados', trend: '+8%' },
      subBoxes: [
        { label: 'Validados', value: '2', hasBar: true },
        { label: 'Pendentes', value: '226' }
      ]
    },
    {
      id: 5, title: 'Vendas no Dinheiro', subtitle: 'Vendas em dinheiro no período', icon: '💵',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    },
    {
      id: 6, title: 'Vendas no C. Débito', subtitle: 'Vendas no cartão débito no período', icon: '💳',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    },
    {
      id: 7, title: 'Vendas no C. Crédito', subtitle: 'Vendas no cartão crédito no período', icon: '💳',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    },
    {
      id: 8, title: 'Vendas no C. Crédito Parcelado', subtitle: 'Vendas no cartão crédito no período', icon: '💳',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    },
    {
      id: 9, title: 'Vendas no PIX', subtitle: 'Vendas no Pix no período', icon: '💠',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    },
    {
      id: 10, title: 'Vendas por depósito, TED, etc...', subtitle: 'Vendas por depósito no período', icon: '🏛️',
      mainBox: { label: 'Quantidade de Ingressos', value: '0', subtext: 'Unidades Vendidas', trend: '+8%' },
      subBoxes: [
        { label: 'Quantidade', value: '125' },
        { label: 'Total', value: 'R$ 2.125,00' }
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho da Atração */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <button 
          onClick={() => navigate('/atracoes')}
          style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem', fontWeight: 'bold' }}
        >
          ← Voltar para Atrações
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 1rem 0' }}>
          Atração: Parque Jaime Lerner
        </h1>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => navigate(`/atracoes/${id}/totais`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', fontWeight: '600', color: '#10b981', borderBottom: '3px solid #10b981' }}>📊 Totais</button>
          <button onClick={() => navigate(`/atracoes/${id}/ingressos`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>🎫 Ingressos</button>
          <button onClick={() => navigate(`/atracoes/${id}/cupons`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>🎟️ Cupons</button>
          <button onClick={() => navigate(`/atracoes/${id}/relatorios`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>💰 Financeiro & Relatórios</button>
        </div>
      </div>

      {/* Filtros de Data */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['Tudo', 'Hoje', '7 Dias', '30 Dias', '📅 Período'].map((filtro) => {
          const isActive = filtroTempo === filtro;
          return (
            <button 
              key={filtro}
              onClick={() => setFiltroTempo(filtro)}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: isActive ? '#4b5563' : '#f3f4f6',
                color: isActive ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {filtro}
            </button>
          )
        })}
      </div>

      {/* Grid de Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {metricsData.map((metric) => (
          <div key={metric.id} style={{ border: '1px solid #d1d5db', borderRadius: '12px', padding: '1.5rem', backgroundColor: 'white' }}>
            
            {/* Header do Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #fcd34d', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffbeb', fontSize: '1.25rem' }}>
                {metric.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#374151' }}>{metric.title}</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{metric.subtitle}</p>
              </div>
            </div>

            {/* Main Data Box */}
            <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem', backgroundColor: '#f9fafb', marginBottom: '1rem', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#d97706', fontWeight: 'bold', fontSize: '0.875rem' }}>
                {metric.mainBox.trend}
              </span>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>{metric.mainBox.label}</p>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#374151' }}>{metric.mainBox.value}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>{metric.mainBox.subtext}</p>
            </div>

            {/* Sub Boxes Row */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {metric.subBoxes.map((sub, index) => (
                <div key={index} style={{ flex: 1, border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem', backgroundColor: '#f9fafb' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>{sub.label}</p>
                  <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>{sub.value}</p>
                  
                  {/* Tratativas especiais (Badge e Barra de Progresso) conforme o design */}
                  {sub.badge && (
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.75rem', color: '#d97706', fontWeight: 'bold' }}>
                      {sub.badge}
                    </span>
                  )}
                  {sub.hasBar && (
                    <div style={{ marginTop: '0.5rem', width: '100%', height: '4px', backgroundColor: '#d1d5db', borderRadius: '2px' }}>
                      <div style={{ width: '10%', height: '100%', backgroundColor: '#4b5563', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}