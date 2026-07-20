// src/pages/GestaoFluxoEntrada.jsx
import { useState } from 'react';

export default function GestaoFluxoEntrada() {
  const [capacidadeMaxima, setCapacidadeMaxima] = useState(1500);
  const [entradasHoje, setEntradasHoje] = useState(842);
  const [catracas, setCatracas] = useState([
    { id: 1, nome: 'Catraca 01 - Principal Norte', status: 'Ativo', totalEntradas: 310 },
    { id: 2, nome: 'Catraca 02 - Principal Sul', status: 'Ativo', totalEntradas: 295 },
    { id: 3, nome: 'Catraca 03 - Acesso VIP', status: 'Ativo', totalEntradas: 187 },
    { id: 4, nome: 'Catraca 04 - Estacionamento', status: 'Inativo', totalEntradas: 50 },
  ]);

  // Log de acesso em tempo real
  const [logsEntrada, setLogsEntrada] = useState([
    { id: 1, hora: '13:54:10', turista: 'Daniel M. Silva', ingresso: '#ING8092', catraca: 'Catraca 01' },
    { id: 2, hora: '13:53:45', turista: 'Juliana P. Almeida', ingresso: '#ING8091', catraca: 'Catraca 03' },
    { id: 3, hora: '13:52:12', turista: 'Roberto F. Santos', ingresso: '#ING8090', catraca: 'Catraca 02' },
    { id: 4, hora: '13:51:02', turista: 'Patrícia R. Costa', ingresso: '#ING8089', catraca: 'Catraca 01' },
  ]);

  const taxaOcupacao = ((entradasHoje / capacidadeMaxima) * 100).toFixed(1);

  const toggleCatraca = (id) => {
    setCatracas(catracas.map(cat => 
      cat.id === id ? { ...cat, status: cat.status === 'Ativo' ? 'Inativo' : 'Ativo' } : cat
    ));
  };

  const handleSimularEntrada = () => {
    if (entradasHoje >= capacidadeMaxima) {
      alert('Capacidade máxima atingida!');
      return;
    }
    const novoId = logsEntrada.length + 1;
    const hora = new Date().toLocaleTimeString('pt-BR');
    const nomes = ['Marcos Silva', 'Lucia Souza', 'Felipe Santos', 'Amanda Lima', 'Gabriel Oliveira'];
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const ingAleatorio = `#ING${Math.floor(1000 + Math.random() * 9000)}`;
    const catracaAleatoria = `Catraca 0${Math.floor(1 + Math.random() * 3)}`;

    // Adiciona log
    setLogsEntrada([
      { id: novoId, hora, turista: nomeAleatorio, ingresso: ingAleatorio, catraca: catracaAleatoria },
      ...logsEntrada
    ]);

    // Atualiza entradas
    setEntradasHoje(prev => prev + 1);

    // Atualiza catraca correspondente
    setCatracas(catracas.map(cat => {
      if (cat.nome.includes(catracaAleatoria)) {
        return { ...cat, totalEntradas: cat.totalEntradas + 1 };
      }
      return cat;
    }));
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Monitoramento de Fluxo e Portaria</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Acompanhe o fluxo de público, ocupação e controle das catracas em tempo real</p>
        </div>

        <button 
          onClick={handleSimularEntrada}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ⚡ Simular Entrada de Turista
        </button>
      </div>

      {/* METRICAS DE CAPACIDADE */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Capacidade e Lotação do Parque</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <span>Ocupação atual: <strong>{entradasHoje} pessoas</strong></span>
            <span>Limite máximo: <strong>{capacidadeMaxima} pessoas</strong></span>
          </div>

          <div style={{ width: '100%', height: '24px', background: '#f3f4f6', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ 
              width: `${taxaOcupacao}%`, 
              height: '100%', 
              background: parseFloat(taxaOcupacao) >= 90 ? '#ef4444' : parseFloat(taxaOcupacao) >= 70 ? '#f59e0b' : '#10b981',
              transition: 'width 0.5s ease-in-out'
            }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: parseFloat(taxaOcupacao) >= 90 ? '#ef4444' : '#111827' }}>{taxaOcupacao}% de Lotação</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setCapacidadeMaxima(prev => Math.max(500, prev - 100))} style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>- Reduzir Cap.</button>
              <button onClick={() => setCapacidadeMaxima(prev => prev + 100)} style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>+ Aumentar Cap.</button>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Tempo Médio de Espera</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', margin: '0.5rem 0' }}>2 min</h2>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>Fluxo fluindo normalmente</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        
        {/* TABELA DE CATRACAS */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Status e Auditoria de Catracas</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem 0' }}>Equipamento</th>
                <th style={{ padding: '0.75rem 0', textAlign: 'center' }}>Entradas</th>
                <th style={{ padding: '0.75rem 0' }}>Status</th>
                <th style={{ padding: '0.75rem 0', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {catracas.map(cat => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{cat.nome}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'center', fontWeight: 'bold' }}>{cat.totalEntradas}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                      backgroundColor: cat.status === 'Ativo' ? '#d1fae5' : '#fee2e2',
                      color: cat.status === 'Ativo' ? '#065f46' : '#991b1b'
                    }}>{cat.status}</span>
                  </td>
                  <td style={{ padding: '1rem 0', textAlign: 'center' }}>
                    <button 
                      onClick={() => toggleCatraca(cat.id)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: cat.status === 'Ativo' ? '#ef4444' : '#10b981', 
                        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' 
                      }}
                    >
                      {cat.status === 'Ativo' ? 'Bloquear' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LOG EM TEMPO REAL */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Linha do Tempo de Entradas</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '280px', overflowY: 'auto' }}>
            {logsEntrada.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{log.turista}</span>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ingresso: {log.ingresso} | {log.catraca}</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 'bold', backgroundColor: '#eff6ff', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{log.hora}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
