import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { maskCep } from "../utils/masks";

export default function AddressForm({ register, errors, setValue, watch, onLookupCep }) {
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const cepValue = watch("address.zipCode") || "";

  const handleCepChange = async (e) => {
    const masked = maskCep(e.target.value);
    setValue("address.zipCode", masked, { shouldDirty: true, shouldValidate: true });

    const clean = masked.replace(/\D/g, "");
    if (clean.length === 8) {
      setIsSearchingCep(true);
      const address = await onLookupCep(clean);
      setIsSearchingCep(false);
      if (address) {
        setValue("address.street", address.street, { shouldDirty: true, shouldValidate: true });
        setValue("address.neighborhood", address.neighborhood, { shouldDirty: true, shouldValidate: true });
        setValue("address.city", address.city, { shouldDirty: true, shouldValidate: true });
        setValue("address.state", address.state, { shouldDirty: true, shouldValidate: true });
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
        Endereço Residencial
      </h2>

      <div className="grid gap-4 sm:grid-cols-6">
        {/* CEP */}
        <div className="flex flex-col gap-1.5 sm:col-span-2 relative">
          <label htmlFor="address.zipCode" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            CEP
          </label>
          <div className="relative">
            <input
              id="address.zipCode"
              type="text"
              className={[
                "h-11 w-full rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none pr-10",
                errors.address?.zipCode ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
              ].join(" ")}
              placeholder="00000-000"
              value={cepValue}
              onChange={handleCepChange}
            />
            {isSearchingCep && (
              <span className="absolute right-3 top-3">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              </span>
            )}
          </div>
          {errors.address?.zipCode && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.zipCode.message}
            </span>
          )}
        </div>

        {/* Rua */}
        <div className="flex flex-col gap-1.5 sm:col-span-4">
          <label htmlFor="address.street" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Logradouro (Rua, Avenida...)
          </label>
          <input
            id="address.street"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.address?.street ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Nome da rua"
            {...register("address.street")}
          />
          {errors.address?.street && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.street.message}
            </span>
          )}
        </div>

        {/* Número */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="address.number" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Número
          </label>
          <input
            id="address.number"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.address?.number ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Ex: 123"
            {...register("address.number")}
          />
          {errors.address?.number && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.number.message}
            </span>
          )}
        </div>

        {/* Complemento */}
        <div className="flex flex-col gap-1.5 sm:col-span-4">
          <label htmlFor="address.complement" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Complemento
          </label>
          <input
            id="address.complement"
            type="text"
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm transition focus:border-emerald-700 focus:outline-none"
            placeholder="Apto, Bloco, Fundos..."
            {...register("address.complement")}
          />
        </div>

        {/* Bairro */}
        <div className="flex flex-col gap-1.5 sm:col-span-3">
          <label htmlFor="address.neighborhood" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Bairro
          </label>
          <input
            id="address.neighborhood"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.address?.neighborhood ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Bairro"
            {...register("address.neighborhood")}
          />
          {errors.address?.neighborhood && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.neighborhood.message}
            </span>
          )}
        </div>

        {/* Cidade */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="address.city" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Cidade
          </label>
          <input
            id="address.city"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.address?.city ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Cidade"
            {...register("address.city")}
          />
          {errors.address?.city && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.city.message}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-1.5 sm:col-span-1">
          <label htmlFor="address.state" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            UF
          </label>
          <input
            id="address.state"
            type="text"
            maxLength={2}
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none uppercase",
              errors.address?.state ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="PR"
            {...register("address.state")}
          />
          {errors.address?.state && (
            <span className="text-xs font-semibold text-red-600">
              {errors.address.state.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
