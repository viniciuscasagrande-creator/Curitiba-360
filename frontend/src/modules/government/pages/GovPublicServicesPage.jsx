import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen, Clock, FileCheck } from "lucide-react";

export default function GovPublicServicesPage() {
  const [selectedService, setSelectedService] = useState("alvaras");

  const services = {
    alvaras: {
      title: "Alvará Comercial Digital",
      desc: "Emissão simplificada de alvará para estabelecimentos comerciais de baixo risco.",
      lead: "Secretaria de Urbanismo",
      timeframe: "Até 48 horas",
      documents: "CNPJ, IPTU do Imóvel, Consulta Prévia de Viabilidade",
      cost: "Isento para MEI | R$ 150,00 demais categorias"
    },
    certidao: {
      title: "Certidão Negativa de Débitos",
      desc: "Emissão instantânea de CND Municipal para pessoas físicas ou jurídicas.",
      lead: "Secretaria de Finanças",
      timeframe: "Imediato",
      documents: "CPF ou CNPJ",
      cost: "Gratuito"
    }
  };

  const activeSvc = services[selectedService];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Serviços Públicos Digitais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Carta de Serviços Municipais - Gestão de canais de atendimento, prazos e simplificação burocrática.
          </p>
        </div>

        <div className="flex gap-2">
          {Object.keys(services).map(key => (
            <button
              key={key}
              onClick={() => setSelectedService(key)}
              className={`px-3 h-8 text-xs font-bold rounded-xl cursor-pointer border transition ${
                selectedService === key
                  ? "bg-purple-700 text-white border-purple-700"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {services[key].title}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-700 font-bold">
            <Sparkles size={18} />
            <h3 className="text-sm font-bold text-slate-900 my-0">{activeSvc.title}</h3>
          </div>
          <p className="text-slate-600 my-0 leading-relaxed">{activeSvc.desc}</p>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Órgão Responsável</span>
              <strong className="text-slate-800 text-xs font-sans block">{activeSvc.lead}</strong>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Tempo de Atendimento</span>
              <strong className="text-slate-800 text-xs font-sans block">{activeSvc.timeframe}</strong>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Documentação Necessária</span>
              <p className="text-slate-600 text-xs my-0 font-mono">{activeSvc.documents}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Taxas / Custos</span>
              <strong className="text-purple-700 text-xs font-sans block">{activeSvc.cost}</strong>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
