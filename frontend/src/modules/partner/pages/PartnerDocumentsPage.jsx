import React from "react";
import PartnerLayout from "../layouts/PartnerLayout";
import { Upload, FileText } from "lucide-react";

export default function PartnerDocumentsPage() {
  const documentsMockList = [
    { id: "d1", name: "Cartao_CNPJ.pdf", type: "CNPJ", size: "345 KB", date: "22/07/2026", status: "Aprovado" },
    { id: "d2", name: "Contrato_Social.pdf", type: "Contrato Social", size: "1.2 MB", date: "22/07/2026", status: "Aprovado" }
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Documentação
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Documentos da Empresa
          </h1>
          <p className="mt-2 text-sm text-slate-600 my-0">
            Envie e acompanhe a verificação dos documentos regulatórios do parceiro.
          </p>
        </header>

        <section className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-white hover:bg-slate-50 transition cursor-pointer select-none">
          <Upload size={32} className="mx-auto text-slate-400 mb-2" />
          <span className="text-sm font-semibold text-slate-700 block">Fazer upload de novo documento</span>
          <span className="text-xs text-slate-450 block mt-1">Formatos aceitos: PDF, PNG ou JPG de até 10MB</span>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {documentsMockList.map((doc) => (
            <div key={doc.id} className="border border-slate-200 bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-955 my-0 truncate max-w-[200px]">{doc.name}</h4>
                  <p className="text-xs text-slate-500 my-0 mt-0.5">{doc.type} • {doc.size}</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                {doc.status}
              </span>
            </div>
          ))}
        </section>
      </div>
    </PartnerLayout>
  );
}
