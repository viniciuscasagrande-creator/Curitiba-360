// src/pages/GestaoContratos.jsx
import React, { useState } from 'react';

export default function GestaoContratos() {
  const [expandidos, setExpandidos] = useState([]);

  // Mock: Parceiros com seus contratos aninhados (RF-008.06 a RF-008.11)
  const parceiros = [
    {
      id: 101, nome: 'Parque Jaime Lerner S/A', tipo: 'Parceiro Comercial',
      contratos: [
        { id: 5001, atracao: 'Jardim Botânico', status: 'Ativo', expiracao: '31/12/2027' },
        { id: 5002, atracao: 'Ópera de Arame', status: 'Aguardando Envio', expiracao: '-' }
      ]
    },
    {
      id: 102, nome: 'Tour CWB', tipo: 'Agência',
      contratos: [
        { id: 5003, atracao: 'Todas as Atrações', status: 'Enviado a Docusign', expiracao: '-' }
      ]
    }
  ];

  const toggleExpand = (id) => {
    if (expandidos.includes(id)) setExpandidos(expandidos.filter(eId => eId !== id));
    else setExpandidos([...expandidos, id]);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Contratos</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Acompanhe as assinaturas via DocuSign</p>
        </div>
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          + Adicionar Contrato
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem' }}></th>
              <th style={{ padding: '0.75rem' }}>ID Parceiro/Agência</th>
              <th style={{ padding: '0.75rem' }}>Nome</th>
              <th style={{ padding: '0.75rem' }}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {parceiros.map(p => (
              <React.Fragment key={p.id}>
                <tr style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer', background: expandidos.includes(p.id) ? '#f9fafb' : 'white' }} onClick={() => toggleExpand(p.id)}>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{expandidos.includes(p.id) ? '▼' : '▶'}</td>
                  <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{p.id}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.nome}</td>
                  <td style={{ padding: '0.75rem' }}>{p.tipo}</td>
                </tr>
                {/* Linha expandida com os contratos */}
                {expandidos.includes(p.id) && (
                  <tr>
                    <td colSpan="4" style={{ padding: '1rem 2rem', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '4px', overflow: 'hidden' }}>
                        <thead style={{ background: '#e5e7eb', fontSize: '0.875rem' }}>
                          <tr>
                            <th style={{ padding: '0.5rem' }}><input type="checkbox" /></th>
                            <th style={{ padding: '0.5rem' }}>Contrato ID</th>
                            <th style={{ padding: '0.5rem' }}>Atração</th>
                            <th style={{ padding: '0.5rem' }}>Status</th>
                            <th style={{ padding: '0.5rem' }}>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.contratos.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                              <td style={{ padding: '0.5rem' }}><input type="checkbox" /></td>
                              <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>#{c.id}</td>
                              <td style={{ padding: '0.5rem' }}>{c.atracao}</td>
                              <td style={{ padding: '0.5rem', fontWeight: 'bold', color: c.status === 'Ativo' ? '#10b981' : '#3b82f6' }}>{c.status}</td>
                              <td style={{ padding: '0.5rem' }}>
                                {c.status === 'Aguardando Envio' && <button style={{ padding: '0.2rem 0.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Enviar DocuSign</button>}
                              </td>
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
      </div>
    </div>
  );
}
