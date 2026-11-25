import React from "react";
import { CheckCircle2, Compass, UserRound } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import {
  Button,
  Card,
} from "../../../components/ui";

import { useAuth } from "../hooks/useAuth";

export default function RegisterSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const name =
    location.state?.name ||
    user?.name ||
    user?.displayName ||
    "Usuário";

  const email =
    location.state?.email ||
    user?.email ||
    "";

  const cameFromRegistration =
    location.state?.fromRegistration === true;

  function handleContinue() {
    navigate("/dashboard", {
      replace: true,
    });
  }

  async function handleLogout() {
    await logout();
    navigate("/login", {
      replace: true,
    });
  }

  if (!cameFromRegistration) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2
              size={32}
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-950">
            Sua conta está ativa
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Seu cadastro já está concluído.
            Continue para acessar o Curitiba 360.
          </p>

          <Button
            type="button"
            fullWidth
            size="lg"
            className="mt-7"
            onClick={handleContinue}
          >
            Ir para o dashboard
          </Button>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-700 border-none bg-transparent cursor-pointer"
          >
            Sair e acessar outra conta
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <CheckCircle2
            size={42}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Curitiba 360
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Cadastro concluído
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          Sua conta foi confirmada com sucesso.
          Agora você já pode explorar todos os recursos
          do Curitiba 360.
        </p>
      </div>

      <Card className="mt-8 p-5 bg-white border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <UserRound
              size={22}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 my-0">
              Conta criada
            </p>

            <h2 className="mt-1 truncate font-semibold text-slate-950 my-0">
              {name}
            </h2>

            {email && (
              <p className="mt-1 break-all text-sm text-slate-600 my-0">
                {email}
              </p>
            )}

            <div className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              E-mail confirmado
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          fullWidth
          size="lg"
          onClick={handleContinue}
        >
          <Compass
            size={18}
            aria-hidden="true"
          />

          Explorar Curitiba
        </Button>

        <Link
          to="/perfil"
          className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 text-decoration-none"
        >
          Completar meu perfil
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-700 border-none bg-transparent cursor-pointer"
        >
          Sair e acessar outra conta
        </button>
      </div>

      <p className="mt-7 text-center text-sm leading-6 text-slate-600 my-0 select-none">
        Você poderá salvar lugares favoritos,
        organizar roteiros e acompanhar suas atividades.
      </p>
    </AuthLayout>
  );
}
