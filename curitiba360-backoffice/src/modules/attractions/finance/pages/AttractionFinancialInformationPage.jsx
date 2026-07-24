import { useState } from 'react';
import {
  Banknote,
  Save,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_FORM = {
  nickname: 'Padrão 10%',
  withdrawalEnabled: true,
  withdrawalPercentage: 10,
  withdrawalLimit: 10000,
  minimumWithdrawalDays: 15,
  pixDiscountEnabled: true,
  pixDiscountValue: 0.15,
  tedDiscountEnabled: true,
  tedDiscountValue: 0.15,
  requireBankValidation: true,
  status: 'active',
};

export default function AttractionFinancialInformationPage() {
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
          <Banknote size={15} />
          Negociação financeira
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Informações financeiras
        </h1>

        <p className="mb-6 mt-2 text-sm text-slate-500">
          Defina regras de saque, limites e custos de
          transferência.
        </p>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="space-y-8 p-6">
            <Section
              title="Identificação"
              icon={ShieldCheck}
            >
              <div className="grid gap-5 md:grid-cols-2">
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
            </Section>

            <Section
              title="Regras de saque"
              icon={Banknote}
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <BooleanField
                  label="Liberado para saque"
                  value={form.withdrawalEnabled}
                  onChange={(value) =>
                    updateField(
                      'withdrawalEnabled',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Percentual liberado"
                  value={form.withdrawalPercentage}
                  suffix="%"
                  disabled={!form.withdrawalEnabled}
                  onChange={(value) =>
                    updateField(
                      'withdrawalPercentage',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Valor liberado"
                  value={form.withdrawalLimit}
                  prefix="R$"
                  disabled={!form.withdrawalEnabled}
                  onChange={(value) =>
                    updateField(
                      'withdrawalLimit',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Tempo mínimo"
                  value={form.minimumWithdrawalDays}
                  suffix="dias"
                  disabled={!form.withdrawalEnabled}
                  onChange={(value) =>
                    updateField(
                      'minimumWithdrawalDays',
                      value,
                    )
                  }
                />
              </div>
            </Section>

            <Section
              title="Custos de transferência"
              icon={Banknote}
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <BooleanField
                  label="Descontar por Pix"
                  value={form.pixDiscountEnabled}
                  onChange={(value) =>
                    updateField(
                      'pixDiscountEnabled',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Desconto Pix"
                  value={form.pixDiscountValue}
                  prefix="R$"
                  disabled={!form.pixDiscountEnabled}
                  onChange={(value) =>
                    updateField(
                      'pixDiscountValue',
                      value,
                    )
                  }
                />

                <BooleanField
                  label="Descontar por TED"
                  value={form.tedDiscountEnabled}
                  onChange={(value) =>
                    updateField(
                      'tedDiscountEnabled',
                      value,
                    )
                  }
                />

                <NumberField
                  label="Desconto TED"
                  value={form.tedDiscountValue}
                  prefix="R$"
                  disabled={!form.tedDiscountEnabled}
                  onChange={(value) =>
                    updateField(
                      'tedDiscountValue',
                      value,
                    )
                  }
                />
              </div>
            </Section>

            <label className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <input
                type="checkbox"
                checked={form.requireBankValidation}
                onChange={(event) =>
                  updateField(
                    'requireBankValidation',
                    event.target.checked,
                  )
                }
                className="mt-1"
              />

              <span>
                <strong className="block text-sm text-amber-900">
                  Exigir validação bancária antes do saque
                </strong>

                <span className="mt-1 block text-xs leading-5 text-amber-700">
                  Impede solicitações enquanto os dados
                  bancários não forem aprovados.
                </span>
              </span>
            </label>
          </div>

          <footer className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-5">
            <span className="text-xs font-bold text-emerald-700">
              {saved
                ? 'Informações salvas com sucesso.'
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
        </form>
      </main>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon size={18} />
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

function BooleanField({
  label,
  value,
  onChange,
}) {
  return (
    <Field label={label}>
      <select
        value={value ? 'yes' : 'no'}
        onChange={(event) =>
          onChange(event.target.value === 'yes')
        }
        className={inputClass}
      >
        <option value="yes">Sim</option>
        <option value="no">Não</option>
      </select>
    </Field>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  disabled,
}) {
  return (
    <Field label={label}>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          step="0.01"
          disabled={disabled}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className={[
            inputClass,
            prefix ? 'pl-11' : '',
            suffix ? 'pr-14' : '',
            'disabled:bg-slate-100 disabled:text-slate-400',
          ].join(' ')}
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

const inputClass =
  'h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500';
