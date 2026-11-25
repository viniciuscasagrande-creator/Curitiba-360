// src/pages/RelatoriosAtracao.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RelatoriosAtracao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subAba, setSubAba] = useState('vendas');
  const [pdfMode, setPdfMode] = useState(false);

  // Mapeamento de abas correspondente aos wireframes WF-028 a WF-047
  const abasRelatorios = [
    { id: 'vendas', label: 'Relatório de Vendas', wf: 'WF-032 / WF-033' },
    { id: 'abandono', label: 'Abandono de Carrinho', wf: 'WF-034 / WF-035' },
    { id: 'ingresso_detalhado', label: 'Ingresso Detalhado', wf: 'WF-036 / WF-037' },
    { id: 'categorias', label: 'Vendas por Categoria', wf: 'WF-038 / WF-039' },
    { id: 'cortesias', label: 'Cortesias Emitidas', wf: 'WF-040 / WF-041' },
    { id: 'validacoes', label: 'Relatório de Validações', wf: 'WF-042 / WF-043' },
    { id: 'comissoes', label: 'Comissões de Parceiros', wf: 'WF-044 / WF-045' },
    { id: 'bordero', label: 'Borderô Resumido', wf: 'WF-046 / WF-047' },
    { id: 'negociacao_comercial', label: 'Condições Comerciais', wf: 'WF-028' },
    { id: 'negociacao_financeira', label: 'Informações Financeiras', wf: 'WF-029' },
    { id: 'resumo_despesas', label: 'Resumo das Despesas', wf: 'WF-030' },
    { id: 'validar_ingressos', label: 'Aparelhos Validações', wf: 'WF-031' }
  ];

  const renderContent = () => {
    if (pdfMode) {
      return (
        <div style={{ backgroundColor: '#f1f5f9', padding: '2rem', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#64748b' }}>Visualização de Impressão PDF (Simulado)</span>
            <button onClick={() => window.print()} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
              🖨️ Imprimir PDF
            </button>
          </div>
          {/* Folha A4 Simulada */}
          <div style={{ width: '100%', maxWidth: '800px', height: '1000px', backgroundColor: 'white', padding: '3rem', boxSizing: 'border-box', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', fontFamily: 'Courier New, monospace', fontSize: '0.8125rem' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>PORTAL CURITIBA 360</h2>
              <p style={{ margin: '0.25rem 0' }}>RELATÓRIO FINANCEIRO E OPERACIONAL DA ATRAÇÃO #{id}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Gerado em 20/07/2026 às 15:58:36</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p><strong>Tipo de Relatório:</strong> {abasRelatorios.find(a => a.id === subAba)?.label.toUpperCase()}</p>
              <p><strong>Status do Relatório:</strong> Fechado / Consolidado</p>
              <p><strong>Período Selecionado:</strong> Últimos 30 Dias</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '3rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #000', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0' }}>Código</th>
                  <th style={{ padding: '0.5rem 0' }}>Data/Hora</th>
                  <th style={{ padding: '0.5rem 0' }}>Item/Parceiro</th>
                  <th style={{ padding: '0.5rem 0', textAlign: 'right' }}>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.5rem 0' }}>C360-128492</td>
                  <td style={{ padding: '0.5rem 0' }}>20/07 14:32</td>
                  <td style={{ padding: '0.5rem 0' }}>Ingresso Inteira</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>R$ 99,00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.5rem 0' }}>C360-847291</td>
                  <td style={{ padding: '0.5rem 0' }}>20/07 12:15</td>
                  <td style={{ padding: '0.5rem 0' }}>Ingresso Inteira</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>R$ 99,00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.5rem 0' }}>C360-492718</td>
                  <td style={{ padding: '0.5rem 0' }}>19/07 10:45</td>
                  <td style={{ padding: '0.5rem 0' }}>Ingresso Meia</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>R$ 49,50</td>
                </tr>
              </tbody>
            </table>

            <div style={{ borderTop: '2px solid #000', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>TOTAL ACUMULADO</span>
              <span>R$ 247,50</span>
            </div>

            <div style={{ marginTop: '10rem', borderTop: '1px solid #64748b', paddingTop: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
              Documento assinado digitalmente via DocuSign.<br/>Curitiba 360 Backoffice - CNPJ 12.345.678/0001-90
            </div>
          </div>
        </div>
      );
    }

    // Renderizações das abas específicas do sistema
    switch (subAba) {
      case 'negociacao_comercial':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Negociação Financeira - Condições Comerciais (WF-028)</h3>
            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div><strong>Tipo de Taxa:</strong> Porcentagem</div>
                <div><strong>Comissão:</strong> 15%</div>
                <div><strong>Taxa Pix:</strong> 0.5%</div>
                <div><strong>Taxa Cartão Crédito (À Vista):</strong> 2.2%</div>
              </div>
              <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar Negociação</button>
            </div>
          </div>
        );
      case 'negociacao_financeira':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Negociação Financeira - Regras de Repasse (WF-029)</h3>
            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div><strong>Saque Permitido:</strong> Sim (100% automático)</div>
                <div><strong>Prazo Mínimo para Saque:</strong> D+2 dias</div>
                <div><strong>Valor Máximo por Transação:</strong> R$ 200.000,00</div>
                <div><strong>Banco Destino:</strong> Itaú Unibanco (Ag: 4321, CC: 98765-4)</div>
              </div>
              <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar Regras Financeiras</button>
            </div>
          </div>
        );
      case 'resumo_despesas':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Resumo de Despesas Operacionais (WF-030)</h3>
            <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem' }}>Item da Despesa</th>
                    <th style={{ padding: '0.75rem' }}>Tipo</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>Tarifas de Gateway de Pagamento</td>
                    <td style={{ padding: '0.75rem' }}>Operacional</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: '#ef4444' }}>- R$ 124,50</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem' }}>Taxas de Custódia e Segurança</td>
                    <td style={{ padding: '0.75rem' }}>Segurança</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', color: '#ef4444' }}>- R$ 45,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'validar_ingressos':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Dispositivos de Validação Habilitados (WF-031)</h3>
            <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem' }}>Dispositivo ID</th>
                    <th style={{ padding: '0.75rem' }}>Operador</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Total Scans</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>#VAL-09A</td>
                    <td style={{ padding: '0.75rem' }}>Catraca Entrada Principal</td>
                    <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>Ativo</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>1.432 scans</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>#VAL-12B</td>
                    <td style={{ padding: '0.75rem' }}>Coletor Manual 1</td>
                    <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>Ativo</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>850 scans</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        // Relatórios com tabelas
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>
                {abasRelatorios.find(a => a.id === subAba)?.label} ({abasRelatorios.find(a => a.id === subAba)?.wf})
              </h3>
            </div>
            
            <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem' }}>Cód Transação</th>
                    <th style={{ padding: '0.75rem' }}>Cliente/Detalhes</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'right' }}>Valor Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', color: '#6b7280' }}>#928401</td>
                    <td style={{ padding: '0.75rem' }}>Mariana Santos (2x Inteira)</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>Aprovado</span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>R$ 198,00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', color: '#6b7280' }}>#928392</td>
                    <td style={{ padding: '0.75rem' }}>Rodrigo Ramos (1x Meia)</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>Aprovado</span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>R$ 49,50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      
      {/* Menu do Relatório (Barra Lateral Esquerda) */}
      <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button 
          onClick={() => navigate('/atracoes')}
          style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem', fontWeight: 'bold', width: 'fit-content' }}
        >
          ← Voltar para Atrações
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#1f2937' }}>Financeiro & Relatórios</h2>
        
        {abasRelatorios.map((aba) => {
          const isActive = subAba === aba.id;
          return (
            <button
              key={aba.id}
              onClick={() => {
                setSubAba(aba.id);
                setPdfMode(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: isActive ? '#f0f2f6' : 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                textAlign: 'left',
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? '#1f2937' : '#4b5563',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s'
              }}
            >
              {aba.label}
            </button>
          );
        })}
      </aside>

      {/* Conteúdo Principal do Relatório */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Gestão da Atração</h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Atração ID #{id} - Relatórios e Condições Específicas</p>
          </div>
          {/* Switch de modo PDF (Apenas para relatórios) */}
          {!['negociacao_comercial', 'negociacao_financeira', 'resumo_despesas', 'validar_ingressos'].includes(subAba) && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setPdfMode(false)}
                style={{ padding: '0.5rem 1rem', backgroundColor: !pdfMode ? '#4b5563' : 'white', color: !pdfMode ? 'white' : '#4b5563', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: '600' }}
              >
                Tabela Interativa
              </button>
              <button 
                onClick={() => setPdfMode(true)}
                style={{ padding: '0.5rem 1rem', backgroundColor: pdfMode ? '#4b5563' : 'white', color: pdfMode ? 'white' : '#4b5563', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: '600' }}
              >
                Visualizar PDF
              </button>
            </div>
          )}
        </div>

        {renderContent()}
      </div>

    </div>
  );
}
