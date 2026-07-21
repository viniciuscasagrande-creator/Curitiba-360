import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatusBadge from '../components/admin/StatusBadge';
import { Building2, Search, Filter, Plus, FileText, CheckCircle2, XCircle, Trash2, Edit } from 'lucide-react';

export default function GestaoAgencias() {
  const navigate = useNavigate();
  
  const [abaAtiva, setAbaAtiva] = useState('Todas');
  const [termoBusca, setTermoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);

  const [agencias] = useState([
    { id: 1, razaoSocial: 'Turismo Curitiba 360 Ltda', nomeFantasia: 'Tour CWB Premium', cnpj: '98.765.432/0001-10', status: 'ativo', responsavel: 'Maria Oliveira', qtdAgentes: 8, dataCadastro: '10/07/2026' },
    { id: 2, razaoSocial: 'Batel Agência de Viagens Eireli', nomeFantasia: 'Batel Turismo & Pass', cnpj: '12.222.333/0001-44', status: 'ativo', responsavel: 'Juliana Costa', qtdAgentes: 12, dataCadastro: '20/07/2026' },
    { id: 3, razaoSocial: 'Serra do Mar Operadora Turística', nomeFantasia: 'Serra do Mar Express', cnpj: '45.111.999/0001-88', status: 'pendente', responsavel: 'Carlos Eduardo', qtdAgentes: 3, dataCadastro: '21/07/2026' }
  ]);

  const agenciasFiltradas = agencias.filter(ag => {
    const matchBusca = 
      ag.razaoSocial.toLowerCase().includes(termoBusca.toLowerCase()) || 
      ag.nomeFantasia.toLowerCase().includes(termoBusca.toLowerCase()) ||
      ag.cnpj.includes(termoBusca);
    
    const matchAba = abaAtiva === 'Todas' || ag.status === abaAtiva.toLowerCase();
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(agenciasFiltradas.map(ag => ag.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  const statusTabs = [
    { label: 'Todas', value: 'Todas', count: agencias.length },
    { label: 'Ativas', value: 'ativo', count: agencias.filter(a => a.status === 'ativo').length },
    { label: 'Aguardando Contrato', value: 'pendente', count: agencias.filter(a => a.status === 'pendente').length },
    { label: 'Inativas', value: 'inativo', count: agencias.filter(a => a.status === 'inativo').length }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* CABEÇALHO DA TELA MOD-05 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            MOD-05 — Gestão de Agências de Turismo 🏢
          </h1>
          <p className="mt-1 text-sm text-gray-500">Credenciamento B2B, emissão de contratos, contagem de agentes e limites de venda.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/comercial/agencies/new')} 
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center gap-2"
          >
            <Plus size={18} /> Adicionar Agência
          </button>
        </div>
      </div>

      {/* BARRA DE PESQUISA E ABAS DE STATUS */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por Razão Social, Nome Fantasia ou CNPJ..." 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button className="px-3.5 py-2 border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-50 transition flex items-center gap-2">
            <Filter size={16} /> Filtros Avançados
          </button>
        </div>

        {/* STATUS TABS (RF-026.05) */}
        <div className="flex items-center gap-2 border-t border-gray-100 pt-3 overflow-x-auto">
          {statusTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => { setAbaAtiva(tab.value); setSelecionados([]); }}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap
                ${abaAtiva === tab.value 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${abaAtiva === tab.value ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* BARRA CONTEXTUAL DE AÇÕES EM LOTE */}
      {selecionados.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between animate-fade-in text-xs">
          <span className="font-bold text-blue-900">
            {selecionados.length} agência(s) selecionada(s)
          </span>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-blue-300 text-blue-800 font-bold rounded-lg hover:bg-blue-100 transition flex items-center gap-1">
              <Edit size={14} /> Editar em Lote
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition flex items-center gap-1">
              <FileText size={14} /> Emitir Contrato
            </button>
            <button className="px-3 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition flex items-center gap-1">
              <Trash2 size={14} /> Excluir
            </button>
          </div>
        </div>
      )}

      {/* DATATABLE PREMIUM DE AGÊNCIAS */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-4 w-10">
                  <input 
                    type="checkbox" 
                    onChange={handleSelecionarTodos} 
                    checked={selecionados.length === agenciasFiltradas.length && agenciasFiltradas.length > 0} 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4">ID</th>
                <th className="p-4">Nome Fantasia / Razão Social</th>
                <th className="p-4">CNPJ</th>
                <th className="p-4">Responsável Legal</th>
                <th className="p-4">Agentes</th>
                <th className="p-4">Status Credenciamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {agenciasFiltradas.map((ag) => (
                <tr key={ag.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selecionados.includes(ag.id)} 
                      onChange={() => handleSelecionarUm(ag.id)} 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4 font-mono font-bold text-gray-500">#{ag.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-sm">{ag.nomeFantasia}</div>
                    <div className="text-xs text-gray-500">{ag.razaoSocial}</div>
                  </td>
                  <td className="p-4 font-mono text-gray-700 font-medium">{ag.cnpj}</td>
                  <td className="p-4 font-medium text-gray-900">{ag.responsavel}</td>
                  <td className="p-4">
                    <Badge variant="blue">{ag.qtdAgentes} Agentes</Badge>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={ag.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
