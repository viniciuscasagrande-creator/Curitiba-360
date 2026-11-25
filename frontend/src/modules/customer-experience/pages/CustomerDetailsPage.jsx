import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, Calendar, Heart, ShieldAlert, Sparkles } from "lucide-react";

export default function CustomerDetailsPage() {
  const { customerId } = useParams();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience/customers" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar aos Visitantes
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Ficha do Visitante (360º)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ficha detalhada contendo histórico de compras, interações recentes e nível de fidelidade.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1.5">
              <User size={16} className="text-purple-755" /> Identidade Única
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">ID Visitante</span>
                <span className="text-slate-800 font-mono text-[10px] font-bold">{customerId || "cust-101"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Nome Completo</span>
                <span className="text-slate-800 font-bold">Vinicius Casagrande</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-purple-50 text-purple-750 border border-purple-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  VIP
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                  Frequente
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 my-0">Linha do Tempo de Interações</h3>
            <div className="relative border-l border-slate-200 pl-4 space-y-4">
              <div className="relative">
                <div className="absolute -left-[21px] mt-1 bg-purple-200 w-2.5 h-2.5 rounded-full border-2 border-white" />
                <strong className="block text-[11px]">Compra Confirmada: Festival de Inverno</strong>
                <span className="text-[9px] text-slate-400 block font-mono">2026-07-22 14:32 • ID Pedido: order-99831</span>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] mt-1 bg-blue-200 w-2.5 h-2.5 rounded-full border-2 border-white" />
                <strong className="block text-[11px]">Mensagem Recebida via WhatsApp</strong>
                <span className="text-[9px] text-slate-400 block font-mono">2026-07-22 10:15 • "Gostaria de saber o horário do ônibus de turismo."</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
