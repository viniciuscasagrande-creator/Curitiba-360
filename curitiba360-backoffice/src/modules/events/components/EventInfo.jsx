import React from 'react';
import { Info, MapPin, Clock, ShieldAlert, Car, Phone, Accessibility } from 'lucide-react';

export function EventInfo({ event }) {
  if (!event) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
        <Info size={20} className="text-amber-400" />
        Informações Importantes do Evento
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
        {/* Endereço & Horário */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Endereço & Local</span>
              <span>{event.venue} — {event.endereco || 'Curitiba - PR'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Horário & Duração</span>
              <span>
                Abertura dos portões: {event.aberturaPortoes || '1 hr antes'}. Horário: {event.horarioAbertura} às {event.horarioEncerramento || '23:00'}.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Classificação Indicativa</span>
              <span>{event.classificacao || 'Livre para todos os públicos'}</span>
            </div>
          </div>
        </div>

        {/* Acessibilidade, Estacionamento & Contato */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Accessibility size={20} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Acessibilidade PCD</span>
              <span>{event.acessivel !== false ? 'Local com rampa de acesso, banheiros adaptados e área reservada.' : 'Acessibilidade sob consulta prévia.'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Car size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Estacionamento</span>
              <span>Estacionamento privativo e conveniado disponível no local.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block">Contato da Organização</span>
              <span>{event.contato || 'atendimento@curitiba360.com.br | (41) 3000-0360'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventInfo;
