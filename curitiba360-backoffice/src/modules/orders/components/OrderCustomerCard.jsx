import React from "react";
import { UserCheck } from "lucide-react";

export default function OrderCustomerCard({ customer = {} }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <UserCheck size={18} />
        </div>
        <h2 className="text-base font-bold text-slate-900 my-0">
          Dados do Cliente
        </h2>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Nome</span>
          <span className="font-bold text-slate-905">{customer.name}</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>E-mail</span>
          <span className="font-bold text-slate-905">{customer.email}</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span>Telefone</span>
          <span className="font-bold text-slate-905">{customer.phone}</span>
        </div>

        <div className="flex justify-between">
          <span>CPF / Documento</span>
          <span className="font-bold text-slate-905">{customer.document}</span>
        </div>
      </div>
    </section>
  );
}
