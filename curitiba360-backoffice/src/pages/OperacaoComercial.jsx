// src/pages/OperacaoComercial.jsx
import { useState } from 'react';

export default function OperacaoComercial() {
  const [taxaTransacao, setTaxaTransacao] = useState(10.0); // % de comissão padrão
  const [taxaCartao, setTaxaCartao] = useState(3.99); // % da adquirente de pagamento
  const [prazoCancelamento, setPrazoCancelamento] = useState(48); // horas padrão
  const [prazoExpiracao, setPrazoExpiracao] = useState(90); // validade em dias
  
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleSalvarConfig = (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      // Simulação de salvamento no Firestore (Coleção: commercialConditions)
      setTimeout(() => {
        setMensagem('Configurações comerciais salvas com sucesso!');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setMensagem('Erro ao salvar configurações: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Configurações Comerciais (WF-009)</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Defina as taxas transacionais do sistema, políticas de cancelamento e prazos padrão de operação</p>
      </div>

      {mensagem && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center' }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSalvarConfig} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Bloco 1: Tarifação e Repasses */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', color: '#111827' }}>Tarifação de Vendas</h3>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Taxa de Plataforma Padrão (%)</label>
            <input 
              type="number" 
              step="0.01" 
              required 
              value={taxaTransacao} 
              onChange={e => setTaxaTransacao(parseFloat(e.target.value))} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <small style={{ color: '#6b7280' }}>Cobrada sobre cada ingresso vendido por agências ou portais parceiros.</small>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Taxa de Intermediação de Cartão (%)</label>
            <input 
              type="number" 
              step="0.01" 
              required 
              value={taxaCartao} 
              onChange={e => setTaxaCartao(parseFloat(e.target.value))} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <small style={{ color: '#6b7280' }}>Custo operacional do gateway de pagamento parceiro.</small>
          </div>
        </div>

        {/* Bloco 2: Regras e Validades */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem', color: '#111827' }}>Políticas de Operação</h3>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Prazo para Cancelamento sem Custo (Horas)</label>
            <input 
              type="number" 
              required 
              value={prazoCancelamento} 
              onChange={e => setPrazoCancelamento(parseInt(e.target.value))} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <small style={{ color: '#6b7280' }}>Período máximo pré-evento para solicitação de reembolso automático.</small>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Validade do Ingresso (Dias)</label>
            <input 
              type="number" 
              required 
              value={prazoExpiracao} 
              onChange={e => setPrazoExpiracao(parseInt(e.target.value))} 
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            <small style={{ color: '#6b7280' }}>Tempo de expiração pós-compra se não houver agendamento prévio.</small>
          </div>
        </div>

        {/* Botão de Envio */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>

      </form>
    </div>
  );
}
