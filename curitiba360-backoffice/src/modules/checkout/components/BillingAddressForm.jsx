import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { billingSchema } from "../schemas/billingSchema";
import { maskCEP } from "../utils/masks";
import { lookupAddressByCEP } from "../services/checkoutService";

export default function BillingAddressForm({ initialValues = {}, onBack, onSubmit }) {
  const [searchingCEP, setSearchingCEP] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: initialValues,
  });

  const handleCEPChange = async (e) => {
    const rawVal = e.target.value;
    const masked = maskCEP(rawVal);
    setValue("cep", masked, { shouldValidate: true });

    const cleanCEP = rawVal.replace(/\D/g, "");
    if (cleanCEP.length === 8) {
      setSearchingCEP(true);
      try {
        const address = await lookupAddressByCEP(cleanCEP);
        if (address.street) {
          setValue("street", address.street, { shouldValidate: true });
          setValue("neighborhood", address.neighborhood, { shouldValidate: true });
          setValue("city", address.city, { shouldValidate: true });
          setValue("state", address.state, { shouldValidate: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSearchingCEP(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left"
    >
      <h3 className="text-lg font-bold text-slate-950 my-0 pb-2 border-b border-slate-100">
        Endereço de Cobrança
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">CEP</label>
          <div className="relative">
            <input
              {...register("cep")}
              onChange={handleCEPChange}
              placeholder="00000-000"
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
            />
            {searchingCEP && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold animate-pulse">
                Buscando...
              </span>
            )}
          </div>
          {errors.cep && <p className="mt-1 text-xs text-red-650 my-0">{errors.cep.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">Logradouro / Rua</label>
          <input
            {...register("street")}
            placeholder="Ex: Avenida Visconde de Guarapuava"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.street && <p className="mt-1 text-xs text-red-655 my-0">{errors.street.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Número</label>
          <input
            {...register("number")}
            placeholder="123"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.number && <p className="mt-1 text-xs text-red-650 my-0">{errors.number.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">Complemento (Opcional)</label>
          <input
            {...register("complement")}
            placeholder="Ex: Apto 402, Bloco B"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Bairro</label>
          <input
            {...register("neighborhood")}
            placeholder="Batel"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.neighborhood && <p className="mt-1 text-xs text-red-650 my-0">{errors.neighborhood.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Cidade</label>
          <input
            {...register("city")}
            placeholder="Curitiba"
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition"
          />
          {errors.city && <p className="mt-1 text-xs text-red-650 my-0">{errors.city.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Estado (UF)</label>
          <input
            {...register("state")}
            placeholder="PR"
            maxLength={2}
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 transition uppercase"
          />
          {errors.state && <p className="mt-1 text-xs text-red-650 my-0">{errors.state.message}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition cursor-pointer"
        >
          Voltar
        </button>
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
