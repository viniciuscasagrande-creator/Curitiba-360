import React, { useState } from 'react';
import { AttractionStepOne } from './AttractionStepOne';
import { AttractionStepTwo } from './AttractionStepTwo';
import { AttractionStepThree } from './AttractionStepThree';

export function AttractionWizard({ initialData, onFinish, onSaveDraft }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialData);

  return (
    <div className="space-y-6">
      {/* Stepper Tabs */}
      <nav className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-100 p-1.5 text-left">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 1 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            1
          </span>
          Etapa 1: Dados Gerais
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 2 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            2
          </span>
          Etapa 2: Financeiro & Mídia
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 3 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            3
          </span>
          Etapa 3: Ingressos
        </button>
      </nav>

      {/* Step Render */}
      {step === 1 && (
        <AttractionStepOne
          form={form}
          setForm={setForm}
          onNext={() => setStep(2)}
          onSaveDraft={() => onSaveDraft(form)}
        />
      )}

      {step === 2 && (
        <AttractionStepTwo
          form={form}
          setForm={setForm}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
          onSaveDraft={() => onSaveDraft(form)}
        />
      )}

      {step === 3 && (
        <AttractionStepThree
          form={form}
          setForm={setForm}
          onPrev={() => setStep(2)}
          onFinish={() => onFinish(form)}
          onSaveDraft={() => onSaveDraft(form)}
        />
      )}
    </div>
  );
}

export default AttractionWizard;
