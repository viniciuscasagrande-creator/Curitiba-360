// src/pages/DashboardAnalytics.jsx
import { useState } from 'react';

export default function DashboardAnalytics() {
  const [periodo, setPeriodo] = useState('Este Mês');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard Analytics Central</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Visão geral do desempenho de vendas e operações do sistema</p>
        </div>
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="Hoje">Hoje</option>
          <option value="Últimos 7 Dias">Últimos 7 Dias</option>
          <option value="Este Mês">Este Mês</option>
          <option value="Este Ano">Este Ano</option>
        </select>
      </div>
      
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Receita Total</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>R$ 125.430,00</p>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>↑ 12.5% em relação ao período anterior</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingressos Vendidos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>3.450</p>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>↑ 8.2% em relação ao período anterior</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Agentes Ativos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>142</p>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>De um total de 200 cadastrados</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Taxa de Conversão</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>8.5%</p>
          <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>↓ 1.2% em relação ao período anterior</span>
        </div>
      </div>
      
      {/* Top Atrações e Gráfico Simulado */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Desempenho de Vendas (Simulação)</h3>
          <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ flex: 1, backgroundColor: '#bfdbfe', height: '40%', borderRadius: '4px 4px 0 0', position: 'relative' }} title="Semana 1"></div>
            <div style={{ flex: 1, backgroundColor: '#93c5fd', height: '60%', borderRadius: '4px 4px 0 0', position: 'relative' }} title="Semana 2"></div>
            <div style={{ flex: 1, backgroundColor: '#60a5fa', height: '80%', borderRadius: '4px 4px 0 0', position: 'relative' }} title="Semana 3"></div>
            <div style={{ flex: 1, backgroundColor: '#3b82f6', height: '100%', borderRadius: '4px 4px 0 0', position: 'relative' }} title="Semana 4"></div>
            <div style={{ flex: 1, backgroundColor: '#2563eb', height: '75%', borderRadius: '4px 4px 0 0', position: 'relative' }} title="Semana 5"></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: '#6b7280', fontSize: '0.75rem' }}>
            <span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span><span>Sem 5</span>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Top Atrações</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontWeight: 'bold' }}>1. Ópera de Arame</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>R$ 45k</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontWeight: 'bold' }}>2. Jardim Botânico</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>R$ 38k</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontWeight: 'bold' }}>3. Pq. Jaime Lerner</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>R$ 25k</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
              <span style={{ fontWeight: 'bold' }}>4. Museu Niemeyer</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>R$ 17k</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
