import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  UserRound,
} from "lucide-react";

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
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
  Alert,
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from "../../../components/ui";

import {
  PARTNER_CATEGORIES,
} from "../constants/partnerCategories";

import {
  partnerRegisterSchema,
} from "../schemas/partnerRegisterSchema";

import {
  registerPartner,
} from "../services/partnerService";

import {
  formatDocument,
  formatPhone,
  formatZipCode,
} from "../utils/partnerFormatters";

export default function PartnerRegisterPage() {
  const navigate = useNavigate();

  const [requestError, setRequestError] =
    useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      partnerRegisterSchema
    ),
    defaultValues: {
      responsibleName: "",
      responsibleEmail: "",
      responsiblePhone: "",

      companyName: "",
      tradeName: "",
      documentType: "cnpj",
      document: "",
      category: "",
      website: "",
      instagram: "",

      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "Curitiba",
      state: "PR",

      description: "",

      acceptCommercialTerms: false,
      acceptPrivacy: false,
    },
  });

  const documentType =
    useWatch({
      control,
      name: "documentType",
    }) || "cnpj";

  const description =
    useWatch({
      control,
      name: "description",
    }) || "";

  async function onSubmit(data) {
    setRequestError("");

    try {
      const partner =
        await registerPartner(data);

      navigate(
        "/cadastro-parceiro-enviado",
        {
          replace: true,
          state: {
            partnerId: partner.id,
            tradeName:
              partner.company.tradeName,
            email:
              partner.responsible.email,
          },
        }
      );
    } catch (error) {
      console.error(error);

      setRequestError(
        error.message ||
          "Não foi possível enviar o cadastro."
      );
    }
  }

  return (
    <AuthLayout
      contentClassName="max-w-3xl"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Building2
            size={32}
            aria-hidden="true"
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Curitiba 360 Parceiros
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          Cadastre seu negócio
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
          Divulgue sua empresa, atração,
          restaurante, evento ou experiência
          para visitantes e moradores de Curitiba.
        </p>
      </div>

      <form
        noValidate
        className="mt-8 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {requestError && (
          <Alert
            variant="danger"
            title="Não foi possível enviar"
          >
            {requestError}
          </Alert>
        )}

        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-950 text-left">
              Dados do responsável
            </h2>

            <p className="mt-1 text-sm text-slate-600 text-left">
              Informe quem será o contato
              principal do parceiro.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              id="partner-responsible-name"
              label="Nome completo"
              icon={UserRound}
              placeholder="Nome do responsável"
              error={
                errors.responsibleName?.message
              }
              {...register(
                "responsibleName"
              )}
            />

            <Input
              id="partner-responsible-email"
              type="email"
              label="E-mail"
              icon={Mail}
              placeholder="contato@empresa.com.br"
              autoComplete="email"
              error={
                errors.responsibleEmail
                  ?.message
              }
              {...register(
                "responsibleEmail"
              )}
            />

            <Controller
              name="responsiblePhone"
              control={control}
              render={({ field }) => (
                <Input
                  id="partner-responsible-phone"
                  type="tel"
                  label="Telefone"
                  icon={Phone}
                  placeholder="(41) 99999-9999"
                  inputMode="tel"
                  value={field.value}
                  error={
                    errors
                      .responsiblePhone
                      ?.message
                  }
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    field.onChange(
                      formatPhone(
                        event.target.value
                      )
                    );
                  }}
                />
              )}
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-slate-200 pt-8">
          <div>
            <h2 className="text-lg font-bold text-slate-950 text-left">
              Dados da empresa
            </h2>

            <p className="mt-1 text-sm text-slate-600 text-left">
              Essas informações serão analisadas
              pela equipe do Curitiba 360.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              id="partner-company-name"
              label="Razão social"
              icon={Building2}
              placeholder="Razão social"
              error={
                errors.companyName?.message
              }
              {...register("companyName")}
            />

            <Input
              id="partner-trade-name"
              label="Nome fantasia"
              icon={Building2}
              placeholder="Nome comercial"
              error={
                errors.tradeName?.message
              }
              {...register("tradeName")}
            />

            <Select
              id="partner-document-type"
              label="Tipo de documento"
              options={[
                {
                  value: "cnpj",
                  label: "CNPJ",
                },
                {
                  value: "cpf",
                  label: "CPF",
                },
              ]}
              error={
                errors.documentType?.message
              }
              {...register("documentType", {
                onChange: () => {
                  setValue("document", "");
                },
              })}
            />

            <Controller
              name="document"
              control={control}
              render={({ field }) => (
                <Input
                  id="partner-document"
                  label={
                    documentType === "cpf"
                      ? "CPF"
                      : "CNPJ"
                  }
                  placeholder={
                    documentType === "cpf"
                      ? "000.000.000-00"
                      : "00.000.000/0000-00"
                  }
                  inputMode="numeric"
                  value={field.value}
                  error={
                    errors.document?.message
                  }
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    field.onChange(
                      formatDocument(
                        event.target.value,
                        documentType
                      )
                    );
                  }}
                />
              )}
            />

            <Select
              id="partner-category"
              label="Categoria"
              options={PARTNER_CATEGORIES}
              error={
                errors.category?.message
              }
              {...register("category")}
            />

            <Input
              id="partner-website"
              label="Site"
              icon={Globe2}
              placeholder="https://suaempresa.com.br"
              error={
                errors.website?.message
              }
              {...register("website")}
            />

            <Input
              id="partner-instagram"
              label="Instagram"
              icon={Instagram}
              placeholder="@suaempresa"
              error={
                errors.instagram?.message
              }
              {...register("instagram")}
            />
          </div>

          <Textarea
            id="partner-description"
            label="Descrição do negócio"
            placeholder="Conte sobre sua empresa, seus serviços e os diferenciais oferecidos..."
            maxLength={1000}
            helperText={`${description.length}/1000 caracteres`}
            error={
              errors.description?.message
            }
            {...register("description")}
          />
        </section>

        <section className="space-y-5 border-t border-slate-200 pt-8">
          <div>
            <h2 className="text-lg font-bold text-slate-950 text-left">
              Endereço
            </h2>

            <p className="mt-1 text-sm text-slate-600 text-left">
              Informe o endereço principal
              do estabelecimento.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <Input
                  id="partner-zip-code"
                  label="CEP"
                  icon={MapPin}
                  placeholder="00000-000"
                  inputMode="numeric"
                  value={field.value}
                  error={
                    errors.zipCode?.message
                  }
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    field.onChange(
                      formatZipCode(
                        event.target.value
                      )
                    );
                  }}
                />
              )}
            />

            <Input
              id="partner-street"
              label="Rua"
              placeholder="Rua, avenida ou estrada"
              error={
                errors.street?.message
              }
              {...register("street")}
            />

            <Input
              id="partner-number"
              label="Número"
              placeholder="123"
              error={
                errors.number?.message
              }
              {...register("number")}
            />

            <Input
              id="partner-complement"
              label="Complemento"
              placeholder="Sala, bloco, andar..."
              error={
                errors.complement?.message
              }
              {...register("complement")}
            />

            <Input
              id="partner-neighborhood"
              label="Bairro"
              placeholder="Centro"
              error={
                errors.neighborhood?.message
              }
              {...register("neighborhood")}
            />

            <Input
              id="partner-city"
              label="Cidade"
              placeholder="Curitiba"
              error={
                errors.city?.message
              }
              {...register("city")}
            />

            <Input
              id="partner-state"
              label="UF"
              placeholder="PR"
              maxLength={2}
              error={
                errors.state?.message
              }
              {...register("state", {
                onChange: (event) => {
                  event.target.value =
                    event.target.value
                      .toUpperCase()
                      .replace(
                        /[^A-Z]/g,
                        ""
                      );
                },
              })}
            />
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-200 pt-8 text-left">
          <Controller
            name="acceptCommercialTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="partner-commercial-terms"
                checked={field.value}
                onChange={(event) =>
                  field.onChange(
                    event.target.checked
                  )
                }
                error={
                  errors
                    .acceptCommercialTerms
                    ?.message
                }
                label={
                  <span>
                    Li e aceito os{" "}
                    <Link
                      to="/termos-parceiros"
                      className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
                    >
                      termos comerciais
                    </Link>
                    .
                  </span>
                }
              />
            )}
          />

          <Controller
            name="acceptPrivacy"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="partner-privacy"
                checked={field.value}
                onChange={(event) =>
                  field.onChange(
                    event.target.checked
                  )
                }
                error={
                  errors.acceptPrivacy
                    ?.message
                }
                label={
                  <span>
                    Li e aceito a{" "}
                    <Link
                      to="/privacidade"
                      className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
                    >
                      política de privacidade
                    </Link>
                    .
                  </span>
                }
              />
            )}
          />
        </section>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
        >
          <Send
            size={18}
            aria-hidden="true"
          />

          Enviar cadastro para análise
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Já possui cadastro?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-700 hover:text-emerald-800 text-decoration-none"
        >
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
