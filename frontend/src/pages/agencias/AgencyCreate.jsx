import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building2 } from 'lucide-react';

export default function AgencyCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    email: '',
    telefone: '',
    responsavel: '',
    cep: '',
    logradouro: '',
    numero: '',
    cidade: 'Curitiba',
    uf: 'PR',
    comissaoPadrao: '10',
    banco: '',
    agencia: '',
    conta: '',
    pix: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Agência cadastrada com sucesso!');
    navigate('/agencias');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Voltar e Título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/agencias')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 0.875rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#475569',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
            Nova Agência Parceira
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
            Preencha os dados cadastrais, bancários e de comissionamento da agência.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Bloco 1: Dados da Empresa */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} style={{ color: '#2563eb' }} />
            <span>Dados da Empresa</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Razão Social *</label>
              <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required placeholder="Ex: Serra Verde Express Ltda" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Nome Fantasia</label>
              <input type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} placeholder="Ex: Serra Verde Express" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>CNPJ *</label>
              <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required placeholder="00.000.000/0001-00" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Inscrição Estadual</label>
              <input type="text" name="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={handleChange} placeholder="Isento ou Número" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>E-mail Comercial *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="contato@agencia.com.br" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Telefone / WhatsApp *</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required placeholder="(41) 99999-9999" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>

        {/* Bloco 2: Comissionamento */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem' }}>
            Regras de Comissionamento
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Comissão Padrão (%) *</label>
              <input type="number" name="comissaoPadrao" value={formData.comissaoPadrao} onChange={handleChange} required placeholder="10" min="0" max="100" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Chave PIX para Repasses</label>
              <input type="text" name="pix" value={formData.pix} onChange={handleChange} placeholder="CNPJ, E-mail ou Aleatória" style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/agencias')}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: '600', cursor: 'pointer' }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}
          >
            <Save size={18} />
            <span>Salvar Agência</span>
          </button>
        </div>

      </form>
    </div>
  );
}
