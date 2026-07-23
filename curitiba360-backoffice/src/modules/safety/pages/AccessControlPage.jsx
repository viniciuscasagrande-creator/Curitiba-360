import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Key } from "lucide-react";

export default function AccessControlPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/safety/credentials" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            Gerenciamento de Credenciais
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Controle de Acesso & Zonas Restritas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Valide e audite acessos em tempo real a camarins, áreas técnicas, cabines de som e postos de controle.
          </p>
        </div>

        {/* Access logs */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Key size={18} className="text-purple-755 font-bold" /> Registro de Validações Recentes
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Carlos Roberto (Acesso Liberado)</strong>
                <span className="text-[10px] text-slate-505 block">Zona: Backstage Operacional | Dispositivo: Catraca Principal | Horário: 2026-07-23 09:12:00</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Liberado
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Credencial Expirada #09281 (Bloqueado)</strong>
                <span className="text-[10px] text-slate-505 block">Zona: Área Técnica Palco | Dispositivo: Leitor NFC Sul | Horário: 2026-07-23 09:14:12</span>
              </div>
              <span className="text-[9px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-100 uppercase">
                Negado
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
