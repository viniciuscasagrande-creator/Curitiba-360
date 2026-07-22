import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import {
  Controller,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../../../app/layouts/AuthLayout";

import {
  AuthDivider,
  AuthHeader,
  PasswordStrength,
  SocialLoginButton,
  TermsCheckbox,
} from "../../../components/auth";

import {
  Alert,
  Button,
  Input,
  PasswordInput,
} from "../../../components/ui";

import { registerSchema } from "../schemas/authSchemas";
import { useAuth } from "../hooks/useAuth";
import { formatPhone } from "../../../utils/formatPhone";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register: registerUser,
    loginGoogle,
  } = useAuth();

  const [requestError, setRequestError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      acceptTerms: false,
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
      const user = await registerUser(data);

      navigate("/confirmacao-enviada", {
        replace: true,
        state: {
          email: user.email,
          name: user.name ?? data.name,
        },
      });
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível criar sua conta. Tente novamente."
      );
    }
  }

  async function handleGoogleRegister() {
    setRequestError("");
    setGoogleLoading(true);

    try {
      await loginGoogle();

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível continuar com o Google."
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthHeader
        eyebrow="Curitiba 360"
        title="Crie sua conta"
        description="Cadastre-se para salvar favoritos, organizar passeios e aproveitar todos os recursos da plataforma."
      />

      <form
        noValidate
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {requestError && (
          <Alert
            variant="danger"
            title="Não foi possível criar a conta"
          >
            {requestError}
          </Alert>
        )}

        <Input
          id="register-name"
          type="text"
          label="Nome completo"
          icon={UserRound}
          placeholder="Digite seu nome completo"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="register-email"
          type="email"
          label="E-mail"
          icon={Mail}
          placeholder="seuemail@exemplo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              id="register-phone"
              type="tel"
              label="Telefone"
              icon={Phone}
              placeholder="(41) 99999-9999"
              autoComplete="tel"
              inputMode="tel"
              value={field.value}
              error={errors.phone?.message}
              onBlur={field.onBlur}
              onChange={(event) => {
                field.onChange(
                  formatPhone(event.target.value)
                );
              }}
            />
          )}
        />

        <PasswordInput
          id="register-password"
          label="Senha"
          placeholder="Crie uma senha segura"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordStrength password={password} />

        <PasswordInput
          id="register-password-confirmation"
          label="Confirmar senha"
          placeholder="Digite sua senha novamente"
          autoComplete="new-password"
          error={errors.passwordConfirmation?.message}
          {...register("passwordConfirmation")}
        />

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <TermsCheckbox
              id="register-terms"
              checked={field.value}
              onChange={(event) =>
                field.onChange(event.target.checked)
              }
              error={errors.acceptTerms?.message}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
        >
          <UserRoundPlus
            size={18}
            aria-hidden="true"
          />

          Criar minha conta
        </Button>
      </form>

      <AuthDivider className="my-7" />

      <SocialLoginButton
        provider="google"
        loading={googleLoading}
        onClick={handleGoogleRegister}
      />

      <p className="mt-8 text-center text-sm text-slate-600 my-0 select-none">
        Já possui uma conta?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        >
          Entrar
        </Link>
      </p>

      <p className="mt-4 text-center text-sm text-slate-600 my-0 select-none">
        Deseja cadastrar sua empresa?{" "}
        <Link
          to="/cadastro-parceiro"
          className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        >
          Seja um parceiro
        </Link>
      </p>
    </AuthLayout>
  );
}
