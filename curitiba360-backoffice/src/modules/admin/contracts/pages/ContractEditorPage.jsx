import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Landmark,
  Plus,
  Save,
  Settings2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { ROUTES } from '../../../../routes/routePaths';

import {
  commercialConditionsMock,
  contractPartnersMock,
  contractTemplatesMock,
  financialInformationMock
} from '../data/contractEditorMock';

import { generateContractPdf } from '../services/contractPdfService';

const contractSchema = z.object({
  partnerId: z.string().min(1, 'Selecione o parceiro comercial.'),
  attractionId: z.string().min(1, 'Selecione uma atração.'),
  contractNumber: z
    .string()
    .min(1, 'Informe o número do contrato.')
    .max(50),
  company: z.object({
    legalName: z.string().min(2, 'Informe a razão social.').max(150),
    cnpj: z.string().min(14, 'Informe o CNPJ.').max(20),
    address: z.string().max(200),
    city: z.string().max(100),
    state: z.string().max(2)
  }),
  commercialConditionId: z
    .string()
    .min(1, 'Selecione uma condição comercial.'),
  financialInformationId: z
    .string()
    .min(1, 'Selecione as informações financeiras.'),
  additionalInformation: z.string().max(4000),
  templateId: z.string().min(1)
});

const initialContract = {
  partnerId: '',
  attractionId: '',
  contractNumber: '',
  status: 'draft',

  templateId: 'commercial-agreement',

  company: {
    legalName: '',
    cnpj: '',
    address: '',
    city: '',
    state: ''
  },

  commercialConditionId: '',
  financialInformationId: '',
  additionalInformation: '',

  createdAt: '',
  updatedAt: ''
};

const panelTabs = [
  {
    id: 'information',
    label: 'Informações do contrato'
  },
  {
    id: 'conditions',
    label: 'Condições'
  }
];

