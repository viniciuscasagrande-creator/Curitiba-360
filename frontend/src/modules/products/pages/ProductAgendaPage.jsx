import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Clock } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useProduct } from "../hooks/useProduct";
import { updateProduct } from "../services/productService";

export default function ProductAgendaPage() {
  const { id } = useParams();
  const { product, loading, reload } = useProduct(id);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddSession = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    const newSession = {
      id: `session-${Date.now()}`,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      timezone: "America/Sao_Paulo",
      capacity: product.capacity?.maxCapacity || 100,
      remaining: product.capacity?.maxCapacity || 100,
      status: "scheduled"
    };

    const currentSessions = product.sessions || [];
    await updateProduct(id, {
      sessions: [...currentSessions, newSession]
    });
    await reload();

    setStartDate("");
    setEndDate("");
    window.alert("Sessão / Horário adicionado à agenda!");
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/produtos"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Configurações
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Agenda do Produto
            </h1>
            <p className="mt-1 text-sm text-slate-505 my-0">
              Configure múltiplos horários, sessões e disponibilidades.
            </p>
          </div>
        </header>

        <form onSubmit={handleAddSession} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4 sm:grid-cols-3 items-end">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Data e Hora Inicial</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Data e Hora Final</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
            >
              <Plus size={18} />
              Criar Sessão
            </button>
          </div>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-slate-955 my-0 mb-4">Sessões Cadastradas</h3>
          <div className="divide-y divide-slate-100">
            {(product.sessions || []).map((session) => (
              <div key={session.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-955 my-0">
                      {new Date(session.startDate).toLocaleString("pt-BR")}
                    </h4>
                    <p className="text-xs text-slate-505 my-0 mt-0.5">
                      Fim: {new Date(session.endDate).toLocaleString("pt-BR")} • Vagas: {session.remaining} / {session.capacity}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                  {session.status.toUpperCase()}
                </span>
              </div>
            ))}
            {(product.sessions || []).length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6 my-0">Nenhuma sessão agendada.</p>
            )}
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
