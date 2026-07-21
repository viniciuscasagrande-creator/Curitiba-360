import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { crmService } from '../../services/crmService';
import CrmSegmentBadges from '../../components/crm/CrmSegmentBadges';
import CustomerActionModal from '../../components/crm/CustomerActionModal';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Target,
  Mail,
  Phone
} from 'lucide-react';

export default function AgentCrmPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('todos');
  const [selectedCustomerForAction, setSelectedCustomerForAction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await crmService.listCustomers(agentId || 'AGT-2001', {
        search: searchQuery,
        segmento: segmentFilter
      });
      if (res.success) setCustomers(res.data);
    } catch (err) {
      showToast('Erro ao carregar clientes do CRM', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [agentId, searchQuery, segmentFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleActionComplete = async (type, data) => {
    if (selectedCustomerForAction) {
      await crmService.addInteraction(selectedCustomerForAction.id, {
        tipo: type,
        descricao: `Ação comercial (${type.toUpperCase()}): ${data.mensagem || data.cupomCodigo}`,
        usuario: 'Carolina Ferraz'
      });
      showToast(`Ação "${type.toUpperCase()}" registrada no histórico do cliente!`);
      loadCustomers();
    }
  };

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
            onClick={() => navigate('/agentes/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Agente
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 02
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Carteira de Clientes & CRM 360° 👥
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gestão avançada de relacionamento, segmentação por LTV, tags e histórico completo de compras.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={`/agentes/${agentId || 'AGT-2001'}/crm/oportunidades`}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <Target className="w-4 h-4" /> Funil de Oportunidades
          </Link>
        </div>
      </div>

      {/* BUSCA E FILTROS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por Nome, E-mail, CPF ou Cidade do cliente..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700"
          >
            <option value="todos">Todos os Segmentos</option>
            <option value="vip">Clientes VIP (Top 5%)</option>
            <option value="recorrente">Clientes Recorrentes</option>
            <option value="risco churn">Risco de Churn (Inativo 90d)</option>
          </select>
        </div>
      </div>

      {/* TABELA DE CLIENTES CRM */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 uppercase tracking-wider font-semibold text-[11px]">
                <th className="p-4">Cliente / ID</th>
                <th className="p-4">Contato & Localização</th>
                <th className="p-4">Segmentação</th>
                <th className="p-4 text-right">LTV Acumulado</th>
                <th className="p-4">Última Compra</th>
                <th className="p-4 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Carregando carteira de clientes...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Nenhum cliente encontrado no CRM.
                  </td>
                </tr>
              ) : (
                customers.map((cli) => (
                  <tr key={cli.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{cli.nome}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{cli.id} • CPF: {cli.cpf}</div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Mail className="w-3 h-3 text-slate-400" /> {cli.email}
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                        <Phone className="w-3 h-3 text-slate-400" /> {cli.telefone} ({cli.cidade})
                      </div>
                    </td>

                    <td className="p-4">
                      <CrmSegmentBadges segmento={cli.segmento} />
                    </td>

                    <td className="p-4 text-right font-extrabold text-emerald-700 text-sm">
                      R$ {cli.ltv?.toFixed(2)}
                    </td>

                    <td className="p-4">
                      <div>{cli.ultimaCompraData}</div>
                      <div className="text-[10px] text-slate-400">{cli.totalCompras} compras totais</div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedCustomerForAction(cli)}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Ação Comercial
                        </button>
                        <Link
                          to={`/agentes/${agentId || 'AGT-2001'}/crm/clientes/${cli.id}`}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver Visão 360°"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE AÇÃO COMERCIAL */}
      <CustomerActionModal
        isOpen={Boolean(selectedCustomerForAction)}
        onClose={() => setSelectedCustomerForAction(null)}
        customer={selectedCustomerForAction}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
