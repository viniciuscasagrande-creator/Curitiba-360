// src/pages/NovoUsuario.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function NovoUsuario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    emailPrincipal: '',
    telefone: '',
    cpfCnpj: '',
    perfil: 'LEITOR',
    status: 'ATIVO',
    idiomaPadrao: 'PT_BR',
    fotoPerfilUrl: '',
    excluido: false,
    vinculos: {
      parceiroComercialId: null,
      agenciaId: null,
      atracoesIds: []
    }
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      // Salva no Firestore
      // await addDoc(collection(db, 'usuarios'), {
      //   ...formData,
      //   dataCriacao: new Date().toISOString()
      // });
      setMensagem('Usuário criado com sucesso (Modo simulação)!');
      setTimeout(() => {
        navigate('/usuarios');
      }, 1500);
    } catch (error) {
      setMensagem('Erro ao criar usuário: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Adicionar Novo Usuário</h1>
      
      {mensagem && <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: mensagem.includes('sucesso') ? '#d1fae5' : '#fee2e2', color: mensagem.includes('sucesso') ? '#065f46' : '#991b1b', borderRadius: '4px', textAlign: 'center' }}>{mensagem}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Primeiro Nome</label>
            <input type="text" required value={formData.primeiroNome} onChange={e => setFormData({...formData, primeiroNome: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Último Nome</label>
            <input type="text" required value={formData.ultimoNome} onChange={e => setFormData({...formData, ultimoNome: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>E-mail Principal</label>
          <input type="email" required value={formData.emailPrincipal} onChange={e => setFormData({...formData, emailPrincipal: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Telefone</label>
            <input type="text" required value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>CPF/CNPJ</label>
            <input type="text" required value={formData.cpfCnpj} onChange={e => setFormData({...formData, cpfCnpj: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Perfil</label>
            <select value={formData.perfil} onChange={e => setFormData({...formData, perfil: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="PARCEIRO_COMERCIAL">Parceiro Comercial</option>
              <option value="EDITOR">Editor</option>
              <option value="LEITOR">Leitor</option>
              <option value="AGENCIA">Agência</option>
              <option value="AGENTE">Agente</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Idioma Padrão</label>
            <select value={formData.idiomaPadrao} onChange={e => setFormData({...formData, idiomaPadrao: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="PT_BR">Português (Brasil)</option>
              <option value="EN_US">Inglês (Estados Unidos)</option>
              <option value="ES_ES">Espanhol (Espanha)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={() => navigate('/usuarios')} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
          <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Salvando...' : 'Salvar Usuário'}
          </button>
        </div>
      </form>
    </div>
  );
}
