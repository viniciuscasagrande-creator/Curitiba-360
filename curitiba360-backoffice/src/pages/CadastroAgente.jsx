// src/pages/CadastroAgente.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroAgente() {
  const navigate = useNavigate();
  const [agenciaId, setAgenciaId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [status, setStatus] = useState('ATIVO');
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSucesso(true);
    setTimeout(() => {
      navigate('/comercial/agentes');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/comercial/agentes')}
          style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem', fontWeight: '500' }}
        >
          ← Voltar
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Cadastrar Novo Agente</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Adicione um novo operador de vendas e vincule-o a uma agência parceira</p>
      </header>

      {sucesso && (
        <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '500' }}>
          ✓ Agente cadastrado e associado com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eaedf1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Associação de Agência */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Agência Vinculada</label>
          <select 
            value={agenciaId} 
            onChange={(e) => setAgenciaId(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            required
          >
            <option value="">Selecione a agência...</option>
            <option value="1">Tour CWB</option>
            <option value="2">Batel Turismo</option>
          </select>
        </div>

        {/* Dados Básicos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Nome Completo do Agente</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Carlos Santos"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>E-mail Principal</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: carlos@agente.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            />
          </div>
        </div>

        {/* Identificação */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>CPF do Agente</label>
            <input 
              type="text" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Telefone / WhatsApp</label>
            <input 
              type="text" 
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(41) 99999-0000"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Status Inicial</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
          >
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
            <option value="PENDENTE_APROVACAO">Pendente de Aprovação</option>
          </select>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={() => navigate('/comercial/agentes')}
            style={{ padding: '0.75rem 1.5rem', background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#4b5563' }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Salvar Agente
          </button>
        </div>
      </form>
    </div>
  );
}
