import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyerSchema } from "../schemas/buyerSchema";
import { maskCPF, maskPhone } from "../utils/masks";

export default function BuyerForm({ initialValues = {}, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buyerSchema),
    defaultValues: initialValues,
  });

  const handleCPFChange = (e) => {
    setValue("cpf", maskCPF(e.target.value), { shouldValidate: true });
  };

  const handlePhoneChange = (e) => {
    setValue("phone", maskPhone(e.target.value), { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left"
    >
      <h3 className="text-lg font-bold text-slate-950 my-0 pb-2 border-b border-slate-100">
        Dados do Comprador
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Nome</label>
          <input
            {...register("name")}
            placeholder="Ex: Vinicius"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 my-0">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Sobrenome</label>
          <input
            {...register("surname")}
            placeholder="Ex: Casagrande"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.surname && <p className="mt-1 text-xs text-red-600 my-0">{errors.surname.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">CPF</label>
          <input
            {...register("cpf")}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.cpf && <p className="mt-1 text-xs text-red-600 my-0">{errors.cpf.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Celular / WhatsApp</label>
          <input
            {...register("phone")}
            onChange={handlePhoneChange}
            placeholder="(41) 99999-9999"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600 my-0">{errors.phone.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">E-mail</label>
          <input
            {...register("email")}
            placeholder="seuemail@exemplo.com"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600 my-0">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-3">
        <button
          type="submit"
          className="h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-6 text-sm font-bold text-white transition border-none cursor-pointer"
        >
          Avançar
        </button>
      </div>
    </form>
  );
}
