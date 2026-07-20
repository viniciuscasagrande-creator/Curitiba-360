// src/pages/CentralNotificacoes.jsx
import { useState } from 'react';

export default function CentralNotificacoes() {
  // RF-034.02: 4 abas principais
  const [abaAtiva, setAbaAtiva] = useState('Templates');

  // --- Mocks para as abas ---
  const [templates, setTemplates] = useState([
    { id: 1, nome: 'Bem-vindo ao Curitiba 360', tipo: 'E-mail', evento: 'Boas-vindas', status: 'Ativo', ultimaEdicao: '10/07/2026' },
    { id: 2, nome: 'Lembrete de Visita - Amanhã', tipo: 'Ambos', evento: 'Lembrete de Visita', status: 'Ativo', ultimaEdicao: '12/07/2026' },
    { id: 3, nome: 'Promoção de Inverno', tipo: 'Push', evento: 'Promoção / Oferta Especial', status: 'Inativo', ultimaEdicao: '15/07/2026' },
  ]);

  const [regras, setRegras] = useState([
    { id: 1, evento: 'Compra Confirmada', canal: 'E-mail', template: 'Confirmação Padrão', delay: 'Imediato', consentimento: 'Obrigatório', status: 'Ativa' },
    { id: 2, evento: 'Lembrete de Visita', canal: 'Ambos', template: 'Lembrete de Visita - Amanhã', delay: '1 dia antes', consentimento: 'Respeita consentimento', status: 'Ativa' },
  ]);

  const [campanhas, setCampanhas] = useState([
    { id: 1, nome: 'Férias de Julho', tipo: 'E-mail', status: 'Enviada', dataEnvio: '01/07/2026 10:00', enviados: 15200, taxaAbertura: '45%' },
    { id: 2, nome: 'Desconto Fim de Semana', tipo: 'Push', status: 'Agendada', dataEnvio: '25/07/2026 18:00', enviados: '-', taxaAbertura: '-' },
    { id: 3, nome: 'Pesquisa de Satisfação', tipo: 'E-mail', status: 'Rascunho', dataEnvio: '-', enviados: '-', taxaAbertura: '-' },
  ]);

  return (
    <div>
      {/* CABEÇALHO E PAINEL DE STATUS (RF-034.01, RF-034.03 e RF-034.04) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Central de Notificações</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie templates, campanhas e envios para os turistas.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status do Serviço:</span>
          <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.875rem' }}>
            ● Operacional
          </span>
        </div>
      </div>

      {/* PAINEL DE RESUMO (RF-034.03) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Envios neste Mês</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>45.230</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Taxa Média Abertura (E-mail)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>42.5%</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Taxa Média Entrega (Push)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>98.1%</p>
        </div>
      </div>

      {/* ABAS DE NAVEGAÇÃO (RF-034.02) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem', overflowX: 'auto' }}>
        {['Templates', 'Regras de Disparo', 'Campanhas', 'Histórico de Envios'].map(aba => (
          <button 
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{ 
              padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              fontWeight: abaAtiva === aba ? 'bold' : 'normal',
              borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
              color: abaAtiva === aba ? '#111827' : '#6b7280'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* ================= ABA 1: TEMPLATES ================= */}
      {abaAtiva === 'Templates' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <input type="text" placeholder="Buscar template..." style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }} />
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Novo Template
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tipo</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Evento Associado</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Última Edição</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{t.nome}</td>
                  <td style={{ padding: '0.75rem' }}>{t.tipo}</td>
                  <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>{t.evento}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: t.status === 'Ativo' ? '#d1fae5' : '#f3f4f6', color: t.status === 'Ativo' ? '#065f46' : '#374151' }}>{t.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{t.ultimaEdicao}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', marginRight: '0.5rem' }}>Editar</button>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Duplicar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ABA 2: REGRAS DE DISPARO ================= */}
      {abaAtiva === 'Regras de Disparo' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Automação de Envios</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Evento (Gatilho)</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Canal</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Template Aplicado</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Delay</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Consentimento LGPD</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {regras.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{r.evento}</td>
                  <td style={{ padding: '0.75rem' }}>{r.canal}</td>
                  <td style={{ padding: '0.75rem', color: '#3b82f6', fontSize: '0.875rem' }}>{r.template}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{r.delay}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: r.consentimento === 'Obrigatório' ? '#fee2e2' : '#d1fae5', color: r.consentimento === 'Obrigatório' ? '#991b1b' : '#065f46' }}>{r.consentimento}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button style={{ padding: '0.25rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', backgroundColor: r.status === 'Ativa' ? '#10b981' : '#ef4444', color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>
                      {r.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ABA 3: CAMPANHAS ================= */}
      {abaAtiva === 'Campanhas' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Campanhas e Broadcasts</h2>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Nova Campanha
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome da Campanha</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tipo</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data Envio</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Enviados</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Abertura</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{c.nome}</td>
                  <td style={{ padding: '0.75rem' }}>{c.tipo}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: c.status === 'Enviada' ? '#d1fae5' : c.status === 'Agendada' ? '#dbeafe' : '#f3f4f6', color: c.status === 'Enviada' ? '#065f46' : c.status === 'Agendada' ? '#1e40af' : '#374151' }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{c.dataEnvio}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{c.enviados}</td>
                  <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{c.taxaAbertura}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {c.status === 'Agendada' && <button style={{ padding: '0.25rem 0.5rem', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Cancelar</button>}
                    {c.status === 'Rascunho' && <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Editar</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ABA 4: HISTÓRICO DE ENVIOS ================= */}
      {abaAtiva === 'Histórico de Envios' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          <p>Área de listagem de log individual de disparos (RF-034.38).</p>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', marginTop: '1rem' }}>📄 Exportar CSV Completo</button>
        </div>
      )}
    </div>
  );
}
