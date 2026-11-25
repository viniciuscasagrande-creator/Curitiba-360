import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

export default function CorpGovMeetingDetailsPage() {
  const { meetingId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance/meetings" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar às Reuniões
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Detalhes da Reunião: {meetingId}</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ata de deliberações, quorum atingido e documentos associados.
          </p>
        </div>

        {/* Meeting details */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Clock size={18} className="text-purple-755 font-bold" /> Pauta Deliberativa
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <strong className="text-slate-900 text-xs block">Item 1: Aprovação do CAPEX de Infraestrutura Urbana 2027</strong>
              <span className="text-[10px] text-slate-505 block mt-1">Status: Concluído e Votado | Relator: Marcos Lima</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl">
              <strong className="text-slate-900 text-xs block">Item 2: Implementação de Split de Repasses de Bilhetagem</strong>
              <span className="text-[10px] text-slate-505 block mt-1">Status: Sob Discussão | Relatora: Sofia Santos</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
