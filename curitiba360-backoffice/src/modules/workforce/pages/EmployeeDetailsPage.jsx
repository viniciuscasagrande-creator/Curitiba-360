import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, FileText, Gift, Calendar, Heart, Shield } from "lucide-react";

export default function EmployeeDetailsPage() {
  const { employeeId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce/employees" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Colaboradores
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Ficha 360º do Colaborador</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ficha unificada de cadastro, contratos, exames ocupacionais, equipamentos de proteção (EPI) e metas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Identity */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1.5">
              <User size={16} className="text-purple-755" /> Identificação
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Matrícula</span>
                <span className="text-slate-808 font-mono text-[10px] font-bold">{employeeId || "RE-9081"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Nome Completo</span>
                <span className="text-slate-808 font-bold">Carlos Roberto de Oliveira</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Função</span>
                <span className="text-slate-808 font-bold">Coordenador de Operações Turísticas</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  ATIVO
                </span>
                <span className="bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  CLT
                </span>
              </div>
            </div>
          </div>

          {/* Details & Documents & Equipment */}
          <div className="md:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
                <FileText size={18} className="text-purple-755" /> Documentos & Contratos
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="font-bold block text-slate-800">Contrato de Trabalho CLT</span>
                  <span className="text-slate-400 text-[10px] block">Assinado digitalmente em 2024-03-10</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <span className="font-bold block text-slate-800">Termo de Confidencialidade (NDA)</span>
                  <span className="text-slate-400 text-[10px] block">Assinado digitalmente em 2024-03-10</span>
                </div>
              </div>
            </div>

            {/* EPIs delivered */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
                <Shield size={18} className="text-purple-755" /> Equipamentos de Proteção (EPI)
              </h3>
              <div className="divide-y divide-slate-100">
                <div className="py-2 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Colete Refletivo Operacional</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Entregue: 2026-01-10 | CA: 41829</span>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase">Válido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
