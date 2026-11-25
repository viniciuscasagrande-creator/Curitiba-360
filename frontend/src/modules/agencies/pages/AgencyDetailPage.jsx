import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { agencyService } from '../services/agencyService';
import AgencyStatusBadge from '../components/AgencyStatusBadge';
import { 
  Building2, 
  ArrowLeft, 
  Edit3, 
  FileText, 
  Users, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  UserCheck, 
  Globe, 
  Mail, 
  Phone,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function AgencyDetailPage() {
  const navigate = useNavigate();
  const { agencyId } = useParams();

  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadAgency = async () => {
    setLoading(true);
    try {
      const res = await agencyService.getAgencyById(agencyId);
      if (res.success && res.data) {
        setAgency(res.data);
      }
    } catch (err) {
      showToast('Erro ao carregar detalhes da agência', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgency();
  }, [agencyId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Simular aprovação/envio para Etapa 03
  const handleApproveAgency = async () => {
    try {
      await agencyService.bulkUpdateStatus([agencyId], 'pendente');
      showToast('Agência aprovada! Etapa 03: Minuta de contrato gerada e preparada para o DocuSign.');
      loadAgency();
    } catch (err) {
      showToast('Erro ao aprovar agência', 'error');
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando detalhes da agência...</p>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Agência não encontrada</h2>
        <button
          onClick={() => navigate('/agencias')}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/agencias')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Lista de Agências
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {agency.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {agency.nomeFantasia}
            </h1>
            <AgencyStatusBadge status={agency.status} />
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Razão Social: <span className="font-semibold text-slate-700">{agency.razaoSocial}</span> | CNPJ: <span className="font-mono text-slate-700">{agency.cnpj}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/agencias/${agency.id}/financeiro`}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" /> Carteira & Repasses PIX
          </Link>

          <Link
            to={`/agencias/${agency.id}/agentes`}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <Users className="w-4 h-4" /> Ver Agentes Vinculados
          </Link>

          <Link
            to={`/agencias/${agency.id}/editar`}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Editar Cadastro
          </Link>

          <Link
            to={`/agencias/${agency.id}/contrato`}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" /> Contrato & Ativação
          </Link>
        </div>
      </div>

      {/* INDICADORES PRINCIPAIS (KPI BADGES) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Indicador 1: Agentes */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-600" /> Agentes Autorizados
          </span>
          <div className="text-xl font-extrabold text-slate-900">{agency.qtdAgentes || 0} Agentes</div>
          <p className="text-[10px] text-slate-400">Vinculados nesta conta B2B</p>
        </div>

        {/* Indicador 2: Cidade / UF */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> Cidade Sede
          </span>
          <div className="text-xl font-extrabold text-slate-900">
            {agency.cidade || 'Curitiba'} - {agency.uf || 'PR'}
          </div>
          <p className="text-[10px] text-slate-400">Localização oficial</p>
        </div>

        {/* Indicador 3: Data de Cadastro */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-purple-600" /> Data de Cadastro
          </span>
          <div className="text-xl font-extrabold text-slate-900">{agency.dataCadastro || '2026-07-21'}</div>
          <p className="text-[10px] text-slate-400">Submetido ao sistema</p>
        </div>

        {/* Indicador 4: Limite e Comissão */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Limite & Comissão
          </span>
          <div className="text-xl font-extrabold text-emerald-600">
            R$ {agency.limiteCredito?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[10px] font-semibold text-blue-600">{agency.comissaoPadrao || 10}% de comissão</p>
        </div>
      </div>

      {/* DETALHES DIVIDIDOS EM BLOCOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BLOCO 1: DADOS DA EMPRESA */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" /> Informações Jurídicas & Fiscais
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Nome Fantasia:</span>
              <p className="font-semibold text-slate-900">{agency.nomeFantasia}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Razão Social:</span>
              <p className="font-semibold text-slate-900">{agency.razaoSocial}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">CNPJ:</span>
              <p className="font-mono font-semibold text-slate-800">{agency.cnpj}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Inscrição Estadual:</span>
              <p className="font-mono font-semibold text-slate-800">{agency.inscricaoEstadual || 'ISENTO'}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">E-mail Comercial:</span>
              <p className="font-semibold text-slate-800 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> {agency.email}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Telefone Comercial:</span>
              <p className="font-semibold text-slate-800 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" /> {agency.telefone || 'Não informado'}
              </p>
            </div>
            {agency.site && (
              <div className="col-span-2">
                <span className="text-slate-400 font-medium">Website Oficial:</span>
                <p className="font-semibold text-blue-600 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" /> {agency.site}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BLOCO 2: RESPONSÁVEL COMERCIAL */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" /> Responsável Comercial Legal
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Nome Completo:</span>
              <p className="font-semibold text-slate-900">
                {agency.responsavelComercial?.nome || agency.responsavel || 'Não informado'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Cargo:</span>
              <p className="font-semibold text-slate-900">
                {agency.responsavelComercial?.cargo || 'Diretor(a) / Sócio'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">CPF:</span>
              <p className="font-mono font-semibold text-slate-800">
                {agency.responsavelComercial?.cpf || 'Não informado'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">WhatsApp / Direto:</span>
              <p className="font-semibold text-slate-800">
                {agency.responsavelComercial?.whatsapp || agency.telefone || 'Não informado'}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">E-mail do Responsável:</span>
              <p className="font-semibold text-slate-800">
                {agency.responsavelComercial?.email || agency.email}
              </p>
            </div>
          </div>
        </div>

        {/* BLOCO 3: ENDEREÇO DA SEDE */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> Endereço Oficial da Sede
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium">CEP:</span>
              <p className="font-mono font-semibold text-slate-800">
                {agency.endereco?.cep || '80000-000'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Bairro:</span>
              <p className="font-semibold text-slate-800">
                {agency.endereco?.bairro || 'Centro'}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">Logradouro / Número:</span>
              <p className="font-semibold text-slate-800">
                {agency.endereco?.logradouro || 'Endereço não informado'}, {agency.endereco?.numero || 'S/N'}{' '}
                {agency.endereco?.complemento ? `(${agency.endereco.complemento})` : ''}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Cidade / UF:</span>
              <p className="font-semibold text-slate-800">
                {agency.cidade || 'Curitiba'} - {agency.uf || 'PR'}
              </p>
            </div>
          </div>
        </div>

        {/* BLOCO 4: FLUXO DE APROVAÇÃO BO-05 (PREPARAÇÃO ETAPA 03) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" /> Fluxo de Ativação & Contrato (BO-05)
          </h2>

          {/* Stepper BO-05 */}
          <div className="space-y-2 text-xs pt-1">
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-800">1. Cadastro Efetuado</span>
                <p className="text-[10px] text-slate-500">Status: pending_approval ({agency.dataCadastro})</p>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-2 rounded-lg ${agency.status !== 'pending_approval' ? 'bg-slate-50' : 'bg-amber-50 border border-amber-200'}`}>
              <Clock className={`w-4 h-4 shrink-0 ${agency.status !== 'pending_approval' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <span className="font-bold text-slate-800">2. Análise do Administrador</span>
                <p className="text-[10px] text-slate-500">
                  {agency.status === 'pending_approval' ? 'Aguardando validação dos documentos' : 'Concluída com sucesso'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg text-slate-400">
              <ChevronRight className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold">3. Geração do Contrato & DocuSign (Etapa 03)</span>
                <p className="text-[10px]">Próxima etapa: envio automático para assinatura digital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
