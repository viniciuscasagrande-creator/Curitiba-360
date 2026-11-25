// src/pages/CadastroContrato.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroContrato() {
  const navigate = useNavigate();
  const [parceiro, setParceiro] = useState('');
  const [atracao, setAtracao] = useState('');
  const [condicao, setCondicao] = useState('');
  const [expiracao, setExpiracao] = useState('');
  const [docuSignEmail, setDocuSignEmail] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSucesso(true);
    setTimeout(() => {
      navigate('/comercial/contratos');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/comercial/contratos')}
          style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem', fontWeight: '500' }}
        >
          ← Voltar
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Adicionar Contrato</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Cadastre um novo acordo contratual e envie para assinatura</p>
      </header>

      {sucesso && (
        <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '500' }}>
          ✓ Contrato salvo e disparado para o DocuSign com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eaedf1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Entidades Relacionadas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Selecione o Parceiro Comercial ou Agência</label>
            <select 
              value={parceiro} 
              onChange={(e) => setParceiro(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            >
              <option value="">Selecione...</option>
              <option value="Parque Jaime Lerner S/A">Parque Jaime Lerner S/A (Parceiro)</option>
              <option value="Tour CWB">Tour CWB (Agência)</option>
              <option value="Batel Turismo">Batel Turismo (Agência)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Atração Referente</label>
            <select 
              value={atracao} 
              onChange={(e) => setAtracao(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            >
              <option value="">Selecione...</option>
              <option value="Jardim Botânico">Jardim Botânico</option>
              <option value="Ópera de Arame">Ópera de Arame</option>
              <option value="Museu Oscar Niemeyer (MON)">Museu Oscar Niemeyer (MON)</option>
              <option value="Todas as Atrações">Todas as Atrações (Apenas Agências)</option>
            </select>
          </div>
        </div>

        {/* Condição e Validade */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Regra Comercial Associada</label>
            <select 
              value={condicao} 
              onChange={(e) => setCondicao(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            >
              <option value="">Selecione...</option>
              <option value="1">Parceria Padrão Batel (10%)</option>
              <option value="2">Acordo Especial Hard Rock (15%)</option>
              <option value="3">Taxa Promocional Inverno (8%)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Data de Expiração</label>
            <input 
              type="date" 
              value={expiracao} 
              onChange={(e) => setExpiracao(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            />
          </div>
        </div>

        {/* Integração DocuSign */}
        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '0.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📝</span> Envio via DocuSign
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.875rem', color: '#475569' }}>E-mail do Assinante Principal (Representante Legal)</label>
            <input 
              type="email" 
              placeholder="representante@parceiro.com"
              value={docuSignEmail}
              onChange={(e) => setDocuSignEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white', boxSizing: 'border-box' }}
              required
            />
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={() => navigate('/comercial/contratos')}
            style={{ padding: '0.75rem 1.5rem', background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#4b5563' }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Gerar e Enviar Contrato
          </button>
        </div>
      </form>
    </div>
  );
}
