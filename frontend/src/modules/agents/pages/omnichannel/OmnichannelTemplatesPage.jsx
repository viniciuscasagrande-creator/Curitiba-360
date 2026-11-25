import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { omnichannelService } from '../../services/omnichannelService';
import OmnichannelCampaignGrid from '../../components/omnichannel/OmnichannelCampaignGrid';
import { FileText, ArrowLeft, RefreshCw, Send, PlusCircle } from 'lucide-react';

export default function OmnichannelTemplatesPage() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await omnichannelService.getOmnichannelOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando templates e disparos...</p>
      </div>
    );
  }

  const templates = data.templates || [];
  const campaigns = data.campaignsOmnichannel || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/agentes/omnichannel')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Chat Omnichannel
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 06
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Gestão de Templates & Disparos 📄
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gerenciamento de templates comerciais pré-aprovados e métricas de disparo em massa.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Dados"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* DISPAROS E CAMPANHAS OMNICHANNEL */}
      <OmnichannelCampaignGrid campaigns={campaigns} />

      {/* LISTA DE TEMPLATES CADASTRADOS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" /> Templates Prontos da Equipe
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">
            {templates.length} modelos cadastrados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((tpl) => (
            <div key={tpl.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">{tpl.titulo}</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[9px]">
                  {tpl.categoria} ({tpl.canal.toUpperCase()})
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60">
                {tpl.conteudo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
