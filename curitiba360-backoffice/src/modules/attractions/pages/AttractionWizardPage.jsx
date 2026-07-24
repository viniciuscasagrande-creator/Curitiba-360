import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { AttractionWizard } from '../components/AttractionWizard';
import { initialAttractionForm } from '../schemas/attractionSchema';
import { attractionsMock } from '../data/attractionsMock';
import { attractionRoutes } from '../routes/attractionRoutes';

export function AttractionWizardPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();
  const isEditing = Boolean(attractionId);

  const [initialData, setInitialData] = useState(initialAttractionForm);

  useEffect(() => {
    if (isEditing) {
      const found = attractionsMock.find((item) => item.id === attractionId);
      if (found) {
        setInitialData({
          ...initialAttractionForm,
          ...found,
          general: { ...initialAttractionForm.general, ...(found.general || {}) },
          schedule: { ...initialAttractionForm.schedule, ...(found.schedule || {}) },
          infrastructure: { ...initialAttractionForm.infrastructure, ...(found.infrastructure || {}) },
          banking: { ...initialAttractionForm.banking, ...(found.banking || {}) },
          media: { ...initialAttractionForm.media, ...(found.media || {}) },
          ticket: { ...initialAttractionForm.ticket, ...(found.ticket || {}) }
        });
      }
    }
  }, [attractionId, isEditing]);

  function handleFinish(formData) {
    console.log('Finalizando atração:', formData);
    navigate(attractionRoutes.list);
  }

  function handleSaveDraft(formData) {
    console.log('Salvando rascunho:', formData);
    navigate(attractionRoutes.list);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 text-left">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(attractionRoutes.list)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {isEditing ? 'Edição de Atração' : 'Cadastro em 3 Etapas'}
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              {isEditing ? 'Editar Atração' : 'Nova Atração'}
            </h1>
          </div>
        </div>
      </header>

      <AttractionWizard
        initialData={initialData}
        onFinish={handleFinish}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  );
}

export default AttractionWizardPage;
