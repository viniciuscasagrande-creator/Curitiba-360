import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Landmark,
  MapPin,
  Plus,
  Save,
  Sparkles,
  Ticket,
  Upload,
  Video,
  X
} from 'lucide-react';
import { attractionsMock } from '../data/attractionsMock';

const initialAttractionForm = {
  partnerId: 'partner-001',
  partnerName: 'Instituto Jaime Lerner',
  name: '',
  status: 'active',
  operationType: 'permanent',

  location: {
    venueName: '',
    zipCode: '',
    state: 'PR',
    city: 'Curitiba',
    address: '',
    number: '',
    complement: ''
  },

  operation: {
    ageRating: 0,
    capacity: 1000,
    minorsAllowedWithGuardian: true,
    date: '',
    startTime: '09:00',
    doorsOpenTime: '08:30'
  },

  infrastructure: {
    coveredArea: true,
    accessibility: true,
    parking: true
  },

  banking: {
    usePartnerData: true,
    bankCode: '',
    agency: '',
    account: '',
    beneficiaryName: '',
    beneficiaryDocument: '',
    statementEmail: ''
  },

  media: {
    mainImageUrl: '',
    homeImageUrl: '',
    horizontalImageUrl: '',
    backgroundImageUrl: '',
    promotionalVideoUrl: ''
  },

  negotiationNotes: '',
  description: '',

  ticketCategory: {
    createNow: true,
    name: 'Adulto (Inteira)',
    status: 'active',
    price: 20.00,
    quantity: 500,
    batchCode: '001',
    customMessage: '',
    orderExpirationHours: 48
  }
};

