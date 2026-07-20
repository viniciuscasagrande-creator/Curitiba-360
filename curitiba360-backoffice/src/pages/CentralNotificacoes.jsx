// src/pages/CentralNotificacoes.jsx
import { useState } from 'react';

export default function CentralNotificacoes() {
  const [abaAtiva, setAbaAtiva] = useState('Disparar');
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [segmento, setSegmento] = useState('Todos');
  const [canais, setCanais] = useState({ push: true, email: false, sms: false });
  const [loading, setLoading] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState('');

  // Mock do histórico de disparos
  const [historico, setHistorico] = useState([
    { id: 1, data: '20/07/2026 10:00', titulo: 'Manutenção programada no portal', segmento: 'Todos os Usuários', canais: 'Push, Email', status: 'Enviado', taxaAbertura: '85%' },
    { id: 2, data: '18/07/2026 14:30', titulo: 'Novos termos para agências credenciadas', segmento: 'Apenas Agências', canais: 'Email', status: 'Enviado', taxaAbertura: '92%' },
  ]);

  const handleToggleCanal = (canal) => {
    setCanais({ ...canais, [canal]: !canais[canal] });
  };

  const handleDisparar = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusEnvio('');

    const canaisSelecionados = Object.keys(canais).filter(c => canais[c]);
    if (canaisSelecionados.length === 0) {
      alert("Selecione pelo menos um canal de envio (Push, E-mail ou SMS).");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const novoDisparo = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        titulo,
        segmento: segmento === 'Todos' ? 'Todos os Usuários' : segmento,
        canais: canaisSelecionados.map(c => c.toUpperCase()).join(', '),
        status: 'Enviado',
        taxaAbertura: '-'
      };
      setHistorico([novoDisparo, ...historico]);
      setStatusEnvio('Notificação disparada com sucesso!');
      setTitulo('');
      setMensagem('');
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Central de Notificações (RF-035)</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Envie avisos, atualizações contratuais e alertas urgentes para diferentes perfis e canais</p>
      </div>

      {/* ABAS */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        {['Disparar', 'Histórico de Disparos'].map(aba => (
          <button 
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{ 
              padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer',
              fontWeight: abaAtiva === aba ? 'bold' : 'normal',
              borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
              color: abaAtiva === aba ? '#111827' : '#6b7280'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* ABA 1: FORMULÁRIO DE ENVIO */}
      {abaAtiva === 'Disparar' && (
        <form onSubmit={handleDisparar} style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {statusEnvio && (
            <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center' }}>
              {statusEnvio}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Público Alvo / Segmento *</label>
              <select value={segmento} onChange={e => setSegmento(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="Todos">Todos os Usuários</option>
                <option value="Parceiros">Apenas Parceiros Comerciais</option>
                <option value="Agências">Apenas Agências</option>
                <option value="Administradores">Apenas Administradores</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Canais de Entrega *</label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={canais.push} onChange={() => handleToggleCanal('push')} /> Push App
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={canais.email} onChange={() => handleToggleCanal('email')} /> E-mail
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={canais.sms} onChange={() => handleToggleCanal('sms')} /> SMS
                </label>
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Título da Notificação *</label>
            <input 
              type="text" 
              required 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} 
              placeholder="Ex: Atualização importante nos Termos" 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Corpo do Alerta / Mensagem *</label>
            <textarea 
              required 
              rows="6" 
              value={mensagem} 
              onChange={e => setMensagem(e.target.value)} 
              placeholder="Escreva a mensagem clara e objetiva aqui..." 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
            <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'Disparando...' : 'Disparar Notificação'}
            </button>
          </div>

        </form>
      )}

      {/* ABA 2: HISTÓRICO DE DISPAROS */}
      {abaAtiva === 'Histórico de Disparos' && (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem' }}>Data/Hora</th>
                <th style={{ padding: '1rem' }}>Título</th>
                <th style={{ padding: '1rem' }}>Público Destinado</th>
                <th style={{ padding: '1rem' }}>Canais</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Taxa Abertura</th>
              </tr>
            </thead>
            <tbody>
              {historico.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{h.data}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{h.titulo}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '0.75rem' }}>{h.segmento}</span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{h.canais}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{h.status}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>{h.taxaAbertura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
