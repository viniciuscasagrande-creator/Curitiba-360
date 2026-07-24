import { Building2, Globe, Phone } from 'lucide-react';

export default function AgencyCompanyCard({ agency }) {
  if (!agency) return null;

  return (
    <div className="space-y-4 text-xs text-left">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
        <h4 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider text-[11px]">
          <Building2 size={15} className="text-slate-700" />
          Dados da Empresa
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <InfoBox label="Nome Fantasia" value={agency.tradeName} />
          <InfoBox label="Razão Social" value={agency.corporateName} />
          <InfoBox label="CNPJ" value={agency.cnpj} />
          <InfoBox label="Tipo de Empresa" value={agency.companyType} />
          <InfoBox label="Inscrição Estadual" value={agency.stateRegistration || 'Isento'} />
          <InfoBox label="Telefone Comercial" value={agency.commercialPhone || agency.phone} icon={Phone} />
          <InfoBox label="Website" value={agency.site || agency.website} icon={Globe} />
          <InfoBox label="E-mail Corporativo" value={agency.email} />
        </div>
      </div>

      {agency.statusReason && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-800">
            Observação / Motivo do Status
          </span>
          <p className="text-rose-950 font-bold leading-snug">{agency.statusReason}</p>
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <span className="block text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
        {Icon && <Icon size={12} />}
        {label}
      </span>
      <strong className="mt-1 block text-slate-800 font-bold truncate">{value || '—'}</strong>
    </div>
  );
}
