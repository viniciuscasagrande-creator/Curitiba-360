// src/pages/Comissionamento.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { platformSyncService, B2B_PARTNERS_CATALOG } from '../services/platformSyncService';

export default function Comissionamento() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(() => platformSyncService.getOrders());
  const [partners, setPartners] = useState(() => platformSyncService.getPartners());
  const [selectedPartner, setSelectedPartner] = useState(B2B_PARTNERS_CATALOG[0]);
  const [modalRepasse, setModalRepasse] = useState(null);

  useEffect(() => {
    return platformSyncService.subscribe(() => {
      setOrders(platformSyncService.getOrders());
      setPartners(platformSyncService.getPartners());
    });
  }, []);

  const validOrders = orders.filter(o => o.status === 'Confirmado');
  const cancelOrders = orders.filter(o => o.status !== 'Confirmado');

  const comissaoBruta = validOrders.reduce((acc, o) => acc + Number(o.comissaoRs || 0), 0) + 1545.00;
  const deducoes = cancelOrders.reduce((acc, o) => acc + Number(o.comissaoRs || 0), 0) + 105.00;
  const comissaoLiquida = Math.max(0, comissaoBruta - deducoes);

  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://curitiba360.vercel.app';
  const partnerReferralUrl = `${siteOrigin}/site?ref=${selectedPartner.code}`;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Comissionamento B2B, Repasses & Gerador de QR Code</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
            Gere QR Codes exclusivos para Hotéis e Agências e acompanhe o Split de comissão em tempo real
          </p>
        </div>
        <button
          onClick={() => {
            platformSyncService.setActiveReferral(selectedPartner.code);
            navigate(`/site?ref=${selectedPartner.code}`);
          }}
          style={{ padding: '0.6rem 1.2rem', backgroundColor: '#00a896', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🏨 Abrir Site Público com QR Code de {selectedPartner.name}
        </button>
      </div>

      {/* GERADOR DE QR CODE B2B RASTREÁVEL POR HOTEL / AGÊNCIA */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <span style={{ backgroundColor: '#10b981', color: '#022c22', fontSize: '0.7rem', fontWeight: '900', padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
            Diferencial B2B Curitiba 360°
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
            Gerador de Link & QR Code de Balcão (Hotéis e Agências Parceiras)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>
            Quando o hóspede escaneia o QR Code no quarto do hotel ou recepção, ganha desconto automático e a comissão entra direto na carteira B2B do estabelecimento:
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={selectedPartner.code}
              onChange={(e) => {
                const found = partners.find(p => p.code === e.target.value) || B2B_PARTNERS_CATALOG[0];
                setSelectedPartner(found);
              }}
              style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #3b82f6', backgroundColor: '#1e293b', color: 'white', fontWeight: 'bold' }}
            >
              {partners.map(p => (
                <option key={p.id} value={p.code}>
                  {p.name} — Comissão: {p.commissionPct}% | Desconto Hóspede: {p.discountPct}%
                </option>
              ))}
            </select>

            <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.55rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#38bdf8' }}>
              {partnerReferralUrl}
            </code>
          </div>
        </div>

        <div style={{ background: 'white', padding: '14px', borderRadius: '14px', textAlign: 'center', color: '#0f172a' }}>
          <QRCodeSVG value={partnerReferralUrl} size={115} />
          <div style={{ fontSize: '11px', fontWeight: '800', marginTop: '6px', color: '#00a896' }}>
            {selectedPartner.code.toUpperCase()}
          </div>
        </div>
      </div>

      {/* PAINEL DO PERÍODO ATUAL */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Período Atual Conectado ao Checkout</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '4px 0 0 0' }}>Atualizado automaticamente a cada venda realizada no Site Público</p>
          </div>
          <button
            onClick={() => setModalRepasse({ periodo: 'Período Atual', comissaoLiquida })}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            💸 Solicitar Repasse PIX/TED
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Comissão Bruta Acumulada</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>R$ {comissaoBruta.toFixed(2)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#ef4444' }}>Total de Deduções (Estornos)</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>- R$ {deducoes.toFixed(2)}</p>
          </div>
          <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 'bold' }}>Comissão Líquida Disponível</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>R$ {comissaoLiquida.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* RANKING DE PERFORMANCE POR HOTEL / AGÊNCIA */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', margin: 0 }}>Desempenho de Scans e Comissões por Parceiro B2B</h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Parceiro (Hotel / Agência)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tipo</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Leituras QR (Scans)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Taxa Comissão</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Vendas Confirmadas</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Comissão Gerada</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => {
              const partnerOrders = validOrders.filter(o => o.parceiroRef === p.code);
              const partnerSales = partnerOrders.reduce((acc, o) => acc + Number(o.valorTotal || 0), 0);
              const partnerCommission = partnerOrders.reduce((acc, o) => acc + Number(o.comissaoRs || 0), 0);
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{p.name}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>{p.type}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#2563eb' }}>{p.scans} scans</td>
                  <td style={{ padding: '0.75rem' }}>{p.commissionPct}%</td>
                  <td style={{ padding: '0.75rem' }}>R$ {partnerSales.toFixed(2)} ({partnerOrders.length} pedidos)</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>R$ {partnerCommission.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => {
                        platformSyncService.setActiveReferral(p.code);
                        navigate(`/site?ref=${p.code}`);
                      }}
                      style={{ padding: '0.3rem 0.65rem', backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Testar Link QR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalRepasse && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '460px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Solicitar Repasse B2B</h2>
            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#065f46', fontSize: '0.875rem' }}>Valor líquido para liquidação PIX/TED</p>
              <h3 style={{ margin: 0, fontSize: '2rem', color: '#10b981' }}>R$ {modalRepasse.comissaoLiquida.toFixed(2)}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setModalRepasse(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
              <button
                onClick={() => {
                  alert(`Solicitação de repasse de R$ ${modalRepasse.comissaoLiquida.toFixed(2)} enviada para liquidação bancária!`);
                  setModalRepasse(null);
                }}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Confirmar Repasse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
