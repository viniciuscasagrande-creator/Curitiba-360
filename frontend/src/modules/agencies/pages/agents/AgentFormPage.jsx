import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agentService } from '../../services/agentService';
import PermissionMatrix from '../../components/agents/PermissionMatrix';
import { 
  User, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Building2, 
  CreditCard,
  Image as ImageIcon
} from 'lucide-react';

export default function AgentFormPage() {
  const navigate = useNavigate();
  const { agencyId, agentId } = useParams();
  const isEditing = Boolean(agentId);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    whatsapp: '',
    cidade: 'Curitiba',
    uf: 'PR',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    cargo: 'Agente Comercial',
    supervisor: 'Maria Oliveira',
    tipoComissao: 'percentual',
    taxaComissao: 5.0,
    comissaoFixaPorVenda: 0.0,
    pix: {
      tipo: 'CPF',
      chave: '',
      banco: 'Banco do Brasil (001)',
      agencia: '',
      conta: ''
    },
    permissoes: {
      podeVender: true,
      podeCancelar: false,
      podeSolicitarRepasse: true,
      podeVisualizarFinanceiro: false,
      podeEmitirVoucher: false,
      podeValidarIngresso: true,
      podeEditarCliente: true,
      podeGerarCupons: false
    }
  });

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      agentService.getAgentById(agentId)
        .then((res) => {
          if (res.success && res.data) {
            const a = res.data;
            setFormData({
              nome: a.nome || '',
              cpf: a.cpf || '',
              email: a.email || '',
              telefone: a.telefone || '',
              whatsapp: a.whatsapp || '',
              cidade: a.cidade || 'Curitiba',
              uf: a.uf || 'PR',
              fotoUrl: a.fotoUrl || '',
              cargo: a.cargo || 'Agente Comercial',
              supervisor: a.supervisor || '',
              tipoComissao: a.tipoComissao || 'percentual',
              taxaComissao: a.taxaComissao || 5.0,
              comissaoFixaPorVenda: a.comissaoFixaPorVenda || 0.0,
              pix: a.pix || { tipo: 'CPF', chave: a.cpf || '', banco: 'Banco do Brasil (001)', agencia: '', conta: '' },
              permissoes: a.permissoes || {}
            });
          }
        })
        .catch(() => showToast('Erro ao carregar dados do agente', 'error'))
        .finally(() => setLoading(false));
    }
  }, [agentId, isEditing]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const validate = () => {
    const errs = {};
    if (!formData.nome.trim()) errs.nome = 'Nome do agente é obrigatório';
    if (!formData.cpf.trim()) errs.cpf = 'CPF é obrigatório';
    if (!formData.email.trim()) errs.email = 'E-mail é obrigatório';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      if (isEditing) {
        await agentService.updateAgent(agentId, formData);
        showToast('Agente atualizado com sucesso!');
        setTimeout(() => navigate(`/agencias/${agencyId}/agentes/${agentId}`), 1000);
      } else {
        const res = await agentService.createAgent(agencyId, formData);
        showToast('Agente cadastrado e liberado para vendas!');
        setTimeout(() => navigate(`/agencias/${agencyId}/agentes/${res.data.id}`), 1200);
      }
    } catch (err) {
      showToast('Erro ao salvar agente', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando agente...</p>
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
            onClick={() => navigate(`/agencias/${agencyId}/agentes`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Agentes da Agência
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isEditing ? `Editar Agente ${agentId}` : 'Cadastrar Novo Agente Comercial'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* BLOCO 1: DADOS PESSOAIS & CONTATO */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" /> Dados Pessoais & Foto de Perfil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">URL da Foto de Perfil</label>
              <input
                type="text"
                value={formData.fotoUrl}
                onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                placeholder="https://..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Nome Completo do Agente *</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Carolina Ferraz"
                className={`w-full p-2.5 bg-slate-50 border rounded-lg ${errors.nome ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.nome && <p className="text-[10px] text-red-600 mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">CPF *</label>
              <input
                type="text"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                placeholder="000.000.000-00"
                className={`w-full p-2.5 bg-slate-50 border rounded-lg font-mono ${errors.cpf ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.cpf && <p className="text-[10px] text-red-600 mt-1">{errors.cpf}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">E-mail Comercial *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="carolina@agencia.com.br"
                className={`w-full p-2.5 bg-slate-50 border rounded-lg ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
              />
              {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value, whatsapp: e.target.value })}
                placeholder="(41) 99999-0000"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Cidade</label>
              <input
                type="text"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">UF</label>
              <input
                type="text"
                maxLength={2}
                value={formData.uf}
                onChange={(e) => setFormData({ ...formData, uf: e.target.value.toUpperCase() })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg uppercase"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Cargo / Função</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Ex: Agente Senior B2B"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* BLOCO 2: REGRAS DE COMISSÃO & BANCO/PIX */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" /> Comissão Comercial & Dados PIX
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipo de Comissão</label>
              <select
                value={formData.tipoComissao}
                onChange={(e) => setFormData({ ...formData, tipoComissao: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
              >
                <option value="percentual">Percentual (%)</option>
                <option value="fixo">Valor Fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {formData.tipoComissao === 'percentual' ? 'Taxa (%)' : 'Valor Fixo (R$)'}
              </label>
              <input
                type="number"
                step="0.5"
                value={formData.tipoComissao === 'percentual' ? formData.taxaComissao : formData.comissaoFixaPorVenda}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  if (formData.tipoComissao === 'percentual') setFormData({ ...formData, taxaComissao: val });
                  else setFormData({ ...formData, comissaoFixaPorVenda: val });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipo de Chave PIX</label>
              <select
                value={formData.pix.tipo}
                onChange={(e) => setFormData({ ...formData, pix: { ...formData.pix, tipo: e.target.value } })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="CPF">CPF</option>
                <option value="E-mail">E-mail</option>
                <option value="Telefone">Telefone</option>
                <option value="Aleatória">Chave Aleatória</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Chave PIX para Repasses</label>
              <input
                type="text"
                value={formData.pix.chave || formData.cpf}
                onChange={(e) => setFormData({ ...formData, pix: { ...formData.pix, chave: e.target.value } })}
                placeholder="Insira a chave PIX"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome do Banco</label>
              <input
                type="text"
                value={formData.pix.banco}
                onChange={(e) => setFormData({ ...formData, pix: { ...formData.pix, banco: e.target.value } })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* BLOCO 3: MATRIZ DE PERMISSÕES BO-01 */}
        <PermissionMatrix
          permissions={formData.permissoes}
          onChangePermission={(key, val) => {
            setFormData({
              ...formData,
              permissoes: { ...formData.permissoes, [key]: val }
            });
          }}
        />

        {/* SUBMIT */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(`/agencias/${agencyId}/agentes`)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Gravando...' : isEditing ? 'Salvar Alterações' : 'Concluir Cadastro do Agente'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
