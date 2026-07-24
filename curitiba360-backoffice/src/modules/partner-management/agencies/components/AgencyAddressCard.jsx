import { MapPin } from 'lucide-react';

export default function AgencyAddressCard({ agency }) {
  if (!agency) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-left">
      <h4 className="font-black text-slate-800 flex items-center gap-2">
        <MapPin size={15} className="text-emerald-600" />
        Endereço da Sede
      </h4>

      <p className="font-semibold text-slate-700">
        {agency.street || agency.address}, {agency.number} {agency.complement && `(${agency.complement})`}
      </p>

      <p className="text-slate-500">
        {agency.district && `${agency.district} - `}{agency.city} - {agency.state}, CEP: {agency.zipCode || 'CEP não informado'} &bull; {agency.country || 'Brasil'}
      </p>
    </div>
  );
}
