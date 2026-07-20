// src/pages/PesquisarIngresso.jsx
import { useState } from 'react';

export default function PesquisarIngresso() {
  const [campoFiltro, setCampoFiltro] = useState('codigo'); // 'codigo', 'nome', 'cpf'
  const [valorBusca, setValorBusca] = useState('');
  const [ingressoEncontrado, setIngressoEncontrado] = useState(null);
  const [pesquisaFeita, setPesquisaFeita] = useState(false);

  // Mock de Ingressos para Pesquisa Avançada
  const databaseIngressos = [
    { 
      id: 'ING8001', 
      turista: 'Beatriz Ramos', 
      cpf: '123.456.789-10', 
      email: 'beatriz.ramos@gmail.com', 
      atracao: 'Ópera de Arame', 
      categoria: 'Inteira - Pista', 
      lote: 'Lote 1', 
      valor: 120.00, 
      status: 'Pendente', 
      dataCompra: '19/07/2026 14:32',
      pagamento: { metodo: 'Pix', transacaoId: 'TX_PIX_9921827A', status: 'Aprovado' },
      historico: [
        { acao: 'Compra efetuada e confirmada via Pix', data: '19/07/2026 14:32', autor: 'Sistema Curitiba 360' }
      ]
    },
    { 
      id: 'ING8002', 
      turista: 'Carlos Souza', 
      cpf: '444.555.666-00', 
      email: 'carlos.souza@yahoo.com',
      atracao: 'Jardim Botânico', 
      categoria: 'Meia - Pista', 
      lote: 'Lote 1', 
      valor: 60.00, 
      status: 'Validado', 
      dataCompra: '20/07/2026 10:15',
      pagamento: { metodo: 'Cartão de Crédito', transacaoId: 'TX_CC_11928374', status: 'Aprovado' },
      historico: [
        { acao: 'Compra efetuada e confirmada via gateway de crédito', data: '20/07/2026 10:15', autor: 'Sistema Curitiba 360' },
        { acao: 'Ingresso validado na catraca de entrada', data: '20/07/2026 15:30', autor: 'Catraca 02 - Jardim Botânico' }
      ]
    }
  ];

  const handlePesquisar = (e) => {
    e.preventDefault();
    if (!valorBusca.trim()) return;

    let res = null;
    if (campoFiltro === 'codigo') {
      res = databaseIngressos.find(i => i.id.toUpperCase() === valorBusca.toUpperCase().trim());
    } else if (campoFiltro === 'nome') {
      res = databaseIngressos.find(i => i.turista.toLowerCase().includes(valorBusca.toLowerCase().trim()));
    } else if (campoFiltro === 'cpf') {
      res = databaseIngressos.find(i => i.cpf.replace(/\D/g, '') === valorBusca.replace(/\D/g, '').trim());
    }

    setIngressoEncontrado(res);
    setPesquisaFeita(true);
  };

  const handleCopiarDados = () => {
    alert('Informações do ingresso copiadas para a área de transferência!');
  };

  const handleReenviarEmail = () => {
    alert(`E-mail com voucher/ingresso reenviado com sucesso para ${ingressoEncontrado.email}!`);
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pesquisa Detalhada de Ingresso</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Localize e examine a ficha completa, dados de pagamento e histórico de auditoria de um ingresso específico</p>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <form onSubmit={handlePesquisar} style={{ display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pesquisar por</label>
            <select 
              value={campoFiltro} 
              onChange={(e) => { setCampoFiltro(e.target.value); setValorBusca(''); }}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="codigo">Código do Ingresso (Ex: ING8001)</option>
              <option value="nome">Nome do Turista</option>
              <option value="cpf">CPF do Turista</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Termo de Busca</label>
            <input 
              type="text" 
              required
              placeholder={campoFiltro === 'codigo' ? 'Ex: ING8001' : campoFiltro === 'nome' ? 'Nome do comprador...' : 'Apenas números do CPF...'} 
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '38px' }}>
            🔍 Pesquisar
          </button>
        </form>
      </div>

      {/* RESULTADO DA PESQUISA */}
      {pesquisaFeita && (
        ingressoEncontrado ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
            
            {/* FICHA DETALHADA */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>#{ingressoEncontrado.id}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{ingressoEncontrado.turista}</h2>
                </div>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold',
                  backgroundColor: ingressoEncontrado.status === 'Validado' ? '#d1fae5' : ingressoEncontrado.status === 'Cancelado' ? '#fee2e2' : '#fef3c7',
                  color: ingressoEncontrado.status === 'Validado' ? '#065f46' : ingressoEncontrado.status === 'Cancelado' ? '#991b1b' : '#92400e'
                }}>
                  {ingressoEncontrado.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>CPF do Titular:</span><div style={{ fontWeight: 'bold' }}>{ingressoEncontrado.cpf}</div></div>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>E-mail cadastrado:</span><div style={{ fontWeight: 'bold' }}>{ingressoEncontrado.email}</div></div>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Atração / Ponto Turístico:</span><div style={{ fontWeight: 'bold', color: '#3b82f6' }}>{ingressoEncontrado.atracao}</div></div>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Categoria / Lote:</span><div style={{ fontWeight: 'bold' }}>{ingressoEncontrado.categoria} ({ingressoEncontrado.lote})</div></div>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Data da Compra:</span><div style={{ fontWeight: 'bold' }}>{ingressoEncontrado.dataCompra}</div></div>
                <div><span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Valor do Ingresso:</span><div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#10b981' }}>R$ {ingressoEncontrado.valor.toFixed(2)}</div></div>
              </div>

              {/* DADOS DE PAGAMENTO */}
              <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>Dados da Transação</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                  <div><span>Gateway:</span> <strong>Mercado Pago</strong></div>
                  <div><span>Método:</span> <strong>{ingressoEncontrado.pagamento.metodo}</strong></div>
                  <div><span>Status:</span> <strong style={{ color: '#10b981' }}>{ingressoEncontrado.pagamento.status}</strong></div>
                  <div style={{ gridColumn: '1 / -1' }}><span>Transação ID:</span> <strong style={{ fontFamily: 'monospace' }}>{ingressoEncontrado.pagamento.transacaoId}</strong></div>
                </div>
              </div>

              {/* BOTÕES DE AÇÕES RÁPIDAS */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={handleCopiarDados} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                  📋 Copiar Dados
                </button>
                <button onClick={handleReenviarEmail} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  ✉ Reenviar Voucher por E-mail
                </button>
              </div>

            </div>

            {/* HISTÓRICO / LINHA DO TEMPO */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Histórico / Linha do Tempo</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb' }}>
                {ingressoEncontrado.historico.map((h, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%', position: 'absolute', left: '-16px', top: '4px' }}></div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{h.acao}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{h.data} • por {h.autor}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center', color: '#6b7280' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <h3 style={{ margin: '1rem 0 0.5rem 0', fontWeight: 'bold' }}>Nenhum Ingresso Localizado</h3>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>Revise o código ou termo de busca informado e tente novamente.</p>
          </div>
        )
      )}

    </div>
  );
}
