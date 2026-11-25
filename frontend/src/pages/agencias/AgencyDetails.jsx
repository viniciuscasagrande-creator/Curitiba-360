import { useNavigate, useParams } from 'react';
import { ArrowLeft, Edit3, Users, Building, Mail, Phone, MapPin, DollarSign } from 'lucide-react';
import AgencyStatusBadge from './components/AgencyStatusBadge';

export default function AgencyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const agency = {
    id: id || '1',
    razaoSocial: 'Serra Verde Express Viagens Ltda',
    nomeFantasia: 'Serra Verde Express',
    cnpj: '02.435.890/0001-44',
    inscricaoEstadual: 'PR-102938475',
    email: 'contato@serraverdeexpress.com.br',
    telefone: '(41) 3888-3488',
    responsavel: 'Carlos Eduardo Santos',
    cidade: 'Curitiba',
    uf: 'PR',
    endereco: 'Av. Presidente Affonso Camargo, 330 - Jardim Botânico',
    comissaoPadrao: '12%',
    quantidadeAgentes: 14,
    status: 'Ativa',
    dataCadastro: '12/01/2026',
    vendasTotais: 'R$ 148.950,00'
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/agencias')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 0.875rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
                {agency.razaoSocial}
              </h1>
              <AgencyStatusBadge status={agency.status} />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
              CNPJ: {agency.cnpj} • Cadastrada em {agency.dataCadastro}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/agencias/${id}/editar`)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}
        >
          <Edit3 size={16} />
          <span>Editar Agência</span>
        </button>
      </div>

      {/* Cards Métricas da Agência */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Agentes Ativos</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>{agency.quantidadeAgentes}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Comissão Acertada</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{agency.comissaoPadrao}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
            <Building size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Vendas Históricas</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a' }}>{agency.vendasTotais}</div>
          </div>
        </div>
      </div>

      {/* Detalhes Cadastrais */}
      <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem' }}>
          Informações de Contato e Endereço
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', fontSize: '0.875rem', color: '#334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail size={18} style={{ color: '#64748b' }} />
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>E-mail Comercial</div>
              <div style={{ fontWeight: '600' }}>{agency.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={18} style={{ color: '#64748b' }} />
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Telefone</div>
              <div style={{ fontWeight: '600' }}>{agency.telefone}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={18} style={{ color: '#64748b' }} />
            <div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Endereço</div>
              <div style={{ fontWeight: '600' }}>{agency.endereco}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
