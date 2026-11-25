// src/pages/GestaoFluxoEntrada.jsx
import { useState, useEffect } from 'react';
import { fluxoService } from '../services/fluxoService';
import Button from '../components/ui/Button';

export default function GestaoFluxoEntrada() {
  const [abaAtiva, setAbaAtiva] = useState('Organização de Filas (Layout)');
  const [atracaoSelecionada, setAtracaoSelecionada] = useState('Parque Jaime Lerner');
  
  // Estados para gerenciar os dados da API
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [equipamentos, setEquipamentos] = useState([]);
  const [configFilas, setConfigFilas] = useState(null);

  // useEffect atua como o "ComponentDidMount" - executa assim que a tela abre ou a atração muda
  useEffect(() => {
    async function carregarDados() {
      setLoading(true); // Inicia o estado de carregamento
      
      try {
        const response = await fluxoService.buscarConfiguracao(atracaoSelecionada);
        
        // Atualiza os estados com os dados vindos do nosso "backend"
        setConfigFilas({
          capacidadeAreaTriagem: response.data.capacidadeAreaTriagem,
          tempoMedioValidacao: response.data.tempoMedioValidacao,
          exigirControleBarreiras: response.data.exigirControleBarreiras,
          layout: response.data.layout,
          regrasOperacionais: response.data.regrasOperacionais
        });
        setEquipamentos(response.data.equipamentos);
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Falha ao carregar as configurações do fluxo de entrada.");
      } finally {
        setLoading(false); // Finaliza o carregamento, independente de dar erro ou sucesso
      }
    }

    carregarDados();
  }, [atracaoSelecionada]); // Se o usuário trocar a atração no select, o useEffect roda novamente

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      await fluxoService.salvarConfiguracao(configFilas);
      alert('Regras de fluxo salvas com sucesso no servidor!');
    } catch (error) {
      alert('Erro ao salvar as configurações.');
    } finally {
      setSalvando(false);
    }
  };

  // Renderização condicional para o Loading
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: '#6b7280' }}>
        <h2>Carregando configurações da atração... ⏳</h2>
      </div>
    );
  }

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

      {/* CONTEÚDO: ORGANIZAÇÃO DE FILAS E ESPAÇO FÍSICO */}
      {abaAtiva === 'Organização de Filas (Layout)' && configFilas && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Parâmetros do Espaço Físico</h2>
          
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
                      {configFilas.regrasOperacionais}
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
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <Button 
                variant="primary" 
                onClick={handleSalvar} 
                disabled={salvando}
              >
                {salvando ? 'Salvando...' : 'Salvar Regras de Fluxo'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {abaAtiva === 'Equipamentos' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          {/* Lógica de equipamentos pode ser mapeada aqui usando o estado equipamentos */}
          <p>Exibindo {equipamentos.length} equipamentos conectados.</p>
        </div>
      )}
    </div>
  );
}
