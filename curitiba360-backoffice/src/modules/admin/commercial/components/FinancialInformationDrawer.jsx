import React, { useEffect, useMemo, useState } from 'react';
import {
  BadgePercent,
  Banknote,
  CalendarClock,
  DollarSign,
  Save,
  Trash2,
  WalletCards,
  X
} from 'lucide-react';

const emptyForm = {
  id: '',
  nickname: '',
  status: 'active',

  withdrawal: {
    enabled: true,
    percentageLimit: 10,
    amountLimit: 10000,
    minimumDays: 15
  },

  discounts: {
    pix: {
      enabled: true,
      value: 0.15
    },

    ted: {
      enabled: true,
      value: 0.15
    }
  }
};

function normalizeForm(item) {
  if (!item) {
    return emptyForm;
  }

  return {
    ...emptyForm,
    ...item,

    withdrawal: {
      ...emptyForm.withdrawal,
      ...(item.withdrawal || {})
    },

    discounts: {
      pix: {
        ...emptyForm.discounts.pix,
        ...(item.discounts?.pix || {})
      },

      ted: {
        ...emptyForm.discounts.ted,
        ...(item.discounts?.ted || {})
      }
    }
  };
}

export function FinancialInformationDrawer({
  open,
  item,
  onSave,
  onClose
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const editing = Boolean(item?.id);
  const withdrawalDisabled =
    !form.withdrawal.enabled;

  useEffect(() => {
    setForm(normalizeForm(item));
    setErrors({});
  }, [item, open]);

  const exampleWithdrawal = useMemo(() => {
    const simulatedBalance = 200000;

    if (!form.withdrawal.enabled) {
      return 0;
    }

    const percentageAmount =
      simulatedBalance *
      (Number(
        form.withdrawal.percentageLimit || 0
      ) /
        100);

    const amountLimit = Number(
      form.withdrawal.amountLimit || 0
    );

    if (!amountLimit) {
      return percentageAmount;
    }

    return Math.min(
      percentageAmount,
      amountLimit
    );
  }, [form.withdrawal]);

  if (!open) {
    return null;
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));

    setErrors((current) => ({
      ...current,
      [field]: ''
    }));
  }

  function updateWithdrawal(field, value) {
    setForm((current) => ({
      ...current,

      withdrawal: {
        ...current.withdrawal,
        [field]: value
      }
    }));

    setErrors((current) => ({
      ...current,
      [`withdrawal.${field}`]: ''
    }));
  }

  function updateDiscount(method, field, value) {
    setForm((current) => ({
      ...current,

      discounts: {
        ...current.discounts,

        [method]: {
          ...current.discounts[method],
          [field]: value
        }
      }
    }));

    setErrors((current) => ({
      ...current,
      [`discounts.${method}.${field}`]: ''
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.nickname.trim()) {
      nextErrors.nickname =
        'Informe o apelido da informação financeira.';
    }

    if (form.withdrawal.enabled) {
      const percentage = Number(
        form.withdrawal.percentageLimit
      );

      const amount = Number(
        form.withdrawal.amountLimit
      );

      const days = Number(
        form.withdrawal.minimumDays
      );

      if (
        Number.isNaN(percentage) ||
        percentage < 0 ||
        percentage > 100
      ) {
        nextErrors[
          'withdrawal.percentageLimit'
        ] =
          'Informe um percentual entre 0 e 100%.';
      }

      if (
        Number.isNaN(amount) ||
        amount < 0
      ) {
        nextErrors[
          'withdrawal.amountLimit'
        ] =
          'Informe um limite de saque válido.';
      }

      if (
        Number.isNaN(days) ||
        days < 0
      ) {
        nextErrors[
          'withdrawal.minimumDays'
        ] =
          'Informe um prazo válido.';
      }
    }

    ['pix', 'ted'].forEach((method) => {
      if (
        form.discounts[method].enabled
      ) {
        const value = Number(
          form.discounts[method].value
        );

        if (
          Number.isNaN(value) ||
          value < 0
        ) {
          nextErrors[
            `discounts.${method}.value`
          ] =
            'Informe um desconto válido.';
        }
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function submit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSave({
      ...form,

      withdrawal: {
        enabled:
          form.withdrawal.enabled,

        percentageLimit:
          form.withdrawal.enabled
            ? Number(
                form.withdrawal
                  .percentageLimit
              )
            : 0,

        amountLimit:
          form.withdrawal.enabled
            ? Number(
                form.withdrawal.amountLimit
              )
            : 0,

        minimumDays:
          form.withdrawal.enabled
            ? Number(
                form.withdrawal.minimumDays
              )
            : 0
      },

      discounts: {
        pix: {
          enabled:
            form.discounts.pix.enabled,

          value:
            form.discounts.pix.enabled
              ? Number(
                  form.discounts.pix.value
                )
              : 0
        },

        ted: {
          enabled:
            form.discounts.ted.enabled,

          value:
            form.discounts.ted.enabled
              ? Number(
                  form.discounts.ted.value
                )
              : 0
        }
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar formulário"
        className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-3xl flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              {editing
                ? 'Editar informação financeira'
                : 'Nova informação financeira'}
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Configure limites de saque, prazos e descontos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="hidden h-10 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 sm:inline-flex"
            >
              <Trash2 size={16} />
              Descartar
            </button>

            <button
              form="financial-information-form"
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-700"
            >
              <Save size={16} />
              Salvar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-500 hover:bg-slate-100 sm:hidden"
            >
              <X size={19} />
            </button>
          </div>
        </header>

        <form
          id="financial-information-form"
          onSubmit={submit}
          className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-7"
        >
          <FormSection
            title="Identificação"
            description="Informações principais desta configuração."
          >
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <ReadOnlyField
                label="ID da informação financeira"
                value={
                  form.id ||
                  'Gerado automaticamente'
                }
              />

              <TextField
                label="Apelido"
                helper="Nome da informação financeira"
                value={form.nickname}
                error={errors.nickname}
                placeholder="Padrão de saque"
                onChange={(value) =>
                  updateField('nickname', value)
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Liberação de saque"
            description="Defina se o parceiro poderá solicitar retirada de saldo."
          >
            <YesNoField
              label="Saque liberado"
              helper="Informe se o parceiro pode realizar o saque"
              value={form.withdrawal.enabled}
              onChange={(value) =>
                updateWithdrawal(
                  'enabled',
                  value
                )
              }
            />

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <NumberField
                label="Percentual liberado"
                helper="Percentual máximo do saldo disponível"
                value={
                  form.withdrawal
                    .percentageLimit
                }
                error={
                  errors[
                    'withdrawal.percentageLimit'
                  ]
                }
                icon={BadgePercent}
                suffix="%"
                min={0}
                max={100}
                disabled={withdrawalDisabled}
                onChange={(value) =>
                  updateWithdrawal(
                    'percentageLimit',
                    value
                  )
                }
              />

              <NumberField
                label="Valor máximo liberado"
                helper="Limite máximo permitido por saque"
                value={
                  form.withdrawal.amountLimit
                }
                error={
                  errors[
                    'withdrawal.amountLimit'
                  ]
                }
                icon={DollarSign}
                prefix="R$"
                disabled={withdrawalDisabled}
                onChange={(value) =>
                  updateWithdrawal(
                    'amountLimit',
                    value
                  )
                }
              />
            </div>

            <div className="mt-5 max-w-sm">
              <NumberField
                label="Tempo mínimo para saque"
                helper="Quantidade mínima de dias antes da liberação"
                value={
                  form.withdrawal.minimumDays
                }
                error={
                  errors[
                    'withdrawal.minimumDays'
                  ]
                }
                icon={CalendarClock}
                suffix="dias"
                step={1}
                disabled={withdrawalDisabled}
                onChange={(value) =>
                  updateWithdrawal(
                    'minimumDays',
                    value
                  )
                }
              />
            </div>

            {form.withdrawal.enabled && (
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-900">
                  Exemplo de cálculo
                </p>

                <p className="mt-2 text-xs leading-5 text-emerald-800 font-medium">
                  Para um saldo disponível de R$ 200.000,00,
                  o valor máximo liberado seria{' '}
                  <strong>
                    {formatCurrency(
                      exampleWithdrawal
                    )}
                  </strong>
                  . O sistema aplica o menor valor entre o
                  percentual e o limite máximo definido.
                </p>
              </div>
            )}
          </FormSection>

          <FormSection
            title="Desconto no PIX"
            description="Configure cobranças aplicadas em pagamentos ou repasses via PIX."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <YesNoField
                label="Descontar valor no PIX"
                helper="Informe se haverá desconto para PIX"
                value={
                  form.discounts.pix.enabled
                }
                onChange={(value) =>
                  updateDiscount(
                    'pix',
                    'enabled',
                    value
                  )
                }
              />

              <NumberField
                label="Desconto PIX"
                helper="Informe o valor do desconto"
                value={
                  form.discounts.pix.value
                }
                error={
                  errors[
                    'discounts.pix.value'
                  ]
                }
                icon={WalletCards}
                prefix="R$"
                disabled={
                  !form.discounts.pix.enabled
                }
                onChange={(value) =>
                  updateDiscount(
                    'pix',
                    'value',
                    value
                  )
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Desconto no TED"
            description="Configure cobranças aplicadas em transferências TED."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <YesNoField
                label="Descontar valor no TED"
                helper="Informe se haverá desconto para TED"
                value={
                  form.discounts.ted.enabled
                }
                onChange={(value) =>
                  updateDiscount(
                    'ted',
                    'enabled',
                    value
                  )
                }
              />

              <NumberField
                label="Desconto TED"
                helper="Informe o valor do desconto"
                value={
                  form.discounts.ted.value
                }
                error={
                  errors[
                    'discounts.ted.value'
                  ]
                }
                icon={Banknote}
                prefix="R$"
                disabled={
                  !form.discounts.ted.enabled
                }
                onChange={(value) =>
                  updateDiscount(
                    'ted',
                    'value',
                    value
                  )
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Status"
            description="Ative ou desative esta informação financeira."
          >
            <StatusSwitch
              active={form.status === 'active'}
              onChange={(active) =>
                updateField(
                  'status',
                  active
                    ? 'active'
                    : 'inactive'
                )
              }
            />
          </FormSection>
        </form>

        <footer className="flex gap-3 border-t border-slate-200 p-5 sm:hidden">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600"
          >
            Descartar
          </button>

          <button
            form="financial-information-form"
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white"
          >
            <Save size={17} />
            Salvar
          </button>
        </footer>
      </aside>
    </>
  );
}

function FormSection({
  title,
  description,
  children
}) {
  return (
    <section className="border-b border-slate-200 pb-7 last:border-0 last:pb-0">
      <div className="mb-5">
        <h3 className="text-sm font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 font-medium">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function TextField({
  label,
  helper,
  value,
  error,
  placeholder,
  onChange
}) {
  return (
    <label className="block">
      <FieldLabel
        label={label}
        helper={helper}
      />

      <input
        type="text"
        value={value}
        maxLength={120}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputClasses(error)}
      />

      <FieldError error={error} />
    </label>
  );
}

function NumberField({
  label,
  helper,
  value,
  error,
  prefix,
  suffix,
  icon: Icon,
  min = 0,
  max,
  step = 0.01,
  disabled = false,
  onChange
}) {
  return (
    <label className="block">
      <FieldLabel
        label={label}
        helper={helper}
      />

      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        {prefix && !Icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
            {prefix}
          </span>
        )}

        <input
          type="number"
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={[
            inputClasses(error),
            Icon || prefix
              ? 'pl-10'
              : '',
            suffix
              ? 'pr-14'
              : '',
            disabled
              ? 'cursor-not-allowed bg-slate-100 text-slate-400'
              : ''
          ].join(' ')}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-500">
            {suffix}
          </span>
        )}
      </span>

      <FieldError error={error} />
    </label>
  );
}

function YesNoField({
  label,
  helper,
  value,
  onChange
}) {
  return (
    <label className="block">
      <FieldLabel
        label={label}
        helper={helper}
      />

      <select
        value={value ? 'yes' : 'no'}
        onChange={(event) =>
          onChange(
            event.target.value === 'yes'
          )
        }
        className={`${inputClasses()} max-w-xs`}
      >
        <option value="yes">Sim</option>
        <option value="no">Não</option>
      </select>
    </label>
  );
}

function ReadOnlyField({
  label,
  value
}) {
  return (
    <label className="block">
      <FieldLabel label={label} />

      <input
        readOnly
        value={value}
        className={`${inputClasses()} bg-slate-100 text-slate-500 font-mono`}
      />
    </label>
  );
}

function StatusSwitch({
  active,
  onChange
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className="flex w-full max-w-md items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left"
    >
      <span>
        <strong className="block text-sm text-slate-800">
          {active
            ? 'Informação ativa'
            : 'Informação inativa'}
        </strong>

        <span className="mt-1 block text-xs text-slate-500 font-medium">
          {active
            ? 'Disponível para contratos e parceiros'
            : 'Indisponível para novos vínculos'}
        </span>
      </span>

      <span
        className={[
          'relative h-6 w-11 rounded-full transition',
          active
            ? 'bg-emerald-600'
            : 'bg-slate-300'
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-1 h-4 w-4 rounded-full bg-white shadow transition',
            active
              ? 'left-6'
              : 'left-1'
          ].join(' ')}
        />
      </span>
    </button>
  );
}

function FieldLabel({
  label,
  helper
}) {
  return (
    <span className="mb-2 block">
      <span className="block text-xs font-bold text-slate-700">
        {label}
      </span>

      {helper && (
        <span className="mt-1 block text-[11px] text-slate-400 font-medium">
          {helper}
        </span>
      )}
    </span>
  );
}

function FieldError({
  error
}) {
  if (!error) {
    return null;
  }

  return (
    <span className="mt-1 block text-[11px] font-semibold text-rose-600">
      {error}
    </span>
  );
}

function inputClasses(error) {
  return [
    'h-11 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition font-medium',
    error
      ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
      : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
  ].join(' ');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0));
}

export default FinancialInformationDrawer;
