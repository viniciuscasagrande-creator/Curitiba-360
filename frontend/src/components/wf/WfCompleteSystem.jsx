// frontend/src/components/wf/WfCompleteSystem.jsx
// Motor central que renderiza as 71 telas oficiais (WF-001 a WF-064) clonadas em alta precisão com as logos oficiais do Curitiba 360°
import React, { useState, useEffect } from 'react';
import { screens } from '../../data/screens';
import { backofficeStore } from '../../services/backofficeStore';
import { WfTopReferenceBar } from './WfShell';
import {
  Wf001Login,
  Wf002Dashboard,
  Wf003TotaisAtracao,
  Wf005Users,
  Wf007Contracts,
  Wf009CommercialConfig
} from './WfScreensPart1';
import {
  Wf012Attractions,
  Wf016Categories,
  Wf017TicketSearch,
  Wf019TicketBatches,
  Wf021Coupons,
  Wf025Analytics
} from './WfScreensPart2';
import {
  Wf028AttractionFinancialConfig,
  Wf030ExpensesSummary,
  Wf031ValidateTickets,
  Wf032AttractionReport
} from './WfScreensPart3';
import {
  Wf048Agencies,
  Wf050Agents,
  Wf051CommercialOperation,
  Wf052Commission,
  Wf053RefundQueue,
  Wf054Cms,
  Wf056Notifications,
  Wf058Partners,
  Wf060AntiCambista,
  Wf061Packages,
  Wf063GlobalFinancialReports
} from './WfScreensPart4';

