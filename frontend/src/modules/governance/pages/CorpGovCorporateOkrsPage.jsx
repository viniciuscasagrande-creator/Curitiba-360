import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernanceDashboard } from "../hooks/useGovernanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Award } from "lucide-react";

export default function CorpGovCorporateOkrsPage() {
  const { data, loading, updateOkr } = useGovernanceDashboard();
  const [val, setVal] = useState("");

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando OKRs...
        </div>
      </AdminLayout>
    );
  }

  const handleUpdate = (id) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      updateOkr(id, num);
      setVal("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">OKRs Corporativos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore objetivos trimestrais e resultados-chave (Key Results) de cada diretoria executiva.
          </p>
        </div>

        {/* OKRs list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Award size={18} className="text-purple-755 font-bold" /> Metas Trimestrais (OKRs)
          </h3>

          <div className="space-y-6">
            {data.okrs.map(okr => (
              <div key={okr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-slate-900 text-xs block">{okr.title}</strong>
                    <span className="text-[10px] text-slate-505 block">Dono: {okr.owner}</span>
                  </div>
                  <strong className="text-purple-700 font-mono text-xs">{okr.progress}% Progresso</strong>
                </div>

                <div className="pl-4 border-l-2 border-purple-200 space-y-3">
                  {okr.keyResults.map(kr => (
                    <div key={kr.id} className="text-[10px] text-slate-705 flex justify-between items-center">
                      <span>{kr.description} (Alvo: {kr.target} | Atual: {kr.current})</span>
                      <span className="font-bold text-slate-900">{kr.progress}%</span>
                    </div>
                  ))}
                </div>

                {/* Simulated check-in */}
                <div className="flex gap-2 items-center pt-2">
                  <input
                    type="number"
                    placeholder="Atualizar progresso geral %"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] w-48 font-mono"
                  />
                  <button
                    onClick={() => handleUpdate(okr.id)}
                    className="h-8 px-3 text-[10px] font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer transition border-none"
                  >
                    Registrar Check-in
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
