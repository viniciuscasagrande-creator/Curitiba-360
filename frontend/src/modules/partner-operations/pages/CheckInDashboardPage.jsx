import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Wifi, ArrowRight, CheckCircle2, QrCode } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";

export default function CheckInDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      setStats(data.stats);
    }
    load();
  }, []);

  if (!stats) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-6xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Operações
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Controle de Check-in
            </h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Monitore a capacidade do local e lance o scanner de ingressos.
            </p>
          </div>

          <Link
            to="/parceiro/check-in/product-festival-001"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white text-decoration-none hover:bg-slate-800 transition cursor-pointer border-none"
          >
            <QrCode size={18} />
            Escanear QR Codes
          </Link>
        </header>

        {/* Real-time stats cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacidade Total</span>
            <strong className="block text-3xl font-extrabold text-slate-955 mt-2">{stats.totalCapacity}</strong>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ingressos Emitidos</span>
            <strong className="block text-3xl font-extrabold text-slate-955 mt-2">{stats.ticketsIssued}</strong>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entradas Efetuadas</span>
            <strong className="block text-3xl font-extrabold text-slate-955 mt-2">{stats.checkedIn}</strong>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taxa de Ocupação</span>
            <strong className="block text-3xl font-extrabold text-emerald-700 mt-2">{stats.occupancyRate}%</strong>
          </div>
        </section>

        {/* Capacity Occupancy progression bar */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-955 my-0">Lotação do Espaço</h3>
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Progresso: {stats.checkedIn} de {stats.totalCapacity} participantes</span>
              <span>{stats.occupancyRate}%</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.occupancyRate}%` }}
              />
            </div>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
