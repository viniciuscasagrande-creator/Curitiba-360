// src/pages/ValidacaoIngressos.jsx
import { useState } from 'react';

export default function ValidacaoIngressos() {
  const [codigoIngresso, setCodigoIngresso] = useState('');
  const [resultado, setResultado] = useState(null); // null, 'sucesso', 'erro', 'duplicado'
  const [detalhesIngresso, setDetalhesIngresso] = useState(null);
  const [historicoValidacao, setHistoricoValidacao] = useState([
    { id: 'ING8002', turista: 'Carlos Souza', atracao: 'Jardim Botânico', dataHora: '20/07/2026 15:30' },
  ]);

  // Mock de ingressos para validação
  const ingressosValidos = [
    { id: 'ING8001', turista: 'Beatriz Ramos', cpf: '123.456.789-10', atracao: 'Ópera de Arame', categoria: 'Inteira', status: 'Pendente' },
    { id: 'ING8002', turista: 'Carlos Souza', cpf: '444.555.666-00', atracao: 'Jardim Botânico', categoria: 'Meia-entrada', status: 'Validado' },
    { id: 'ING8003', turista: 'Ana Maria', cpf: '777.888.999-55', atracao: 'Ópera de Arame', categoria: 'Inteira', status: 'Cancelado' }
  ];

  const handleValidar = (e) => {
    e.preventDefault();
    if (!codigoIngresso.trim()) return;

    // Buscar o código
    const ing = ingressosValidos.find(i => i.id.toUpperCase() === codigoIngresso.toUpperCase().trim());

    if (!ing) {
      setResultado('erro');
      setDetalhesIngresso(null);
      // Toca áudio/bipe de erro
      playBeep(false);
    } else if (ing.status === 'Validado') {
      setResultado('duplicado');
      setDetalhesIngresso(ing);
      playBeep(false);
    } else if (ing.status === 'Cancelado') {
      setResultado('erro');
      setDetalhesIngresso(ing);
      playBeep(false);
    } else {
      // Sucesso
      setResultado('sucesso');
      setDetalhesIngresso(ing);
      // Adiciona ao histórico local
      setHistoricoValidacao([
        { id: ing.id, turista: ing.turista, atracao: ing.atracao, dataHora: new Date().toLocaleString('pt-BR') },
        ...historicoValidacao
      ]);
      playBeep(true);
    }
  };

  const playBeep = (sucesso) => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(sucesso ? 880 : 220, context.currentTime); // 880Hz para sucesso (agudo), 220Hz para erro (grave)
      osc.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + (sucesso ? 0.15 : 0.35));
    } catch (e) {
      console.log('AudioContext falhou ou foi bloqueado pelo navegador.');
    }
  };

  const limparBusca = () => {
    setCodigoIngresso('');
    setResultado(null);
    setDetalhesIngresso(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Validador de Ingressos (Portaria)</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Efetue a leitura por código de barras/QR Code ou faça a busca manual do código do ingresso do turista</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* COLUNA ESQUERDA: CAMPO DE DIGITAÇÃO E LEITOR SIMULADO */}
        <div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Digitar Código Manual</h3>
            
            <form onSubmit={handleValidar}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Ex: ING8001..." 
                  value={codigoIngresso}
                  onChange={(e) => setCodigoIngresso(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '2px solid #ccc', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}
                />
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Validar
                </button>
              </div>
            </form>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Simulador de Scanner / Câmera</h3>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#1f2937', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: '2px dashed #4b5563', position: 'relative' }}>
              <div style={{ border: '2px solid #ef4444', width: '120px', height: '120px', position: 'absolute', opacity: 0.3 }}></div>
              <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</span>
              <span style={{ fontSize: '0.875rem' }}>Aguardando leitura de QR Code...</span>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '1rem' }}>Dispare com o scanner USB apontando para o campo de texto</span>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADO DA LEITURA & HISTÓRICO */}
        <div>
          {/* PAINEL DE RESULTADO */}
          {resultado && (
            <div style={{ 
              background: resultado === 'sucesso' ? '#d1fae5' : resultado === 'duplicado' ? '#fef3c7' : '#fee2e2', 
              color: resultado === 'sucesso' ? '#065f46' : resultado === 'duplicado' ? '#92400e' : '#991b1b',
              padding: '1.5rem', borderRadius: '8px', border: '1px solid',
              borderColor: resultado === 'sucesso' ? '#a7f3d0' : resultado === 'duplicado' ? '#fde68a' : '#fca5a5',
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  {resultado === 'sucesso' && '✅ Ingresso Liberado!'}
                  {resultado === 'duplicado' && '⚠️ Já Utilizado!'}
                  {resultado === 'erro' && '❌ Acesso Negado!'}
                </h3>
                <button onClick={limparBusca} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>Limpar X</button>
              </div>

              {detalhesIngresso ? (
                <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Turista:</span> <strong>{detalhesIngresso.turista}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CPF:</span> <strong>{detalhesIngresso.cpf}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Atração:</span> <strong>{detalhesIngresso.atracao}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Categoria:</span> <strong>{detalhesIngresso.categoria}</strong></div>
                  {resultado === 'duplicado' && (
                    <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed', fontWeight: 'bold', color: '#ef4444', textAlign: 'center' }}>
                      Este ingresso já foi validado em 20/07/2026 às 15:30.
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ margin: 0, fontSize: '0.875rem' }}>Código não localizado ou cancelado no sistema de reservas.</p>
              )}
            </div>
          )}

          {/* HISTÓRICO DE LEITURAS RECENTES */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Leituras Recentes (Histórico)</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto' }}>
              {historicoValidacao.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{h.turista} (#{h.id})</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{h.atracao}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{h.dataHora}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