export function ContractEditorPage() {
  const navigate = useNavigate();
  const { contractId } = useParams();

  const editing = Boolean(contractId);

  const [form, setForm] = useState({
    ...initialContract,
    contractNumber: editing ? contractId : ''
  });

  const [activeTab, setActiveTab] = useState('information');
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const selectedPartner = useMemo(
    () =>
      contractPartnersMock.find(
        (partner) => partner.id === form.partnerId
      ),
    [form.partnerId]
  );

  const availableAttractions =
    selectedPartner?.attractions || [];

  const selectedAttraction = useMemo(
    () =>
      availableAttractions.find(
        (attraction) => attraction.id === form.attractionId
      ),
    [availableAttractions, form.attractionId]
  );

  const selectedTemplate = useMemo(
    () =>
      contractTemplatesMock.find(
        (template) => template.id === form.templateId
      ),
    [form.templateId]
  );

  const selectedCommercialCondition = useMemo(
    () =>
      commercialConditionsMock.find(
        (condition) =>
          condition.id === form.commercialConditionId
      ),
    [form.commercialConditionId]
  );

  const selectedFinancialInformation = useMemo(
    () =>
      financialInformationMock.find(
        (information) =>
          information.id === form.financialInformationId
      ),
    [form.financialInformationId]
  );

  const progress = useMemo(() => {
    const requiredValues = [
      form.partnerId,
      form.attractionId,
      form.contractNumber,
      form.company.legalName,
      form.company.cnpj,
      form.commercialConditionId,
      form.financialInformationId
    ];

    const completed = requiredValues.filter(
      (value) => String(value || '').trim().length > 0
    ).length;

    return Math.round(
      (completed / requiredValues.length) * 100
    );
  }, [form]);

  function updateField(field, value) {
    setDirty(true);
    setSaved(false);
    setErrors((current) => ({
      ...current,
      [field]: ''
    }));

    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateCompanyField(field, value) {
    setDirty(true);
    setSaved(false);
    setErrors((current) => ({
      ...current,
      [`company.${field}`]: ''
    }));

    setForm((current) => ({
      ...current,
      company: {
        ...current.company,
        [field]: value
      }
    }));
  }

  function selectPartner(partnerId) {
    const partner = contractPartnersMock.find(
      (item) => item.id === partnerId
    );

    setDirty(true);
    setSaved(false);

    setForm((current) => ({
      ...current,
      partnerId,
      attractionId: '',
      company: {
        ...current.company,
        legalName: partner?.legalName || '',
        cnpj: partner?.document || ''
      }
    }));
  }

  function validate() {
    const result = contractSchema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    const nextErrors = {};

    result.error.issues.forEach((issue) => {
      nextErrors[issue.path.join('.')] = issue.message;
    });

    setErrors(nextErrors);
    return false;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      ...form,
      id: editing
        ? contractId
        : `CTR-${Date.now().toString().slice(-6)}`,
      updatedAt: new Date().toISOString(),
      createdAt:
        form.createdAt || new Date().toISOString()
    };

    console.log(
      editing ? 'Atualizando contrato' : 'Criando contrato',
      payload
    );

    setSaved(true);
    setDirty(false);
  }

  function handlePreview() {
    if (!validate()) {
      window.alert(
        'Preencha os campos obrigatórios antes de gerar o preview.'
      );
      return;
    }

    generateContractPdf({
      contract: form,
      partner: selectedPartner,
      attraction: selectedAttraction,
      template: selectedTemplate,
      commercialCondition: selectedCommercialCondition,
      financialInformation: selectedFinancialInformation
    });
  }

  function handleBack() {
    if (
      dirty &&
      !window.confirm(
        'Existem alterações não salvas. Deseja sair mesmo assim?'
      )
    ) {
      return;
    }

    navigate(ROUTES.admin.contracts);
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 text-left">
      <form onSubmit={handleSave}>
        <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Voltar para contratos
            </button>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Gestão de contratos
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {editing ? 'Editar contrato' : 'Novo contrato'}
            </h1>

            <p className="mt-2 text-sm text-slate-500 font-medium">
              Configure as partes, o documento e as condições comerciais.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-xs"
            >
              <Eye size={18} />
              Preview PDF
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 shadow-xs"
            >
              {saved ? <Check size={18} /> : <Save size={18} />}

              {saved ? 'Salvo' : 'Salvar contrato'}
            </button>
          </div>
        </header>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black text-slate-900">
                Progresso do contrato
              </p>

              <p className="mt-1 text-xs text-slate-500 font-medium">
                Complete os campos obrigatórios para finalizar.
              </p>
            </div>

            <strong className="text-sm text-emerald-700 font-bold">
              {progress}%
            </strong>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-300"
              style={{
                width: `${progress}%`
              }}
            />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_180px]">
            <SelectField
              label="Parceiro comercial"
              value={form.partnerId}
              error={errors.partnerId}
              icon={Building2}
              onChange={selectPartner}
              options={[
                {
                  value: '',
                  label: 'Selecione um parceiro'
                },
                ...contractPartnersMock.map((partner) => ({
                  value: partner.id,
                  label: partner.name
                }))
              ]}
            />

            <SelectField
              label="Atração"
              value={form.attractionId}
              error={errors.attractionId}
              icon={Building2}
              disabled={!selectedPartner}
              onChange={(value) =>
                updateField('attractionId', value)
              }
              options={[
                {
                  value: '',
                  label: selectedPartner
                    ? 'Selecione uma atração'
                    : 'Selecione o parceiro primeiro'
                },
                ...availableAttractions.map((attraction) => ({
                  value: attraction.id,
                  label: attraction.name
                }))
              ]}
            />

            <TextField
              label="ID do contrato"
              value={form.contractNumber}
              error={errors.contractNumber}
              onChange={(value) =>
                updateField('contractNumber', value)
              }
              placeholder="1234"
            />
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <ContractDocument
            template={selectedTemplate}
            partner={selectedPartner}
            attraction={selectedAttraction}
            form={form}
            commercialCondition={selectedCommercialCondition}
          />

          <aside className="self-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-28">
            <div className="flex border-b border-slate-200">
              {panelTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'relative flex-1 px-4 py-4 text-xs font-bold transition',
                    activeTab === tab.id
                      ? 'text-emerald-700'
                      : 'text-slate-500 hover:text-slate-900'
                  ].join(' ')}
                >
                  {tab.label}

                  {activeTab === tab.id && (
                    <span className="absolute inset-x-5 bottom-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-5 p-5">
              {activeTab === 'information' ? (
                <>
                  <PanelTitle
                    icon={FileText}
                    title="Dados do parceiro"
                    description="Informações exibidas no documento."
                  />

                  <TextField
                    label="Razão social"
                    value={form.company.legalName}
                    error={errors['company.legalName']}
                    onChange={(value) =>
                      updateCompanyField('legalName', value)
                    }
                  />

                  <TextField
                    label="CNPJ"
                    value={form.company.cnpj}
                    error={errors['company.cnpj']}
                    onChange={(value) =>
                      updateCompanyField('cnpj', value)
                    }
                    placeholder="00.000.000/0000-00"
                  />

                  <TextField
                    label="Endereço"
                    value={form.company.address}
                    onChange={(value) =>
                      updateCompanyField('address', value)
                    }
                  />

                  <div className="grid grid-cols-[1fr_100px] gap-3">
                    <TextField
                      label="Cidade"
                      value={form.company.city}
                      onChange={(value) =>
                        updateCompanyField('city', value)
                      }
                    />

                    <TextField
                      label="UF"
                      value={form.company.state}
                      maxLength={2}
                      onChange={(value) =>
                        updateCompanyField(
                          'state',
                          value.toUpperCase()
                        )
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <PanelTitle
                    icon={Settings2}
                    title="Condições do contrato"
                    description="Parâmetros comerciais e financeiros."
                  />

                  <SelectField
                    label="Condição comercial"
                    value={form.commercialConditionId}
                    error={errors.commercialConditionId}
                    onChange={(value) =>
                      updateField(
                        'commercialConditionId',
                        value
                      )
                    }
                    options={[
                      {
                        value: '',
                        label: 'Selecione uma condição'
                      },
                      ...commercialConditionsMock.map(
                        (condition) => ({
                          value: condition.id,
                          label: condition.name
                        })
                      )
                    ]}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        ROUTES.admin.commercialConditionCreate
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Plus size={16} />
                    Criar condição
                  </button>

                  <SelectField
                    label="Informações financeiras"
                    value={form.financialInformationId}
                    error={errors.financialInformationId}
                    icon={Landmark}
                    onChange={(value) =>
                      updateField(
                        'financialInformationId',
                        value
                      )
                    }
                    options={[
                      {
                        value: '',
                        label: 'Selecione as informações'
                      },
                      ...financialInformationMock.map(
                        (information) => ({
                          value: information.id,
                          label: information.name
                        })
                      )
                    ]}
                  />

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-700">
                      Informações adicionais
                    </span>

                    <textarea
                      value={form.additionalInformation}
                      maxLength={4000}
                      rows={8}
                      onChange={(event) =>
                        updateField(
                          'additionalInformation',
                          event.target.value
                        )
                      }
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
                      placeholder="Inclua observações e condições adicionais..."
                    />

                    <span className="mt-1 block text-right text-[10px] text-slate-400 font-mono">
                      {form.additionalInformation.length}/4000
                    </span>
                  </label>
                </>
              )}
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}

function ContractDocument({
  template,
  partner,
  attraction,
  form,
  commercialCondition
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200 pb-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">
          Curitiba 360
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
          {template?.title || 'Contrato'}
        </h2>

        <p className="mt-2 text-xs text-slate-500 font-medium">
          Contrato nº {form.contractNumber || 'não informado'}
        </p>
      </div>

      <div className="prose prose-slate mt-7 max-w-none text-sm leading-7 font-medium">
        <p>
          {template?.introduction}
        </p>

        <p>
          <strong>CONTRATANTE:</strong>{' '}
          {form.company.legalName || 'Razão social não informada'},
          inscrita no CNPJ sob o número{' '}
          {form.company.cnpj || 'não informado'}.
        </p>

        <p>
          <strong>PARCEIRO:</strong>{' '}
          {partner?.name || 'Parceiro não selecionado'}.
        </p>

        <p>
          <strong>ATRAÇÃO:</strong>{' '}
          {attraction?.name || 'Atração não selecionada'}.
        </p>

        {template?.clauses?.map((clause, index) => (
          <div key={clause.id} className="mt-6">
            <h3 className="text-sm font-black text-slate-900">
              {index + 1}. {clause.title}
            </h3>

            <p className="mt-2 text-slate-600">
              {clause.content}
            </p>
          </div>
        ))}

        <div className="mt-7 rounded-2xl bg-slate-50 p-4">
          <h3 className="text-sm font-black text-slate-900">
            Condição comercial vinculada
          </h3>

          <p className="mt-2 text-slate-600">
            {commercialCondition
              ? `${commercialCondition.name}, com taxa de ${commercialCondition.serviceFee}% e prazo de repasse de ${commercialCondition.paymentTermDays} dias.`
              : 'Nenhuma condição comercial selecionada.'}
          </p>
        </div>
      </div>
    </section>
  );
}

function PanelTitle({
  icon: Icon,
  title,
  description
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Icon size={19} />
      </span>

      <div>
        <h3 className="text-sm font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  error,
  placeholder = '',
  maxLength = 200,
  onChange
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={[
          'h-11 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition font-medium',
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
            : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
        ].join(' ')}
      />

      {error && (
        <span className="mt-1 block text-[11px] font-medium text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  error,
  disabled = false,
  icon: Icon,
  onChange
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </span>

      <span className="relative block">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
          />
        )}

        <select
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={[
            'h-11 w-full appearance-none rounded-2xl border bg-white pr-10 text-sm outline-none transition font-medium',
            Icon ? 'pl-10' : 'pl-4',
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
              : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10',
            disabled
              ? 'cursor-not-allowed bg-slate-100 text-slate-400'
              : 'text-slate-900'
          ].join(' ')}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </span>

      {error && (
        <span className="mt-1 block text-[11px] font-medium text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}

export default ContractEditorPage;
