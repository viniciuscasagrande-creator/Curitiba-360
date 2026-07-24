import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Ticket,
  Search,
  Tag,
  FileText,
  Wallet,
  DollarSign,
  QrCode,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Settings
} from 'lucide-react';
import { attractionRoutes } from '../routes/attractionRoutes';

export function AttractionSidebar({ attractionId = 'attraction-001', attractionName }) {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(true);

  const isReportActive = location.pathname.includes('/relatorios/');

  return (
    <aside className="w-full lg:w-64 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm text-left space-y-4 shrink-0">
      <div className="border-b border-slate-100 pb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navegação da Atração</span>
        <h3 className="text-sm font-black text-slate-900 truncate">{attractionName || 'Parque Jaime Lerner'}</h3>
      </div>

      <nav className="space-y-1 text-xs font-bold text-slate-600">
        <SidebarLink to={`/admin/atracoes/${attractionId}`} label="Visão Geral" icon={LayoutDashboard} active={location.pathname === `/admin/atracoes/${attractionId}`} />
        <SidebarLink to={attractionRoutes.analytics(attractionId)} label="Analytics" icon={BarChart3} active={location.pathname.includes('/analytics')} />
        <SidebarLink to={attractionRoutes.users(attractionId)} label="Equipe & Usuários" icon={Users} active={location.pathname.includes('/usuarios')} />

        <div className="pt-2 pb-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase text-slate-400 px-3 tracking-wider">Ingressos</span>
        </div>
        <SidebarLink to={attractionRoutes.categories(attractionId)} label="Categorias" icon={Ticket} active={location.pathname.includes('/categorias') && !location.pathname.includes('/relatorios')} />
        <SidebarLink to={attractionRoutes.tickets(attractionId)} label="Pesquisar Ingressos" icon={Search} active={location.pathname.includes('/ingressos') && !location.pathname.includes('/validar')} />
        <SidebarLink to={attractionRoutes.coupons(attractionId)} label="Gestão de Cupons" icon={Tag} active={location.pathname.includes('/cupons')} />

        <div className="pt-2 pb-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase text-slate-400 px-3 tracking-wider">Negociação Financeira</span>
        </div>
        <SidebarLink to={attractionRoutes.commercialConditions(attractionId)} label="Condições Comerciais" icon={FileText} active={location.pathname.includes('/condicoes-comerciais')} />
        <SidebarLink to={attractionRoutes.financialInfo(attractionId)} label="Informações Financeiras" icon={Wallet} active={location.pathname.includes('/informacoes')} />
        <SidebarLink to={attractionRoutes.expenses(attractionId)} label="Resumo das Despesas" icon={DollarSign} active={location.pathname.includes('/despesas')} />
        <SidebarLink to={`/admin/atracoes/${attractionId}/financeiro/repasses`} label="Solicitações de Repasse" icon={Wallet} active={location.pathname.includes('/repasses')} />

        <div className="pt-2 pb-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setReportsOpen(!reportsOpen)}
            className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-900"
          >
            <span>Relatórios da Atração</span>
            {reportsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {reportsOpen && (
          <div className="pl-2 space-y-0.5 border-l-2 border-slate-100 ml-3">
            <SidebarLink to={attractionRoutes.salesReport(attractionId)} label="Vendas" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/vendas')} />
            <SidebarLink to={attractionRoutes.cartAbandonmentReport(attractionId)} label="Abandono de Carrinho" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/abandono-carrinho')} />
            <SidebarLink to={attractionRoutes.detailedTicketReport(attractionId)} label="Ingresso Detalhado" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/ingresso-detalhado')} />
            <SidebarLink to={attractionRoutes.categoriesReport(attractionId)} label="Categorias" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/categorias')} />
            <SidebarLink to={attractionRoutes.courtesyReport(attractionId)} label="Cortesias Emitidas" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/cortesias')} />
            <SidebarLink to={attractionRoutes.validationReport(attractionId)} label="Validações" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/validacoes')} />
            <SidebarLink to={attractionRoutes.commissionReport(attractionId)} label="Comissões" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/comissoes')} />
            <SidebarLink to={attractionRoutes.borderoReport(attractionId)} label="Borderô Resumido" icon={FileSpreadsheet} active={location.pathname.includes('/relatorios/bordero')} />
          </div>
        )}

        <div className="pt-2 pb-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase text-slate-400 px-3 tracking-wider">Operação</span>
        </div>
        <SidebarLink to={attractionRoutes.validateTickets(attractionId)} label="Validar Ingressos" icon={QrCode} active={location.pathname.includes('/validar-ingressos')} />
        <SidebarLink to={attractionRoutes.edit(attractionId)} label="Editar Atração" icon={Settings} active={location.pathname.includes('/editar')} />
      </nav>
    </aside>
  );
}

function SidebarLink({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
        active ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={15} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default AttractionSidebar;
