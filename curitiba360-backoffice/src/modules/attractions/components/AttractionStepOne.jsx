import React from 'react';
import { ImageUploadField } from './ImageUploadField';

export function AttractionStepOne({ form, setForm, onNext, onSaveDraft }) {
  function updateGeneral(field, value) {
    setForm((current) => ({
      ...current,
      general: {
        ...current.general,
        [field]: value
      }
    }));
  }

  function updateSchedule(field, value) {
    setForm((current) => ({
      ...current,
      schedule: {
        ...current.schedule,
        [field]: value
      }
    }));
  }

  function updateInfra(field, value) {
    setForm((current) => ({
      ...current,
      infrastructure: {
        ...current.infrastructure,
        [field]: value
      }
    }));
  }

  return (
    <div className="space-y-6 text-left">
      {/* Upload Imagem Principal */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-black text-slate-900 mb-1">Foto Principal da Atração</h3>
        <p className="text-xs text-slate-500 font-medium mb-4">Imagem destacada no card do catálogo e na captação.</p>
        <ImageUploadField
          label="Foto da Atração (Square 1080 × 1080)"
          value={form.mainImage}
          onChange={(val) => setForm((c) => ({ ...c, mainImage: val }))}
          dimensions="1080 × 1080"
        />
      </section>

      {/* Identificação */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Identificação & Operação</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Parceiro Comercial *</label>
            <select
              value={form.partnerId}
              onChange={(e) => setForm({ ...form, partnerId: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            >
              <option value="partner-001">Instituto Jaime Lerner</option>
              <option value="partner-002">Fundação Cultural de Curitiba</option>
              <option value="partner-003">Viaje Paraná Turismo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Atração *</label>
            <input
              type="text"
              required
              value={form.general.name}
              onChange={(e) => updateGeneral('name', e.target.value)}
              placeholder="Ex: Ópera de Arame ou Festival de Teatro"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Operação *</label>
            <select
              value={form.general.operationType}
              onChange={(e) => updateGeneral('operationType', e.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-emerald-800 outline-none focus:border-emerald-500"
            >
              <option value="event">Evento Único (Requer data e horário)</option>
              <option value="permanent">Permanente (Sem data única fixa)</option>
              <option value="season">Temporada (Data inicial e final)</option>
              <option value="recurring">Sessões Recorrentes (Agenda fixa semanal)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Status Inicial</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            >
              <option value="draft">Rascunho</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Localização</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Espaço / Venue</label>
            <input
              type="text"
              value={form.general.venueName}
              onChange={(e) => updateGeneral('venueName', e.target.value)}
              placeholder="Ex: Parque das Pedreiras"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
            <input
              type="text"
              value={form.general.zipCode}
              onChange={(e) => updateGeneral('zipCode', e.target.value)}
              placeholder="80000-000"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Cidade / UF</label>
            <input
              type="text"
              readOnly
              value={`${form.general.city || 'Curitiba'} - ${form.general.state || 'PR'}`}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none text-slate-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Endereço</label>
            <input
              type="text"
              value={form.general.address}
              onChange={(e) => updateGeneral('address', e.target.value)}
              placeholder="Rua João Gava"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Número / Comp.</label>
            <input
              type="text"
              value={form.general.number}
              onChange={(e) => updateGeneral('number', e.target.value)}
              placeholder="970"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Classificação, Sessão & Infraestrutura */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Classificação & Estrutura</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Capacidade Total</label>
            <input
              type="number"
              value={form.general.capacity}
              onChange={(e) => updateGeneral('capacity', e.target.value)}
              placeholder="1000"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Classificação Etária</label>
            <select
              value={form.general.ageRating}
              onChange={(e) => updateGeneral('ageRating', e.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
            >
              <option value="free">Livre</option>
              <option value="10">10 anos</option>
              <option value="12">12 anos</option>
              <option value="14">14 anos</option>
              <option value="16">16 anos</option>
              <option value="18">18 anos</option>
            </select>
          </div>

          {form.general.operationType === 'event' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Data do Evento *</label>
              <input
                type="date"
                value={form.schedule.date}
                onChange={(e) => updateSchedule('date', e.target.value)}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={form.infrastructure.coveredArea}
              onChange={(e) => updateInfra('coveredArea', e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
            Espaço Coberto
          </label>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={form.infrastructure.accessibility}
              onChange={(e) => updateInfra('accessibility', e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
            Acessibilidade PCD
          </label>

          <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={form.infrastructure.parking}
              onChange={(e) => updateInfra('parking', e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
            Estacionamento no Local
          </label>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onSaveDraft}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          Salvar Rascunho
        </button>

        <button
          type="button"
          onClick={onNext}
          className="h-11 rounded-2xl bg-emerald-600 px-7 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
        >
          Próximo (Etapa 2) &rarr;
        </button>
      </div>
    </div>
  );
}

export default AttractionStepOne;
