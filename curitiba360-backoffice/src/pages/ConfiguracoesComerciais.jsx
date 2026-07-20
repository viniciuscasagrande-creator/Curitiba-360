// src/pages/ConfiguracoesComerciais.jsx
import { useState } from 'react';

export default function ConfiguracoesComerciais() {
  const [abaPrincipal, setAbaPrincipal] = useState('Condicoes'); // 'Condicoes' ou 'Financeiro'

  // Mocks RF-010 e RF-011
  const condicoes = [
    { id: 1, apelido: 'Padrão V1', tipo: 'Porcentagem', valor: 15, ccVista: 3.5, ccParcelado: 4.5, pix: 1.0, status: 'Ativo' }
  ];
  
  const informacoes = [
    { id: 1, apelido: 'Saque Rápido', liberado: 'Sim', pctLiberado: 100, valorMax: 50000, tempoMin: 2, descontoPix: 'Não', status: 'Ativo' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Configurações Comerciais</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as taxas e regras financeiras vinculadas aos contratos</p>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        <button onClick={() => setAbaPrincipal('Condicoes')} style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: abaPrincipal === 'Condicoes' ? 'bold' : 'normal', borderBottom: abaPrincipal === 'Condicoes' ? '2px solid #10b981' : 'none' }}>
          Condições Comerciais
        </button>
        <button onClick={() => setAbaPrincipal('Financeiro')} style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer', fontWeight: abaPrincipal === 'Financeiro' ? 'bold' : 'normal', borderBottom: abaPrincipal === 'Financeiro' ? '2px solid #10b981' : 'none' }}>
          Informações Financeiras
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            {abaPrincipal === 'Condicoes' ? '+ Nova Condição' : '+ Nova Informação Financeira'}
          </button>
        </div>
        
        {abaPrincipal === 'Condicoes' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', fontSize: '0.875rem' }}>
              <tr>
                <th style={{ padding: '0.75rem' }}>ID / Apelido</th>
                <th style={{ padding: '0.75rem' }}>Taxa Base</th>
                <th style={{ padding: '0.75rem' }}>C.C. Vista / Parcelado</th>
                <th style={{ padding: '0.75rem' }}>PIX</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {condicoes.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><strong>#{c.id}</strong> {c.apelido}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{c.valor}{c.tipo === 'Porcentagem' ? '%' : ' R$'}</td>
                  <td style={{ padding: '0.75rem' }}>{c.ccVista}% / {c.ccParcelado}%</td>
                  <td style={{ padding: '0.75rem' }}>{c.pix}%</td>
                  <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', fontSize: '0.875rem' }}>
              <tr>
                <th style={{ padding: '0.75rem' }}>Apelido</th>
                <th style={{ padding: '0.75rem' }}>Saque Liberado</th>
                <th style={{ padding: '0.75rem' }}>Max Saque (R$)</th>
                <th style={{ padding: '0.75rem' }}>Tempo Mín. (Dias)</th>
              </tr>
            </thead>
            <tbody>
              {informacoes.map(i => (
                <tr key={i.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{i.apelido}</td>
                  <td style={{ padding: '0.75rem' }}>{i.pctLiberado}% ({i.liberado})</td>
                  <td style={{ padding: '0.75rem' }}>R$ {i.valorMax}</td>
                  <td style={{ padding: '0.75rem' }}>{i.tempoMin} dias</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
