import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Building2 } from 'lucide-react';

export default function AgencyEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    razaoSocial: 'Serra Verde Express Viagens Ltda',
    nomeFantasia: 'Serra Verde Express',
    cnpj: '02.435.890/0001-44',
    inscricaoEstadual: 'PR-102938475',
    email: 'contato@serraverdeexpress.com.br',
    telefone: '(41) 3888-3488',
    responsavel: 'Carlos Eduardo',
    cidade: 'Curitiba',
    uf: 'PR',
    comissaoPadrao: '12',
    status: 'Ativa'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Agência ID ${id} atualizada com sucesso!`);
    navigate('/agencias');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/agencias')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.875rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
            Editar Agência — ID #{id}
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
            Atualize as informações cadastrais e de comissão.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} style={{ color: '#2563eb' }} />
            <span>Dados da Agência</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Razão Social *</label>
              <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>
                <option value="Ativa">Ativa</option>
                <option value="Pendente">Pendente de Aprovação</option>
                <option value="Inativa">Inativa / Suspensa</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>E-mail *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '0.35rem' }}>Comissão Padrão (%) *</label>
              <input type="number" name="comissaoPadrao" value={formData.comissaoPadrao} onChange={handleChange} required style={{ width: '100%', padding: '0.625rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="button" onClick={() => navigate('/agencias')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>
            <Save size={18} />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
