// src/pages/ControleTransferencias.jsx
import { useState } from 'react';

export default function ControleTransferencias() {
  // RF-038.05 e RN-038.02: Limite Padrão (Padrão inicial é 2)
  const [limiteTransferencias, setLimiteTransferencias] = useState(2);
  
  // Filtros (RF-038.04)
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [volumeFiltro, setVolumeFiltro] = useState('Todos');
  const [statusFiltro, setStatusFiltro] = useState('Todas');
  
  // Modais de Bloqueio/Desbloqueio (RF-038.03 e RF-038.06)
  const [modalBloqueio, setModalBloqueio] = useState(null);
  const [modalDesbloqueio, setModalDesbloqueio] = useState(null);
  const [motivoAcao, setMotivoAcao] = useState('');

  // Mock de Indicadores de Transferência (RF-038.01 e RF-038.02)
  // RN-038.10 (Implícito em boas práticas e RF-028.10 para CPF): CPF mascarado
  const [usuarios, setUsuarios] = useState([
    { id: 1, cpf: '111.222.***-**', nome: 'Pedro Henrique', total: 15, eventos: 'Ópera de Arame, MON', status: 'Bloqueada', ultima: '19/07/2026 14:30' },
    { id: 2, cpf: '333.444.***-**', nome: 'Lucas Silva', total: 4, eventos: 'Parque Barigui', status: 'Ativa', ultima: '18/07/2026 09:15' },
    { id: 3, cpf: '555.666.***-**', nome: 'Mariana Costa', total: 3, eventos: 'Jardim Botânico', status: 'Ativa', ultima: '15/07/2026 11:00' },
    { id: 4, cpf: '777.888.***-**', nome: 'Felipe Santos', total: 1, eventos: 'Tour Linha Turismo', status: 'Ativa', ultima: '01/07/2026 16:45' },
  ]);

  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusca = u.nome.toLowerCase().includes(termoBusca.toLowerCase()) || u.cpf.includes(termoBusca);
    const matchStatus = statusFiltro === 'Todas' || u.status === statusFiltro;
    
    let matchVolume = true;
    if (volumeFiltro === '>= 3') matchVolume = u.total >= 3;
    if (volumeFiltro === '>= 5') matchVolume = u.total >= 5;
    if (volumeFiltro === '>= 10') matchVolume = u.total >= 10;

    return matchBusca && matchStatus && matchVolume;
  }).sort((a, b) => b.total - a.total); // RF-038.01: Ordenados por volume decrescente

  const handleSalvarLimite = () => {
    // RF-038.05: Configuração de limite
    alert(`Novo limite de ${limiteTransferencias} transferências a cada 12 meses salvo com sucesso! Essa regra já está valendo para o Portal Público.`);
  };

  const handleConfirmarBloqueio = (e) => {
    e.preventDefault();
    if (!motivoAcao.trim()) {
      alert("O motivo do bloqueio é obrigatório.");
      return;
    }
    alert(`Usuário ${modalBloqueio.nome} foi BLOQUEADO para novas transferências. Motivo: ${motivoAcao}`);
    setModalBloqueio(null);
    setMotivoAcao('');
  };

  const handleConfirmarDesbloqueio = (e) => {
    e.preventDefault();
    if (!motivoAcao.trim()) {
      alert("A justificativa é obrigatória para desbloquear a conta.");
      return;
    }
    alert(`Usuário ${modalDesbloqueio.nome} foi DESBLOQUEADO e pode transferir ingressos novamente. Justificativa registrada no log de auditoria.`);
    setModalDesbloqueio(null);
    setMotivoAcao('');
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Controle de Transferências</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Painel Anti-Cambista: Monitore e controle o fluxo de repasse de ingressos.</p>
        </div>
      </div>

      {/* CONFIGURAÇÃO DE LIMITE GLOBAL (RF-038.05 e RN-038.02) */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.25rem' }}>Limite Global de Transferências</h3>
          <p style={{ fontSize: '0.875rem', color: '#1d4ed8', margin: 0 }}>Configure a quantidade máxima de transferências permitidas por usuário (CPF) a cada período de 12 meses.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input 
            type="number" 
            min="0"
            value={limiteTransferencias} 
            onChange={(e) => setLimiteTransferencias(e.target.value)} 
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #93c5fd', width: '80px', textAlign: 'center', fontWeight: 'bold' }}
          />
          <button onClick={handleSalvarLimite} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar configuração
          </button>
        </div>
      </div>

      {/* FILTROS (RF-038.04) */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Buscar CPF ou Nome</label>
          <input type="text" placeholder="Ex: Lucas Silva..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Período (Transferências)</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Volume de Transferências</label>
          <select value={volumeFiltro} onChange={(e) => setVolumeFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Todos">Todos</option>
            <option value=">= 3">3 ou mais</option>
            <option value=">= 5">5 ou mais</option>
            <option value=">= 10">10 ou mais</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Status da Conta</label>
          <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Todas">Todas</option>
            <option value="Ativa">Ativa</option>
            <option value="Bloqueada">Bloqueada</option>
          </select>
        </div>
      </div>

      {/* TABELA DE INDICADORES (RF-038.01 e RF-038.02) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Turista (Nome / CPF)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Total (Período)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Eventos Envolvidos</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Última Transferência</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: u.status === 'Bloqueada' ? '#fef2f2' : 'white' }}>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{u.nome}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CPF: {u.cpf}</div>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: u.total >= 5 ? '#ef4444' : '#374151' }}>{u.total}</span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{u.eventos}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>{u.ultima}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: u.status === 'Ativa' ? '#d1fae5' : '#fee2e2', color: u.status === 'Ativa' ? '#065f46' : '#991b1b' }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  {u.status === 'Ativa' ? (
                    <button onClick={() => setModalBloqueio(u)} style={{ padding: '0.4rem 0.8rem', backgroundColor: 'white', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Bloquear usuário
                    </button>
                  ) : (
                    <button onClick={() => setModalDesbloqueio(u)} style={{ padding: '0.4rem 0.8rem', backgroundColor: 'white', color: '#10b981', border: '1px solid #10b981', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Desbloquear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE BLOQUEIO (RF-038.03) */}
      {modalBloqueio && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>Bloquear Usuário por Cambismo</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>Você está prestes a impedir que o turista <strong>{modalBloqueio.nome}</strong> realize novas transferências de ingresso no portal.</p>

            <form onSubmit={handleConfirmarBloqueio}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Motivo do Bloqueio *</label>
                <textarea 
                  rows="3" 
                  required
                  value={motivoAcao}
                  onChange={(e) => setMotivoAcao(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Ex: Volume atípico de transferências detectado..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => { setModalBloqueio(null); setMotivoAcao(''); }} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Confirmar Bloqueio</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE DESBLOQUEIO (RF-038.06) */}
      {modalDesbloqueio && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>Desbloquear Conta</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>Reverter o bloqueio manual do turista <strong>{modalDesbloqueio.nome}</strong>. Esta ação será registrada no log de auditoria.</p>

            <form onSubmit={handleConfirmarDesbloqueio}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Justificativa *</label>
                <textarea 
                  rows="3" 
                  required
                  value={motivoAcao}
                  onChange={(e) => setMotivoAcao(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Informe por que o usuário está sendo liberado novamente..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => { setModalDesbloqueio(null); setMotivoAcao(''); }} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Confirmar Desbloqueio</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
