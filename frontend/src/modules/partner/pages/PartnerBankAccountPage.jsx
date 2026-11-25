import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PartnerLayout from "../layouts/PartnerLayout";
import { usePartner } from "../hooks/usePartner";
import { updatePartnerBankAccount } from "../services/partnerService";
import { partnerBankAccountSchema } from "../schemas/partnerBankAccountSchema";
import { Landmark } from "lucide-react";

export default function PartnerBankAccountPage() {
  const { partner, loading, reload } = usePartner();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(partnerBankAccountSchema),
    defaultValues: {
      holderName: partner?.bankAccount?.holderName || "",
      holderDocument: partner?.bankAccount?.holderDocument || "",
      bankName: partner?.bankAccount?.bankName || "",
      agency: partner?.bankAccount?.agency || "",
      account: partner?.bankAccount?.account || "",
      accountDigit: partner?.bankAccount?.accountDigit || "",
      pixKey: partner?.bankAccount?.pixKey || "",
    }
  });

  const onSubmit = async (data) => {
    await updatePartnerBankAccount(data);
    await reload();
    window.alert("Dados bancários salvos e enviados para análise financeira!");
  };

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-2xl space-y-6 select-none text-left">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
            Financeiro
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
            Dados Bancários
          </h1>
          <p className="mt-2 text-sm text-slate-650 my-0">
            Configure a conta bancária para receber repasses das vendas. O CNPJ/CPF do titular deve ser idêntico ao da empresa.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Titular</label>
            <input
              {...register("holderName")}
              placeholder="Ex: Razão Social da Empresa"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
            {errors.holderName && <p className="mt-1 text-xs text-red-650 my-0">{errors.holderName.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">CNPJ do Titular</label>
            <input
              {...register("holderDocument")}
              placeholder="Ex: 00.000.000/0001-00"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
            {errors.holderDocument && <p className="mt-1 text-xs text-red-650 my-0">{errors.holderDocument.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome do Banco</label>
            <input
              {...register("bankName")}
              placeholder="Ex: Banco do Brasil"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
            {errors.bankName && <p className="mt-1 text-xs text-red-650 my-0">{errors.bankName.message}</p>}
          </div>

          <div className="grid gap-4 grid-cols-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Agência</label>
              <input
                {...register("agency")}
                placeholder="Ex: 1234"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
              />
              {errors.agency && <p className="mt-1 text-xs text-red-650 my-0">{errors.agency.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Conta Corrente</label>
              <input
                {...register("account")}
                placeholder="Ex: 12345"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
              />
              {errors.account && <p className="mt-1 text-xs text-red-650 my-0">{errors.account.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Dígito</label>
              <input
                {...register("accountDigit")}
                placeholder="Ex: 6"
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
              />
              {errors.accountDigit && <p className="mt-1 text-xs text-red-650 my-0">{errors.accountDigit.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Chave PIX (Opcional)</label>
            <input
              {...register("pixKey")}
              placeholder="E-mail, CNPJ, Celular ou Chave Aleatória"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
            {errors.pixKey && <p className="mt-1 text-xs text-red-650 my-0">{errors.pixKey.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm border-none cursor-pointer transition"
          >
            <Landmark size={18} />
            Salvar Dados Bancários
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
