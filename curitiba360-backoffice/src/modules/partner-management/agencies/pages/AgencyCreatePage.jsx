import { useNavigate } from 'react-router-dom';
import { useAgencies } from '../hooks/useAgencies';
import AgencyWizard from '../components/AgencyWizard';

export default function AgencyCreatePage() {
  const navigate = useNavigate();
  const { createAgency, isMutating } = useAgencies();

  async function handleCreate(formData) {
    await createAgency(formData);
    navigate('/admin/parceiros/agencias');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Novo Credenciamento de Agência</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Preencha o formulário em 3 etapas para cadastrar uma nova agência no ecossistema B2B.
          </p>
        </div>
      </div>

      <AgencyWizard
        onSubmit={handleCreate}
        onCancel={() => navigate('/admin/parceiros/agencias')}
        isSubmitting={isMutating}
      />
    </div>
  );
}
