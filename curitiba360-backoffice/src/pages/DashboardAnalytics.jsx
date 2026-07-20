// src/pages/DashboardAnalytics.jsx
import { useState } from 'react';

export default function DashboardAnalytics() {
  const [periodo, setPeriodo] = useState('30 Dias');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  // Mock de dados analíticos
  const visitas = 24500;
  const adicionadosAoCarrinho = 8200;
  const checkoutsIniciados = 4300;
  const ingressosEmitidos = 1540;

  // Taxas de conversão (funil)
  const txCarrinho = ((adicionadosAoCarrinho / visitas) * 100).toFixed(1);
  const txCheckout = ((checkoutsIniciados / adicionadosAoCarrinho) * 100).toFixed(1);
  const txEmissao = ((ingressosEmitidos / checkoutsIniciados) * 100).toFixed(1);
  const txConversaoFinal = ((ingressosEmitidos / visitas) * 100).toFixed(1);

  // Fluxo de público por horário (Simulado)
  const picoHorarios = [
    { hora: '08:00', percent: 15 },
    { hora: '10:00', percent: 45 },
    { hora: '12:00', percent: 60 },
    { hora: '14:00', percent: 95 }, // Pico da tarde
    { hora: '16:00', percent: 80 },
    { hora: '18:00', percent: 30 }
  ];

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gráficos & Analytics (RF-023)</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Monitore o funil de vendas, taxas de conversão de compras e fluxos de pico de público nas atrações</p>
        </div>

        {/* FILTRO PERÍODO */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '0.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {['Hoje', '7 Dias', '30 Dias', 'Personalizado'].map(p => (
            <button 
              key={p} 
              onClick={() => setPeriodo(p)} 
              style={{ 
                padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: periodo === p ? '#3b82f6' : 'transparent',
                color: periodo === p ? 'white' : '#374151',
                fontWeight: periodo === p ? 'bold' : 'normal'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {periodo === 'Personalizado' && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <span>até</span>
          <input type="date" value={dataFinal} onChange={e => setDataFinal(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        
        {/* GRÁFICO 1: FUNIL DE CONVERSÃO */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Funil de Vendas (E-commerce)</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Visualizadores de Funil com Barras coloridas */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>1. Visitas no Portal Público</span>
                <strong>{visitas.toLocaleString('pt-BR')} (100%)</strong>
              </div>
              <div style={{ width: '100%', height: '24px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#3b82f6' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>2. Ingressos Adicionados ao Carrinho</span>
                <strong>{adicionadosAoCarrinho.toLocaleString('pt-BR')} ({txCarrinho}%)</strong>
              </div>
              <div style={{ width: '100%', height: '24px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${txCarrinho}%`, height: '100%', background: '#10b981' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>3. Checkout / Preenchimento de Dados</span>
                <strong>{checkoutsIniciados.toLocaleString('pt-BR')} ({txCheckout}% do carrinho)</strong>
              </div>
              <div style={{ width: '100%', height: '24px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(checkoutsIniciados / visitas) * 100}%`, height: '100%', background: '#f59e0b' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <span>4. Ingressos Pagos e Emitidos</span>
                <strong>{ingressosEmitidos.toLocaleString('pt-BR')} ({txEmissao}% do checkout)</strong>
              </div>
              <div style={{ width: '100%', height: '24px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${txConversaoFinal}%`, height: '100%', background: '#8b5cf6' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Visitas para Compra</span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#8b5cf6' }}>{txConversaoFinal}%</h4>
            </div>
            <div>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Carrinho Abandonado</span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#ef4444' }}>{(100 - parseFloat(txCheckout)).toFixed(1)}%</h4>
            </div>
          </div>
        </div>

        {/* GRÁFICO 2: PICO DE PÚBLICO (Horários) */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Picos de Visitação (Fluxo Médio)</h3>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '220px', paddingBottom: '1rem', borderBottom: '2px solid #e5e7eb' }}>
            {picoHorarios.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}>
                <div 
                  style={{ 
                    width: '24px', 
                    height: `${(item.percent / 100) * 160}px`, 
                    backgroundColor: item.percent >= 80 ? '#ef4444' : item.percent >= 50 ? '#f59e0b' : '#3b82f6', 
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                  title={`${item.percent}% de ocupação máxima`}
                ></div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem', fontWeight: 'bold' }}>{item.hora}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.4' }}>
            <p style={{ margin: 0 }}>💡 <strong>Dica da Portaria:</strong> O pico de visitação nas atrações ocorre por volta das <strong>14:00</strong>. Recomendamos liberar lotes promocionais ou descontos para o horário matutino (ex: 08:00) para distribuir melhor o fluxo de público.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
