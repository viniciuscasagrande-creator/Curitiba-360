import { useMemo, useState } from 'react';

import {
  AlertCircle,
  ArrowRight,
  CircleDollarSign,
  LoaderCircle,
  WalletCards,
} from 'lucide-react';

const currencyFormatter = new Intl.NumberFormat(
  'pt-BR',
  {
    style: 'currency',
    currency: 'BRL',
  },
);

export default function WithdrawalRequestForm({
  availableBalance,
  minimumWithdrawal,
  account,
  onSubmit,
}) {
  const [amount, setAmount] = useState('');
  const [observation, setObservation] =
    useState('');
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [error, setError] = useState('');

  const numericAmount = useMemo(
    () => parseCurrencyInput(amount),
    [amount],
  );

  const remainingBalance = Math.max(
    availableBalance - numericAmount,
    0,
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!numericAmount) {
      setError('Informe o valor do repasse.');
      return;
    }

    if (numericAmount < minimumWithdrawal) {
      setError(
        `O valor mínimo para repasse é ${currencyFormatter.format(
          minimumWithdrawal,
        )}.`,
      );
      return;
    }

    if (numericAmount > availableBalance) {
      setError(
        'O valor informado é maior que o saldo disponível.',
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        amount: numericAmount,
        observation: observation.trim(),
        bankAccountId: account.id,
      });

      setAmount('');
      setObservation('');
    } catch (submitError) {
      setError(
        submitError?.message ??
          'Não foi possível criar a solicitação.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAmountChange(event) {
    const digits = event.target.value.replace(
      /\D/g,
      '',
    );

    if (!digits) {
      setAmount('');
      return;
    }

    const value = Number(digits) / 100;

    setAmount(
      new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value),
    );
  }

  function useFullBalance() {
    setAmount(
      new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(availableBalance),
    );
  }

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-black text-slate-900">
            Nova solicitação
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Solicite o envio do saldo disponível.
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <WalletCards size={19} />
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="withdrawal-amount"
              className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500"
            >
              Valor do repasse
            </label>

            <button
              type="button"
              onClick={useFullBalance}
              className="text-[10px] font-black text-emerald-600 hover:text-emerald-700"
            >
              Usar saldo total
            </button>
          </div>

          <div className="relative">
            <CircleDollarSign
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">
              R$
            </span>

            <input
              id="withdrawal-amount"
              inputMode="numeric"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0,00"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-[76px] pr-4 text-xl font-black text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <BalanceInformation
              label="Saldo disponível"
              value={availableBalance}
            />

            <BalanceInformation
              label="Saldo restante"
              value={remainingBalance}
            />
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
            Observação
          </span>

          <textarea
            value={observation}
            maxLength={300}
            rows={4}
            placeholder="Informação opcional sobre a solicitação"
            onChange={(event) =>
              setObservation(event.target.value)
            }
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />

          <span className="mt-1 block text-right text-[10px] font-bold text-slate-400">
            {observation.length}/300
          </span>
        </label>

        <div className="rounded-2xl bg-slate-50 p-4">
          <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
            Destino do repasse
          </span>

          <strong className="mt-1 block text-sm font-black text-slate-700">
            {account.bank} · Agência {account.agency}
          </strong>

          <span className="mt-1 block text-xs font-semibold text-slate-500">
            Conta {account.account}
          </span>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700">
            <AlertCircle
              size={17}
              className="shrink-0"
            />

            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={
            isSubmitting ||
            availableBalance < minimumWithdrawal
          }
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
              Enviando solicitação
            </>
          ) : (
            <>
              Solicitar repasse
              <ArrowRight size={17} />
            </>
          )}
        </button>

        <p className="text-center text-[10px] font-bold text-slate-400">
          Valor mínimo:{' '}
          {currencyFormatter.format(
            minimumWithdrawal,
          )}
        </p>
      </form>
    </article>
  );
}

function BalanceInformation({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <span className="block text-[9px] font-black uppercase tracking-[0.06em] text-slate-400">
        {label}
      </span>

      <strong className="mt-1 block text-sm font-black text-slate-700">
        {currencyFormatter.format(value)}
      </strong>
    </div>
  );
}

function parseCurrencyInput(value) {
  if (!value) {
    return 0;
  }

  const normalized = value
    .replace(/\./g, '')
    .replace(',', '.')
    .replace(/[^\d.]/g, '');

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}
