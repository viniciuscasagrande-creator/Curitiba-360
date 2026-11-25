import { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../app/layouts/AuthLayout";
import {
  Alert,
  Button,
  Input,
} from "../../components/ui";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailError("Informe seu e-mail.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setEmailError("Informe um e-mail válido.");
      return false;
    }

    setEmailError("");
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setRequestError("");

    if (!validateEmail()) return;

    try {
      setLoading(true);

      // Firebase será conectado na etapa de integração.
      // await sendPasswordResetEmail(auth, email.trim());

      navigate("/recuperacao-enviada", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      console.error(error);

      setRequestError(
        "Não foi possível enviar as instruções. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <header className="mb-8">
        <p className="text-sm font-semibold text-emerald-700 select-none">
          Recuperação de acesso
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Esqueceu sua senha?
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Informe o e-mail cadastrado para receber as instruções de
          redefinição.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {requestError && (
          <Alert variant="danger" title="Falha no envio">
            {requestError}
          </Alert>
        )}

        <Input
          id="recovery-email"
          label="E-mail"
          type="email"
          icon={Mail}
          value={email}
          error={emailError}
          placeholder="seuemail@exemplo.com"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError("");
          }}
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
        >
          Enviar instruções
        </Button>
      </form>

      <div className="mt-8 text-center select-none">
        <Link
          to="/login"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        >
          Voltar para o login
        </Link>
      </div>
    </AuthLayout>
  );
}
