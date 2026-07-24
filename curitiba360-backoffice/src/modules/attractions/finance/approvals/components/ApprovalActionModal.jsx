import { useEffect, useState } from 'react';

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Upload,
  X,
} from 'lucide-react';

const CONFIG = {
  Aprovado: {
    title: 'Aprovar repasse',
    description:
      'Confirme a liberação desta solicitação para pagamento.',
    button: 'Confirmar aprovação',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  Rejeitado: {
    title: 'Rejeitar repasse',
    description:
      'Informe o motivo para que o produtor possa consultar.',
    button: 'Confirmar rejeição',
    buttonClass: 'bg-red-600 hover:bg-red-700',
  },
  'Ajuste solicitado': {
    title: 'Solicitar ajuste',
    description:
      'Informe quais dados precisam ser corrigidos.',
    button: 'Enviar solicitação',
    buttonClass: 'bg-orange-600 hover:bg-orange-700',
  },
  Pago: {
    title: 'Confirmar pagamento',
    description:
      'Registre o pagamento e informe o comprovante.',
    button: 'Marcar como pago',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
  },
};

export default function ApprovalActionModal({
  approval,
  action,
  isLoading,
  onClose,
  onConfirm,
}) {
  const [observation, setObservation] =
    useState('');
  const [receiptUrl, setReceiptUrl] =
    useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setObservation('');
    setReceiptUrl('');
    setError('');
  }, [approval, action]);

  if (!approval || !action) {
    return null;
  }

  const config = CONFIG[action];

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (
      ['Rejeitado', 'Ajuste solicitado'].includes(
        action,
      ) &&
      !observation.trim()
    ) {
      setError('A observação é obrigatória.');
      return;
    }

    if (action === 'Pago' && !receiptUrl.trim()) {
      setError(
        'Informe o endereço ou identificação do comprovante.',
      );
      return;
    }

    try {
      await onConfirm({
        status: action,
        observation: observation.trim(),
        receiptUrl:
          action === 'Pago'
            ? receiptUrl.trim()
            : null,
      });
    } catch (submitError) {
      setError(
        submitError?.message ??
          'Não foi possível concluir a ação.',
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-[28px] border border-white/20 bg-white p-6 shadow-2xl text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              {config.title}
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              {config.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <span className="text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
            Solicitação
          </span>

          <div className="mt-2 flex items-center justify-between gap-4">
            <strong className="text-sm font-black text-slate-800">
              {approval.reference}
            </strong>

            <strong className="text-sm font-black text-emerald-700">
              {formatCurrency(
                approval.netAmount,
              )}
            </strong>
          </div>
        </div>

        <label className="mt-5 block text-left">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
            Observação
          </span>

          <textarea
            rows={4}
            maxLength={500}
            value={observation}
            onChange={(event) =>
              setObservation(event.target.value)
            }
            placeholder="Digite uma observação sobre esta ação"
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </label>

        {action === 'Pago' && (
          <label className="mt-4 block text-left">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
              Comprovante
            </span>

            <div className="relative">
              <Upload
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={receiptUrl}
                onChange={(event) =>
                  setReceiptUrl(
                    event.target.value,
                  )
                }
                placeholder="/comprovantes/repasse.pdf"
                className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </label>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700">
            <AlertCircle
              size={17}
              className="shrink-0"
            />
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="h-11 rounded-xl border border-slate-200 px-5 text-xs font-black text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={[
              'inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-xs font-black text-white disabled:opacity-60',
              config.buttonClass,
            ].join(' ')}
          >
            {isLoading ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <CheckCircle2 size={16} />
            )}

            {config.button}
          </button>
        </div>
      </form>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
