import React, { useState, useEffect } from "react";
import { CheckCircle2, RefreshCw, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../../app/layouts/AuthLayout";
import { Alert, Button, Card } from "../../../components/ui";
import { useAuth } from "../hooks/useAuth";

export default function RegistrationEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, resendConfirmation, refreshUser } = useAuth();

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [requestError, setRequestError] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");

  const name = location.state?.name || user?.name || "";
  const email = location.state?.email || user?.email || "";

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [seconds]);

  async function handleCheckConfirmation() {
    setRequestError("");
    setChecking(true);
    try {
      const updatedUser = await refreshUser();
      if (!updatedUser?.emailVerified) {
        throw new Error(
          "Seu e-mail ainda não foi confirmado. Abra o link enviado e tente novamente."
        );
      }
      navigate("/cadastro-concluido", { replace: true });
    } catch (err) {
      console.error(err);
      setRequestError(err.message || "Seu e-mail ainda não foi confirmado.");
    } finally {
      setChecking(false);
    }
  }

  async function handleResendEmail() {
    setRequestError("");
    setRequestSuccess("");
    setResending(true);
    try {
      await resendConfirmation();
      setRequestSuccess("E-mail de confirmação reenviado com sucesso.");
      setSeconds(60);
    } catch (err) {
      console.error(err);
      setRequestError(err.message || "Não foi possível reenviar o e-mail.");
    } finally {
      setResending(false);
    }
  }

  async function handleChangeEmail() {
    try {
      await logout();
      navigate("/criar-conta", { replace: true });
    } catch (err) {
      console.error(err);
      setRequestError("Não foi possível trocar o e-mail.");
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 select-none">
            <Mail
              size={42}
              className="text-emerald-700"
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
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
              Clique no botão de confirmação enviado por e-mail. Confira também as pastas de spam, lixo eletrônico e promoções.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-4">
        {requestError && (
          <Alert variant="danger" title="Atenção">
            {requestError}
          </Alert>
        )}
        {requestSuccess && (
          <Alert variant="success" title="E-mail reenviado">
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
          <CheckCircle2 size={18} aria-hidden="true" />
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
          <RefreshCw size={18} aria-hidden="true" />
          {seconds > 0 ? `Reenviar em ${seconds}s` : "Reenviar e-mail"}
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
        <p className="margin-0 font-semibold text-slate-350">💡 Simule o fluxo de ativação:</p>
        <Button 
          onClick={() => {
            // Instantly verify the email in mock database
            const storedUser = localStorage.getItem("curitiba360:auth-user");
            if (storedUser) {
              const parsed = JSON.parse(storedUser);
              parsed.emailVerified = true;
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
