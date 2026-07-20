// src/pages/GestaoRelatoriosFinanceiros.jsx
import { useState } from 'react';

export default function GestaoRelatoriosFinanceiros() {
  const [tipoRelatorio, setTipoRelatorio] = useState('Vendas Consolidadas');
  const [dataInicial, setDataInicial] = useState('2026-07-01');
  const [dataFinal, setDataFinal] = useState('2026-07-31');
  const [parceiroFiltro, setParceiroFiltro] = useState('Todos');
  
  // Estado para armazenar os dados gerados (Mock)
  const [dadosRelatorio, setDadosRelatorio] = useState(null);

  // Mocks de resultados dependendo do tipo de relatório
  const gerarRelatorio = (e) => {
    e.preventDefault();
    
    if (tipoRelatorio === 'Vendas Consolidadas') {
      setDadosRelatorio({
        colunas: ['Data', 'Atração', 'Qtd Ingressos', 'Receita Bruta (R$)', 'Taxas Gateway (R$)', 'Receita Líquida (R$)'],
        linhas: [
          ['20/07/2026', 'Ópera de Arame', 150, 7500.00, 150.00, 7350.00],
          ['20/07/2026', 'Jardim Botânico', 300, 12000.00, 240.00, 11760.00],
          ['19/07/2026', 'Parque Jaime Lerner', 80, 4000.00, 80.00, 3920.00],
        ],
        totais: ['Total Período', '-', 530, 23500.00, 470.00, 23030.00]
      });
    } else if (tipoRelatorio === 'Comissões de Agências') {
      setDadosRelatorio({
        colunas: ['Agência', 'Vendas Totais (R$)', 'Comissão Base (%)', 'Comissão Bruta (R$)', 'Deduções (R$)', 'A Pagar (R$)'],
        linhas: [
          ['Tour CWB', 45000.00, '10%', 4500.00, 150.00, 4350.00],
          ['Viagens Sul', 28000.00, '12%', 3360.00, 0.00, 3360.00],
          ['Explore Paraná', 12500.00, '10%', 1250.00, 50.00, 1200.00],
        ],
        totais: ['Total Período', 85500.00, '-', 9110.00, 200.00, 8910.00]
      });
    } else if (tipoRelatorio === 'Reembolsos e Estornos') {
      setDadosRelatorio({
        colunas: ['Data Solicitação', 'Pedido ID', 'Turista', 'Motivo', 'Valor Estornado (R$)', 'Status'],
        linhas: [
          ['18/07/2026', '#1092', 'Carlos Almeida', 'Cancelamento Automático (24h)', 150.00, 'Concluído'],
          ['19/07/2026', '#1085', 'Ana Souza', 'Aprovado Manual (Doença)', 80.00, 'Processando'],
        ],
        totais: ['Total Período', '-', '-', '-', 230.00, '-']
      });
    }
  };

  const limparFiltros = () => {
    setDadosRelatorio(null);
    setTipoRelatorio('Vendas Consolidadas');
  };

  return (
    <div>
      {/* CABEÇALHO E AÇÕES DE EXPORTAÇÃO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Relatórios Financeiros</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gere e exporte dados para conciliação e auditoria</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            disabled={!dadosRelatorio}
            style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: dadosRelatorio ? 'white' : '#f3f4f6', cursor: dadosRelatorio ? 'pointer' : 'not-allowed', color: dadosRelatorio ? '#374151' : '#9ca3af' }}>
            📄 Exportar CSV
          </button>
          <button 
            disabled={!dadosRelatorio}
            style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: dadosRelatorio ? 'white' : '#f3f4f6', cursor: dadosRelatorio ? 'pointer' : 'not-allowed', color: dadosRelatorio ? '#374151' : '#9ca3af' }}>
            📕 Exportar PDF
          </button>
        </div>
      </div>

      {/* ÁREA DE FILTROS */}
      <form onSubmit={gerarRelatorio} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Parâmetros do Relatório</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tipo de Relatório *</label>
            <select value={tipoRelatorio} onChange={(e) => setTipoRelatorio(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.875rem' }}>
              <option value="Vendas Consolidadas">Vendas Consolidadas</option>
              <option value="Comissões de Agências">Comissões de Agências</option>
              <option value="Repasses a Parceiros">Repasses a Parceiros</option>
              <option value="Reembolsos e Estornos">Reembolsos e Estornos</option>
              <option value="Uso de Cupons Promocionais">Uso de Cupons Promocionais</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data Inicial *</label>
            <input type="date" required value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.875rem' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data Final *</label>
            <input type="date" required value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.875rem' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Parceiro / Agência</label>
            <select value={parceiroFiltro} onChange={(e) => setParceiroFiltro(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.875rem' }}>
              <option value="Todos">Todos (Visão Global)</option>
              <option value="Parque Jaime Lerner">Parque Jaime Lerner S/A</option>
              <option value="Tour CWB">Tour CWB (Agência)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <button type="button" onClick={limparFiltros} style={{ padding: '0.75rem 1.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Limpar
          </button>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Gerar Relatório
          </button>
        </div>
      </form>

      {/* RESULTADO DO RELATÓRIO */}
      {dadosRelatorio ? (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Resultado: {tipoRelatorio}</h2>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Período: {dataInicial} até {dataFinal}</span>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead style={{ backgroundColor: '#f3f4f6' }}>
                <tr>
                  {dadosRelatorio.colunas.map((col, idx) => (
                    <th key={idx} style={{ padding: '1rem', borderBottom: '2px solid #e5e7eb', color: '#374151', fontSize: '0.875rem' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dadosRelatorio.linhas.map((linha, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                    {linha.map((celula, i) => (
                      <td key={i} style={{ padding: '1rem', color: '#4b5563', fontSize: '0.875rem', fontWeight: typeof celula === 'number' ? 'bold' : 'normal' }}>
                        {typeof celula === 'number' && !Number.isInteger(celula) ? `R$ ${celula.toFixed(2)}` : celula}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ backgroundColor: '#ecfdf5', borderTop: '2px solid #10b981' }}>
                <tr>
                  {dadosRelatorio.totais.map((total, idx) => (
                    <td key={idx} style={{ padding: '1rem', fontWeight: 'bold', color: '#065f46', fontSize: '0.875rem' }}>
                      {typeof total === 'number' && !Number.isInteger(total) ? `R$ ${total.toFixed(2)}` : total}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '8px', border: '2px dashed #e5e7eb', textAlign: 'center', color: '#6b7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Nenhum relatório gerado</h3>
          <p>Utilize os filtros acima e clique em "Gerar Relatório" para visualizar os dados.</p>
        </div>
      )}
    </div>
  );
}
