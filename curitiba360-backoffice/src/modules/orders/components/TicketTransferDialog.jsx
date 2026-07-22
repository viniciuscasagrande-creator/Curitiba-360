import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Send } from "lucide-react";
import { ticketTransferSchema } from "../schemas/ticketTransferSchema";

export default function TicketTransferDialog({ ticket, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ticketTransferSchema),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm select-none">
      <section className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl text-left space-y-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 border-none cursor-pointer bg-white transition"
          aria-label="Fechar"
        >
          <X size={19} />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-955 my-0">
            Transferir Ingresso
          </h2>
          <p className="text-xs text-slate-500 my-0 mt-1">
            Transfira o ingresso <strong className="font-mono text-slate-700">{ticket.code}</strong> para outro titular.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
            <input
              {...register("name")}
              placeholder="Ex: João Silva"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.name && <p className="mt-1 text-xs text-red-650 my-0">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">CPF</label>
            <input
              {...register("cpf")}
              placeholder="000.000.000-00"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.cpf && <p className="mt-1 text-xs text-red-650 my-0">{errors.cpf.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">E-mail do Novo Titular</label>
            <input
              {...register("email")}
              placeholder="novo.titular@email.com"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.email && <p className="mt-1 text-xs text-red-650 my-0">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Confirme o E-mail</label>
            <input
              {...register("confirmEmail")}
              placeholder="Confirme o e-mail"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {errors.confirmEmail && <p className="mt-1 text-xs text-red-650 my-0">{errors.confirmEmail.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 px-5 text-sm font-bold text-white border-none cursor-pointer transition"
            >
              <Send size={16} />
              Confirmar Envio
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
