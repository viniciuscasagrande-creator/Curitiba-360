import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de dados baseado no wireframe WF-002
  const atracoes = Array(6).fill({
    nome: 'Parque Jaime Lerner',
    local: 'Pilarzinho - Curitiba',
    estatisticas: { vendidos: 11, cortesias: 9, total: 20, receita: '200,00' },
    graficoDestaque: '$2.488'
  });

  return (
    <div>
      {/* Cabeçalho Refatorado com os novos Componentes */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Dashboard</h1>
        
        <div style={{ display: 'flex', gap: '1rem', width: '400px' }}>
          <Input 
            icon="🔍" 
            placeholder="Enter search terms" 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <Button variant="primary" onClick={() => alert('Buscando...')}>
            Buscar
          </Button>
        </div>
      </header>

      {/* Abas */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', marginBottom: '2rem' }}>
        {['Ativos', 'Inativos', 'Todos'].map(aba => (
          <button 
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{ 
              flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'center',
              fontWeight: abaAtiva === aba ? 'bold' : 'normal',
              color: abaAtiva === aba ? '#111827' : '#6b7280',
              borderBottom: abaAtiva === aba ? '3px solid #111827' : '3px solid transparent'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Grid de Cards das Atrações (Mantido igual) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {atracoes.map((atracao, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', padding: '1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            
            <div style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#9ca3af', fontSize: '1.5rem' }}>🖼️</span>
            </div>

            <h3 
              onClick={() => navigate(`/atracoes/1/totais`)}
              style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {atracao.nome}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📍</span> {atracao.local}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Vendidos</span><span>{atracao.estatisticas.vendidos}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Cortesias</span><span>{atracao.estatisticas.cortesias}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Total</span><span>{atracao.estatisticas.total}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Receita</span><span>R$ {atracao.estatisticas.receita}</span></div>
            </div>

            <div style={{ marginTop: 'auto', position: 'relative', height: '120px' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                {['$4k', '$3k', '$2k', '$1k', '$0'].map((label, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.625rem', color: '#9ca3af', width: '20px' }}>{label}</span>
                    <div style={{ flex: 1, borderTop: '1px solid #f3f4f6' }}></div>
                  </div>
                ))}
              </div>
              
              <div style={{ position: 'absolute', width: 'calc(100% - 28px)', height: '100%', left: '28px', top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '7px', zIndex: 1 }}>
                <div style={{ width: '18%', height: '55%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '70%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '85%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '60%', backgroundColor: '#4b5563', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', fontWeight: 'bold', color: '#111827', backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>
                    {atracao.graficoDestaque}
                  </span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}