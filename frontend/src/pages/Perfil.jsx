// src/pages/Perfil.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState(user?.name || 'João da Silva');
  const [email, setEmail] = useState(user?.email || 'joao@email.com');
  const [telefone, setTelefone] = useState('(41) 99999-9999');
  const [perfil, setPerfil] = useState(user?.role || 'ADMINISTRADOR');
  const [idioma, setIdioma] = useState('PT_BR');
  const [sucesso, setSucesso] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>Meu Perfil</h1>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Gerencie suas informações cadastrais e preferências</p>

      {sucesso && (
        <div style={{ padding: '1rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '500' }}>
          ✓ Alterações salvas com sucesso!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #eaedf1' }}>
        
        {/* Avatar e Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eaedf1' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '2px solid #e5e7eb' }}>
            👤
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>{nome}</h3>
            <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {perfil}
            </span>
          </div>
        </div>

        {/* Informações Básicas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Nome Completo</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
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
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Telefone</label>
            <input 
              type="text" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Idioma Padrão</label>
            <select 
              value={idioma} 
              onChange={(e) => setIdioma(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            >
              <option value="PT_BR">Português (Brasil)</option>
              <option value="EN">English</option>
              <option value="ES">Español</option>
            </select>
          </div>
        </div>

        {/* Alteração de Senha */}
        <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #eaedf1' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>Segurança (Alterar Senha)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Nova Senha</label>
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#4b5563' }}>Confirmar Nova Senha</label>
              <input 
                type="password" 
                placeholder="Mínimo 6 caracteres"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
              />
            </div>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            type="submit"
            style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