export default function WfCompleteSystem({ slug, hideTopBar = false }) {
  const [storeState, setStoreState] = useState(() => ({
    ...backofficeStore.getState(),
    liveVouchers: backofficeStore.getLiveVouchers()
  }));
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(false);
    return backofficeStore.subscribe((next) => {
      setStoreState({
        ...next,
        liveVouchers: backofficeStore.getLiveVouchers()
      });
    });
  }, [slug]);

  const updateStore = (updater) => {
    backofficeStore.setState(updater);
  };

  const currentScreen = screens.find((s) => s.slug === slug) || screens[1];

  const renderBySlug = (targetSlug) => {
    switch (targetSlug) {
      case 'wf-001-tela-de-login':
        return <Wf001Login />;
      case 'wf-002-dashboard':
        return <Wf002Dashboard store={storeState} updateStore={updateStore} />;
      case 'wf-003-detalhes-da-atracao-totais-da-atracao':
        return <Wf003TotaisAtracao store={storeState} />;
      case 'wf-004-perfil':
        return <Wf005Users store={storeState} updateStore={updateStore} modalMode="perfil" />;
      case 'wf-005-gestao-de-usuarios':
        return <Wf005Users store={storeState} updateStore={updateStore} />;
      case 'wf-006-adicionar-usuarios':
        return <Wf005Users store={storeState} updateStore={updateStore} modalMode="novo-usuario" />;
      case 'wf-007-gestao-de-contratos':
        return <Wf007Contracts store={storeState} updateStore={updateStore} />;
      case 'wf-008-gestao-de-contratos-adicionar-contrato':
        return <Wf007Contracts store={storeState} updateStore={updateStore} isAddMode />;
      case 'wf-009-configuracoes-comerciais':
        return <Wf009CommercialConfig store={storeState} updateStore={updateStore} />;
      case 'wf-010-configuracoes-comerciais-condicao-comercial':
        return <Wf009CommercialConfig store={storeState} updateStore={updateStore} modalMode="condicao" />;
      case 'wf-011-configuracoes-comerciais-informacao-financeira':
        return <Wf009CommercialConfig store={storeState} updateStore={updateStore} modalMode="financeira" />;
      case 'wf-012-gestao-de-atracoes':
        return <Wf012Attractions store={storeState} updateStore={updateStore} />;
      case 'wf-013-gestao-de-atracoes-adicionar-atracao-1':
        return <Wf012Attractions store={storeState} updateStore={updateStore} wizardStep={1} />;
      case 'wf-014-gestao-de-atracoes-adicionar-atracao-2':
        return <Wf012Attractions store={storeState} updateStore={updateStore} wizardStep={2} />;
      case 'wf-015-gestao-de-atracoes-adicionar-atracao-3':
        return <Wf012Attractions store={storeState} updateStore={updateStore} wizardStep={3} />;
      case 'wf-016-detalhes-da-atracao-categorias':
        return <Wf016Categories store={storeState} updateStore={updateStore} />;
      case 'wf-017-detalhes-da-atracoes-pesquisar-ingresso-administrador':
        return <Wf017TicketSearch store={storeState} />;
      case 'wf-018-detalhes-da-atracao-pesquisar-ingresso-detalhe-do-ingresso':
        return <Wf017TicketSearch store={storeState} showDetailModal />;
      case 'wf-019-detalhes-da-atracao-gestao-de-ingresso':
        return <Wf019TicketBatches store={storeState} updateStore={updateStore} />;
      case 'wf-020-detalhes-da-atracao-gestao-de-ingresso-adicionar-ingresso':
        return <Wf019TicketBatches store={storeState} updateStore={updateStore} showModal />;
      case 'wf-021-detalhes-da-atracao-gestao-de-cupons':
        return <Wf021Coupons store={storeState} updateStore={updateStore} />;
      case 'wf-022-detalhes-da-atracao-gestao-de-cupons-gerar-qr-code':
        return <Wf021Coupons store={storeState} updateStore={updateStore} modalMode="qrcode" />;
      case 'wf-023-detalhes-da-atracao-gestao-de-cupons-adicionar-cupom':
        return <Wf021Coupons store={storeState} updateStore={updateStore} modalMode="cupom" />;
      case 'wf-024-detalhes-da-atracao-gestao-de-cupons-adicionar-cupom-agencia':
        return <Wf021Coupons store={storeState} updateStore={updateStore} modalMode="cupom-agencia" />;
      case 'wf-025-detalhes-da-atracao-graficos-analytics':
        return <Wf025Analytics store={storeState} updateStore={updateStore} />;
      case 'wf-026-detalhes-da-atracao-usuarios':
        return <Wf005Users store={storeState} updateStore={updateStore} isAttractionContext />;
      case 'wf-027-detalhes-da-atracao-gestao-de-usuarios-adicionar-usuario':
        return <Wf005Users store={storeState} updateStore={updateStore} modalMode="novo-usuario" isAttractionContext />;
      case 'wf-028-detalhes-da-atracao-gestao-financeira-negociacao-financeira-condicoes-comerciais':
        return <Wf028AttractionFinancialConfig mode="condicoes" />;
      case 'wf-029-detalhes-da-atracao-gestao-financeira-negociacao-financeira-informacoes-financeiras':
        return <Wf028AttractionFinancialConfig mode="info" />;
      case 'wf-030-detalhes-da-atracao-gestao-financeira-negociacao-financeira-resumo-das-despesas':
        return <Wf030ExpensesSummary />;
      case 'wf-031-detalhes-da-atracao-gestao-financeira-negociacao-financeira-validar-ingressos':
        return <Wf031ValidateTickets store={storeState} />;
      case 'wf-032-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas':
        return <Wf032AttractionReport reportTitle="Relatório de Vendas" activeMenu="fin-vendas" pdfSlug="wf-033-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas" />;
      case 'wf-033-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-vendas':
        return <Wf032AttractionReport reportTitle="Relatório de Vendas" isPdf />;
      case 'wf-034-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-abandono-de-carrinho':
        return <Wf032AttractionReport reportTitle="Relatório de Abandono de Carrinho" activeMenu="fin-abandono" pdfSlug="wf-035-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-abandono-de-carrinho" />;
      case 'wf-035-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-abandono-de-carrinho':
        return <Wf032AttractionReport reportTitle="Relatório de Abandono de Carrinho" isPdf />;
      case 'wf-036-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-ingresso-detalhado':
        return <Wf032AttractionReport reportTitle="Relatório de Ingresso Detalhado" activeMenu="fin-detalhado" pdfSlug="wf-037-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-ingresso-detalhado" />;
      case 'wf-037-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-ingresso-detalhado':
        return <Wf032AttractionReport reportTitle="Relatório de Ingresso Detalhado" isPdf />;
      case 'wf-038-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-categorias':
        return <Wf032AttractionReport reportTitle="Relatório de Categorias" activeMenu="fin-categorias" pdfSlug="wf-039-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-categorias" />;
      case 'wf-039-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-categorias':
        return <Wf032AttractionReport reportTitle="Relatório de Categorias" isPdf />;
      case 'wf-040-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-cortesias-emitidas':
        return <Wf032AttractionReport reportTitle="Relatório de Cortesias Emitidas" activeMenu="fin-cortesias" pdfSlug="wf-041-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-cortesias-emitidas" />;
      case 'wf-041-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-cortesias-emitidas':
        return <Wf032AttractionReport reportTitle="Relatório de Cortesias Emitidas" isPdf />;
      case 'wf-042-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-validacoes':
        return <Wf032AttractionReport reportTitle="Relatório de Validações" activeMenu="fin-validacoes" pdfSlug="wf-043-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-validacoes" />;
      case 'wf-043-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-validacoes':
        return <Wf032AttractionReport reportTitle="Relatório de Validações" isPdf />;
      case 'wf-044-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-comissoes':
        return <Wf032AttractionReport reportTitle="Relatório de Comissões" activeMenu="fin-comissoes" pdfSlug="wf-045-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-comissoes" />;
      case 'wf-045-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-comissoes':
        return <Wf032AttractionReport reportTitle="Relatório de Comissões" isPdf />;
      case 'wf-046-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido':
        return <Wf032AttractionReport reportTitle="Relatório de Borderô Resumido" activeMenu="fin-bordero" isBordero pdfSlug="wf-047-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido" />;
      case 'wf-047-pdf-detalhes-da-atracao-gestao-financeira-relatorios-da-atracao-bordero-resumido':
        return <Wf032AttractionReport reportTitle="Relatório de Borderô Resumido" isPdf isBordero />;
      case 'wf-048-gestao-de-agencias-estado-2-pendente-de-aprovacao':
        return <Wf048Agencies store={storeState} updateStore={updateStore} initialTab="Pendente de Aprovação" />;
      case 'wf-048-gestao-de-agencias-estado-9-modal-suspender-selecionadas-motivo-opcional':
        return <Wf048Agencies store={storeState} updateStore={updateStore} showSuspendModal />;
      case 'wf-048-gestao-de-agencias-visao-parceiro-comercial':
        return <Wf048Agencies store={storeState} updateStore={updateStore} isPartnerView />;
      case 'wf-048-gestao-de-agencias':
        return <Wf048Agencies store={storeState} updateStore={updateStore} />;
      case 'wf-049-cadastro-de-agencia-etapa-1-dados-da-empresa':
        return <Wf048Agencies store={storeState} updateStore={updateStore} wizardStep={1} />;
      case 'wf-049-cadastro-de-agencia-etapa-2-dados-do-responsavel':
        return <Wf048Agencies store={storeState} updateStore={updateStore} wizardStep={2} />;
      case 'wf-049-cadastro-de-agencia-etapa-3-dados-bancarios':
        return <Wf048Agencies store={storeState} updateStore={updateStore} wizardStep={3} />;
      case 'wf-050-gestao-de-agentes-estado-2-pendente-de-aprovacao':
        return <Wf050Agents store={storeState} updateStore={updateStore} initialTab="Pendente de Aprovação" />;
      case 'wf-050-gestao-de-agentes-visao-parceiro-comercial':
        return <Wf050Agents store={storeState} updateStore={updateStore} isPartnerView />;
      case 'wf-050-gestao-de-agentes':
        return <Wf050Agents store={storeState} updateStore={updateStore} />;
      case 'wf-051-operacao-comercial':
        return <Wf051CommercialOperation userName="João da Silva" />;
      case 'wf-052-comissionamento-agencia':
        return <Wf052Commission store={storeState} />;
      case 'wf-053-fila-de-reembolsos':
        return <Wf053RefundQueue store={storeState} updateStore={updateStore} />;
      case 'wf-054-cms-institucional':
        return <Wf054Cms store={storeState} updateStore={updateStore} mode="institucional" />;
      case 'wf-055-cms-home-e-curadoria-banners':
        return <Wf054Cms store={storeState} updateStore={updateStore} mode="home" />;
      case 'wf-056-central-de-notificacoes':
        return <Wf056Notifications store={storeState} updateStore={updateStore} />;
      case 'wf-057-tela-inicial-por-perfil':
        return <Wf051CommercialOperation userName="Curitiba Sightseeing" />;
      case 'wf-058-gestao-de-parceiros-comerciais':
        return <Wf058Partners store={storeState} updateStore={updateStore} />;
      case 'wf-059-cadastro-de-parceiro-comercial':
        return <Wf058Partners store={storeState} updateStore={updateStore} showModal />;
      case 'wf-060-painel-anti-cambista':
        return <Wf060AntiCambista store={storeState} updateStore={updateStore} />;
      case 'wf-061-gestao-de-pacotes-de-ingressos':
        return <Wf061Packages store={storeState} updateStore={updateStore} />;
      case 'wf-062-gestao-de-pacotes-adicionar-pacote':
        return <Wf061Packages store={storeState} updateStore={updateStore} showModal />;
      case 'wf-063-relatorios-financeiros-globais':
        return <Wf063GlobalFinancialReports />;
      case 'wf-064-cadastro-de-agente':
        return <Wf050Agents store={storeState} updateStore={updateStore} showModal />;
      default:
        return <Wf002Dashboard store={storeState} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {!hideTopBar && (
        <WfTopReferenceBar
          currentScreen={currentScreen}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
        />
      )}

      {showOverlay ? (
        <div style={{ padding: '24px', backgroundColor: '#0f172a', minHeight: 'calc(100vh - 45px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>
            Referência Visual Original ({currentScreen?.id} — {currentScreen?.title})
          </div>
          <img
            src={currentScreen?.image}
            alt={currentScreen?.title}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#fff' }}
          />
        </div>
      ) : (
        renderBySlug(currentScreen?.slug)
      )}

      <footer style={{
        padding: '12px 28px',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '12px',
        color: '#64748b'
      }}>
        <span>© 2026 Curitiba 360° • Sistema Oficial de Gestão & Backoffice</span>
        <span>
          Desenvolvedor: <strong style={{ color: '#0f172a' }}>VINICIUS CASAGRANDE</strong> — Programador • <strong style={{ color: '#00a896' }}>CEO MBA System of America</strong>
        </span>
      </footer>
    </div>
  );
}
