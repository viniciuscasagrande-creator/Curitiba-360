import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordField({
  value,
  onChange,
  error,
  label = "Senha",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-800">{label}</label>

      <div
        className={`flex h-12 items-center rounded-xl border px-3 ${
          error
            ? "border-red-500"
            : "border-slate-300 focus-within:border-emerald-700"
        }`}
      >
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Digite sua senha"
          className="h-full flex-1 bg-transparent text-sm outline-none"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Ocultar senha" : "Exibir senha"}
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
