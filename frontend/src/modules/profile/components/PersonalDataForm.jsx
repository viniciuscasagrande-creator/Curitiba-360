import React from "react";
import { maskPhone, maskCpf } from "../utils/masks";

export default function PersonalDataForm({ register, errors, setValue, watch, isCpfLocked = false }) {
  const phoneValue = watch("phone") || "";
  const cpfValue = watch("cpf") || "";

  const handlePhoneInput = (e) => {
    const masked = maskPhone(e.target.value);
    setValue("phone", masked, { shouldDirty: true, shouldValidate: true });
  };

  const handleCpfInput = (e) => {
    const masked = maskCpf(e.target.value);
    setValue("cpf", masked, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
        Informações Pessoais
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Nome */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.name ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Seu nome completo"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs font-semibold text-red-600">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email - Somente Leitura */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            E-mail (Somente Leitura)
          </label>
          <input
            id="email"
            type="email"
            readOnly
            disabled
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 cursor-not-allowed outline-none"
            {...register("email")}
          />
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Telefone
          </label>
          <input
            id="phone"
            type="text"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.phone ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="(41) 99999-9999"
            value={phoneValue}
            onChange={handlePhoneInput}
          />
          {errors.phone && (
            <span className="text-xs font-semibold text-red-600">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* CPF */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cpf" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            CPF
          </label>
          <input
            id="cpf"
            type="text"
            disabled={isCpfLocked}
            readOnly={isCpfLocked}
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              isCpfLocked ? "bg-slate-50 text-slate-500 cursor-not-allowed" : "",
              errors.cpf ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="000.000.000-00"
            value={cpfValue}
            onChange={handleCpfInput}
          />
          {errors.cpf && (
            <span className="text-xs font-semibold text-red-600">
              {errors.cpf.message}
            </span>
          )}
        </div>

        {/* Data de Nascimento */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="birthDate" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Data de Nascimento
          </label>
          <input
            id="birthDate"
            type="date"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.birthDate ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            {...register("birthDate")}
          />
          {errors.birthDate && (
            <span className="text-xs font-semibold text-red-600">
              {errors.birthDate.message}
            </span>
          )}
        </div>

        {/* Gênero */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gender" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Gênero
          </label>
          <select
            id="gender"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.gender ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            {...register("gender")}
          >
            <option value="">Selecione...</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro / Prefiro não dizer</option>
          </select>
          {errors.gender && (
            <span className="text-xs font-semibold text-red-600">
              {errors.gender.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
