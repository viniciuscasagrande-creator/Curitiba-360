import { Building2, X } from 'lucide-react';
import AgencyWizard from './AgencyWizard';

export default function AgencyFormDrawer({ open, agency, isSubmitting, onClose, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-3xl bg-white shadow-2xl flex flex-col h-full text-left overflow-hidden border-l border-slate-200">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <Building2 size={20} />
            </span>
            <div>
              <h2 className="text-base font-black">
                {agency ? `Editar Agência: ${agency.tradeName}` : 'Nova Agência Parceira (B2B)'}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Preencha o formulário em 7 etapas para credenciamento no sistema Curitiba 360.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          <AgencyWizard
            agency={agency}
            isSubmitting={isSubmitting}
            onSave={onSave}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
