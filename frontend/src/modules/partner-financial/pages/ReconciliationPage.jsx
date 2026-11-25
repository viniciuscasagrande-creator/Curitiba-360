import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function ReconciliationPage() {
  const [items] = useState([
    { id: "r1", date: "22/07/2026", source: "gateway", expected: 1050.0, received: 1050.0, diff: 0, status: "matched" },
    { id: "r2", date: "21/07/2026", source: "bank", expected: 3500.0, received: 3500.0, diff: 0, status: "matched" },
  ]);

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/financeiro"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Financeiro
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Conciliação Financeira
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Origem</th>
                  <th className="px-6 py-4">Esperado</th>
                  <th className="px-6 py-4">Recebido</th>
                  <th className="px-6 py-4">Diferença</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-55/50 transition">
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4 uppercase">{item.source}</td>
                    <td className="px-6 py-4">R$ {item.expected.toFixed(2)}</td>
                    <td className="px-6 py-4">R$ {item.received.toFixed(2)}</td>
                    <td className="px-6 py-4">R$ {item.diff.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs text-emerald-700 font-bold uppercase">
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
