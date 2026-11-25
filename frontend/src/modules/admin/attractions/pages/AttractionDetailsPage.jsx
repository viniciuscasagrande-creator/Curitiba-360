import React, { useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit,
  Landmark,
  MapPin,
  Pencil,
  Percent,
  QrCode,
  Sparkles,
  Ticket,
  Users
} from 'lucide-react';

import { attractionsMock, attractionCategoriesMock, attractionTicketsMock, operationTypeLabels } from '../data/attractionsMock';

export function AttractionDetailsPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();

  const attraction = useMemo(
    () => attractionsMock.find((item) => item.id === attractionId) || attractionsMock[0],
    [attractionId]
  );

  const categories = useMemo(
    () => attractionCategoriesMock.filter((c) => c.attractionId === attraction.id),
    [attraction.id]
  );

  const tickets = useMemo(
    () => attractionTicketsMock.filter((t) => t.attractionId === attraction.id),
    [attraction.id]
  );

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('/admin/atracoes')}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={18} />
            </button>

            {attraction.media?.mainImageUrl ? (
              <img
                src={attraction.media.mainImageUrl}
                alt={attraction.name}
                className="h-20 w-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 font-bold">
                <Sparkles size={32} />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                  {operationTypeLabels[attraction.operationType]}
                </span>
                <span className="text-xs text-slate-400 font-medium">ID: {attraction.id}</span>
              </div>

              <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                {attraction.name}
              </h1>

              <p className="mt-1 text-xs text-slate-500 font-medium flex items-center gap-1">
                <MapPin size={14} className="text-emerald-600" />
                {attraction.location?.address}, {attraction.location?.number} &bull; {attraction.location?.city}/{attraction.location?.state}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(`/admin/atracoes/${attraction.id}/editar`)}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={16} />
              Editar Atração
            </button>

            <button
              type="button"
              onClick={() => navigate(`/admin/atracoes/${attraction.id}/ingressos`)}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              <Ticket size={16} />
              Pesquisar & Validar Ingressos
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Hub */}
      <nav className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5 text-xs font-bold">
        <Link
          to={`/admin/atracoes/${attraction.id}`}
          className="rounded-xl bg-white px-4 py-2.5 text-emerald-700 shadow-xs"
        >
          Visão Geral
        </Link>
        <Link
          to={`/admin/atracoes/${attraction.id}/categorias`}
          className="rounded-xl px-4 py-2.5 text-slate-600 hover:bg-white/60"
        >
          Categorias ({categories.length})
        </Link>
        <Link
          to={`/admin/atracoes/${attraction.id}/ingressos`}
          className="rounded-xl px-4 py-2.5 text-slate-600 hover:bg-white/60"
        >
          Pesquisar Ingresso
        </Link>
        <Link
          to={`/admin/atracoes/totais`}
          className="rounded-xl px-4 py-2.5 text-slate-600 hover:bg-white/60"
        >
          Totais & Relatórios
        </Link>
      </nav>

      {/* Overview Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacidade</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Users size={18} />
            </span>
          </div>
          <strong className="text-2xl font-black text-slate-900 block">{attraction.operation?.capacity?.toLocaleString('pt-BR')} pessoas</strong>
          <p className="text-xs text-slate-500 font-medium">Classificação: {attraction.operation?.ageRating === 0 ? 'Livre' : `${attraction.operation?.ageRating} anos`}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ingressos Emitidos</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Ticket size={18} />
            </span>
          </div>
          <strong className="text-2xl font-black text-slate-900 block">{tickets.length} ingressos</strong>
          <p className="text-xs text-emerald-700 font-bold">{tickets.filter(t => t.status === 'validated').length} validados no check-in</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parceiro Comercial</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Building2 size={18} />
            </span>
          </div>
          <strong className="text-lg font-black text-slate-900 block">{attraction.partnerName}</strong>
          <p className="text-xs text-slate-500 font-medium">Borderô via {attraction.banking?.statementEmail || 'E-mail parceiro'}</p>
        </div>
      </div>

      {/* Release & Infrastructure */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900">Sobre a Atração</h3>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          {attraction.description || 'Nenhum release cadastrado para esta atração.'}
        </p>

        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs font-bold text-slate-700">
          <span className={attraction.infrastructure?.coveredArea ? 'text-emerald-700' : 'text-slate-400'}>
            ✓ Espaço Coberto: {attraction.infrastructure?.coveredArea ? 'Sim' : 'Não'}
          </span>
          <span className={attraction.infrastructure?.accessibility ? 'text-emerald-700' : 'text-slate-400'}>
            ✓ Acessibilidade PCD: {attraction.infrastructure?.accessibility ? 'Sim' : 'Não'}
          </span>
          <span className={attraction.infrastructure?.parking ? 'text-emerald-700' : 'text-slate-400'}>
            ✓ Estacionamento: {attraction.infrastructure?.parking ? 'Sim' : 'Não'}
          </span>
        </div>
      </section>
    </div>
  );
}

export default AttractionDetailsPage;
