// src/pages/GestaoFluxoEntrada.jsx
import { useState, useEffect } from 'react';
import { fluxoService } from '../services/fluxoService';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';

export default function GestaoFluxoEntrada() {
  const [abaAtiva, setAbaAtiva] = useState('Equipamentos');
  const [atracaoSelecionada, setAtracaoSelecionada] = useState('Parque Jaime Lerner');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [saving, setSaving] = useState(false);

  // Mocks de Equipamentos (Catracas e Leitores Manuais)
  const [equipamentos, setEquipamentos] = useState([]);

  // Mocks de Configuração de Filas e Espaço Físico
  const [configFilas, setConfigFilas] = useState({
    capacidadeAreaTriagem: 150,
    tempoMedioValidacao: 8, // segundos
    exigirControleBarreiras: true,
    layout: 'Zigue-zague contínuo',
    regrasOperacionais: ''
  });

  // Carregar dados da API simulada ao montar ou mudar a atração selecionada
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErro('');
    
    fluxoService.buscarConfiguracao(atracaoSelecionada)
      .then(response => {
        if (isMounted) {
          setConfigFilas({
            capacidadeAreaTriagem: response.data.capacidadeAreaTriagem,
            tempoMedioValidacao: response.data.tempoMedioValidacao,
            exigirControleBarreiras: response.data.exigirControleBarreiras,
            layout: response.data.layout,
            regrasOperacionais: response.data.regrasOperacionais
          });
          setEquipamentos(response.data.equipamentos);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setErro('Não foi possível carregar as configurações de fluxo.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [atracaoSelecionada]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fluxoService.salvarConfiguracao(configFilas);
      if (response.status === 200) {
        alert('Regras de fluxo e layout físico salvas com sucesso no servidor!');
      }
    } catch (err) {
      alert('Ocorreu um erro ao salvar as configurações.');
    } finally {
      setSaving(false);
    }
  };

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
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#f9fafb', outline: 'none' }}
          >
            <option value="Parque Jaime Lerner">Parque Jaime Lerner</option>
            <option value="Ópera de Arame">Ópera de Arame</option>
            <option value="Jardim Botânico">Jardim Botânico</option>
          </select>
        </div>
      </div>

      {/* ABAS */}
      <Tabs 
        options={['Equipamentos', 'Organização de Filas (Layout)']} 
        activeTab={abaAtiva} 
        onChange={setAbaAtiva} 
      />

      {loading ? (
        /* SKELETON LOADING PREMIUM */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            border: '3px solid #f3f4f6', 
            borderTopColor: '#10b981', 
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{ fontSize: '1rem', color: '#4b5563', fontWeight: '500' }}>Carregando dados da atração via rede...</span>
        </div>
      ) : erro ? (
        <div style={{ padding: '2rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fca5a5', textAlign: 'center' }}>
          {erro}
        </div>
      ) : (
        <>
          {/* CONTEÚDO: EQUIPAMENTOS */}
          {abaAtiva === 'Equipamentos' && (
            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dispositivos Conectados</h2>
                <Button variant="primary" onClick={() => alert('Novo equipamento')}>
                  + Novo Equipamento
                </Button>
              </div>

              <Table columns={['ID do Aparelho', 'Tipo', 'Localização (Ponto de Checagem)', 'Status da Rede', 'Ações']}>
                {equipamentos.map((eq) => (
                  <tr key={eq.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#4b5563' }}>{eq.id}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{eq.tipo}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{eq.local}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ height: '10px', width: '10px', borderRadius: '50%', backgroundColor: eq.status === 'Online' ? '#10b981' : '#ef4444' }}></span>
                        <span style={{ fontWeight: 'bold', color: eq.status === 'Online' ? '#065f46' : '#991b1b' }}>{eq.status}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Sinc.: {eq.ultimaSincronizacao}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <Button variant="outline" onClick={() => alert(`Configurando equipamento ${eq.id}`)}>
                        Configurar
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          )}

          {/* CONTEÚDO: ORGANIZAÇÃO DE FILAS E ESPAÇO FÍSICO */}
          {abaAtiva === 'Organização de Filas (Layout)' && (
            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Parâmetros do Espaço Físico</h2>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Defina as regras operacionais para a recepção dos turistas nesta atração.</p>

              <form onSubmit={handleSalvar} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
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
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
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
                      onChange={(e) => setConfigFilas({...configFilas, capacidadeAreaTriagem: parseInt(e.target.value) || 0})}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Tempo Médio de Validação Estimado (seg)</label>
                    <input 
                      type="number" 
                      value={configFilas.tempoMedioValidacao}
                      onChange={(e) => setConfigFilas({...configFilas, tempoMedioValidacao: parseInt(e.target.value) || 0})}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>* Usado pelo painel Analytics para calcular a vazão da atração.</p>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Regras Operacionais Complementares</label>
                  <textarea 
                    value={configFilas.regrasOperacionais || ''}
                    onChange={(e) => setConfigFilas({...configFilas, regrasOperacionais: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.875rem', minHeight: '80px', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? 'Salvando...' : 'Salvar Regras de Fluxo'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
