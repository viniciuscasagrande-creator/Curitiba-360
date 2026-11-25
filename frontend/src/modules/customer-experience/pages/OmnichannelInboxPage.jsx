import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useExperienceDashboard } from "../hooks/useExperienceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function OmnichannelInboxPage() {
  const { conversations, loading } = useExperienceDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando mensagens da caixa omnichannel...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Caixa de Entrada Omnichannel</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Responda e gerencie atendimentos integrados do WhatsApp, Web Chat e E-mails dos visitantes de Curitiba.
          </p>
        </div>

        {/* Conversations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <MessageSquare size={18} className="text-purple-755" /> Mensagens Pendentes
          </h3>

          <div className="divide-y divide-slate-100">
            {conversations.map(conv => (
              <div key={conv.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{conv.subject}</strong>
                    <span className="bg-slate-100 text-slate-650 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px] font-mono">
                      {conv.channel}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455 text-[9px] font-mono">
                    <span>ID: {conv.id}</span>
                    <span>•</span>
                    <span>Cliente: {conv.customerId}</span>
                    <span>•</span>
                    <span>Abertura: {conv.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans font-bold">
                  <span className={`text-[8px] px-2 py-0.5 rounded border uppercase ${conv.priority === "high" || conv.priority === "urgent" ? "bg-red-50 text-red-700 border-red-100" : "bg-slate-50 text-slate-700 border-slate-100"}`}>
                    {conv.priority}
                  </span>
                  <span className={`text-[8px] px-2 py-0.5 rounded border uppercase bg-slate-100 text-slate-600`}>
                    Sentimento: {conv.sentiment}
                  </span>
                  <span className="text-[10px] text-purple-700 font-bold uppercase font-sans">
                    {conv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
