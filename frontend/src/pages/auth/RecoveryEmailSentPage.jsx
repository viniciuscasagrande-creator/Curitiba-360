import {
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../app/layouts/AuthLayout";
import {
  Alert,
  Button,
  Card,
} from "../../components/ui";

export default function RecoveryEmailSentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const email =
    location.state?.email ?? "seu e-mail cadastrado";

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

          <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-700 select-none">
            <CheckCircle2
              size={20}
              className="text-white"
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Verifique seu e-mail
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Enviamos as instruções para redefinir sua senha para:
        </p>

        <Card
          padding="sm"
          shadow="none"
          className="mt-4 w-full bg-slate-50 border border-slate-200"
        >
          <p className="break-all text-sm font-semibold text-slate-955 my-0">
            {email}
          </p>
        </Card>

        <Alert variant="info" className="mt-6 text-left">
          A mensagem pode levar alguns minutos. Verifique também a caixa
          de spam ou lixo eletrônico.
        </Alert>

        <Button
          fullWidth
          size="lg"
          className="mt-8"
          onClick={() => navigate("/login")}
        >
          Voltar para o login
        </Button>

        <Link
          to="/esqueci-minha-senha"
          className="mt-5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none select-none"
        >
          Reenviar e-mail
        </Link>
      </div>
    </AuthLayout>
  );
}