export function AttractionWizardPage() {
  const navigate = useNavigate();
  const { attractionId } = useParams();
  const isEditing = Boolean(attractionId);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialAttractionForm);

  useEffect(() => {
    if (isEditing) {
      const found = attractionsMock.find((item) => item.id === attractionId);
      if (found) {
        setForm({
          ...initialAttractionForm,
          ...found,
          location: { ...initialAttractionForm.location, ...(found.location || {}) },
          operation: { ...initialAttractionForm.operation, ...(found.operation || {}) },
          infrastructure: { ...initialAttractionForm.infrastructure, ...(found.infrastructure || {}) },
          banking: { ...initialAttractionForm.banking, ...(found.banking || {}) },
          media: { ...initialAttractionForm.media, ...(found.media || {}) }
        });
      }
    }
  }, [attractionId, isEditing]);

  function updateNested(section, field, value) {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value
      }
    }));
  }

  function handleSave(saveAsDraft = false) {
    const finalForm = {
      ...form,
      status: saveAsDraft ? 'draft' : form.status,
      id: isEditing ? attractionId : `attraction-${Date.now()}`
    };

    console.log('Salvando atração:', finalForm);
    navigate('/admin/atracoes');
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 text-left">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/atracoes')}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {isEditing ? 'Edição de Atração' : 'Nova Atração (Wizard 3 Etapas)'}
            </span>
            <h1 className="text-2xl font-black text-slate-900">
              {isEditing ? `Editar: ${form.name || 'Atração'}` : 'Cadastrar Nova Atração'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="h-10 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Salvar Rascunho
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
          >
            <Save size={16} />
            Finalizar Cadastro
          </button>
        </div>
      </header>

      {/* Stepper Navigation */}
      <nav className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-100 p-1.5">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 1 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            1
          </span>
          Etapa 1: Dados Gerais
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 2 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            2
          </span>
          Etapa 2: Financeiro & Mídia
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className={[
            'flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition',
            step === 3 ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          ].join(' ')}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-black text-emerald-800">
            3
          </span>
          Etapa 3: Ingressos
        </button>
      </nav>

      {/* STEP 1: ATR-002 Dados Gerais & Operação */}
      {step === 1 && (
        <div className="space-y-6">
          <SectionCard title="Dados da Atração" description="Informações cadastrais e tipo de operação.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Atração *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Ópera de Arame ou Passeio de Trem Curitiba-Morretes"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parceiro Comercial</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Operação *</label>
                <select
                  value={form.operationType}
                  onChange={(e) => setForm({ ...form, operationType: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-emerald-800 outline-none focus:border-emerald-500"
                >
                  <option value="permanent">Permanente (Sem data única fixa)</option>
                  <option value="single_event">Evento Único (Requer data/horário)</option>
                  <option value="season">Temporada (Início e término)</option>
                  <option value="recurring_sessions">Sessões Recorrentes (Agenda semanal)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Inicial</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value="active">Ativo (Visível e operável)</option>
                  <option value="inactive">Inativo</option>
                  <option value="pending">Pendente de Aprovação</option>
                  <option value="draft">Rascunho</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Localização" description="Endereço físico e espaço da atração.">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Local/Espaço</label>
                <input
                  type="text"
                  value={form.location.venueName}
                  onChange={(e) => updateNested('location', 'venueName', e.target.value)}
                  placeholder="Ex: Parque das Pedreiras"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
                <input
                  type="text"
                  value={form.location.zipCode}
                  onChange={(e) => updateNested('location', 'zipCode', e.target.value)}
                  placeholder="80000-000"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cidade / UF</label>
                <input
                  type="text"
                  value={`${form.location.city} - ${form.location.state}`}
                  onChange={(e) => updateNested('location', 'city', e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Endereço</label>
                <input
                  type="text"
                  value={form.location.address}
                  onChange={(e) => updateNested('location', 'address', e.target.value)}
                  placeholder="Rua João Gava"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Número / Complemento</label>
                <input
                  type="text"
                  value={form.location.number}
                  onChange={(e) => updateNested('location', 'number', e.target.value)}
                  placeholder="970"
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Operação e Acessibilidade" description="Regras funcionais, capacidade e estrutura.">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Capacidade de Público</label>
                <input
                  type="number"
                  value={form.operation.capacity}
                  onChange={(e) => updateNested('operation', 'capacity', Number(e.target.value))}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Classificação Etária</label>
                <select
                  value={form.operation.ageRating}
                  onChange={(e) => updateNested('operation', 'ageRating', Number(e.target.value))}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                >
                  <option value={0}>Livre</option>
                  <option value={10}>10 anos</option>
                  <option value={12}>12 anos</option>
                  <option value={14}>14 anos</option>
                  <option value={16}>16 anos</option>
                  <option value={18}>18 anos</option>
                </select>
              </div>

              {form.operationType === 'single_event' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Data do Evento *</label>
                  <input
                    type="date"
                    value={form.operation.date}
                    onChange={(e) => updateNested('operation', 'date', e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.infrastructure.coveredArea}
                  onChange={(e) => updateNested('infrastructure', 'coveredArea', e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                Espaço Coberto
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.infrastructure.accessibility}
                  onChange={(e) => updateNested('infrastructure', 'accessibility', e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                Acessibilidade PCD
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.infrastructure.parking}
                  onChange={(e) => updateNested('infrastructure', 'parking', e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                Estacionamento no Local
              </label>
            </div>
          </SectionCard>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              Avançar para Etapa 2
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ATR-003 Financeiro & Mídia */}
      {step === 2 && (
        <div className="space-y-6">
          <SectionCard title="Dados Bancários & Repasse" description="Configuração financeira do borderô.">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={form.banking.usePartnerData}
                onChange={(e) => updateNested('banking', 'usePartnerData', e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-600"
              />
              Utilizar dados bancários cadastrados no parceiro comercial
            </label>

            {!form.banking.usePartnerData && (
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Banco</label>
                  <input
                    type="text"
                    value={form.banking.bankCode}
                    onChange={(e) => updateNested('banking', 'bankCode', e.target.value)}
                    placeholder="001 - Banco do Brasil"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Agência / Conta</label>
                  <input
                    type="text"
                    value={form.banking.account}
                    onChange={(e) => updateNested('banking', 'account', e.target.value)}
                    placeholder="1234-5 / 98765-4"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail para Borderô</label>
                  <input
                    type="email"
                    value={form.banking.statementEmail}
                    onChange={(e) => updateNested('banking', 'statementEmail', e.target.value)}
                    placeholder="financeiro@empresa.com"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Materiais de Divulgação (Mídia)" description="URLs de imagens salvas no Firebase Storage.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Imagem Principal (Square 1080x1080)</label>
                <input
                  type="url"
                  value={form.media.mainImageUrl}
                  onChange={(e) => updateNested('media', 'mainImageUrl', e.target.value)}
                  placeholder="https://firebasestorage.googleapis.com/..."
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Horizontal (1170x430)</label>
                <input
                  type="url"
                  value={form.media.horizontalImageUrl}
                  onChange={(e) => updateNested('media', 'horizontalImageUrl', e.target.value)}
                  placeholder="https://firebasestorage.googleapis.com/..."
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Link de Vídeo Promocional (YouTube/Vimeo)</label>
                <input
                  type="url"
                  value={form.media.promotionalVideoUrl}
                  onChange={(e) => updateNested('media', 'promotionalVideoUrl', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Release & Conteúdo" description="Descrição detalhada para os visitantes.">
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Escreva a apresentação e diferenciais da atração..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium outline-none focus:border-emerald-500"
            />
          </SectionCard>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Voltar para Etapa 1
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              Avançar para Etapa 3
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ATR-004 Categoria & Lote Inicial */}
      {step === 3 && (
        <div className="space-y-6">
          <SectionCard title="Configuração Inicial de Ingressos" description="Adicione a primeira categoria agora ou configure depois.">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.ticketCategory.createNow}
                  onChange={(e) => updateNested('ticketCategory', 'createNow', e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-600"
                />
                Criar primeira categoria de ingresso agora (Recomendado)
              </label>

              {form.ticketCategory.createNow && (
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Categoria</label>
                    <input
                      type="text"
                      value={form.ticketCategory.name}
                      onChange={(e) => updateNested('ticketCategory', 'name', e.target.value)}
                      placeholder="Ex: Adulto (Inteira) ou Estudante"
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Valor Padrão (R$)</label>
                    <input
                      type="number"
                      step="0.50"
                      value={form.ticketCategory.price}
                      onChange={(e) => updateNested('ticketCategory', 'price', Number(e.target.value))}
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-emerald-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quantidade de Ingressos</label>
                    <input
                      type="number"
                      value={form.ticketCategory.quantity}
                      onChange={(e) => updateNested('ticketCategory', 'quantity', Number(e.target.value))}
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Código do Lote</label>
                    <input
                      type="text"
                      value={form.ticketCategory.batchCode}
                      onChange={(e) => updateNested('ticketCategory', 'batchCode', e.target.value)}
                      placeholder="001"
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Voltar para Etapa 2
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              <Save size={16} />
              Finalizar e Salvar Atração
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-left">
      <div className="mb-4 border-b border-slate-100 pb-3">
        <h3 className="text-base font-black text-slate-900">{title}</h3>
        {description && <p className="text-xs text-slate-500 font-medium">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default AttractionWizardPage;
