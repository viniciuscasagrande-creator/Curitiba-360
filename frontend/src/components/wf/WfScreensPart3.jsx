// frontend/src/components/wf/WfScreensPart3.jsx
// Implementação fiel e 100% interativa das telas WF-028 a WF-047 (Gestão Financeira da Atração, Validações e Relatórios PDF/Tela)
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  WfSidebar, WfPagination, WfStatusPill,
  OFFICIAL_LOGO, OFFICIAL_HORIZONTAL_LOGO
} from './WfShell';
import { platformSyncService } from '../../services/platformSyncService';
import { downloadExcelCsv, playTurnstileBeep } from '../../utils/exportAndAudioUtils';

// ============================================================================
// BARRA DE NAVEGAÇÃO RÁPIDA DA GESTÃO FINANCEIRA (WF-028 A WF-047 + WF-052/053/063)
// ============================================================================
export function WfFinancialQuickBar({ activeSlug = '' }) {
  const items = [
    { label: '💰 Despesas & Repasse (WF-030)', slug: 'wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas' },
    { label: '📋 Condições Comerciais (WF-028)', slug: 'wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais' },
    { label: '🏦 Info. Financeiras (WF-029)', slug: 'wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras' },
    { label: '📈 Vendas (WF-032)', slug: 'wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas' },
    { label: '🛒 Abandono Carrinho (WF-034)', slug: 'wf-034-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-abandono-de-carrinho' },
    { label: '🎟️ Ingresso Detalhado (WF-036)', slug: 'wf-036-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-ingresso-detalhado' },
    { label: '🏷️ Categorias (WF-038)', slug: 'wf-038-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-categorias' },
    { label: '🎁 Cortesias (WF-040)', slug: 'wf-040-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-cortesias-emitidas' },
    { label: '✅ Validações (WF-042)', slug: 'wf-042-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-validacoes' },
    { label: '🤝 Comissões (WF-044)', slug: 'wf-044-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-comissoes' },
    { label: '📑 Borderô Resumido (WF-046)', slug: 'wf-046-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido' },
    { label: '📊 Relatórios Globais (WF-063)', slug: 'wf-063-relatorios-financeiros-globais' }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 12, padding: '10px 14px', marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>
        Menu Rápido • Gestão Financeira da Atração & Fechamento (WF-028 a WF-047)
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((item) => {
          const isCurrent = activeSlug === item.slug;
          return (
            <Link
              key={item.slug}
              to={`/tela/${item.slug}`}
              style={{
                padding: '6px 11px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: isCurrent ? '#4e5a6b' : '#ffffff',
                color: isCurrent ? '#ffffff' : '#3b4758',
                border: isCurrent ? '1.5px solid #3b4758' : '1px solid #cbd5e1'
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// WF-028 & WF-029: NEGOCIAÇÃO FINANCEIRA (CONDIÇÕES COMERCIAIS E INFORMAÇÕES FINANCEIRAS)
// ============================================================================
export function Wf028AttractionFinancialConfig({ mode = 'condicoes' }) {
  const [savedBanner, setSavedBanner] = useState(false);
  const [apelido, setApelido] = useState('Padrão 10% — Contrato Curitiba 360°');
  const [tipoTaxa, setTipoTaxa] = useState('Porcentagem');
  const [valorTaxa, setValorTaxa] = useState('10%');
  const [txCreditoVista, setTxCreditoVista] = useState('1,5%');
  const [txCreditoParcelado, setTxCreditoParcelado] = useState('2,35%');
  const [txPix, setTxPix] = useState('0,95%');
  const [txAntecipacao, setTxAntecipacao] = useState('1,20%');
  const [txInternacional, setTxInternacional] = useState('2,80%');
  const [prazoDias, setPrazoDias] = useState('15');
  const [liberadoSaque, setLiberadoSaque] = useState('Sim');
  const [valorLiberadoSaque, setValorLiberadoSaque] = useState('R$ 48.950,00');
  const [tempoMinimoSaque, setTempoMinimoSaque] = useState('15');
  const [descontoPixTed, setDescontoPixTed] = useState('R$ 0,15');
  const [bancoRepasse, setBancoRepasse] = useState('Banco do Brasil (001)');
  const [agenciaRepasse, setAgenciaRepasse] = useState('3333-1');
  const [contaRepasse, setContaRepasse] = useState('33333-0');
  const [chavePixRepasse, setChavePixRepasse] = useState('01.344.065/0001-17 (CNPJ)');

  const handleSave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu={mode === 'condicoes' ? 'fin-condicoes' : 'fin-info'} />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <WfFinancialQuickBar
          activeSlug={
            mode === 'condicoes'
              ? 'wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais'
              : 'wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras'
          }
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '920px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>
              {mode === 'condicoes' ? 'Gestão Financeira › Condições Comerciais' : 'Gestão Financeira › Informações Financeiras & Saque'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 18px 0' }}>
              {mode === 'condicoes'
                ? 'Taxas de intermediação, MDR de cartões, PIX, antecipação e split automático da atração'
                : 'Parâmetros de saque, conta bancária vinculada, chave PIX de repasse e limites operacionais'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              to={
                mode === 'condicoes'
                  ? '/tela/wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras'
                  : '/tela/wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais'
              }
              style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', color: '#3b4758', fontWeight: 700, textDecoration: 'none', fontSize: 13 }}
            >
              {mode === 'condicoes' ? 'Ver Informações Financeiras (WF-029) →' : '← Ver Condições Comerciais (WF-028)'}
            </Link>
            <button onClick={handleSave} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Salvar Alterações ✓
            </button>
          </div>
        </div>

        {savedBanner && (
          <div style={{ maxWidth: '920px', marginBottom: 16, padding: '12px 16px', borderRadius: 8, backgroundColor: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: 13 }}>
            ✓ Configurações financeiras salvas e sincronizadas com o motor de Split e Borderô da atração!
          </div>
        )}

        {/* KPIs Financeiros do Contrato */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, maxWidth: '920px', marginBottom: 22 }}>
          {[
            { label: 'Comissão Curitiba 360°', val: valorTaxa, sub: 'Split automático na fonte' },
            { label: 'Taxa PIX Liquidada', val: txPix, sub: 'Liquidação D+0 instantânea' },
            { label: 'Saldo Liberado p/ Saque', val: valorLiberadoSaque, sub: 'Disponível para transferência' },
            { label: 'Prazo de Repasse', val: `D+${prazoDias} dias`, sub: 'Ciclo contratual ativo' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{k.label}</div>
              <div style={{ fontSize: 21, fontWeight: 800, color: '#3b4758', margin: '4px 0' }}>{k.val}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '20px', maxWidth: '920px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Apelido da Regra</label>
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: 6 }}>Nome da condição comercial vinculada ao contrato</span>
            <input value={apelido} onChange={(e) => setApelido(e.target.value)} style={{ width: '360px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
          </div>

          {mode === 'condicoes' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Modalidade (Porcentagem/Valor)</label>
                  <select value={tipoTaxa} onChange={(e) => setTipoTaxa(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                    <option>Porcentagem</option>
                    <option>Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Taxa Administração Curitiba 360°</label>
                  <input value={valorTaxa} onChange={(e) => setValorTaxa(e.target.value)} style={{ width: '140px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Prazo para pagamento (dias)</label>
                  <input value={prazoDias} onChange={(e) => setPrazoDias(e.target.value)} style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. C.Crédito à Vista</label>
                  <input value={txCreditoVista} onChange={(e) => setTxCreditoVista(e.target.value)} style={{ width: '130px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. C.Crédito Parcelado</label>
                  <input value={txCreditoParcelado} onChange={(e) => setTxCreditoParcelado(e.target.value)} style={{ width: '130px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Pix</label>
                  <input value={txPix} onChange={(e) => setTxPix(e.target.value)} style={{ width: '130px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Antecipação</label>
                  <input value={txAntecipacao} onChange={(e) => setTxAntecipacao(e.target.value)} style={{ width: '130px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Cartão Internacional</label>
                  <input value={txInternacional} onChange={(e) => setTxInternacional(e.target.value)} style={{ width: '130px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Liberado saque automático</label>
                  <select value={liberadoSaque} onChange={(e) => setLiberadoSaque(e.target.value)} style={{ width: '180px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                    <option>Sim</option>
                    <option>Não (Retenção Cautelar)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Valor liberado para saque</label>
                  <input value={valorLiberadoSaque} onChange={(e) => setValorLiberadoSaque(e.target.value)} style={{ width: '200px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tempo mínimo para saque (dias)</label>
                  <input value={tempoMinimoSaque} onChange={(e) => setTempoMinimoSaque(e.target.value)} style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Custo Operacional Pix / TED</label>
                  <input value={descontoPixTed} onChange={(e) => setDescontoPixTed(e.target.value)} style={{ width: '160px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#3b4758', margin: '0 0 12px 0' }}>Domicílio Bancário & Chave PIX de Repasse</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.2fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Banco</label>
                    <input value={bancoRepasse} onChange={(e) => setBancoRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Agência</label>
                    <input value={agenciaRepasse} onChange={(e) => setAgenciaRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Conta Corrente</label>
                    <input value={contaRepasse} onChange={(e) => setContaRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Chave PIX Oficial</label>
                    <input value={chavePixRepasse} onChange={(e) => setChavePixRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-030: RESUMO DAS DESPESAS & SOLICITAR REPASSE (PAINEL PRINCIPAL GESTÃO FINANCEIRA)
// ============================================================================
export function Wf030ExpensesSummary() {
  const [showRepasseModal, setShowRepasseModal] = useState(true);
  const [valorRepasse, setValorRepasse] = useState('10.000,00');
  const [expandedRow, setExpandedRow] = useState('opera');
  const [repasseHistory, setRepasseHistory] = useState([
    { protocolo: 'REP-2026-891', atracao: 'Ópera de Arame', data: '25/11/2026 14:20', valor: 'R$ 35.000,00', destino: 'PIX CNPJ 01.344.065/0001-17', status: 'Recebido' },
    { protocolo: 'REP-2026-884', atracao: 'Parque Jaime Lerner', data: '18/11/2026 10:05', valor: 'R$ 22.400,00', destino: 'Banco do Brasil Ag 3333-1 CC 33333-0', status: 'Recebido' },
    { protocolo: 'REP-2026-879', atracao: 'Jardim Botânico', data: '10/11/2026 16:40', valor: 'R$ 18.900,00', destino: 'PIX CNPJ 45.678.901/0001-22', status: 'Recebido' }
  ]);

  const handleRequestRepasse = () => {
    const novo = {
      protocolo: `REP-2026-${Math.floor(900 + Math.random() * 99)}`,
      atracao: expandedRow === 'musica' ? 'Rua da Música' : 'Ópera de Arame',
      data: new Date().toLocaleString('pt-BR'),
      valor: `R$ ${valorRepasse}`,
      destino: 'PIX CNPJ 01.344.065/0001-17',
      status: 'Aguardando Liberação'
    };
    setRepasseHistory([novo, ...repasseHistory]);
    alert(`Solicitação de repasse (${novo.protocolo}) no valor de R$ ${valorRepasse} enviada para liquidação PIX!`);
  };

  const attractionsFinance = [
    {
      key: 'opera',
      nome: 'Ópera de Arame & Vale da Música',
      status: 'Aguardando Liberação',
      dataLiberacao: '02/12/2026 16:44:22',
      receitaBruta: '100.000,00',
      despesasTotais: '12.000,00',
      receitaLiquida: '88.000,00',
      items: [
        { nome: 'Venda de Ingressos (4.820 bilhetes)', valor: '100.000,00', tipo: 'Receita', status: 'Recebido', obs: 'Liquidação PIX + Cartões' },
        { nome: 'Comissão Agências & Hotéis B2B', valor: '2.100,00', tipo: 'Despesas', status: 'Pendente', obs: '14 agências credenciadas' },
        { nome: 'Repasse Parcial Antecipado', valor: '9.000,00', tipo: 'Despesas', status: 'Recebido', obs: 'Pago via PIX em 15/11' },
        { nome: 'Encargos Gateway & Antecipação MDR', valor: '900,00', tipo: 'Despesas', status: 'Pendente', obs: 'Taxa média 0,90%' }
      ]
    },
    {
      key: 'musica',
      nome: 'Rua da Música — Parque Jaime Lerner',
      status: 'Aguardando Liberação',
      dataLiberacao: '05/12/2026 16:44:22',
      receitaBruta: '96.500,00',
      despesasTotais: '8.500,00',
      receitaLiquida: '88.000,00',
      items: [
        { nome: 'Venda de Ingressos (3.910 bilhetes)', valor: '96.500,00', tipo: 'Receita', status: 'Recebido', obs: 'Portal + Totens Autoatendimento' },
        { nome: 'Comissão Agentes Comerciais', valor: '1.850,00', tipo: 'Despesas', status: 'Pendente', obs: 'Split automático B2B' },
        { nome: 'Taxa Administração Curitiba 360°', valor: '5.800,00', tipo: 'Despesas', status: 'Recebido', obs: 'Contrato Padrão 10%' },
        { nome: 'Tarifa Processamento PIX / Cartão', valor: '850,00', tipo: 'Despesas', status: 'Pendente', obs: 'Conciliado sem divergências' }
      ]
    },
    {
      key: 'jardim',
      nome: 'Jardim Botânico — Estufa & Galeria 360°',
      status: 'Recebido',
      dataLiberacao: '28/11/2026 12:00:00',
      receitaBruta: '74.200,00',
      despesasTotais: '7.420,00',
      receitaLiquida: '66.780,00',
      items: [
        { nome: 'Venda de Ingressos & Visita Guiada', valor: '74.200,00', tipo: 'Receita', status: 'Recebido', obs: 'Lote Morador + Turista' },
        { nome: 'Taxa Administração Curitiba 360° (10%)', valor: '7.420,00', tipo: 'Despesas', status: 'Recebido', obs: 'Retido na fonte' }
      ]
    }
  ];

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="fin-despesas" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <WfFinancialQuickBar activeSlug="wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas" />

        {/* KPIs Executivos da Gestão Financeira */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
          {[
            { label: 'Receita Bruta Acumulada', val: 'R$ 270.700,00', sub: '↑+14,2% neste mês' },
            { label: 'Despesas, Taxas & Comissões', val: 'R$ 27.920,00', sub: '10,3% sobre o volume bruto' },
            { label: 'Receita Líquida Parceiro', val: 'R$ 242.780,00', sub: 'Auditado pelo Ledger 360°' },
            { label: 'Disponível p/ Repasse Hoje', val: 'R$ 48.950,00', sub: 'Liquidação imediata via PIX' }
          ].map((k, idx) => (
            <div key={idx} style={{ backgroundColor: '#eef1f5', border: '1.5px solid #64748b', borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{k.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#3b4758', margin: '4px 0' }}>{k.val}</div>
              <div style={{ fontSize: 11.5, color: '#d97706', fontWeight: 700 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Gestão Financeira — Resumo das Despesas & Repasses</h1>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Clique em cada atração para expandir suas receitas, taxas, comissões e solicitar repasse</p>
              </div>
              <button
                onClick={() =>
                  downloadExcelCsv(
                    'resumo-financeiro-despesas-repasses-curitiba360.csv',
                    ['Atracao', 'Status', 'Data Liberacao', 'Receita Bruta', 'Despesas', 'Receita Liquida'],
                    attractionsFinance.map((a) => [a.nome, a.status, a.dataLiberacao, a.receitaBruta, a.despesasTotais, a.receitaLiquida])
                  )
                }
                style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}
              >
                Exportar Planilha XLSX 📊
              </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: 28 }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}></th>
                  <th style={{ padding: '12px' }}>Atração / Unidade ↕</th>
                  <th style={{ padding: '12px' }}>Status ↕</th>
                  <th style={{ padding: '12px' }}>Data de Liberação ↕</th>
                  <th style={{ padding: '12px' }}>Receita Líquida (R$) ↕</th>
                  <th style={{ padding: '12px' }}>Ação de Repasse ↕</th>
                </tr>
              </thead>
              <tbody>
                {attractionsFinance.map((atr) => (
                  <React.Fragment key={atr.key}>
                    <tr
                      style={{ borderBottom: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: expandedRow === atr.key ? '#f8fafc' : '#fff' }}
                      onClick={() => setExpandedRow(expandedRow === atr.key ? null : atr.key)}
                    >
                      <td style={{ padding: '14px', fontWeight: 800 }}>{expandedRow === atr.key ? '⌃' : '⌄'}</td>
                      <td style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={OFFICIAL_LOGO} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #475467', padding: 2 }} />
                        <strong>{atr.nome}</strong>
                      </td>
                      <td style={{ padding: '14px' }}><WfStatusPill status={atr.status} /></td>
                      <td style={{ padding: '14px' }}>{atr.dataLiberacao}</td>
                      <td style={{ padding: '14px', fontWeight: 800, color: '#3b4758' }}>R$ {atr.receitaLiquida}</td>
                      <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setExpandedRow(atr.key);
                            setShowRepasseModal(true);
                          }}
                          style={{ padding: '6px 14px', borderRadius: 99, border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                        >
                          Solicitar Repasse
                        </button>
                      </td>
                    </tr>
                    {expandedRow === atr.key && (
                      <tr>
                        <td colSpan={6} style={{ padding: '10px 0 18px 36px', backgroundColor: '#f8fafc' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                            <thead>
                              <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                                <th style={{ padding: 10 }}>Lançamento Financeiro ↕</th>
                                <th style={{ padding: 10 }}>Valor (R$) ↕</th>
                                <th style={{ padding: 10 }}>Natureza ↕</th>
                                <th style={{ padding: 10 }}>Status ↕</th>
                                <th style={{ padding: 10 }}>Observações / Conciliação ↕</th>
                              </tr>
                            </thead>
                            <tbody>
                              {atr.items.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                                  <td style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <img src={OFFICIAL_LOGO} alt="" style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #475467', padding: 1 }} />
                                    <strong>{row.nome}</strong>
                                  </td>
                                  <td style={{ padding: 12, fontWeight: 700 }}>R$ {row.valor}</td>
                                  <td style={{ padding: 12 }}><WfStatusPill status={row.tipo} /></td>
                                  <td style={{ padding: 12 }}><WfStatusPill status={row.status} /></td>
                                  <td style={{ padding: 12, color: '#475569' }}>{row.obs}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/* Histórico de Repasses Liquidados e Solicitados */}
            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#3b4758', margin: '0 0 10px 0' }}>
              Histórico de Repasses Bancários & PIX
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
                  <th style={{ padding: 10 }}>Protocolo ↕</th>
                  <th style={{ padding: 10 }}>Atração ↕</th>
                  <th style={{ padding: 10 }}>Data/Hora ↕</th>
                  <th style={{ padding: 10 }}>Valor Liquidado ↕</th>
                  <th style={{ padding: 10 }}>Conta / Chave Destino ↕</th>
                  <th style={{ padding: 10 }}>Status ↕</th>
                </tr>
              </thead>
              <tbody>
                {repasseHistory.map((h, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                    <td style={{ padding: 10, fontWeight: 700 }}>{h.protocolo}</td>
                    <td style={{ padding: 10, fontWeight: 700 }}>{h.atracao}</td>
                    <td style={{ padding: 10 }}>{h.data}</td>
                    <td style={{ padding: 10, fontWeight: 800, color: '#3b4758' }}>{h.valor}</td>
                    <td style={{ padding: 10, color: '#475569' }}>{h.destino}</td>
                    <td style={{ padding: 10 }}><WfStatusPill status={h.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showRepasseModal && (
            <div style={{ width: '320px', border: '1.5px solid #475467', borderRadius: '14px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <strong style={{ fontSize: '15px', color: '#3b4758' }}>Você tem R$ 48.950,00 liberados para repasse</strong>
                <button onClick={() => setShowRepasseModal(false)} style={{ border: 'none', background: '#eef1f5', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
              </div>
              <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 6 }}>Valor do saque (R$)</label>
              <input value={valorRepasse} onChange={(e) => setValorRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', marginBottom: '10px', boxSizing: 'border-box', fontWeight: 700 }} />
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 14 }}>
                Destino: <strong>PIX CNPJ 01.344.065/0001-17</strong> (Instituto Jaime Lerner)
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setValorRepasse('48.950,00')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Valor Total</button>
                <button onClick={handleRequestRepasse} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Solicitar ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-031: VALIDAR INGRESSOS (CATRACA / VALIDAÇÃO)
// ============================================================================
export function Wf031ValidateTickets({ store }) {
  const [tab, setTab] = useState('Todos');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const vouchers = store?.liveVouchers || [];

  useEffect(() => {
    let stream = null;
    if (cameraActive && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => {
          setFeedback({ ok: false, message: 'Câmera indisponível neste dispositivo — use o leitor USB ou clique em Simular Leitura QR.' });
          setCameraActive(false);
        });
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cameraActive]);

  const handleValidate = (overrideCode) => {
    const target = (typeof overrideCode === 'string' ? overrideCode : code).trim() || 'ING8001';
    const res = platformSyncService.validateTicketCode(target, 'João da Silva');
    playTurnstileBeep(res.ok ? 'success' : 'error');
    setFeedback(res);
    setCode('');
  };

  const allRows = [
    { id: '279827982798', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Validado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982799', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Validado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982800', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Erro de leitura', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982801', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Cancelado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    ...vouchers.slice(0, 3).map((v) => ({ id: v.codigo, nome: v.turista, email: v.email, status: v.status === 'Vendido' ? 'Validado' : v.status, data: v.dataHora, por: 'João da Silva' }))
  ];

  const filteredRows = allRows.filter((row) => {
    if (tab === 'Validados') return row.status === 'Validado';
    if (tab === 'Cancelados') return row.status === 'Cancelado' || row.status === 'Erro de leitura';
    return true;
  });

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="validar" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Validar Ingressos</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Histórico de ingressos validados</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código QR (ex: ING8001)" style={{ width: '220px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button onClick={() => handleValidate()} style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Validar Código ✓</button>
            <button onClick={() => setCameraActive(!cameraActive)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: cameraActive ? '#dc2626' : '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              {cameraActive ? 'Fechar Câmera ✕' : 'Iniciar Validação 📷'}
            </button>
          </div>
        </div>

        {cameraActive && (
          <div style={{ marginBottom: 18, padding: 16, borderRadius: 12, backgroundColor: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: 200, height: 130, borderRadius: 10, backgroundColor: '#000', objectFit: 'cover', border: '2px solid #00a896' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#5eead4' }}>● Scanner WebRTC Ativo (Modo Catraca PWA)</div>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 10px 0' }}>Aponte o QR Code do voucher para a câmera ou clique ao lado para simular um bip de catraca:</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleValidate('ING8001')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: '#059669', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Simular QR Válido (ING8001)</button>
                  <button onClick={() => handleValidate('ING8002')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: '#d97706', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Simular QR Já Usado (ING8002)</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {feedback && (
          <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, backgroundColor: feedback.ok ? '#dcfce7' : '#fee2e2', color: feedback.ok ? '#166534' : '#991b1b', fontWeight: 700 }}>
            {feedback.message}
          </div>
        )}

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Todos', 'Validados', 'Cancelados'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}>ID Ingresso ↕</th>
              <th style={{ padding: '12px 14px' }}>Nome ↕</th>
              <th style={{ padding: '12px 14px' }}>Status ↕</th>
              <th style={{ padding: '12px 14px' }}>Data/hora da Leitura ↕</th>
              <th style={{ padding: '12px 14px' }}>Validado por ↕</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px' }}>📋 {row.id}</td>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 700, color: '#3b4758' }}>{row.nome}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{row.email}</div>
                </td>
                <td style={{ padding: '14px' }}><WfStatusPill status={row.status} /></td>
                <td style={{ padding: '14px' }}>{row.data}</td>
                <td style={{ padding: '14px' }}>{row.por}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>
    </div>
  );
}

// ============================================================================
// DADOS ESPECÍFICOS E REALISTAS PARA CADA UM DOS 8 RELATÓRIOS FINANCEIROS (WF-032 A WF-047)
// ============================================================================
const REPORT_DATASETS = {
  'fin-vendas': {
    summaryLabel: 'Total Consolidado de Vendas',
    columns: ['Categoria', 'Quantidade Vendida', 'Ticket Médio', 'Receita Total'],
    rows: [
      { cat: 'Adulto (Inteira)', qtd: 2798, unit: 'R$ 35,00', total: 'R$ 97.930,00', numTotal: 97930 },
      { cat: 'Morador Curitiba Adulto (50%)', qtd: 3420, unit: 'R$ 17,50', total: 'R$ 59.850,00', numTotal: 59850 },
      { cat: 'Estudante / Meia-Entrada', qtd: 1580, unit: 'R$ 17,50', total: 'R$ 27.650,00', numTotal: 27650 },
      { cat: 'Idoso 60+ / Doador de Sangue', qtd: 596, unit: 'R$ 17,50', total: 'R$ 10.430,00', numTotal: 10430 }
    ]
  },
  'fin-abandono': {
    summaryLabel: 'Carrinhos Abandonados no Checkout',
    columns: ['Etapa / Categoria no Carrinho', 'Qtd Abandonos', 'Ticket Médio', 'Receita Potencial'],
    rows: [
      { cat: 'Adulto — Expirou Tempo do PIX (30 min)', qtd: 142, unit: 'R$ 35,00', total: 'R$ 4.970,00', numTotal: 4970 },
      { cat: 'Morador Curitiba — Validação de Cadastro', qtd: 98, unit: 'R$ 17,50', total: 'R$ 1.715,00', numTotal: 1715 },
      { cat: 'Estudante — Cartão Recusado Emissor', qtd: 64, unit: 'R$ 17,50', total: 'R$ 1.120,00', numTotal: 1120 },
      { cat: 'Combo Família 4 Ingressos — Desistência', qtd: 38, unit: 'R$ 70,00', total: 'R$ 2.660,00', numTotal: 2660 }
    ]
  },
  'fin-detalhado': {
    summaryLabel: 'Auditoria de Ingressos Detalhados por Lote',
    columns: ['Lote / Categoria Emitida', 'Bilhetes Emitidos', 'Valor Face', 'Subtotal Liquidado'],
    rows: [
      { cat: 'Lote 001 • Adulto Inteira (QR Code Dinâmico)', qtd: 2798, unit: 'R$ 35,00', total: 'R$ 97.930,00', numTotal: 97930 },
      { cat: 'Lote 002 • Morador Curitiba Adulto (Biometria)', qtd: 3420, unit: 'R$ 17,50', total: 'R$ 59.850,00', numTotal: 59850 },
      { cat: 'Lote 001 • Estudante Meia-Entrada Nacional', qtd: 1580, unit: 'R$ 17,50', total: 'R$ 27.650,00', numTotal: 27650 },
      { cat: 'Lote VIP • Passaporte Curitiba 360°', qtd: 410, unit: 'R$ 45,00', total: 'R$ 18.450,00', numTotal: 18450 }
    ]
  },
  'fin-categorias': {
    summaryLabel: 'Desempenho Financeiro por Categoria Tarifária',
    columns: ['Categoria Tarifária', 'Ingressos', 'Tarifa Unitária', 'Faturamento Bruto'],
    rows: [
      { cat: 'Adulto', qtd: 2798, unit: 'R$ 35,00', total: 'R$ 97.930,00', numTotal: 97930 },
      { cat: 'Morador Curitiba Adulto', qtd: 3420, unit: 'R$ 17,50', total: 'R$ 59.850,00', numTotal: 59850 },
      { cat: 'Estudante', qtd: 1580, unit: 'R$ 17,50', total: 'R$ 27.650,00', numTotal: 27650 },
      { cat: 'Doador / PCD / Idoso', qtd: 596, unit: 'R$ 17,50', total: 'R$ 10.430,00', numTotal: 10430 }
    ]
  },
  'fin-cortesias': {
    summaryLabel: 'Controle de Cortesias & Credenciamentos Emitidos',
    columns: ['Cota / Destinatário da Cortesia', 'Qtd Emitida', 'Valor Referência', 'Isenção Total'],
    rows: [
      { cat: 'Imprensa & Influenciadores Turismo CWB', qtd: 85, unit: 'R$ 0,00 (Ref R$ 35)', total: 'R$ 2.975,00 (Isento)', numTotal: 2975 },
      { cat: 'Guias de Turismo Cadastur Credenciados', qtd: 140, unit: 'R$ 0,00 (Ref R$ 35)', total: 'R$ 4.900,00 (Isento)', numTotal: 4900 },
      { cat: 'Cota Institucional Prefeitura / Instituto', qtd: 110, unit: 'R$ 0,00 (Ref R$ 35)', total: 'R$ 3.850,00 (Isento)', numTotal: 3850 },
      { cat: 'Crianças até 6 anos (Gratuidade Legal)', qtd: 320, unit: 'R$ 0,00 (Ref R$ 17,50)', total: 'R$ 5.600,00 (Isento)', numTotal: 5600 }
    ]
  },
  'fin-validacoes': {
    summaryLabel: 'Taxa de Comparecimento & Leitura nas Catracas',
    columns: ['Canal / Catraca de Validação', 'Acessos Validados', 'Tarifa Média', 'Volume Validado'],
    rows: [
      { cat: 'Catraca Principal #01 — Entrada Parque', qtd: 4120, unit: 'R$ 23,50', total: 'R$ 96.820,00', numTotal: 96820 },
      { cat: 'Catraca Principal #02 — Acesso Rápido QR', qtd: 2890, unit: 'R$ 23,50', total: 'R$ 67.915,00', numTotal: 67915 },
      { cat: 'Scanner Mobile PWA — Portaria Grupos/Vans', qtd: 940, unit: 'R$ 20,00', total: 'R$ 18.800,00', numTotal: 18800 },
      { cat: 'No-Show (Vendidos ainda não validados)', qtd: 444, unit: 'R$ 27,75', total: 'R$ 12.325,00', numTotal: 12325 }
    ]
  },
  'fin-comissoes': {
    summaryLabel: 'Apuração de Comissões de Agências, Hotéis & Agentes',
    columns: ['Canal / Parceiro Comissionado', 'Ingressos Vendidos', 'Comissão Unit. (10%)', 'Total Comissão'],
    rows: [
      { cat: 'Hotel Pestana Curitiba 5★ (QR Recepção)', qtd: 640, unit: 'R$ 3,50', total: 'R$ 2.240,00', numTotal: 2240 },
      { cat: 'Agência Serra Verde Express Receptivo', qtd: 1120, unit: 'R$ 3,50', total: 'R$ 3.920,00', numTotal: 3920 },
      { cat: 'Curitiba Sightseeing & City Tour', qtd: 580, unit: 'R$ 3,50', total: 'R$ 2.030,00', numTotal: 2030 },
      { cat: 'Agentes Comerciais Autônomos Credenciados', qtd: 490, unit: 'R$ 3,50', total: 'R$ 1.715,00', numTotal: 1715 }
    ]
  },
  'fin-bordero': {
    summaryLabel: 'Borderô Oficial de Fechamento Financeiro da Atração',
    columns: ['Categoria Consolidada no Borderô', 'Quantidade', 'Unitário', 'Total Bruto'],
    rows: [
      { cat: 'Adulto', qtd: 2798, unit: 'R$ 35,00', total: 'R$ 97.930,00', numTotal: 97930 },
      { cat: 'Morador Curitiba Adulto', qtd: 3420, unit: 'R$ 17,50', total: 'R$ 59.850,00', numTotal: 59850 },
      { cat: 'Estudante', qtd: 1580, unit: 'R$ 17,50', total: 'R$ 27.650,00', numTotal: 27650 },
      { cat: 'Doador / Idoso', qtd: 596, unit: 'R$ 17,50', total: 'R$ 10.430,00', numTotal: 10430 }
    ]
  }
};

// ============================================================================
// WF-032 A WF-047: RELATÓRIOS DA ATRAÇÃO (TELA E PDF COM LOGO OFICIAL CURITIBA 360°)
// ============================================================================
export function Wf032AttractionReport({ reportTitle = 'Relatório de Vendas', activeMenu = 'fin-vendas', isPdf = false, isBordero = false, pdfSlug = '' }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedAgent, setSelectedAgent] = useState('Todos');
  const [startDate, setStartDate] = useState('01/01/2026');
  const [endDate, setEndDate] = useState('31/12/2026');

  const dataset = REPORT_DATASETS[activeMenu] || REPORT_DATASETS['fin-vendas'];
  const allRows = dataset.rows;
  const rows = selectedCategory === 'Todos' ? allRows : allRows.filter((r) => r.cat.toLowerCase().includes(selectedCategory.toLowerCase()));
  const totalQtd = rows.reduce((acc, r) => acc + Number(r.qtd || 0), 0);
  const totalVal = rows.reduce((acc, r) => acc + Number(r.numTotal || 0), 0);

  // LAYOUT PDF (WF-033, WF-035, WF-037, WF-039, WF-041, WF-043, WF-045, WF-047)
  if (isPdf) {
    return (
      <div className="notranslate" translate="no" style={{ backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', padding: '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            border: '1.5px solid #94a3b8',
            borderRadius: '4px',
            padding: '22px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            marginBottom: '28px'
          }}>
            <img
              src={OFFICIAL_LOGO}
              alt="Curitiba 360°"
              style={{ width: '115px', height: '115px', objectFit: 'contain' }}
            />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#475569', margin: '0 0 6px 0' }}>{reportTitle}</h1>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#475569' }}>Parque Jaime Lerner • Curitiba 360°</div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#475569', marginBottom: '12px' }}>Filtros aplicados</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Período</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>📅 {startDate} - {endDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Categoria</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>⊞ {selectedCategory}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Agente</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>👤 {selectedAgent}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Tipo de Ingresso</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>🎟 Todos</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
                {dataset.columns.map((col, idx) => (
                  <th key={idx} style={{ padding: '12px 16px' }}>{col} ↕</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.cat}</td>
                  <td style={{ padding: '14px 16px' }}>{r.qtd.toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.unit}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.total}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}>
                <td style={{ padding: '14px 16px' }}>Total de Linhas: {rows.length}</td>
                <td style={{ padding: '14px 16px' }}>{totalQtd.toLocaleString('pt-BR')}</td>
                <td style={{ padding: '14px 16px' }}>Consolidado</td>
                <td style={{ padding: '14px 16px' }}>Total: R$ {totalVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>

          {isBordero && (
            <div style={{ marginTop: '36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', textAlign: 'center', paddingTop: '36px' }}>
              <div>
                <img src={OFFICIAL_HORIZONTAL_LOGO} alt="Curitiba 360°" style={{ height: 38, marginBottom: 8 }} />
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '28px' }}>Curitiba 360°</div>
                <div style={{ borderBottom: '1.5px solid #94a3b8', width: '75%', margin: '0 auto' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '46px', marginTop: '20px' }}>Parceiro Comercial</div>
                <div style={{ borderBottom: '1.5px solid #94a3b8', width: '75%', margin: '0 auto' }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ paddingTop: '32px', fontSize: '12.5px', fontWeight: 700, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
          <span>Emitido: quarta-feira 26 novembro 2026 às 14:30:00 Página 1/1</span>
          <button onClick={() => window.print()} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir PDF 🖨</button>
        </div>
      </div>
    );
  }

  // LAYOUT TELA DE RELATÓRIO DA ATRAÇÃO (WF-032, WF-034, WF-036, WF-038, WF-040, WF-042, WF-044, WF-046)
  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu={activeMenu} />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <WfFinancialQuickBar activeSlug={pdfSlug ? pdfSlug.replace('-pdf-', '-') : ''} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>{reportTitle}</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>{dataset.summaryLabel} — Parque Jaime Lerner</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir 🖨</button>
            <button
              onClick={() => downloadExcelCsv(
                `${reportTitle.toLowerCase().replace(/\s+/g, '-')}-curitiba360.csv`,
                dataset.columns,
                rows.map((r) => [r.cat, r.qtd, r.unit, r.total])
              )}
              style={{ padding: '9px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}
            >
              Download XLSX 📊
            </button>
            <button onClick={() => pdfSlug && navigate(`/tela/${pdfSlug}`)} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Download PDF 📄</button>
          </div>
        </div>

        {isBordero && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px', fontSize: '12.5px', color: '#475569', backgroundColor: '#f8fafc', padding: '16px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <div>
              <strong style={{ fontSize: '15px', color: '#3b4758', display: 'block', marginBottom: 6 }}>Dados do Parceiro</strong>
              <div><strong>Razão Social:</strong> Instituto Jaime Lerner</div>
              <div><strong>Nome:</strong> Parque Jaime Lerner</div>
              <div><strong>CNPJ:</strong> 01.344.065/0001-17</div>
              <div><strong>Cidade:</strong> Curitiba - Paraná</div>
              <div><strong>Email:</strong> contato@parquejaimelerner.com</div>
            </div>
            <div>
              <strong style={{ fontSize: '15px', color: '#3b4758', display: 'block', marginBottom: 6 }}>Dados da Atração</strong>
              <div><strong>Nome:</strong> Parque Jaime Lerner</div>
              <div><strong>Local:</strong> Curitiba - PR</div>
              <div><strong>Regra de Repasse:</strong> Padrão 10% (Liquidação PIX D+15)</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758', marginBottom: '8px' }}>Filtros</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Todo o período ☑</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '115px', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
                <input value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '115px', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Categoria</div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option value="Todos">⊞ Todos</option>
                <option value="Adulto">Adulto</option>
                <option value="Morador">Morador Curitiba</option>
                <option value="Estudante">Estudante</option>
                <option value="Doador">Doador / Idoso</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Agente</div>
              <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option value="Todos">👤 Todos</option>
                <option value="Hotel Pestana">Hotel Pestana Curitiba</option>
                <option value="Agencia Silva">Agência Silva</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Tipo de Ingresso</div>
              <select style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}><option>🎟 Todos</option><option>Inteira</option><option>Meia / Morador</option></select>
            </div>
            <button onClick={() => setSelectedCategory('Todos')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Limpar Filtros ↺</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              {dataset.columns.map((col, idx) => (
                <th key={idx} style={{ padding: '12px 14px' }}>{col} ↕</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.cat}</td>
                <td style={{ padding: '14px' }}>{r.qtd.toLocaleString('pt-BR')}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.unit}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.total}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}>
              <td style={{ padding: '14px' }}>Total de Categorias: {rows.length}</td>
              <td style={{ padding: '14px' }}>{totalQtd.toLocaleString('pt-BR')}</td>
              <td style={{ padding: '14px' }}>Consolidado</td>
              <td style={{ padding: '14px' }}>Total: R$ {totalVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        {isBordero ? (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#3b4758', marginBottom: '10px' }}>Resumo Fechamento do Borderô</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '32px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 12 }}>Descrição ↕</th>
                  <th style={{ padding: 12 }}>Valor ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>(+) Venda bruta de ingressos (8.394 bilhetes)</td><td style={{ padding: 12, fontWeight: 700, color: '#166534' }}>R$ +195.860,00</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>(-) Taxa Administração Curitiba 360° (10%)</td><td style={{ padding: 12, fontWeight: 700, color: '#991b1b' }}>R$ -19.586,00</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>(-) Comissões Agências & Hotéis Parceiros</td><td style={{ padding: 12, fontWeight: 700, color: '#991b1b' }}>R$ -9.905,00</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>(-) Tarifas de Processamento PIX & Gateway Cartão</td><td style={{ padding: 12, fontWeight: 700, color: '#991b1b' }}>R$ -2.189,15</td></tr>
                <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}><td style={{ padding: 12 }}>(=) Fechamento Líquido para Repasse ao Parceiro</td><td style={{ padding: 12, fontSize: 15 }}>Total Líquido: R$ 164.179,85</td></tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', textAlign: 'center', paddingTop: '20px' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '36px' }}>Curitiba 360°</div>
                <div style={{ borderBottom: '1.5px solid #cbd5e1', width: '70%', margin: '0 auto' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '36px' }}>Parceiro Comercial (Parque Jaime Lerner)</div>
                <div style={{ borderBottom: '1.5px solid #cbd5e1', width: '70%', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        ) : (
          <WfPagination />
        )}
      </div>
    </div>
  );
}
