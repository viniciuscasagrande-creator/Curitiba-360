import React, { useState } from "react";
import SuperAppLayout from "../components/SuperAppLayout";
import CityServiceCard from "../components/CityServiceCard";
import { useCityServices } from "../hooks/useCityServices";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";

export default function CityServicesPage() {
  const { services, loading, searchServices } = useCityServices();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (val) => {
    setSearch(val);
    searchServices(val);
  };

  const handleRequestService = (srv) => {
    // Redirect to protocols with initial service info
    navigate("/app/protocols", { state: { serviceId: srv.id, serviceName: srv.name } });
  };

  return (
    <SuperAppLayout>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)] font-sans">
        <Link to="/app/home" className="flex items-center gap-1 text-emerald-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Início
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 m-0">Governo Digital</h2>
            <p className="text-[10px] text-slate-500 m-0">Abra chamados para serviços públicos e acompanhe trâmites.</p>
          </div>
          <Link
            to="/app/protocols"
            className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-xl flex items-center gap-1 hover:no-underline"
          >
            Ver Chamados
          </Link>
        </div>

        {/* Smart search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar iluminação, poda, IPTU..."
            className="w-full pl-4 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider my-0">Serviços Disponíveis</h3>
          {loading ? (
            <div className="text-center py-6 text-slate-400">Pesquisando catálogo...</div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {services.map((srv) => (
                <CityServiceCard
                  key={srv.id}
                  service={srv}
                  onClick={handleRequestService}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SuperAppLayout>
  );
}
