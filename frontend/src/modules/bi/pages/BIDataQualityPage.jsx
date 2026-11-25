import React, { useState, useEffect } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { biService } from "../services/biService";
import { ShieldCheck, ToggleLeft, ToggleRight, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export default function BIDataQualityPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRules = () => {
    biService.getDataQualityRules().then(res => {
      if (res.success) setRules(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchRules();

    const handleChanged = () => fetchRules();
    window.addEventListener("curitiba360:bi-data-changed", handleChanged);
    return () => window.removeEventListener("curitiba360:bi-data-changed", handleChanged);
  }, []);

  const handleToggleRule = (id) => {
    biService.toggleDQRule(id);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Qualidade de Dados & Regras (Data Quality)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore asserções, regras de nulidade, integridade referencial e sanitização de dados sensíveis na camada Silver.</p>
        </div>

        {/* Overview Stats */}
        <section className="grid gap-6 md:grid-cols-4">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Regras Ativas</span>
            <span className="text-2xl font-extrabold text-slate-900 block">{rules.length}</span>
          </div>
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Sucesso</span>
            <span className="text-2xl font-extrabold text-emerald-700 block">
              {rules.filter(r => r.status === "passed").length}
            </span>
          </div>
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Falhas</span>
            <span className="text-2xl font-extrabold text-red-600 block">
              {rules.filter(r => r.status === "failed").length}
            </span>
          </div>
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-xs font-semibold block uppercase">Dados Mascarados</span>
            <span className="text-2xl font-extrabold text-purple-700 block">Sim (CPF/Nomes)</span>
          </div>
        </section>

        {/* Assertions Table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Asserções de Qualidade</h3>
          {loading ? (
            <div className="text-center py-6 text-xs text-slate-400">Carregando asserções...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold">
                    <th className="pb-3 text-left">Tabela</th>
                    <th className="pb-3 text-left">Coluna</th>
                    <th className="pb-3 text-left">Regra</th>
                    <th className="pb-3 text-left">Último Check</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-right">Controles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rules.map(rule => (
                    <tr key={rule.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 font-mono font-bold text-slate-800">{rule.tableName}</td>
                      <td className="py-4 font-mono text-slate-600">{rule.columnName}</td>
                      <td className="py-4">
                        <span className="bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded border border-slate-200">
                          {rule.ruleType.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 text-slate-500">{new Date(rule.lastChecked).toLocaleTimeString()}</td>
                      <td className="py-4">
                        {rule.status === "passed" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <CheckCircle2 size={12} /> OK
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            <AlertCircle size={12} /> ERRO
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleToggleRule(rule.id)}
                          className="text-purple-600 hover:text-purple-800 transition cursor-pointer"
                        >
                          {rule.status === "passed" ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
