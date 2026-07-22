import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { getOperationsRepository } from "../repositories/partnerOperationsRepository";

export default function PartnerTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getOperationsRepository();
      setTickets(data.tickets || []);
    }
    load();
  }, []);

  const filtered = tickets.filter((t) =>
    t.holder.name.toLowerCase().includes(search.toLowerCase()) ||
    t.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-6xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Operações
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Ingressos Emitidos
          </h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie e valide os ingressos gerados para as atrações.
          </p>
        </header>

        <section className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código do ingresso ou nome do titular..."
            className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
          />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Ingresso</th>
                  <th className="px-6 py-4">Titular</th>
                  <th className="px-6 py-4">Lote</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {filtered.map((tkt) => (
                  <tr key={tkt.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-bold text-slate-955">{tkt.code}</td>
                    <td className="px-6 py-4">{tkt.holder.name}</td>
                    <td className="px-6 py-4">{tkt.lotName || "Lote Único"}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        tkt.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-50 text-slate-650 border border-slate-200"
                      }`}>
                        {tkt.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/parceiro/ingressos/${tkt.id}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-decoration-none transition cursor-pointer"
                      >
                        <Eye size={14} />
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-505">
                      Nenhum ingresso emitido.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
