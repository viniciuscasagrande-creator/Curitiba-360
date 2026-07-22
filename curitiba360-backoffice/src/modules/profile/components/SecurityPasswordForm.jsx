import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, KeyRound } from "lucide-react";
import { securitySchema } from "../schemas/securitySchema";
import PasswordStrength from "./PasswordStrength";

export default function SecurityPasswordForm({ onSave, saving }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword") || "";

  const onSubmit = async (data) => {
    try {
      await onSave(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm select-none text-left">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <KeyRound size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-905 my-0">
            Alterar Senha
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
            Crie uma senha forte contendo maiúsculas, números e caracteres especiais.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        {/* Senha Atual */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Senha Atual
          </label>
          <input
            id="currentPassword"
            type="password"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.currentPassword ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Sua senha atual"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <span className="text-xs font-semibold text-red-600">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        {/* Nova Senha */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Nova Senha
          </label>
          <input
            id="newPassword"
            type="password"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.newPassword ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Mínimo 8 caracteres"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-xs font-semibold text-red-600">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        {/* Força da Senha */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4">
          <PasswordStrength password={newPasswordValue} />
        </div>

        {/* Confirmar Nova Senha */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Confirmar Nova Senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={[
              "h-11 rounded-xl border px-3 text-sm transition focus:border-emerald-700 focus:outline-none",
              errors.confirmPassword ? "border-red-300 bg-red-50/25 focus:border-red-500" : "border-slate-200 bg-white"
            ].join(" ")}
            placeholder="Repita a nova senha"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-xs font-semibold text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Botão Submeter */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!isDirty || saving}
            className={[
              "h-11 px-6 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2 border-none w-full sm:w-auto",
              (!isDirty || saving)
                ? "bg-slate-300 cursor-not-allowed text-slate-500"
                : "bg-emerald-700 hover:bg-emerald-800 cursor-pointer"
            ].join(" ")}
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {saving ? "Salvando..." : "Atualizar senha"}
          </button>
        </div>
      </form>
    </section>
  );
}
