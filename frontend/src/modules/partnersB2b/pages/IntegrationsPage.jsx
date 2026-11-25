import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Key } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Integração via API & Webhooks</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe chaves de API distribuídas para motores de reserva externos e logs de webhook para notificação de vendas.
          </p>
        </div>

        {/* API info */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Key size={18} className="text-purple-755 font-bold" /> Chaves de Acesso B2B
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Webhook Endpoint de Reservas</strong>
              <span className="text-[10px] text-slate-505 block">URL do parceiro para envio instantâneo de vouchers gerados.</span>
            </div>
            <strong className="text-purple-700 text-xs uppercase font-mono">Ativo</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
