import { ArrowLeft, ArrowRight, Save, X } from 'lucide-react';

export default function WizardNavigation({
  currentStep,
  totalSteps = 7,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
}) {
  const isLastStep = currentStep === totalSteps;

  return (
    <footer className="border-t border-slate-200 bg-white p-4 flex items-center justify-between">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 hover:bg-slate-50 transition"
      >
        <X size={15} />
        Cancelar
      </button>

      <div className="flex items-center gap-3">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={15} />
            Voltar
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-6 text-xs font-black text-white hover:bg-slate-800 transition"
          >
            Avançar
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
          >
            <Save size={16} />
            {isSubmitting ? 'Salvando...' : 'Salvar Agência'}
          </button>
        )}
      </div>
    </footer>
  );
}
