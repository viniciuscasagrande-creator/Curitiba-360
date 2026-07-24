import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, CreditCard, Landmark, User, Upload } from 'lucide-react';

export default function AgencyWizard({ onSubmit, onCancel, isSubmitting }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Etapa 1 - Empresa
    logo: '',
    tradeName: '',
    companyName: '',
    document: '',
    companyType: 'LTDA',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',
    phone: '',
    website: '',
    stateRegistration: '',

    // Etapa 2 - Responsável
    responsibleName: '',
    responsibleCpf: '',
    responsibleBirthDate: '',
    responsiblePhone: '',
    responsibleEmail: '',
    language: 'Português',
    password: '',
    confirmPassword: '',

    // Etapa 3 - Financeiro
    bank: 'Banco Santander',
    bankCode: '033',
    accountType: 'Conta corrente',
    agency: '',
    account: '',
    pixKey: '',
    pixType: 'E-mail',
    bankHolder: '',
  });

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext(e) {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  }

  function handlePrev() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left max-w-4xl mx-auto space-y-6">
      {/* Wizard Steps Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <StepIndicator number={1} title="Empresa" active={step === 1} completed={step > 1} icon={Building2} />
        <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
        <StepIndicator number={2} title="Responsável" active={step === 2} completed={step > 2} icon={User} />
        <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
        <StepIndicator number={3} title="Dados Bancários" active={step === 3} completed={step === 3} icon={CreditCard} />
      </div>

      <form onSubmit={step === 3 ? handleSubmitForm : handleNext} className="space-y-6">
        {/* ETAPA 1 - EMPRESA */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Etapa 1: Dados da Empresa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <InputField label="Nome Fantasia *" value={formData.tradeName} onChange={(v) => handleChange('tradeName', v)} required />
              <InputField label="Razão Social *" value={formData.companyName} onChange={(v) => handleChange('companyName', v)} required />
              <InputField label="CNPJ *" value={formData.document} onChange={(v) => handleChange('document', v)} placeholder="00.000.000/0001-00" required />
              <SelectField label="Tipo da Empresa" value={formData.companyType} onChange={(v) => handleChange('companyType', v)} options={['LTDA', 'S/A', 'EIRELI', 'MEI', 'Outros']} />
              <InputField label="Telefone Comercial *" value={formData.phone} onChange={(v) => handleChange('phone', v)} required />
              <InputField label="Website / Portal" value={formData.website} onChange={(v) => handleChange('website', v)} placeholder="https://" />
              <InputField label="Inscrição Estadual" value={formData.stateRegistration} onChange={(v) => handleChange('stateRegistration', v)} />
              <InputField label="CEP *" value={formData.zipCode} onChange={(v) => handleChange('zipCode', v)} required />
              <InputField label="Endereço *" value={formData.address} onChange={(v) => handleChange('address', v)} required />
              <InputField label="Número *" value={formData.number} onChange={(v) => handleChange('number', v)} required />
              <InputField label="Complemento" value={formData.complement} onChange={(v) => handleChange('complement', v)} />
              <InputField label="Cidade *" value={formData.city} onChange={(v) => handleChange('city', v)} required />
            </div>
          </div>
        )}

        {/* ETAPA 2 - RESPONSÁVEL */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Etapa 2: Gestor Principal / Responsável
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <InputField label="Nome Completo *" value={formData.responsibleName} onChange={(v) => handleChange('responsibleName', v)} required />
              <InputField label="CPF *" value={formData.responsibleCpf} onChange={(v) => handleChange('responsibleCpf', v)} required />
              <InputField label="E-mail Principal *" type="email" value={formData.responsibleEmail} onChange={(v) => handleChange('responsibleEmail', v)} required />
              <InputField label="Telefone Celular *" value={formData.responsiblePhone} onChange={(v) => handleChange('responsiblePhone', v)} required />
              <InputField label="Data de Nascimento" type="date" value={formData.responsibleBirthDate} onChange={(v) => handleChange('responsibleBirthDate', v)} />
              <SelectField label="Idioma de Preferência" value={formData.language} onChange={(v) => handleChange('language', v)} options={['Português', 'Inglês', 'Espanhol']} />
              <InputField label="Senha de Acesso *" type="password" value={formData.password} onChange={(v) => handleChange('password', v)} required />
              <InputField label="Confirmar Senha *" type="password" value={formData.confirmPassword} onChange={(v) => handleChange('confirmPassword', v)} required />
            </div>
          </div>
        )}

        {/* ETAPA 3 - FINANCEIRO */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Etapa 3: Dados Bancários para Recebimento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <SelectField label="Banco *" value={formData.bank} onChange={(v) => handleChange('bank', v)} options={['Banco Santander', 'Banco do Brasil', 'Itaú Unibanco', 'Bradesco', 'Caixa Econômica Federal', 'Banco Inter', 'Nubank']} />
              <SelectField label="Tipo de Conta" value={formData.accountType} onChange={(v) => handleChange('accountType', v)} options={['Conta corrente', 'Conta poupança']} />
              <InputField label="Agência *" value={formData.agency} onChange={(v) => handleChange('agency', v)} required />
              <InputField label="Conta *" value={formData.account} onChange={(v) => handleChange('account', v)} required />
              <SelectField label="Tipo de Chave PIX" value={formData.pixType} onChange={(v) => handleChange('pixType', v)} options={['E-mail', 'CNPJ', 'CPF', 'Telefone', 'Chave Aleatória']} />
              <InputField label="Chave PIX *" value={formData.pixKey} onChange={(v) => handleChange('pixKey', v)} required />
              <InputField label="Titular da Conta *" value={formData.bankHolder} onChange={(v) => handleChange('bankHolder', v)} required />
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex justify-between border-t border-slate-200 pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-5 text-xs font-black text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="h-11 rounded-xl border border-slate-200 px-5 text-xs font-black text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              Próximo
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-6 text-xs font-black text-white hover:bg-emerald-700 shadow-xs"
            >
              <CheckCircle2 size={16} />
              Finalizar Cadastro de Agência
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepIndicator({ number, title, active, completed, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-2xl text-xs font-black transition ${
          completed
            ? 'bg-emerald-600 text-white'
            : active
            ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
            : 'bg-slate-100 text-slate-400'
        }`}
      >
        <Icon size={16} />
      </span>
      <span className={`text-xs font-black ${active || completed ? 'text-slate-900' : 'text-slate-400'}`}>
        {title}
      </span>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <label className="block text-left">
      <span className="mb-1 block font-black uppercase text-[10px] text-slate-500">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options = [] }) {
  return (
    <label className="block text-left">
      <span className="mb-1 block font-black uppercase text-[10px] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
