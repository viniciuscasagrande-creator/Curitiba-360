import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import {
  AuthHeader,
  PasswordStrength,
} from "../../../components/auth";

import {
  Alert,
  Button,
  PasswordInput,
} from "../../../components/ui";

import { resetPasswordSchema } from "../schemas/authSchemas";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [requestError, setRequestError] = useState("");
  const [success, setSuccess] = useState(false);

  const resetCode = searchParams.get("oobCode") || "TEST_CODE"; // Default fallback to allow testing without oobCode

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const password =
    useWatch({
      control,
      name: "password",
    }) ?? "";

  async function onSubmit(data) {
    setRequestError("");

    try {
      if (!resetCode) {
        throw new Error(
          "Código de recuperação não encontrado."
        );
      }

      // Integração Firebase:
      // await confirmPasswordReset(
      //   auth,
      //   resetCode,
      //   data.password
      // );

      console.log("Nova senha definida:", {
        hasPassword: Boolean(data.password),
        resetCode,
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível redefinir a senha."
      );
    }
  }

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 select-none">
            <CheckCircle2
              size={46}
              className="text-emerald-700"
              aria-hidden="true"
            />
          </div>

          <AuthHeader
            align="center"
            className="mt-8"
            title="Senha redefinida"
            description="Sua nova senha foi cadastrada com sucesso. Agora você já pode acessar sua conta."
          />

          <Button
            fullWidth
            size="lg"
            onClick={() => navigate("/login")}
          >
            Entrar na minha conta
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        eyebrow="Recuperação de acesso"
        title="Crie uma nova senha"
        description="Escolha uma senha segura e diferente das utilizadas anteriormente."
      />

      <form
        noValidate
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {requestError && (
          <Alert
            variant="danger"
            title="Não foi possível redefinir a senha"
          >
            {requestError}
          </Alert>
        )}

        {!resetCode && (
          <Alert
            variant="warning"
            title="Link de recuperação inválido"
          >
            O código de redefinição não foi encontrado. Solicite
            um novo e-mail de recuperação.
          </Alert>
        )}

        <PasswordInput
          id="new-password"
          label="Nova senha"
          placeholder="Digite sua nova senha"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordStrength password={password} />

        <PasswordInput
          id="password-confirmation"
          label="Confirmar nova senha"
          placeholder="Digite novamente sua senha"
          autoComplete="new-password"
          error={errors.passwordConfirmation?.message}
          {...register("passwordConfirmation")}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
          disabled={!resetCode}
        >
          <KeyRound
            size={18}
            aria-hidden="true"
          />

          Redefinir senha
        </Button>
      </form>
    </AuthLayout>
  );
}
