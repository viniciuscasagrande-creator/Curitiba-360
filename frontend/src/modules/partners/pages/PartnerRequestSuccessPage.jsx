import React from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  MailCheck,
} from "lucide-react";
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

export default function PartnerRequestSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const partnerId =
    location.state?.partnerId || "";

  const tradeName =
    location.state?.tradeName ||
    "Seu negócio";

  const email =
    location.state?.email || "";

  const hasRequestData =
    Boolean(location.state?.partnerId);

  const protocol = partnerId
    ? `C360-${partnerId
        .replace(/-/g, "")
        .slice(0, 10)
        .toUpperCase()}`
    : "C360-SOLICITACAO";

  function handleGoHome() {
    navigate("/", {
      replace: true,
    });
  }

  if (!hasRequestData) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <Building2
              size={30}
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-950">
            Cadastro de parceiro
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Para visualizar o protocolo, primeiro envie
            uma solicitação de cadastro.
          </p>

          <Link
            to="/cadastro-parceiro"
            className="mt-7 flex h-12 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 text-decoration-none"
          >
            Iniciar cadastro
          </Link>
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
          Curitiba 360 Parceiros
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Solicitação enviada
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          Recebemos o cadastro de{" "}
          <strong className="font-semibold text-slate-900">
            {tradeName}
          </strong>
          . Agora nossa equipe fará a análise das informações.
        </p>
      </div>

      <Card className="mt-8 p-5 bg-white border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <FileText
              size={22}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 my-0">
              Protocolo da solicitação
            </p>

            <p className="mt-1 break-all text-lg font-bold text-slate-950 my-0">
              {protocol}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Clock3
                size={14}
                aria-hidden="true"
              />

              Aguardando análise
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 space-y-4">
        <Card className="p-5 bg-white border border-slate-200 text-left">
          <div className="flex items-start gap-3">
            <MailCheck
              size={22}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />

            <div>
              <h2 className="font-semibold text-slate-955 my-0 text-sm">
                Confirmação por e-mail
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600 my-0">
                Enviaremos updates sobre o cadastro
                {email ? " para" : "."}
              </p>

              {email && (
                <p className="mt-1 break-all text-sm font-semibold text-slate-900 my-0">
                  {email}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border border-slate-200 text-left">
          <div className="flex items-start gap-3">
            <Building2
              size={22}
              className="mt-0.5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />

            <div>
              <h2 className="font-semibold text-slate-955 my-0 text-sm">
                Próximos passos
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600 my-0">
                Nossa equipe poderá solicitar documentos adicionais.
                Após a aprovação, o acesso ao painel do parceiro será
                liberado.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-7 space-y-3">
        <Button
          type="button"
          fullWidth
          size="lg"
          onClick={handleGoHome}
        >
          <Home
            size={18}
            aria-hidden="true"
          />

          Voltar para o início
        </Button>

        <Link
          to="/login"
          className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 text-decoration-none"
        >
          Acessar minha conta
        </Link>
      </div>

      <p className="mt-7 text-center text-xs leading-5 text-slate-500 my-0 select-none">
        Guarde o número do protocolo para acompanhar sua solicitação.
      </p>
    </AuthLayout>
  );
}
