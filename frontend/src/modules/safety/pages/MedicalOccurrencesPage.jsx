import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

export default function MedicalOccurrencesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/medical-posts" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Postos Médicos
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Atendimentos Médicos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie a fila de triagem de pacientes em conformidade com o Protocolo de Manchester (Vermelho, Laranja, Amarelo, Verde, Azul).
          </p>
        </div>

        {/* Medical occurrences list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Activity size={18} className="text-purple-755 font-bold" /> Pacientes na Fila
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Paciente Anonimizado (Queda de Altura)</strong>
                <span className="text-[10px] text-slate-505 block">Queixa Principal: Suspeita de fratura no tornozelo | Posto Médico: Central | Triador: Enf. Roberta</span>
              </div>
              <span className="text-[9px] bg-red-50 text-red-750 font-bold px-2 py-0.5 rounded border border-red-100 uppercase">
                Vermelho (Emergência)
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Paciente Anonimizado (Desidratação)</strong>
                <span className="text-[10px] text-slate-505 block">Queixa Principal: Dor de cabeça e náusea | Posto Médico: Central | Triador: Enf. Roberta</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Verde (Pouco Urgente)
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
