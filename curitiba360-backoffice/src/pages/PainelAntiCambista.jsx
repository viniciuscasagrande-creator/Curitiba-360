// src/pages/PainelAntiCambista.jsx
import { useState } from 'react';

export default function PainelAntiCambista() {
  const [limiteScans, setLimiteScans] = useState(5);
  const [bloqueioAutomatico, setBloqueioAutomatico] = useState(true);
  const [logs, setLogs] = useState([
    { id: 1, hora: '15:44:21', cpf: '123.***.***-00', atracao: 'Jardim Botânico', motivo: 'Scan duplicado em menos de 10s', status: 'ALERTA' },
    { id: 2, hora: '15:42:05', cpf: '987.***.***-11', atracao: 'Ópera de Arame', motivo: 'Compra de 15 ingressos no mesmo CPF', status: 'BLOQUEADO' },
    { id: 3, hora: '15:39:12', cpf: '456.***.***-99', atracao: 'Museu Oscar Niemeyer', motivo: 'Tentativa de validação de QR Code expirado', status: 'ALERTA' }
  ]);

  const handleToggleBloqueio = () => {
    setBloqueioAutomatico(!bloqueioAutomatico);
  };

  const getStatusBadge = (status) => {
    if (status === 'BLOQUEADO') {
      return { bg: '#fee2e2', text: '#991b1b' };
    }
    return { bg: '#fef3c7', text: '#92400e' };
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Painel Anti-Cambista</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Monitore atividades suspeitas e configure políticas de proteção do sistema</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Configurações de Regras */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eaedf1', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Políticas de Segurança</h2>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Limite de validações por minuto (mesmo IP/Scanner)</label>
            <input 
              type="number" 
              value={limiteScans}
              onChange={(e) => setLimiteScans(parseInt(e.target.value))}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Limite máximo de ingressos por CPF (por atração/dia)</label>
            <input 
              type="number" 
              defaultValue={6}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid #eaedf1', borderBottom: '1px solid #eaedf1' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 'bold', display: 'block', color: '#1f2937' }}>Bloqueio Automático de CPF</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Bloqueia CPFs com mais de 3 alertas consecutivos</span>
            </div>
            <input 
              type="checkbox" 
              checked={bloqueioAutomatico}
              onChange={handleToggleBloqueio}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          <button style={{ padding: '0.75rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Atualizar Parâmetros
          </button>
        </div>

        {/* Logs de Alertas em Tempo Real */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eaedf1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Incidentes Recentes</h2>
            <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              ● Tempo Real
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {logs.map((log) => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '0.875rem' }}>{log.atracao}</span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{log.hora}</span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#4b5563' }}>{log.motivo}</p>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginTop: '0.25rem' }}>CPF Envolvido: {log.cpf}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getStatusBadge(log.status).bg, color: getStatusBadge(log.status).text }}>
                    {log.status}
                  </span>
                  <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>
                    Visualizar Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
