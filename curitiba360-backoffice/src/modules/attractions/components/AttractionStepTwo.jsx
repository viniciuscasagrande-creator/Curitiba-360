import React from 'react';
import { ImageUploadField } from './ImageUploadField';

export function AttractionStepTwo({ form, setForm, onNext, onPrev, onSaveDraft }) {
  function updateBanking(field, value) {
    setForm((current) => ({
      ...current,
      banking: {
        ...current.banking,
        [field]: value
      }
    }));
  }

  function updateMedia(field, value) {
    setForm((current) => ({
      ...current,
      media: {
        ...current.media,
        [field]: value
      }
    }));
  }

  return (
    <div className="space-y-6 text-left">
      {/* Dados Bancários */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Dados Bancários & Repasse</h3>

        <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer mb-2">
          <input
            type="checkbox"
            checked={form.banking.usePartnerData}
            onChange={(e) => updateBanking('usePartnerData', e.target.checked)}
            className="h-4 w-4 rounded accent-emerald-600"
          />
          Utilizar dados bancários do parceiro comercial
        </label>

        {!form.banking.usePartnerData && (
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Banco</label>
              <input
                type="text"
                value={form.banking.bank}
                onChange={(e) => updateBanking('bank', e.target.value)}
                placeholder="001 - Banco do Brasil"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Agência / Conta</label>
              <input
                type="text"
                value={form.banking.account}
                onChange={(e) => updateBanking('account', e.target.value)}
                placeholder="1234 / 56789-0"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">E-mail para Borderô</label>
              <input
                type="email"
                value={form.banking.statementEmail}
                onChange={(e) => updateBanking('statementEmail', e.target.value)}
                placeholder="financeiro@empresa.com"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}
      </section>

      {/* Condições Negociadas */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Negociação Comercial</h3>
        <textarea
          rows={3}
          value={form.negotiationNotes}
          onChange={(e) => setForm({ ...form, negotiationNotes: e.target.value })}
          placeholder="Descrição das condições negociadas (taxas, exclusividade, repasses antecipados)..."
          className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:border-emerald-500"
        />
      </section>

      {/* Materiais de Divulgação (Mídia) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Materiais de Divulgação</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <ImageUploadField
            label="Imagem Home"
            dimensions="1080 × 1080"
            value={form.media.homeImage}
            onChange={(val) => updateMedia('homeImage', val)}
          />

          <ImageUploadField
            label="Imagem Horizontal"
            dimensions="1170 × 430"
            value={form.media.horizontalImage}
            onChange={(val) => updateMedia('horizontalImage', val)}
          />

          <ImageUploadField
            label="Fundo da Página"
            dimensions="1920 × 1080"
            value={form.media.backgroundImage}
            onChange={(val) => updateMedia('backgroundImage', val)}
          />
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 mb-1">Link de Vídeo Promocional (YouTube / Vimeo)</label>
          <input
            type="url"
            value={form.media.promotionalVideoUrl}
            onChange={(e) => updateMedia('promotionalVideoUrl', e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
          />
        </div>
      </section>

      {/* Release */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Release & Apresentação</h3>
        <textarea
          rows={4}
          value={form.release}
          onChange={(e) => setForm({ ...form, release: e.target.value })}
          placeholder="Escreva o release oficial da atração para ser exibido ao público..."
          className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm font-medium outline-none focus:border-emerald-500"
        />
      </section>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          &larr; Voltar (Etapa 1)
        </button>

        <div className="flex gap-2">
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
            Próximo (Etapa 3) &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttractionStepTwo;
