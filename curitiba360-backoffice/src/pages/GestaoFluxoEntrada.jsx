// src/pages/GestaoFluxoEntrada.jsx
import { useState } from 'react';

export default function GestaoFluxoEntrada() {
  const [abaAtiva, setAbaAtiva] = useState('Equipamentos');
  const [atracaoSelecionada, setAtracaoSelecionada] = useState('Parque Jaime Lerner');

  // Mocks de Equipamentos (Catracas e Leitores Manuais)
  const [equipamentos, setEquipamentos] = useState([
    { id: 'EQ-001', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão A', status: 'Online', ultimaSincronizacao: 'Agora' },
    { id: 'EQ-002', tipo: 'Catraca Fixa', local: 'Acesso Principal - Portão B', status: 'Online', ultimaSincronizacao: 'Há 2 min' },
    { id: 'EQ-005', tipo: 'Leitor Móvel (App)', local: 'Fila VIP / Preferencial', status: 'Offline', ultimaSincronizacao: 'Há 2 horas' },
  ]);

  // Mocks de Configuração de Filas e Espaço Físico
  const [configFilas, setConfigFilas] = useState({
    capacidadeAreaTriagem: 150,
    tempoMedioValidacao: 8, // segundos
    exigirControleBarreiras: true,
    layout: 'Zigue-zague contínuo'
  });

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Fluxo de Entrada</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Configure equipamentos de validação e a organização das linhas de acesso físico.</p>
        </div>
        <div>
          <select 
            value={atracaoSelecionada} 
            onChange={(e) => setAtracaoSelecionada(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#f9fafb' }}
          >
            <option value="Parque Jaime Lerner">Parque Jaime Lerner</option>
            <option value="Ópera de Arame">Ópera de Arame</option>
            <option value="Jardim Botânico">Jardim Botânico</option>
          </select>
        </div>
      </div>

      {/* ABAS */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        {['Equipamentos', 'Organização de Filas (Layout)'].map(aba => (
          <button 
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{ 
              padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: abaAtiva === aba ? 'bold' : 'normal',
              borderBottom: abaAtiva === aba ? '2px solid #3b82f6' : '2px solid transparent',
              color: abaAtiva === aba ? '#1e3a8a' : '#6b7280'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* CONTEÚDO: EQUIPAMENTOS */}
      {abaAtiva === 'Equipamentos' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dispositivos Conectados</h2>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              + Novo Equipamento
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID do Aparelho</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tipo</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Localização (Ponto de Checagem)</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status da Rede</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((eq) => (
                <tr key={eq.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#4b5563' }}>{eq.id}</td>
                  <td style={{ padding: '0.75rem' }}>{eq.tipo}</td>
                  <td style={{ padding: '0.75rem' }}>{eq.local}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: eq.status === 'Online' ? '#10b981' : '#ef4444' }}></span>
                      <span style={{ fontWeight: 'bold', color: eq.status === 'Online' ? '#065f46' : '#991b1b' }}>{eq.status}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Sinc.: {eq.ultimaSincronizacao}</div>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Configurar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CONTEÚDO: ORGANIZAÇÃO DE FILAS E ESPAÇO FÍSICO */}
      {abaAtiva === 'Organização de Filas (Layout)' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Parâmetros do Espaço Físico</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Defina as regras operacionais para a recepção dos turistas nesta atração.</p>

          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Controle de Barreiras</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={configFilas.exigirControleBarreiras}
                    onChange={(e) => setConfigFilas({...configFilas, exigirControleBarreiras: e.target.checked})}
                    style={{ marginTop: '0.25rem', width: '1.2rem', height: '1.2rem' }}
                  />
                  <div>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>Contenção Estrita via Uni Filas</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Sinaliza para a equipe em solo que os visitantes devem se movimentar obrigatoriamente dentro do espaço delimitado pelo uni fila, não sendo permitido atravessar as barreiras.
                    </span>
                  </div>
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Layout da Fila de Triagem</label>
                <select 
                  value={configFilas.layout}
                  onChange={(e) => setConfigFilas({...configFilas, layout: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="Zigue-zague contínuo">Zigue-zague contínuo</option>
                  <option value="Linha reta simples">Linha reta simples</option>
                  <option value="Múltiplos guichês independentes">Múltiplos guichês independentes</option>
                </select>
              </div>
            </div>

            <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Métricas Operacionais</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Capacidade da Área de Triagem (Pessoas)</label>
                <input 
                  type="number" 
                  value={configFilas.capacidadeAreaTriagem}
                  onChange={(e) => setConfigFilas({...configFilas, capacidadeAreaTriagem: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Tempo Médio de Validação Estimado (seg)</label>
                <input 
                  type="number" 
                  value={configFilas.tempoMedioValidacao}
                  onChange={(e) => setConfigFilas({...configFilas, tempoMedioValidacao: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>* Usado pelo painel Analytics para calcular a vazão da atração.</p>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <button type="button" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Salvar Regras de Fluxo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
