import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { crmService } from '../../services/crmService';
import CrmSegmentBadges from '../../components/crm/CrmSegmentBadges';
import CrmTimeline from '../../components/crm/CrmTimeline';
import CustomerActionModal from '../../components/crm/CustomerActionModal';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  Send, 
  CheckCircle2,
  Tag
} from 'lucide-react';

export default function CustomerDetail360Page() {
  const navigate = useNavigate();
  const { agentId, customerId } = useParams();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActionModal, setShowActionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadCustomer = async () => {
    setLoading(true);
    try {
      const res = await crmService.getCustomerById(customerId);
      if (res.success) setCustomer(res.data);
    } catch (err) {
      showToast('Erro ao carregar visão 360 do cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleActionComplete = async (type, data) => {
    if (customer) {
      await crmService.addInteraction(customer.id, {
        tipo: type,
        descricao: `Ação comercial (${type.toUpperCase()}): ${data.mensagem || data.cupomCodigo}`,
        usuario: 'Carolina Ferraz'
      });
      showToast(`Ação "${type.toUpperCase()}" registrada com sucesso!`);
      loadCustomer();
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando visão 360° do cliente...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-4 max-w-lg mx-auto">
        <User className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-lg font-bold text-slate-800">Cliente não encontrado</h2>
        <button
          onClick={() => navigate(`/agentes/${agentId || 'AGT-2001'}/crm`)}
          className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
        >
          Voltar para CRM
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

      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(`/agentes/${agentId || 'AGT-2001'}/crm`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Carteira CRM
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {customer.nome}
            </h1>
            <CrmSegmentBadges segmento={customer.segmento} />
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            CPF: <span className="font-mono text-slate-800">{customer.cpf}</span> | E-mail: <span className="font-semibold text-slate-800">{customer.email}</span> | Telefone: <span className="font-semibold text-slate-800">{customer.telefone}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowActionModal(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Registrar Ação Comercial
          </button>
        </div>
      </div>

      {/* CARDS KPIS LTV DO CLIENTE */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">LTV Acumulado (Lifetime Value)</span>
          <div className="text-2xl font-extrabold text-emerald-700">
            R$ {customer.ltv?.toFixed(2)}
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold">Faturamento histórico acumulado</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Total de Compras</span>
          <div className="text-2xl font-extrabold text-slate-900">
            {customer.totalCompras} pedidos
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Última compra: {customer.ultimaCompraData}</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Ticket Médio</span>
          <div className="text-2xl font-extrabold text-blue-700">
            R$ {customer.ticketMedio?.toFixed(2)}
          </div>
          <p className="text-[10px] text-blue-600 font-medium">Média por ingresso</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-slate-500 font-semibold block">Frequência Médian</span>
          <div className="text-2xl font-extrabold text-purple-700">
            A cada {customer.frequenciaMeses} meses
          </div>
          <p className="text-[10px] text-purple-600 font-medium">Cadência de compras</p>
        </div>
      </div>

      {/* PAINEL DIVIDIDO: HISTÓRICO DE COMPRAS vs INTERAÇÕES TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Histórico de Compras */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-slate-900 border-b pb-3 border-slate-100 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-purple-600" /> Histórico de Compras & Bilhetes Emitidos
          </h3>

          <div className="space-y-3">
            {(customer.historicoCompras || []).map((ped) => (
              <div key={ped.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-900 text-xs block">{ped.id}</span>
                  <span className="font-semibold text-slate-800">{ped.evento}</span>
                  <div className="text-[10px] text-slate-400">Data: {ped.data}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-emerald-700 text-sm">R$ {ped.valor?.toFixed(2)}</div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ✓ {ped.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline 360 */}
        <CrmTimeline interacoes={customer.interacoes} />
      </div>

      {/* MODAL DE AÇÃO COMERCIAL */}
      <CustomerActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        customer={customer}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
