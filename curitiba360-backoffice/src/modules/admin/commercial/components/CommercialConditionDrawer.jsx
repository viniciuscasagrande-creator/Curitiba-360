import React, { useEffect, useState } from 'react';
import {
  BadgePercent,
  CheckCircle2,
  DollarSign,
  Save,
  Trash2,
  X
} from 'lucide-react';

const emptyCondition = {
  id: '',
  nickname: '',
  status: 'active',
  type: 'percentage',
  value: '',

  fees: {
    creditCash: '',
    creditInstallment: '',
    pix: '',
    anticipation: '',
    international: ''
  },

  paymentTermDays: 15
};

function normalizeCondition(condition) {
  if (!condition) {
    return emptyCondition;
  }

  return {
    ...emptyCondition,
    ...condition,

    fees: {
      ...emptyCondition.fees,
      ...(condition.fees || {})
    }
  };
}

export function CommercialConditionDrawer({
  open,
  condition,
  onSave,
  onClose
}) {
  const [form, setForm] = useState(emptyCondition);
  const [errors, setErrors] = useState({});

  const editing = Boolean(condition?.id);
  const percentageType = form.type === 'percentage';

  useEffect(() => {
    setForm(normalizeCondition(condition));
    setErrors({});
  }, [condition, open]);

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

  function updateFee(field, value) {
    setForm((current) => ({
      ...current,

      fees: {
        ...current.fees,
        [field]: value
      }
    }));

    setErrors((current) => ({
      ...current,
      [`fees.${field}`]: ''
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.nickname.trim()) {
      nextErrors.nickname = 'Informe o apelido da condição.';
    }

    const conditionValue = Number(form.value);

    if (
      form.value === '' ||
      Number.isNaN(conditionValue) ||
      conditionValue < 0
    ) {
      nextErrors.value = 'Informe um valor válido.';
    }

    if (percentageType && conditionValue > 100) {
      nextErrors.value =
        'A porcentagem não pode ser superior a 100%.';
    }

    const paymentTerm = Number(form.paymentTermDays);

    if (
      Number.isNaN(paymentTerm) ||
      paymentTerm < 0
    ) {
      nextErrors.paymentTermDays =
        'Informe um prazo válido.';
    }

    Object.entries(form.fees).forEach(([field, value]) => {
      const numericValue = Number(value);

      if (
        value === '' ||
        Number.isNaN(numericValue) ||
        numericValue < 0
      ) {
        nextErrors[`fees.${field}`] =
          'Informe uma taxa válida.';
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

      value: Number(form.value),

      paymentTermDays: Number(
        form.paymentTermDays
      ),

      fees: {
        creditCash: Number(form.fees.creditCash),
        creditInstallment: Number(
          form.fees.creditInstallment
        ),
        pix: Number(form.fees.pix),
        anticipation: Number(
          form.fees.anticipation
        ),
        international: Number(
          form.fees.international
        )
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
                ? 'Editar condição comercial'
                : 'Nova condição comercial'}
            </h2>

            <p className="mt-1 text-xs text-slate-500 font-medium">
              Preencha os campos obrigatórios para configurar
              taxas e prazos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="hidden h-10 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
            >
              <Trash2 size={16} />
              Descartar
            </button>

            <button
              form="commercial-condition-form"
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-2xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700"
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
          id="commercial-condition-form"
          onSubmit={submit}
          className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-7"
        >
          <FormSection
            title="Identificação"
            description="Informações principais da condição comercial."
          >
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <ReadOnlyField
                label="ID da condição comercial"
                value={
                  form.id ||
                  'Gerado automaticamente'
                }
              />

              <TextField
                label="Apelido"
                helper="Nome da condição comercial"
                value={form.nickname}
                error={errors.nickname}
                placeholder="Padrão 10%"
                onChange={(value) =>
                  updateField('nickname', value)
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Valor da condição"
            description="Defina se a condição será percentual ou valor fixo."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                label="Porcentagem ou valor"
                helper="Informe como a condição será calculada"
                value={form.type}
                onChange={(value) => {
                  updateField('type', value);
                  updateField('value', '');
                }}
                options={[
                  {
                    value: 'percentage',
                    label: 'Porcentagem'
                  },
                  {
                    value: 'fixed_value',
                    label: 'Valor fixo'
                  }
                ]}
              />

              <NumberField
                label={
                  percentageType
                    ? 'Porcentagem'
                    : 'Valor'
                }
                helper="Informe o valor da condição"
                value={form.value}
                error={errors.value}
                icon={
                  percentageType
                    ? BadgePercent
                    : DollarSign
                }
                suffix={
                  percentageType ? '%' : ''
                }
                prefix={
                  percentageType ? '' : 'R$'
                }
                max={
                  percentageType ? 100 : undefined
                }
                onChange={(value) =>
                  updateField('value', value)
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Taxas de pagamento"
            description="Configure as taxas aplicadas por método de pagamento."
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <NumberField
                label="Crédito à vista"
                helper="Taxa para crédito à vista"
                value={form.fees.creditCash}
                error={errors['fees.creditCash']}
                suffix="%"
                icon={BadgePercent}
                onChange={(value) =>
                  updateFee('creditCash', value)
                }
              />

              <NumberField
                label="Crédito parcelado"
                helper="Taxa para crédito parcelado"
                value={
                  form.fees.creditInstallment
                }
                error={
                  errors['fees.creditInstallment']
                }
                suffix="%"
                icon={BadgePercent}
                onChange={(value) =>
                  updateFee(
                    'creditInstallment',
                    value
                  )
                }
              />

              <NumberField
                label="PIX"
                helper="Taxa aplicada ao PIX"
                value={form.fees.pix}
                error={errors['fees.pix']}
                suffix="%"
                icon={BadgePercent}
                onChange={(value) =>
                  updateFee('pix', value)
                }
              />

              <NumberField
                label="Antecipação"
                helper="Taxa de antecipação"
                value={form.fees.anticipation}
                error={errors['fees.anticipation']}
                suffix="%"
                icon={BadgePercent}
                onChange={(value) =>
                  updateFee('anticipation', value)
                }
              />

              <NumberField
                label="Transação internacional"
                helper="Taxa para pagamentos internacionais"
                value={
                  form.fees.international
                }
                error={
                  errors['fees.international']
                }
                suffix="%"
                icon={BadgePercent}
                onChange={(value) =>
                  updateFee(
                    'international',
                    value
                  )
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Prazo para pagamento"
            description="Defina em quantos dias o pagamento será liberado."
          >
            <NumberField
              label="Prazo em dias"
              helper="Informe o prazo de pagamento"
              value={form.paymentTermDays}
              error={errors.paymentTermDays}
              min={0}
              step={1}
              className="max-w-xs"
              onChange={(value) =>
                updateField(
                  'paymentTermDays',
                  value
                )
              }
            />
          </FormSection>

          <FormSection
            title="Status"
            description="Ative ou desative a condição comercial."
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
            form="commercial-condition-form"
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
  className = '',
  disabled = false,
  onChange
}) {
  return (
    <label className={`block ${className}`}>
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

        {prefix && (
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
              ? 'pr-10'
              : '',
            disabled
              ? 'cursor-not-allowed bg-slate-100 text-slate-400'
              : ''
          ].join(' ')}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
            {suffix}
          </span>
        )}
      </span>

      <FieldError error={error} />
    </label>
  );
}

function SelectField({
  label,
  helper,
  value,
  options,
  onChange
}) {
  return (
    <label className="block">
      <FieldLabel
        label={label}
        helper={helper}
      />

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={inputClasses()}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
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
            ? 'Condição ativa'
            : 'Condição inativa'}
        </strong>

        <span className="mt-1 block text-xs text-slate-500 font-medium">
          {active
            ? 'Disponível para novos contratos'
            : 'Não disponível para novos contratos'}
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

export default CommercialConditionDrawer;
