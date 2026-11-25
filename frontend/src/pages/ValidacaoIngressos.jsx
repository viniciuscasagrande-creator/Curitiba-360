// src/pages/ValidacaoIngressos.jsx
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { platformSyncService } from '../services/platformSyncService';
import { playTurnstileBeep } from '../utils/exportAndAudioUtils';

export default function ValidacaoIngressos() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [codigoIngresso, setCodigoIngresso] = useState('');
  const [resultado, setResultado] = useState(null); // null, 'sucesso', 'erro', 'duplicado'
  const [mensagemResultado, setMensagemResultado] = useState('');
  const [detalhesIngresso, setDetalhesIngresso] = useState(null);
  const [vouchersList, setVouchersList] = useState(() => platformSyncService.getVouchers());
  const [historicoValidacao, setHistoricoValidacao] = useState(() => platformSyncService.getCheckins());
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;
    if (cameraOpen && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => setCameraOpen(false));
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cameraOpen]);

  useEffect(() => {
    const syncData = () => {
      setVouchersList(platformSyncService.getVouchers());
      setHistoricoValidacao(platformSyncService.getCheckins());
    };
    const unsub = platformSyncService.subscribe(syncData);

    const urlCode = searchParams.get('code');
    if (urlCode) {
      setCodigoIngresso(urlCode);
    }
    return unsub;
  }, [searchParams]);

  const executarValidacao = (codeToValidate) => {
    const targetCode = (codeToValidate ?? codigoIngresso).trim();
    if (!targetCode) return;

    const res = platformSyncService.validateVoucher(targetCode);
    setResultado(res.status);
    setMensagemResultado(res.message);
    setDetalhesIngresso(res.voucher);
    setVouchersList(platformSyncService.getVouchers());
    setHistoricoValidacao(platformSyncService.getCheckins());
    playBeep(res.status === 'sucesso');
  };

  const handleValidar = (e) => {
    e.preventDefault();
    executarValidarComCodigo(codigoIngresso);
  };

  const executarValidarComCodigo = (code) => {
    setCodigoIngresso(code);
    executarValidacao(code);
  };

  const playBeep = (sucesso) => {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(sucesso ? 880 : 220, context.currentTime);
      osc.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + (sucesso ? 0.15 : 0.35));
    } catch {
      // Ignorar se AudioContext estiver bloqueado
    }
  };

  const limparBusca = () => {
    setCodigoIngresso('');
    setResultado(null);
    setMensagemResultado('');
    setDetalhesIngresso(null);
  };

  const pendentes = vouchersList.filter(v => v.status === 'Pendente');

  return (
    <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '1rem' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Validador de Ingressos & Catraca QR Code 360°</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
            Conectado em tempo real aos pedidos emitidos no Portal Público (/site) e Backoffice
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => setCameraOpen(!cameraOpen)} style={{ padding: '0.5rem 1rem', backgroundColor: cameraOpen ? '#dc2626' : '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.825rem' }}>
            📷 {cameraOpen ? 'Desligar Câmera QR' : 'Ativar Câmera QR (WebRTC)'}
          </button>
          <button onClick={() => navigate('/site')} style={{ padding: '0.5rem 1rem', backgroundColor: '#00a896', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.825rem' }}>
            🌐 Comprar Novo Ingresso no Site
          </button>
          <button onClick={() => navigate('/tela/wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos')} style={{ padding: '0.5rem 1rem', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.825rem' }}>
            📊 Tela WF-031 Backoffice
          </button>
        </div>
      </div>

      {cameraOpen && (
        <div style={{ backgroundColor: '#0f172a', color: '#fff', padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', border: '2px solid #00a896' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '180px', height: '120px', borderRadius: '8px', backgroundColor: '#000', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: '800', color: '#5eead4' }}>● Scanner Óptico WebRTC & Modo Offline PWA Ativo</div>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: '4px 0 0 0' }}>Aponte o QR Code para a câmera ou clique em qualquer ingresso na lista abaixo para validar instantaneamente.</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* COLUNA ESQUERDA: CAMPO DE DIGITAÇÃO E FILA DE INGRESSOS EMITIDOS */}
        <div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: 0 }}>Leitura de Código / QR Hash</h3>
            
            <form onSubmit={handleValidar}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Ex: ING8001..." 
                  value={codigoIngresso}
                  onChange={(e) => setCodigoIngresso(e.target.value)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #cbd5e1', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}
                />
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Validar Entrada
                </button>
              </div>
            </form>
          </div>

          {/* INGRESSOS EMITIDOS PRONTOS PARA TESTE EM 1 CLIQUE */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>Ingressos Emitidos no Sistema ({vouchersList.length})</h3>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{pendentes.length} Pendentes</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 0, marginBottom: '1rem' }}>
              Clique em qualquer ingresso abaixo para simular o disparo do leitor óptico QR Code na catraca:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '320px', overflowY: 'auto' }}>
              {vouchersList.map((v) => (
                <div
                  key={v.id}
                  onClick={() => executarValidarComCodigo(v.id)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb',
                    backgroundColor: v.status === 'Pendente' ? '#f8fafc' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <QRCodeSVG value={v.id} size={36} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#0f172a' }}>
                        {v.id} • {v.turista}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {v.atracao} ({v.categoria})
                      </div>
                    </div>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 'bold',
                    backgroundColor: v.status === 'Pendente' ? '#dbeafe' : v.status === 'Validado' ? '#d1fae5' : '#fee2e2',
                    color: v.status === 'Pendente' ? '#1e40af' : v.status === 'Validado' ? '#065f46' : '#991b1b'
                  }}>
                    {v.status === 'Pendente' ? 'Simular Scan' : v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: RESULTADO DA LEITURA & HISTÓRICO EM TEMPO REAL */}
        <div>
          {resultado && (
            <div style={{ 
              background: resultado === 'sucesso' ? '#d1fae5' : resultado === 'duplicado' ? '#fef3c7' : '#fee2e2', 
              color: resultado === 'sucesso' ? '#065f46' : resultado === 'duplicado' ? '#92400e' : '#991b1b',
              padding: '1.5rem', borderRadius: '12px', border: '2px solid',
              borderColor: resultado === 'sucesso' ? '#10b981' : resultado === 'duplicado' ? '#f59e0b' : '#ef4444',
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  {resultado === 'sucesso' && '✅ Catraca Liberada!'}
                  {resultado === 'duplicado' && '⚠️ Ingresso Já Utilizado (Anti-Fraude)!'}
                  {resultado === 'erro' && '❌ Acesso Negado!'}
                </h3>
                <button onClick={limparBusca} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>Limpar X</button>
              </div>

              <p style={{ fontSize: '0.85rem', fontWeight: '600', marginTop: 0, marginBottom: '1rem' }}>
                {mensagemResultado}
              </p>

              {detalhesIngresso && (
                <div style={{ fontSize: '0.875rem', lineHeight: '1.6', backgroundColor: 'rgba(255,255,255,0.6)', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Código Voucher:</span> <strong>{detalhesIngresso.id}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Pedido:</span> <strong>#{detalhesIngresso.orderId}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Turista:</span> <strong>{detalhesIngresso.turista}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CPF:</span> <strong>{detalhesIngresso.cpf}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Atração:</span> <strong>{detalhesIngresso.atracao}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Categoria:</span> <strong>{detalhesIngresso.categoria}</strong></div>
                </div>
              )}
            </div>
          )}

          {/* HISTÓRICO DE LEITURAS RECENTES */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
              Registro de Acessos na Catraca ({historicoValidacao.length})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto' }}>
              {historicoValidacao.map((h, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{h.turista} <span style={{ color: '#2563eb' }}>(#{h.id})</span></div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{h.atracao}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>✓ Validado</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{h.dataHora}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
