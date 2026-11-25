import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, UserCheck } from "lucide-react";

export default function CredentialsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety/access-control" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Controle de Acesso
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Credenciamento Operacional</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Emita, bloqueie ou revogue credenciais físicas ou NFC para artistas, fornecedores, staff e órgãos de segurança.
          </p>
        </div>

        {/* Credentials list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <UserCheck size={18} className="text-purple-755 font-bold" /> Credenciais Cadastradas
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Carlos Roberto (Staff Operações)</strong>
                <span className="text-[10px] text-slate-505 block">Zonas: Todas | Validade: 2026-12-31 | Código: NFC-88291-C</span>
              </div>
              <button className="bg-red-50 text-red-750 font-bold px-2 py-1 rounded border border-red-100 cursor-pointer text-[9px]">
                Bloquear Acesso
              </button>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Vigilante Terceirizado (Segurança Evento)</strong>
                <span className="text-[10px] text-slate-505 block">Zonas: Pública, Controle | Validade: 2026-07-26 | Código: QR-9028-E</span>
              </div>
              <button className="bg-red-50 text-red-750 font-bold px-2 py-1 rounded border border-red-100 cursor-pointer text-[9px]">
                Bloquear Acesso
              </button>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
