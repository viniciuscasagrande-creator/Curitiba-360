// src/pages/GestaoCupons.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GestaoCupons() {
  const { id } = useParams();
  const navigate = useNavigate();
  // RF-018.06 e RF-018.07: Abas de Status (Padrão: 'Ativos')
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  
  // Controle do Modais (RF-018.35 e RF-018.49)
  const [modalCupomAberto, setModalCupomAberto] = useState(false);
  const [tipoModalCupom, setTipoModalCupom] = useState('Normal'); // 'Normal' ou 'Agencia'
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modalQRAberto, setModalQRAberto] = useState(false);
  const [cupomSelecionadoQR, setCupomSelecionadoQR] = useState(null);

  // Mock de Dados (RF-018.10 a RF-018.15)
  const [cupons, setCupons] = useState([
    { id: 401, nome: 'FERIAS10', usuarioRelacionado: 'Admin Silva', status: 'Ativo', tipoDesconto: 'Porcentagem', valor: 10, qtd: 100, utilizados: 45, mostrarAtracao: 'Sim', inicio: '01/07/2026', fim: '31/07/2026', categoria: 'Todas', link: 'curitiba360.com/ferias10' },
    { id: 402, nome: 'TOURCWB50', usuarioRelacionado: 'Maria (Tour CWB)', status: 'Ativo', tipoDesconto: 'Valor', valor: 50, qtd: 20, utilizados: 20, mostrarAtracao: 'Não', inicio: '15/07/2026', fim: '30/08/2026', categoria: 'Inteira', link: 'curitiba360.com/tourcwb50' },
    { id: 403, nome: 'INVERNO26', usuarioRelacionado: 'Admin Silva', status: 'Expirado', tipoDesconto: 'Porcentagem', valor: 15, qtd: 500, utilizados: 120, mostrarAtracao: 'Sim', inicio: '01/06/2026', fim: '30/06/2026', categoria: 'Todas', link: 'curitiba360.com/inverno26' },
  ]);

  const filtrados = cupons.filter(c => {
    const matchBusca = c.nome.toLowerCase().includes(termoBusca.toLowerCase()) || c.id.toString().includes(termoBusca);
    let matchAba = true;
    if (abaAtiva === 'Ativos') matchAba = c.status === 'Ativo';
    if (abaAtiva === 'Inativos') matchAba = c.status === 'Inativo' || c.status === 'Expirado';
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(filtrados.map(c => c.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'Ativo': return { bg: '#d1fae5', text: '#065f46' };
      case 'Inativo': return { bg: '#f3f4f6', text: '#374151' };
      case 'Expirado': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const handleAbrirModalCupom = (tipo) => {
    setTipoModalCupom(tipo);
    setModoEdicao(false);
    setModalCupomAberto(true);
  };

  const handleSalvarCupom = (e) => {
    e.preventDefault();
    alert(`Cupom ${tipoModalCupom} salvo com sucesso!`);
    setModalCupomAberto(false);
  };

  const handleGerarLinkQR = (cupom) => {
    setCupomSelecionadoQR(cupom);
    setModalQRAberto(true);
  };

  const handleCopiarLink = () => {
    alert(`Link ${cupomSelecionadoQR.link} copiado para a área de transferência!`);
  };

  return (
    <div>
      {/* Cabeçalho e Ações da Atração */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', flex: 1, minWidth: '300px' }}>
          <button 
            onClick={() => navigate('/atracoes')}
            style={{ padding: '0.5rem 1rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem', fontWeight: 'bold' }}
          >
            ← Voltar para Atrações
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 1rem 0' }}>
            Atração: Parque Jaime Lerner
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={() => navigate(`/atracoes/${id}/totais`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>📊 Totais</button>
            <button onClick={() => navigate(`/atracoes/${id}/ingressos`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>🎫 Ingressos</button>
            <button onClick={() => navigate(`/atracoes/${id}/cupons`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', fontWeight: '600', color: '#10b981', borderBottom: '3px solid #10b981' }}>🎟️ Cupons</button>
            <button onClick={() => navigate(`/atracoes/${id}/relatorios`)} style={{ border: 'none', background: 'none', padding: '0.5rem 0', cursor: 'pointer', color: '#6b7280', fontWeight: '500' }}>💰 Financeiro & Relatórios</button>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '3.5rem' }}>
          <input 
            type="text" 
            placeholder="Buscar ID ou Nome..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
          />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Filtros</button>
          
          <button onClick={() => handleAbrirModalCupom('Normal')} style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Adicionar Cupom
          </button>
          <button onClick={() => handleAbrirModalCupom('Agência')} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Cupom Agência
          </button>
        </div>
      </div>

      {/* ABAS E AÇÕES EM MASSA (RF-018.06 e RF-018.20) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Ativos', 'Inativos', 'Todos'].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setSelecionados([]); }}
              style={{ 
                padding: '0.5rem 0', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: abaAtiva === aba ? 'bold' : 'normal',
                borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
                color: abaAtiva === aba ? '#111827' : '#6b7280'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            <button disabled={selecionados.length !== 1} onClick={() => { setModoEdicao(true); setModalCupomAberto(true); }} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
            <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#3b82f6' }}>Gerar link</button>
            <button disabled={selecionados.length !== 1} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed', color: '#10b981' }}>Compartilhar</button>
            {abaAtiva === 'Ativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Inativar</button>}
            {abaAtiva === 'Inativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981' }}>Ativar</button>}
            <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
          </div>
        )}
      </div>

      {/* TABELA DE CUPONS (RF-018.10) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}><input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === filtrados.length && filtrados.length > 0} /></th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome / ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Usuário Rel.</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Desconto</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Vigência</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Saldo (Disp)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => {
              const saldo = c.qtd - c.utilizados; // RF-018.15: Cálculo automático do Saldo
              return (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}><input type="checkbox" checked={selecionados.includes(c.id)} onChange={() => handleSelecionarUm(c.id)} /></td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{c.nome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>#{c.id}</div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{c.usuarioRelacionado}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>
                    {c.tipoDesconto === 'Porcentagem' ? `${c.valor}%` : `R$ ${c.valor.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.75rem' }}>{c.inicio} a {c.fim}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: saldo === 0 ? 'red' : 'inherit' }}>{saldo}</span>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>de {c.qtd}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStyle(c.status).bg, color: getBadgeStyle(c.status).text }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button onClick={() => handleGerarLinkQR(c)} style={{ padding: '0.3rem 0.6rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>
                      QR Code
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO (RF-018.35 a RF-018.48) */}
      {modalCupomAberto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{modoEdicao ? `Editar Cupom ${tipoModalCupom}` : `Novo Cupom ${tipoModalCupom}`}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Preencha os campos obrigatórios para adicionar um cupom.</p>

            <form onSubmit={handleSalvarCupom}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                
                {/* Campo exclusivo do Cupom Agência (RF-018.48) */}
                {tipoModalCupom === 'Agência' && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#3b82f6' }}>Agência Vinculada *</label>
                    <select required style={{ width: '100%', padding: '0.5rem', border: '2px solid #3b82f6', borderRadius: '4px' }}>
                      <option value="">Selecione a Agência...</option>
                      <option value="1">Tour CWB</option>
                      <option value="2">Viagens Sul</option>
                    </select>
                  </div>
                )}

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Nome do Cupom *</label>
                  <input type="text" required placeholder="Ex: INVERNO20" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', textTransform: 'uppercase' }} />
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Usuário Relacionado *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="admin">Admin Silva</option>
                    <option value="maria">Maria (Tour CWB)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Tipo de Desconto *</label>
                  <select required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="Porcentagem">Porcentagem (%)</option>
                    <option value="Valor">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Valor/Porcentagem *</label><input type="number" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Início da Validade *</label><input type="date" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Fim da Validade *</label><input type="date" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div><label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Quantidade Máxima *</label><input type="number" required style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} /></div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Mostrar na Atração? *</label>
                  <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0' }}>
                    <label><input type="radio" name="mostrarAtracao" value="Sim" /> Sim</label>
                    <label><input type="radio" name="mostrarAtracao" value="Não" defaultChecked /> Não</label>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Categorias Aplicáveis *</label>
                  <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f9fafb' }}>
                    <label><input type="checkbox" /> Inteira</label>
                    <label><input type="checkbox" /> Meia-entrada</label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalCupomAberto(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Descartar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL QR CODE (RF-018.49 a RF-018.52) */}
      {modalQRAberto && cupomSelecionadoQR && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '350px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>QR Code - {cupomSelecionadoQR.nome}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Escaneie o QR Code ou copie o link abaixo.</p>

            <div style={{ width: '200px', height: '200px', backgroundColor: '#e5e7eb', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}>
              <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>IMAGEM QR CODE</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="text" readOnly value={cupomSelecionadoQR.link} style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9fafb', color: '#6b7280' }} />
              <button onClick={handleCopiarLink} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Copiar</button>
            </div>

            <button onClick={() => setModalQRAberto(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', width: '100%' }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
