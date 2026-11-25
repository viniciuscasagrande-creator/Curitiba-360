import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordField from "../../components/auth/PasswordField";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Informe seu e-mail.";
    }

    if (!form.password) {
      nextErrors.password = "Informe sua senha.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // Simulated success login redirecting to /dashboard
      const mockUser = {
        name: 'João da Silva',
        email: form.email,
        phone: '(41) 99999-9999',
        cpf: '123.456.789-00',
        role: 'Turista'
      };
      localStorage.setItem('@Curitiba360Public:user', JSON.stringify(mockUser));
      navigate("/dashboard");
    } catch {
      setErrors({
        form: "Não foi possível entrar. Verifique seus dados.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold text-emerald-700">
          Curitiba 360
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Bem-vindo!
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Ainda não possui uma conta?{" "}
          <Link
            to="/criar-conta"
            className="font-semibold text-emerald-700"
          >
            Criar conta
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-800"
          >
            E-mail
          </label>

          <div
            className={`flex h-12 items-center rounded-xl border px-3 ${
              errors.email
                ? "border-red-500"
                : "border-slate-300 focus-within:border-emerald-700"
            }`}
          >
            <Mail size={19} className="mr-3 text-slate-400" />

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="seuemail@exemplo.com"
              className="h-full flex-1 bg-transparent text-sm outline-none"
            />
          </div>

          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <PasswordField
          value={form.password}
          onChange={(event) =>
            updateField("password", event.target.value)
          }
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600 select-none">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(event) =>
                updateField("remember", event.target.checked)
              }
              className="accent-emerald-700"
            />

            Lembrar-me
          </label>

          <Link
            to="/esqueci-minha-senha"
            className="text-sm font-semibold text-emerald-700 font-sans"
          >
            Esqueci minha senha
          </Link>
        </div>

        {errors.form && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-emerald-700 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 cursor-pointer border-none"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="flex items-center gap-3 select-none">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400 font-bold">OU</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          type="button"
          onClick={() => {
            const mockUser = {
              name: 'João da Silva',
              email: 'joao.silva@gmail.com',
              phone: '(41) 99999-9999',
              cpf: '123.456.789-00',
              role: 'Turista'
            };
            localStorage.setItem('@Curitiba360Public:user', JSON.stringify(mockUser));
            navigate("/dashboard");
          }}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Entrar com Google
        </button>
      </form>
    </AuthLayout>
  );
}
