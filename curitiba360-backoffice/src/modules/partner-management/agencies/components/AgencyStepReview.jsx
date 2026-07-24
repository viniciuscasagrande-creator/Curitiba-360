import { Building2, CheckCircle2, Landmark, MapPin, User } from 'lucide-react';

export default function AgencyStepReview({ formData }) {
  return (
    <div className="space-y-5 text-left text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600" />
          Etapa 7 — Revisão Final do Cadastro
        </h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
          Pronto para Salvar
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Empresa */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <h4 className="font-black text-slate-900 flex items-center gap-1.5 uppercase text-[10px]">
            <Building2 size={14} /> Empresa
          </h4>
          <p><strong>Nome Fantasia:</strong> {formData.tradeName || '—'}</p>
          <p><strong>Razão Social:</strong> {formData.corporateName || '—'}</p>
          <p><strong>CNPJ:</strong> {formData.cnpj || '—'}</p>
          <p><strong>Tipo:</strong> {formData.companyType}</p>
        </div>

        {/* Responsável */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <h4 className="font-black text-slate-900 flex items-center gap-1.5 uppercase text-[10px]">
            <User size={14} /> Responsável
          </h4>
          <p><strong>Nome:</strong> {formData.responsibleName || '—'}</p>
          <p><strong>CPF:</strong> {formData.responsibleCpf || '—'}</p>
          <p><strong>E-mail:</strong> {formData.email || '—'}</p>
          <p><strong>Celular:</strong> {formData.responsiblePhone || '—'}</p>
        </div>

        {/* Endereço */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <h4 className="font-black text-slate-900 flex items-center gap-1.5 uppercase text-[10px]">
            <MapPin size={14} /> Sede
          </h4>
          <p><strong>Endereço:</strong> {formData.street}, {formData.number} {formData.complement}</p>
          <p><strong>Cidade/UF:</strong> {formData.city} - {formData.state}, CEP: {formData.zipCode}</p>
        </div>

        {/* Banco */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <h4 className="font-black text-slate-900 flex items-center gap-1.5 uppercase text-[10px]">
            <Landmark size={14} /> Dados Bancários & PIX
          </h4>
          <p><strong>Banco:</strong> {formData.bankName} ({formData.bankCode})</p>
          <p><strong>Agência/Conta:</strong> {formData.agency} / {formData.account}</p>
          <p><strong>Chave PIX:</strong> {formData.pixKey || 'Não informada'}</p>
        </div>
      </div>
    </div>
  );
}
