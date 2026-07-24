import { useState } from 'react';
import { ArrowUpRight, DollarSign, Info } from 'lucide-react';
import { formatCurrency } from '../reports/utils/reportUtils';

export default function WithdrawalRequestForm({
  availableBalance,
  minimumAmount,
  onSubmitRequest,
}) {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError('Por favor, informe um valor válido para o repasse.');
      return;
    }

    if (numericAmount < minimumAmount) {
      setError(`O valor mínimo para solicitação de repasse é ${formatCurrency(minimumAmount)}.`);
      return;
    }

    if (numericAmount > availableBalance) {
      setError(`O valor não pode ultrapassar o saldo disponível (${formatCurrency(availableBalance)}).`);
      return;
    }

    onSubmitRequest({
      amount: numericAmount,
      notes,
    });

    setSuccess(true);
    setAmount('');
    setNotes('');

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }

  function handleSetMax() {
    setAmount(availableBalance.toString());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4"
    >
      <div>
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-600" />
          Solicitar Novo Repasse
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Informe o valor desejado para transferência na conta homologada.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
          ✓ Solicitação enviada com sucesso! Aguarde a análise do setor financeiro.
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            Valor do Repasse (R$)
          </label>
          <button
            type="button"
            onClick={handleSetMax}
            className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Usar Saldo Total ({formatCurrency(availableBalance)})
          </button>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">
            R$
          </span>
          <input
            type="number"
            step="0.01"
            min={minimumAmount}
            max={availableBalance}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-base font-black text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-slate-500">
          Observações / Referência Interna (Opcional)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex.: Solicitação referente ao fechamento da quinzena."
          className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-[11px] font-semibold text-slate-500">
        <Info size={15} className="shrink-0 text-slate-400" />
        <span>
          O repasse será efetuado em até 1 dia útil após a aprovação pela diretoria financeira.
        </span>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.99]"
      >
        <span>Confirmar Solicitação de Repasse</span>
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
