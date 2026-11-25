import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agencyService } from '../services/agencyService';
import { 
  Building2, 
  UserCheck, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Save,
  DollarSign,
  Briefcase,
  Search
} from 'lucide-react';

export default function AgencyFormPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();
  const isEditing = Boolean(agencyId);

  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Seção 1: Dados Cadastrais
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    telefone: '',
    email: '',
    site: '',
    comissaoPadrao: 12.0,
    limiteCredito: 30000.00,

    // Seção 2: Responsável Comercial
    responsavelComercial: {
      nome: '',
      cargo: '',
      cpf: '',
      whatsapp: '',
      email: ''
    },

    // Seção 3: Endereço Sede
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: 'Curitiba',
      uf: 'PR'
    }
  });

  // Carregar dados se for edição
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      agencyService.getAgencyById(agencyId)
        .then((res) => {
          if (res.success && res.data) {
            const data = res.data;
            setFormData({
              nomeFantasia: data.nomeFantasia || '',
              razaoSocial: data.razaoSocial || '',
              cnpj: data.cnpj || '',
              inscricaoEstadual: data.inscricaoEstadual || '',
              telefone: data.telefone || '',
              email: data.email || '',
              site: data.site || '',
              comissaoPadrao: data.comissaoPadrao || 12.0,
              limiteCredito: data.limiteCredito || 30000.00,
              responsavelComercial: {
                nome: data.responsavelComercial?.nome || data.responsavel || '',
                cargo: data.responsavelComercial?.cargo || '',
                cpf: data.responsavelComercial?.cpf || '',
                whatsapp: data.responsavelComercial?.whatsapp || data.telefone || '',
                email: data.responsavelComercial?.email || data.email || ''
              },
              endereco: {
                cep: data.endereco?.cep || '',
                logradouro: data.endereco?.logradouro || '',
                numero: data.endereco?.numero || '',
                complemento: data.endereco?.complemento || '',
                bairro: data.endereco?.bairro || '',
                cidade: data.endereco?.cidade || data.cidade || 'Curitiba',
                uf: data.endereco?.uf || data.uf || 'PR'
              }
            });
          }
        })
        .catch((err) => {
          showToast('Erro ao carregar dados da agência.', 'error');
        })
        .finally(() => setLoading(false));
    }
  }, [agencyId, isEditing]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Validação por Etapa
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.nomeFantasia.trim()) errs.nomeFantasia = 'Nome Fantasia é obrigatório';
      if (!formData.razaoSocial.trim()) errs.razaoSocial = 'Razão Social é obrigatória';
      if (!formData.cnpj.trim()) errs.cnpj = 'CNPJ é obrigatório';
      if (!formData.email.trim()) errs.email = 'E-mail comercial é obrigatório';
    }
    if (step === 2) {
      if (!formData.responsavelComercial.nome.trim()) errs.responsavelNome = 'Nome do responsável é obrigatório';
      if (!formData.responsavelComercial.email.trim()) errs.responsavelEmail = 'E-mail do responsável é obrigatório';
    }
    if (step === 3) {
      if (!formData.endereco.logradouro.trim()) errs.logradouro = 'Logradouro é obrigatório';
      if (!formData.endereco.cidade.trim()) errs.cidade = 'Cidade é obrigatória';
      if (!formData.endereco.uf.trim()) errs.uf = 'UF é obrigatória';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // Consulta mock de CEP
  const handleCepBlur = () => {
    const cleanCep = formData.endereco.cep.replace(/\D/g, '');
    if (cleanCep === '80020000' || cleanCep.length === 8) {
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          logradouro: prev.endereco.logradouro || 'Rua XV de Novembro',
          bairro: prev.endereco.bairro || 'Centro',
          cidade: prev.endereco.cidade || 'Curitiba',
          uf: prev.endereco.uf || 'PR'
        }
      }));
    }
  };

  // Submit Final
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;

    setSaving(true);
    try {
      if (isEditing) {
        await agencyService.updateAgency(agencyId, formData);
        showToast('Agência atualizada com sucesso!');
        setTimeout(() => navigate(`/agencias/${agencyId}`), 1000);
      } else {
        const res = await agencyService.createAgency(formData);
        showToast('Agência cadastrada! Status: Aguardando Aprovação (pending_approval)');
        setTimeout(() => navigate(`/agencias/${res.data.id}`), 1200);
      }
    } catch (error) {
      showToast('Erro ao salvar formulário de agência', 'error');
    } finally {
      setSaving(false);
    }
  };

  const stepsHeader = [
    { number: 1, label: 'Dados da Empresa', icon: Building2 },
    { number: 2, label: 'Responsável Comercial', icon: UserCheck },
    { number: 3, label: 'Endereço & Sede', icon: MapPin }
  ];

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <button
            onClick={() => navigate('/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Gestão de Agências
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isEditing ? `Editar Agência ${agencyId}` : 'Cadastrar Nova Agência B2B'}
          </h1>
        </div>

        <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-lg">
          Status Inicial: pending_approval
        </span>
      </div>

      {/* STEPS INDICATOR */}
      <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
        {stepsHeader.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.number;
          const isCompleted = activeStep > step.number;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => {
                if (step.number < activeStep || validateStep(activeStep)) {
                  setActiveStep(step.number);
                }
              }}
              className={`
                flex items-center justify-center sm:justify-start gap-2.5 p-3 rounded-lg text-xs font-semibold transition-all border
                ${isActive 
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs font-bold' 
                  : isCompleted 
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700' 
                  : 'bg-slate-50 border-transparent text-slate-500'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0
                ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}
              `}>
                {isCompleted ? '✓' : step.number}
              </div>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
        {/* ETAPA 1: DADOS DA EMPRESA */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Dados Cadastrais da Empresa
              </h2>
              <p className="text-[11px] text-slate-500">Informações jurídicas e fiscais para emissão de contrato B2B.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nome Fantasia *
                </label>
                <input
                  type="text"
                  value={formData.nomeFantasia}
                  onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
                  placeholder="Ex: Tour CWB Premium"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.nomeFantasia ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.nomeFantasia && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.nomeFantasia}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Razão Social *
                </label>
                <input
                  type="text"
                  value={formData.razaoSocial}
                  onChange={(e) => setFormData({ ...formData, razaoSocial: e.target.value })}
                  placeholder="Ex: Turismo Curitiba 360 Ltda"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.razaoSocial ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.razaoSocial && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.razaoSocial}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  CNPJ *
                </label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  placeholder="00.000.000/0001-00"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg font-mono focus:outline-none focus:ring-2 ${
                    errors.cnpj ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.cnpj && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.cnpj}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Inscrição Estadual (IE)
                </label>
                <input
                  type="text"
                  value={formData.inscricaoEstadual}
                  onChange={(e) => setFormData({ ...formData, inscricaoEstadual: e.target.value })}
                  placeholder="Digite a IE ou ISENTO"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  E-mail Comercial *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@agencia.com.br"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Telefone Comercial
                </label>
                <input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(41) 3333-4444"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Comissão Padrão (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.comissaoPadrao}
                  onChange={(e) => setFormData({ ...formData, comissaoPadrao: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 font-semibold text-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Limite de Crédito Inicial (R$)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={formData.limiteCredito}
                  onChange={(e) => setFormData({ ...formData, limiteCredito: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 font-semibold text-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: RESPONSÁVEL COMERCIAL */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Dados do Responsável Comercial
              </h2>
              <p className="text-[11px] text-slate-500">Pessoa física autorizada a responder legalmente e assinar a convenção.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nome Completo do Responsável *
                </label>
                <input
                  type="text"
                  value={formData.responsavelComercial.nome}
                  onChange={(e) => setFormData({
                    ...formData,
                    responsavelComercial: { ...formData.responsavelComercial, nome: e.target.value }
                  })}
                  placeholder="Ex: Maria Oliveira"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.responsavelNome ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.responsavelNome && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.responsavelNome}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cargo na Empresa
                </label>
                <input
                  type="text"
                  value={formData.responsavelComercial.cargo}
                  onChange={(e) => setFormData({
                    ...formData,
                    responsavelComercial: { ...formData.responsavelComercial, cargo: e.target.value }
                  })}
                  placeholder="Ex: Diretora Comercial / Sócia"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  CPF do Responsável
                </label>
                <input
                  type="text"
                  value={formData.responsavelComercial.cpf}
                  onChange={(e) => setFormData({
                    ...formData,
                    responsavelComercial: { ...formData.responsavelComercial, cpf: e.target.value }
                  })}
                  placeholder="000.000.000-00"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  E-mail do Responsável *
                </label>
                <input
                  type="email"
                  value={formData.responsavelComercial.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    responsavelComercial: { ...formData.responsavelComercial, email: e.target.value }
                  })}
                  placeholder="maria@agencia.com.br"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.responsavelEmail ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.responsavelEmail && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.responsavelEmail}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  WhatsApp / Celular Direto
                </label>
                <input
                  type="text"
                  value={formData.responsavelComercial.whatsapp}
                  onChange={(e) => setFormData({
                    ...formData,
                    responsavelComercial: { ...formData.responsavelComercial, whatsapp: e.target.value }
                  })}
                  placeholder="(41) 99999-8888"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 3: ENDEREÇO SDE */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Endereço da Sede Operacional
              </h2>
              <p className="text-[11px] text-slate-500">Localização física para verificação e inclusão no contrato.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  CEP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.endereco.cep}
                    onChange={(e) => setFormData({
                      ...formData,
                      endereco: { ...formData.endereco, cep: e.target.value }
                    })}
                    onBlur={handleCepBlur}
                    placeholder="80020-000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-500/20"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Logradouro *
                </label>
                <input
                  type="text"
                  value={formData.endereco.logradouro}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, logradouro: e.target.value }
                  })}
                  placeholder="Rua, Avenida, Alameda..."
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.logradouro ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.logradouro && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.logradouro}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Número
                </label>
                <input
                  type="text"
                  value={formData.endereco.numero}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, numero: e.target.value }
                  })}
                  placeholder="123"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  value={formData.endereco.complemento}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, complemento: e.target.value }
                  })}
                  placeholder="Cj 501, Bloco A"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  value={formData.endereco.bairro}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, bairro: e.target.value }
                  })}
                  placeholder="Centro"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={formData.endereco.cidade}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, cidade: e.target.value }
                  })}
                  placeholder="Curitiba"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.cidade ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.cidade && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.cidade}</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Estado (UF) *
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.endereco.uf}
                  onChange={(e) => setFormData({
                    ...formData,
                    endereco: { ...formData.endereco, uf: e.target.value.toUpperCase() }
                  })}
                  placeholder="PR"
                  className={`w-full p-2.5 bg-slate-50 border rounded-lg uppercase focus:outline-none focus:ring-2 ${
                    errors.uf ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {errors.uf && <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.uf}</p>}
              </div>
            </div>
          </div>
        )}

        {/* NAVEGAÇÃO E SUBMIT DO FORMULÁRIO */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={activeStep === 1}
            onClick={handlePrevStep}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-semibold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Anterior
          </button>

          <div className="flex items-center gap-2">
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                Próximo Passo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Gravando...' : isEditing ? 'Salvar Alterações' : 'Concluir Cadastro (pending_approval)'}</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
