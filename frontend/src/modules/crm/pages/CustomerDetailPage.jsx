import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useCustomers } from "../hooks/useCustomers";

export default function CustomerDetailPage() {
  const { customerId } = useParams();
  const { customers } = useCustomers();
  const customer = customers.find((c) => c.id === customerId) || customers[0];

  if (!customer) {
    return (
      <PartnerLayout>
        <p className="p-6 text-slate-500 font-semibold">Cliente não encontrado.</p>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/crm/clientes"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              CRM • Ficha do Cliente
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              {customer.name}
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-505 my-0">Email</p>
              <p className="font-bold text-slate-955 my-0 mt-0.5">{customer.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-505 my-0">Telefone</p>
              <p className="font-bold text-slate-955 my-0 mt-0.5">{customer.phone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-505 my-0">Cidade/UF</p>
              <p className="font-bold text-slate-955 my-0 mt-0.5">{customer.city} / {customer.state}</p>
            </div>
            <div>
              <p className="text-xs text-slate-505 my-0">Documento (CPF)</p>
              <p className="font-bold text-slate-955 my-0 mt-0.5">{customer.document}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-505 my-0 block mb-1">Tags</p>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <span key={tag} className="bg-slate-100 border border-slate-200 text-slate-707 px-3 py-1 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
