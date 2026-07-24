import { useState } from 'react';
import {
  BadgePercent,
  CreditCard,
  Save,
} from 'lucide-react';

const INITIAL_FORM = {
  nickname: 'Padrão 10%',
  calculationType: 'percentage',
  value: 10,
  creditCashFee: 1.5,
  creditInstallmentFee: 1.5,
  pixFee: 1.5,
  anticipationFee: 1.5,
  internationalFee: 1.5,
  administrativeFee: 2.5,
  paymentTermDays: 15,
  maxInstallments: 12,
  status: 'active',
};

export default function AttractionCommercialConditionsPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [saved, setSaved] = useState(false);

  function updateField(field, value) {
    setSaved(false);

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
          <BadgePercent size={15} />
          Negociação financeira
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Condições comerciais
        </h1>

        <p className="mb-6 mt-2 text-sm text-slate-500">
          Configure taxas, prazos e regras comerciais do
          contrato.
        </p>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="space-y-8 p-6">
            <FormSection title="Condição principal">
              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Apelido">
                  <input
                    value={form.nickname}
                    onChange={(event) =>
                      updateField(
                        'nickname',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Tipo da condição">
                  <select
                    value={form.calculationType}
                    onChange={(event) =>
                      updateField(
                        'calculationType',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  >
                    <option value="percentage">
                      Porcentagem
                    </option>

                    <option value="fixed">
                      Valor fixo
                    </option>
                  </select>
                </Field>

                <NumberField
                  label="Valor principal"
                  value={form.value}
                  suffix={
                    form.calculationType ===
                    'percentage'
                      ? '%'
                      : 'R$'
                  }
                  onChange={(value) =>
                    updateField('value', value)
                  }
                />
              </div>
            </FormSection>

            <FormSection title="Taxas de pagamento">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <NumberField
                  label="Crédito à vista"
                  value={form.creditCashFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      'creditCashFee',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Crédito parcelado"
                  value={form.creditInstallmentFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      'creditInstallmentFee',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Pix"
                  value={form.pixFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField('pixFee', value)
                  }
                />

                <NumberField
                  label="Antecipação"
                  value={form.anticipationFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      'anticipationFee',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Transação internacional"
                  value={form.internationalFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      'internationalFee',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Taxa administrativa"
                  value={form.administrativeFee}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      'administrativeFee',
                      value,
                    )
                  }
                />
              </div>
            </FormSection>

            <FormSection title="Pagamento e parcelamento">
              <div className="grid gap-5 md:grid-cols-3">
                <NumberField
                  label="Prazo para pagamento"
                  value={form.paymentTermDays}
                  suffix="dias"
                  onChange={(value) =>
                    updateField(
                      'paymentTermDays',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Máximo de parcelas"
                  value={form.maxInstallments}
                  onChange={(value) =>
                    updateField(
                      'maxInstallments',
                      value,
                    )
                  }
                />

                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        'status',
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  >
                    <option value="active">Ativa</option>
                    <option value="inactive">
                      Inativa
                    </option>
                  </select>
                </Field>
              </div>
            </FormSection>
          </div>

          <FormFooter saved={saved} />
        </form>
      </main>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <CreditCard size={18} />
        </span>

        <h2 className="text-lg font-black text-slate-900">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-xs font-black text-slate-700">
        {label}
      </span>

      {children}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
}) {
  return (
    <Field label={label}>
      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className={`${inputClass} pr-14`}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </Field>
  );
}

function FormFooter({ saved }) {
  return (
    <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-5">
      <span className="text-xs font-bold text-emerald-700">
        {saved
          ? 'Condições salvas com sucesso.'
          : 'Alterações ainda não salvas.'}
      </span>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
      >
        <Save size={17} />
        Salvar
      </button>
    </footer>
  );
}

const inputClass =
  'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500';
