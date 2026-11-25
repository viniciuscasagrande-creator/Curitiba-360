// src/pages/CMSHomeCuradoria.jsx
import { useState } from 'react';

export default function CMSHomeCuradoria() {
  // RF-033.02: 4 abas principais
  const [abaAtiva, setAbaAtiva] = useState('Banners');

  // --- Mocks para Seção 1: Banners (RF-033.06) ---
  const [banners, setBanners] = useState([
    { id: 1, titulo: 'Férias em Curitiba', cta: 'Ver Pacotes', inicio: '01/07/2026', fim: '31/07/2026', status: 'Ativo', ordem: 1 },
    { id: 2, titulo: 'Tour Noturno', cta: 'Compre Agora', inicio: '10/07/2026', fim: '', status: 'Ativo', ordem: 2 },
  ]);

  // --- Mocks para Seção 2: Imperdíveis (RF-033.17 e RF-033.20) ---
  const [imperdiveis, setImperdiveis] = useState([
    { id: 1, nome: 'Jardim Botânico' },
    { id: 2, nome: 'Ópera de Arame' },
    { id: 3, nome: 'Museu Oscar Niemeyer (MON)' }
  ]);
  const maxImperdiveis = 6;

  // --- Mocks para Seção 3 e 4: Curadoria Google e Cross-sell ---
  const [configAtracoes, setConfigAtracoes] = useState([
    { id: 1, nome: 'Parque Barigui', googleModo: 'Automático', crossSellModo: 'Manual', sync: 'Diária', ultimaSync: '20/07/2026 02:00' },
    { id: 2, nome: 'Torre Panorâmica', googleModo: 'Manual', crossSellModo: 'Automático', sync: 'Semanal', ultimaSync: '18/07/2026 03:00' }
  ]);

  const handlePublicar = (e) => {
    e.preventDefault();
    // RF-033.05: Confirmação antes de publicar
    if (window.confirm('Deseja publicar as alterações imediatamente no Portal Público?')) {
      alert('Alterações publicadas com sucesso!');
    }
  };

  return (
    <div>
      {/* CABEÇALHO (RF-033.01 e RF-033.03) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Conteúdo {'>'} Home e Curadoria</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Curadoria da Home</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie banners, destaques e cross-sell do Portal Público.</p>
        </div>
        <button onClick={handlePublicar} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Salvar e Publicar
        </button>
      </div>

      {/* ABAS DE NAVEGAÇÃO (RF-033.02) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem', overflowX: 'auto' }}>
        {['Banners', 'Imperdíveis', 'Curadoria Google', 'Outras Atrações'].map(aba => (
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

      {/* ================= SEÇÃO 1: BANNERS ================= */}
      {abaAtiva === 'Banners' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Banners do Carrossel</h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Máximo de 5 banners ativos simultaneamente (RN-033.04).</p>
            </div>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Novo Banner
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '50px' }}>Ord.</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Preview</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Título</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Vigência</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', cursor: 'grab', color: '#6b7280' }}>☰ {b.ordem}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ width: '80px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{b.titulo}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{b.inicio} até {b.fim || 'Indeterminado'}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: b.status === 'Ativo' ? '#d1fae5' : '#fef3c7', color: b.status === 'Ativo' ? '#065f46' : '#92400e' }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', marginRight: '0.5rem' }}>Editar</button>
                    <button style={{ padding: '0.25rem 0.5rem', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= SEÇÃO 2: IMPERDÍVEIS ================= */}
      {abaAtiva === 'Imperdíveis' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Atrações Imperdíveis</h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            Selecione até {maxImperdiveis} atrações para destacar na Home (Atualmente: {imperdiveis.length}/{maxImperdiveis}).
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <input type="text" placeholder="Buscar atração..." style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button disabled={imperdiveis.length >= maxImperdiveis} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: imperdiveis.length >= maxImperdiveis ? 'not-allowed' : 'pointer', opacity: imperdiveis.length >= maxImperdiveis ? 0.5 : 1 }}>
              Adicionar
            </button>
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px' }}>
            {imperdiveis.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: idx < imperdiveis.length - 1 ? '1px solid #e5e7eb' : 'none', backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#6b7280', cursor: 'grab' }}>☰</span>
                  <span style={{ fontWeight: 'bold' }}>{idx + 1}. {item.nome}</span>
                </div>
                <button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Remover</button>
              </div>
            ))}
          </div>
          {imperdiveis.length === 0 && <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '1rem' }}>A seção "Imperdíveis" ficará oculta no portal por estar vazia.</p>}
        </div>
      )}

      {/* ================= SEÇÃO 3 e 4: GOOGLE E CROSS-SELL ================= */}
      {(abaAtiva === 'Curadoria Google' || abaAtiva === 'Outras Atrações') && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {abaAtiva === 'Curadoria Google' ? 'Avaliações do Google Places' : 'Sugestões de Outras Atrações'}
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atração</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Modo de Curadoria</th>
                {abaAtiva === 'Curadoria Google' && <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Sincronização</th>}
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {configAtracoes.map(config => (
                <tr key={config.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{config.nome}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <select 
                      value={abaAtiva === 'Curadoria Google' ? config.googleModo : config.crossSellModo} 
                      onChange={() => {}} 
                      style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                      <option value="Automático">Automático</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </td>
                  {abaAtiva === 'Curadoria Google' && (
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>
                      <select value={config.sync} onChange={() => {}} style={{ padding: '0.2rem', marginRight: '0.5rem', borderRadius: '4px' }}>
                        <option value="Diária">Diária</option>
                        <option value="Semanal">Semanal</option>
                      </select>
                      <span style={{ color: '#6b7280' }}>Última: {config.ultimaSync}</span>
                    </td>
                  )}
                  <td style={{ padding: '0.75rem' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
                      Configurar Seleção
                    </button>
                    {(abaAtiva === 'Outras Atrações' && config.crossSellModo === 'Manual') && (
                      <button style={{ padding: '0.25rem 0.5rem', marginLeft: '0.5rem', color: '#6b7280', border: 'none', background: 'none', cursor: 'pointer' }}>
                        Limpar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
