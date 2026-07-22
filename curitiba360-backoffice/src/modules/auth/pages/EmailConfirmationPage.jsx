import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import {
  Alert,
  Button,
  Card,
} from "../../../components/ui";

import { useAuth } from "../hooks/useAuth";

const RESEND_SECONDS = 60;

export default function EmailConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    logout,
    resendConfirmation,
    refreshUser,
  } = useAuth();

  const [seconds, setSeconds] = useState(
    RESEND_SECONDS
  );

  const [resending, setResending] =
    useState(false);

  const [checking, setChecking] =
    useState(false);

  const [requestError, setRequestError] =
    useState("");

  const [requestSuccess, setRequestSuccess] =
    useState("");

  const email = useMemo(() => {
    return (
      location.state?.email ||
      user?.email ||
      ""
    );
  }, [
    location.state?.email,
    user?.email,
  ]);

  const name = useMemo(() => {
    return (
      location.state?.name ||
      user?.name ||
      user?.displayName ||
      ""
    );
  }, [
    location.state?.name,
    user?.name,
    user?.displayName,
  ]);

  useEffect(() => {
    if (seconds <= 0) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSeconds((currentSeconds) =>
        Math.max(currentSeconds - 1, 0)
      );
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [seconds]);

  async function handleResendEmail() {
    if (seconds > 0 || resending) {
      return;
    }

    setRequestError("");
    setRequestSuccess("");
    setResending(true);

    try {
      await resendConfirmation();

      await new Promise((resolve) =>
        window.setTimeout(resolve, 700)
      );

      setRequestSuccess(
        "Enviamos um novo link de confirmação para o seu e-mail."
      );

      setSeconds(RESEND_SECONDS);
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível reenviar o e-mail."
      );
    } finally {
      setResending(false);
    }
  }

  async function handleCheckConfirmation() {
    setRequestError("");
    setRequestSuccess("");
    setChecking(true);

    try {
      const updatedUser = await refreshUser();

      await new Promise((resolve) =>
        window.setTimeout(resolve, 700)
      );

      if (!updatedUser?.emailVerified) {
        throw new Error(
          "Seu e-mail ainda não foi confirmado. Abra o link enviado e tente novamente."
        );
      }

      navigate("/cadastro-concluido", {
        replace: true,
        state: {
          email: updatedUser?.email || email,
          name: updatedUser?.name || updatedUser?.displayName || name,
          fromRegistration: true,
        },
      });
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível verificar sua conta."
      );
    } finally {
      setChecking(false);
    }
  }

  async function handleChangeEmail() {
    await logout();

    navigate("/criar-conta", {
      replace: true,
      state: {
        email,
      },
    });
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <MailCheck
            size={32}
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Curitiba 360
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Confirme seu e-mail
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          {name
            ? `${name}, enviamos um link de confirmação para`
            : "Enviamos um link de confirmação para"}
        </p>

        <p className="mt-1 break-all font-semibold text-slate-900">
          {email || "seu e-mail"}
        </p>
      </div>

      <Card className="mt-8 p-5 bg-white border border-slate-200">
        <div className="flex items-start gap-3">
          <CheckCircle2
            size={22}
            className="mt-0.5 shrink-0 text-emerald-700"
            aria-hidden="true"
          />

          <div>
            <h2 className="font-semibold text-slate-900">
              Verifique sua caixa de entrada
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Clique no botão de confirmação enviado
              por e-mail. Confira também as pastas de
              spam, lixo eletrônico e promoções.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-4">
        {requestError && (
          <Alert
            variant="danger"
            title="Atenção"
          >
            {requestError}
          </Alert>
        )}

        {requestSuccess && (
          <Alert
            variant="success"
            title="E-mail reenviado"
          >
            {requestSuccess}
          </Alert>
        )}

        <Button
          type="button"
          fullWidth
          size="lg"
          loading={checking}
          onClick={handleCheckConfirmation}
        >
          <CheckCircle2
            size={18}
            aria-hidden="true"
          />

          Já confirmei meu e-mail
        </Button>

        <Button
          type="button"
          fullWidth
          variant="secondary"
          disabled={seconds > 0}
          loading={resending}
          onClick={handleResendEmail}
        >
          <RefreshCw
            size={18}
            aria-hidden="true"
          />

          {seconds > 0
            ? `Reenviar em ${seconds}s`
            : "Reenviar e-mail"}
        </Button>
      </div>

      <div className="mt-7 space-y-3 text-center text-sm">
        <button
          type="button"
          onClick={handleChangeEmail}
          className="font-semibold text-emerald-700 hover:text-emerald-800 border-none bg-transparent cursor-pointer p-0 underline"
        >
          Cadastrar outro e-mail
        </button>

        <p className="text-slate-600 my-0 select-none">
          Já confirmou e deseja entrar?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
          >
            Acessar minha conta
          </Link>
        </p>
      </div>
      
      {/* Simulation Box for sandbox testing */}
      <div className="mt-8 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 leading-relaxed text-left space-y-3">
        <p className="margin-0 font-semibold text-slate-300">💡 Simule o fluxo de ativação:</p>
        <Button 
          onClick={() => {
            const storedUser = localStorage.getItem("curitiba360:auth-user");
            if (storedUser) {
              const parsed = JSON.parse(storedUser);
              parsed.emailVerified = true;
              parsed.status = "active";
              localStorage.setItem("curitiba360:auth-user", JSON.stringify(parsed));
            }
            navigate(`/portal/email-confirmacao?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
          }}
          variant="secondary"
          size="sm"
          fullWidth
        >
          📥 Abrir Caixa de Entrada Mock (Verifica E-mail)
        </Button>
      </div>
    </AuthLayout>
  );
}
