import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Tag,
  Plus,
  Building2,
  Search,
  Filter,
  QrCode,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Percent,
  CircleDollarSign,
  Users,
  RefreshCw,
  Share2,
  Eye
} from 'lucide-react';
import { AttractionSidebar } from '../components/AttractionSidebar';
import { CouponFormDrawer } from '../components/CouponFormDrawer';
import { CouponQRCodeDialog } from '../components/CouponQRCodeDialog';
import { attractionsMock } from '../data/attractionsMock';
import { attractionRoutes } from '../routes/attractionRoutes';

const INITIAL_COUPONS = [
  {
    id: 'cup-001',
    name: 'CURITIBA10',
    type: 'user',
    targetEntity: 'Todos os Usuários',
    discountType: 'percent',
    discountPercent: 10,
    discountValue: 0,
    quantity: 500,
    used: 142,
    revenue: 4260.00,
    discountedAmount: 473.33,
    conversionRate: '28.4%',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    applicableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    status: 'active',
    showOnCheckout: true
  },
  {
    id: 'cup-002',
    name: 'CWB-AGENCIA-VIP',
    type: 'agency',
    targetEntity: 'Agência CWB Tour',
    discountType: 'fixed',
    discountPercent: 0,
    discountValue: 15.00,
    quantity: 200,
    used: 85,
    revenue: 3825.00,
    discountedAmount: 1275.00,
    conversionRate: '42.5%',
    startDate: '2026-05-15',
    endDate: '2026-10-30',
    applicableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    status: 'active',
    showOnCheckout: false
  },
  {
    id: 'cup-003',
    name: 'FERIADOPR',
    type: 'user',
    targetEntity: 'Todos os Usuários',
    discountType: 'percent',
    discountPercent: 15,
    discountValue: 0,
    quantity: 300,
    used: 300,
    revenue: 7650.00,
    discountedAmount: 1350.00,
    conversionRate: '100%',
    startDate: '2026-04-01',
    endDate: '2026-05-01',
    applicableDays: ['Sáb', 'Dom'],
    status: 'inactive',
    showOnCheckout: true
  },
  {
    id: 'cup-004',
    name: 'PARANATUR-SPECIAL',
    type: 'agency',
    targetEntity: 'Paraná Turismo Operadora',
    discountType: 'percent',
    discountPercent: 20,
    discountValue: 0,
    quantity: 150,
    used: 32,
    revenue: 1920.00,
    discountedAmount: 480.00,
    conversionRate: '21.3%',
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    applicableDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    status: 'active',
    showOnCheckout: false
  }
];

