import { useState } from 'react';
import { FileText, Plus, Trash2, Upload } from 'lucide-react';

export default function AgencyStepDocuments({ formData, onChange }) {
  const [docType, setDocType] = useState('Cartão CNPJ');
  const [docName, setDocName] = useState('');

  function handleAddDocument(e) {
    e.preventDefault();
    if (!docName.trim()) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      type: docType,
      name: docName.trim(),
      url: '',
    };

    onChange('documents', [...(formData.documents || []), newDoc]);
    setDocName('');
  }

  function handleRemoveDoc(id) {
    onChange('documents', (formData.documents || []).filter((d) => d.id !== id));
  }

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
        <Upload size={16} />
        Etapa 6 — Documentação & Anexos Digitais
      </h3>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <span className="block text-[10px] font-black uppercase text-slate-500">
          Anexar Documento Obrigatório
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-slate-800 outline-none bg-white"
          >
            <option value="Cartão CNPJ">Cartão CNPJ</option>
            <option value="Contrato Social">Contrato Social</option>
            <option value="Documento Responsável">Documento do Responsável (RG/CPF)</option>
            <option value="Comprovante Bancário">Comprovante de Conta Bancária</option>
            <option value="Alvará">Alvará de Funcionamento</option>
          </select>

          <input
            type="text"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Nome do arquivo (ex.: cartao-cnpj-2026.pdf)"
            className="rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-slate-800 outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleAddDocument}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-800"
        >
          <Plus size={14} />
          Registrar Documento
        </button>
      </div>

      <div className="space-y-2">
        {(formData.documents || []).map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-xs">
              <FileText size={16} className="text-emerald-600" />
              <div>
                <strong className="block text-slate-900">{doc.name}</strong>
                <span className="text-slate-400">Tipo: {doc.type}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveDoc(doc.id)}
              className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
