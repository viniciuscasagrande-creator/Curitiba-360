import React from "react";
import {
  Accessibility,
  Bell,
  LoaderCircle,
  RotateCcw,
  Save,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useMemo,
} from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  preferenceCategories,
} from "../constants/preferenceCategories";

import {
  preferencesSchema,
} from "../schemas/preferencesSchema";

import PreferenceCategoryCard from "./PreferenceCategoryCard";
import PreferenceSwitch from "./PreferenceSwitch";

const defaultPreferences = {
  categories: [],

  notifications: {
    email: true,
    push: true,
    whatsapp: false,
    promotions: true,
    events: true,
  },

  accessibility: {
    reducedMotion: false,
    highContrast: false,
    largerText: false,
  },
};

export default function PreferencesForm({
  preferences,
  saving,
  onSubmit,
}) {
  const normalizedDefaults =
    useMemo(
      () => ({
        ...defaultPreferences,
        ...preferences,

        notifications: {
          ...defaultPreferences.notifications,
          ...preferences?.notifications,
        },

        accessibility: {
          ...defaultPreferences.accessibility,
          ...preferences?.accessibility,
        },
      }),
      [preferences]
    );

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(
      preferencesSchema
    ),
    defaultValues:
      normalizedDefaults,
  });

  useEffect(() => {
    reset(normalizedDefaults);
  }, [
    normalizedDefaults,
    reset,
  ]);

  const selectedCategories =
    watch("categories") || [];

  function toggleCategory(
    categoryId
  ) {
    const nextCategories =
      selectedCategories.includes(
        categoryId
      )
        ? selectedCategories.filter(
            (id) =>
              id !== categoryId
          )
        : [
            ...selectedCategories,
            categoryId,
          ];

    setValue(
      "categories",
      nextCategories,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  }

  async function submitForm(data) {
    await onSubmit(data);

    reset(data);
  }

  return (
    <form
      onSubmit={handleSubmit(
        submitForm
      )}
      className="space-y-6 select-none text-left"
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Sparkles size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-955 my-0">
              Seus interesses
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
              Escolha as categorias que deseja encontrar com mais facilidade.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500 my-0">
            {selectedCategories.length} categoria
            {selectedCategories.length ===
            1
              ? ""
              : "s"}{" "}
            selecionada
            {selectedCategories.length ===
            1
              ? ""
              : "s"}
          </p>

          {selectedCategories.length >
            0 && (
            <button
              type="button"
              onClick={() =>
                setValue(
                  "categories",
                  [],
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  }
                )
              }
              className="text-xs font-semibold text-emerald-700 hover:underline border-none bg-transparent cursor-pointer"
            >
              Limpar seleção
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {preferenceCategories.map(
            (category) => (
              <PreferenceCategoryCard
                key={category.id}
                category={category}
                selected={selectedCategories.includes(
                  category.id
                )}
                onToggle={
                  toggleCategory
                }
              />
            )
          )}
        </div>

        {errors.categories && (
          <p className="mt-3 text-sm font-medium text-red-600 my-0">
            {
              errors.categories
                .message
            }
          </p>
        )}
      </section>

      <section
        id="notificacoes"
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Bell size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-955 my-0">
              Notificações
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
              Defina como deseja receber novidades, alertas e promoções.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Controller
            name="notifications.email"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Notificações por e-mail"
                description="Receba novidades e atualizações importantes."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="notifications.push"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Notificações push"
                description="Receba alertas diretamente no navegador ou aplicativo."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="notifications.whatsapp"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Mensagens por WhatsApp"
                description="Receba confirmações e informações relevantes pelo WhatsApp."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="notifications.promotions"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Promoções e benefícios"
                description="Receba ofertas de parceiros e oportunidades especiais."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="notifications.events"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Lembretes de eventos"
                description="Receba lembretes sobre eventos salvos, comprados ou próximos."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
            <Accessibility size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-955 my-0">
              Acessibilidade
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 my-0">
              Ajuste a experiência da plataforma conforme suas necessidades.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <Controller
            name="accessibility.reducedMotion"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Reduzir animações"
                description="Diminui movimentos e transições da interface."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="accessibility.highContrast"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Alto contraste"
                description="Aumenta o contraste entre textos, botões e fundos."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />

          <Controller
            name="accessibility.largerText"
            control={control}
            render={({ field }) => (
              <PreferenceSwitch
                title="Texto ampliado"
                description="Aumenta o tamanho dos textos principais da plataforma."
                checked={field.value}
                onChange={
                  field.onChange
                }
              />
            )}
          />
        </div>
      </section>

      <div className="sticky bottom-20 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:bottom-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={
            saving || !isDirty
          }
          onClick={() =>
            reset(
              normalizedDefaults
            )
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw size={16} />
          Descartar
        </button>

        <button
          type="submit"
          disabled={
            saving || !isDirty
          }
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer border-none"
        >
          {saving ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
              Salvando...
            </>
          ) : (
            <>
              <Save size={17} />
              Salvar preferências
            </>
          )}
        </button>
      </div>
    </form>
  );
}