export function AttractionCouponsPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();

  const attraction = useMemo(
    () => attractionsMock.find((item) => item.id === attractionId) || attractionsMock[0],
    [attractionId]
  );

  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [formDrawer, setFormDrawer] = useState(null); // { isOpen: true, type: 'user' | 'agency', coupon: null }
  const [qrModalCoupon, setQrModalCoupon] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Marketing KPIs Calculation
  const marketingKpis = useMemo(() => {
    return coupons.reduce(
      (acc, cup) => {
        acc.totalUsed += cup.used || 0;
        acc.totalRevenue += cup.revenue || 0;
        acc.totalDiscounted += cup.discountedAmount || 0;
        return acc;
      },
      { totalUsed: 0, totalRevenue: 0, totalDiscounted: 0 }
    );
  }, [coupons]);

  const avgConversionRate = useMemo(() => {
    if (!coupons.length) return '0%';
    const totalIssued = coupons.reduce((sum, c) => sum + (c.quantity || 0), 0);
    if (!totalIssued) return '0%';
    return `${((marketingKpis.totalUsed / totalIssued) * 100).toFixed(1)}%`;
  }, [coupons, marketingKpis]);

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return coupons.filter((cup) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && cup.status === 'active') ||
        (activeTab === 'inactive' && cup.status === 'inactive') ||
        (activeTab === 'agency' && cup.type === 'agency');

      const matchesSearch =
        !query ||
        [cup.name, cup.targetEntity, cup.type]
          .some((val) => String(val || '').toLowerCase().includes(query));

      return matchesTab && matchesSearch;
    });
  }, [coupons, activeTab, search]);

  function handleSaveCoupon(newCouponData) {
    setCoupons((current) => {
      const existingIndex = current.findIndex((c) => c.id === newCouponData.id);
      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = { ...updated[existingIndex], ...newCouponData };
        return updated;
      }
      return [
        ...current,
        {
          ...newCouponData,
          used: 0,
          revenue: 0,
          discountedAmount: 0,
          conversionRate: '0%'
        }
      ];
    });
  }

  function handleToggleStatus(couponId) {
    setCoupons((current) =>
      current.map((c) =>
        c.id === couponId ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
  }

  function handleDeleteCoupon(couponId) {
    setCoupons((current) => current.filter((c) => c.id !== couponId));
    setDeleteConfirmation(null);
  }

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      {/* Page Header */}
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(attractionRoutes.list)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Módulo Comercial &bull; {attraction.general?.name}
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              Gestão de Cupons Promocionais
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setFormDrawer({ isOpen: true, type: 'user', coupon: null })}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            <Plus size={16} />
            Adicionar Cupom
          </button>

          <button
            type="button"
            onClick={() => setFormDrawer({ isOpen: true, type: 'agency', coupon: null })}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-black text-white hover:bg-slate-800 transition shadow-md"
          >
            <Building2 size={16} />
            Adicionar Cupom Agência
          </button>
        </div>
      </header>

      {/* Main Layout Grid with Sidebar */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <AttractionSidebar
          attractionId={attraction.id}
          attractionName={attraction.general?.name}
        />

        <div className="flex-1 space-y-6">
          {/* Marketing KPIs Cards */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Utilizações Totais</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Tag size={18} />
                </span>
              </div>
              <strong className="mt-3 block text-2xl font-black text-slate-950">
                {marketingKpis.totalUsed} <span className="text-xs font-normal text-slate-400">usos</span>
              </strong>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Acumulado em campanhas</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Taxa de Conversão</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <TrendingUp size={18} />
                </span>
              </div>
              <strong className="mt-3 block text-2xl font-black text-slate-950">
                {avgConversionRate}
              </strong>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Conversão de resgates</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Receita Gerada</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <CircleDollarSign size={18} />
                </span>
              </div>
              <strong className="mt-3 block text-2xl font-black text-emerald-600">
                R$ {marketingKpis.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Vendas impulsionadas</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Valor Descontado</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Percent size={18} />
                </span>
              </div>
              <strong className="mt-3 block text-2xl font-black text-rose-600">
                R$ {marketingKpis.totalDiscounted.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
              <p className="mt-1 text-[11px] text-slate-500 font-medium">Investimento promocional</p>
            </article>
          </section>

          {/* Filter Bar & Tabs */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Todos os Cupons' },
                  { id: 'active', label: 'Ativos' },
                  { id: 'inactive', label: 'Inativos' },
                  { id: 'agency', label: 'Agências Comercial' }
                ].map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={[
                        'h-9 rounded-2xl px-4 text-xs font-extrabold transition',
                        active
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      ].join(' ')}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative sm:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar por código ou agência..."
                  className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Coupons Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Código / Nome</th>
                    <th className="py-3 px-4">Destinatário</th>
                    <th className="py-3 px-4">Desconto</th>
                    <th className="py-3 px-4">Utilizações</th>
                    <th className="py-3 px-4">Receita Gerada</th>
                    <th className="py-3 px-4">Conversão</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredCoupons.map((coupon) => {
                    const isActive = coupon.status === 'active';
                    return (
                      <tr key={coupon.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-4 font-extrabold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl font-bold">
                              {coupon.name}
                            </span>
                            {coupon.type === 'agency' && (
                              <span className="rounded-md bg-purple-100 text-purple-800 text-[9px] font-extrabold px-1.5 py-0.5">
                                Agência
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 font-medium text-slate-700">
                          {coupon.targetEntity}
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-800">
                          {coupon.discountType === 'percent'
                            ? `${coupon.discountPercent}% OFF`
                            : `R$ ${coupon.discountValue} OFF`}
                        </td>

                        <td className="py-4 px-4 font-semibold text-slate-700">
                          {coupon.used} / {coupon.quantity}
                          <span className="block text-[10px] text-slate-400">
                            (Saldo: {coupon.quantity - coupon.used})
                          </span>
                        </td>

                        <td className="py-4 px-4 font-bold text-emerald-600">
                          R$ {coupon.revenue.toFixed(2)}
                        </td>

                        <td className="py-4 px-4 font-extrabold text-blue-600">
                          {coupon.conversionRate}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={[
                              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold',
                              isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            ].join(' ')}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                            {isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* QR Code Action */}
                            <button
                              type="button"
                              onClick={() => setQrModalCoupon(coupon)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                              title="Gerar QR Code / Compartilhar"
                            >
                              <QrCode size={16} />
                            </button>

                            {/* Edit Action */}
                            <button
                              type="button"
                              onClick={() => setFormDrawer({ isOpen: true, type: coupon.type, coupon })}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                              title="Editar Cupom"
                            >
                              <Edit3 size={16} />
                            </button>

                            {/* Toggle Status */}
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(coupon.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                              title={isActive ? 'Inativar' : 'Ativar'}
                            >
                              {isActive ? <XCircle size={16} className="text-amber-600" /> : <CheckCircle2 size={16} className="text-emerald-600" />}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmation(coupon)}
                              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {!filteredCoupons.length && (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                  Nenhum cupom promocional encontrado com os filtros selecionados.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Form Drawer (Create / Edit) */}
      <CouponFormDrawer
        isOpen={Boolean(formDrawer?.isOpen)}
        type={formDrawer?.type || 'user'}
        initialData={formDrawer?.coupon}
        onClose={() => setFormDrawer(null)}
        onSave={handleSaveCoupon}
      />

      {/* QR Code Dialog */}
      <CouponQRCodeDialog
        coupon={qrModalCoupon}
        onClose={() => setQrModalCoupon(null)}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <Trash2 size={24} />
            </span>
            <h3 className="font-black text-slate-900 text-base">Excluir Cupom {deleteConfirmation.name}?</h3>
            <p className="text-xs text-slate-500 font-medium">
              Esta ação desabilitará o cupom promocional de forma permanente.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCoupon(deleteConfirmation.id)}
                className="flex-1 h-11 rounded-2xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttractionCouponsPage;
