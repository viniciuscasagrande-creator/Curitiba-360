// src/pages/ConfiguracoesComerciais.jsx
import { useState } from 'react';

export default function ConfiguracoesComerciais() {
  const [comissaoPadraoParceiro, setComissaoPadraoParceiro] = useState(10);
  const [comissaoPadraoAgencia, setComissaoPadraoAgencia] = useState(8);
  const [prazoCancelamentoHoras, setPrazoCancelamentoHoras] = useState(48);
  const [limiteIngressosCompra, setLimiteIngressosCompra] = useState(6);
  const [gatewayModo, setGatewayModo] = useState('Sandbox');
  const [gatewayApiKey, setGatewayApiKey] = useState('sk_test_51Mxxxxxxxxxxxxxx');

  const handleSalvarConfiguracoes = (e) => {
    e.preventDefault();
    alert('Configurações Comerciais globais salvas e aplicadas com sucesso!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Configurações Comerciais Globais</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Configure taxas de repasses, políticas de cancelamento e credenciais de gateways do Portal</p>
      </div>

      <form onSubmit={handleSalvarConfiguracoes} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Bloco 1: Taxas e Comissionamentos */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Comissionamentos Padrão</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Comissão Padrão do Parceiro (%)</label>
              <input 
                type="number" 
                value={comissaoPadraoParceiro} 
                onChange={e => setComissaoPadraoParceiro(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#6b7280' }}>Retida automaticamente das vendas diretas no portal</small>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Comissão Padrão da Agência (%)</label>
              <input 
                type="number" 
                value={comissaoPadraoAgencia} 
                onChange={e => setComissaoPadraoAgencia(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#6b7280' }}>Repassada às agências credenciadas por venda recomendada</small>
            </div>
          </div>
        </div>

        {/* Bloco 2: Regras de Negócio e Limites */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Regras de Vendas & Cancelamentos</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Prazo Limite para Reembolso Grátis (Horas)</label>
              <input 
                type="number" 
                value={prazoCancelamentoHoras} 
                onChange={e => setPrazoCancelamentoHoras(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#6b7280' }}>Horas de antecedência antes do evento para estorno automático sem multa</small>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Limite Máximo de Ingressos por Transação</label>
              <input 
                type="number" 
                value={limiteIngressosCompra} 
                onChange={e => setLimiteIngressosCompra(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: '#6b7280' }}>Evita reservas abusivas e ações de cambistas</small>
            </div>
          </div>
        </div>

        {/* Bloco 3: Gateway de Pagamento */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Gateway de Pagamento Integrado</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Modo do Gateway</label>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="gatewayModo" value="Sandbox" checked={gatewayModo === 'Sandbox'} onChange={() => setGatewayModo('Sandbox')} /> Sandbox (Testes)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="gatewayModo" value="Producao" checked={gatewayModo === 'Producao'} onChange={() => setGatewayModo('Producao')} /> Produção (Real)
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Chave API Privada / Token de Integração</label>
              <input 
                type="password" 
                value={gatewayApiKey} 
                onChange={e => setGatewayApiKey(e.target.value)} 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }} 
              />
              <small style={{ color: '#ef4444' }}>⚠️ Mantenha esta credencial confidencial. Nunca a publique em repositórios públicos.</small>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" style={{ padding: '0.75rem 2rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salvar Configurações
          </button>
        </div>

      </form>

    </div>
  );
}
