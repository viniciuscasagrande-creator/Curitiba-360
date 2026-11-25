import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { BookOpen, Search, Info, HelpCircle, GitFork } from "lucide-react";

export default function BIDataCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const catalogItems = [
    {
      id: "cat-001",
      name: "fact_orders",
      type: "Fato (Fact Table)",
      description: "Tabela fato principal de vendas e receitas. Armazena medidas financeiras, de comissão e status transacional consolidado.",
      fieldsCount: 22,
      owner: "Finance & BI Core"
    },
    {
      id: "cat-002",
      name: "dim_customer",
      type: "Dimensão (Slowly Changing Type 2)",
      description: "Dados cadastrais e geográficos dos turistas e clientes finais. Preserva histórico de localização por SCD tipo 2.",
      fieldsCount: 16,
      owner: "Growth & Marketing"
    },
    {
      id: "cat-003",
      name: "dim_partner",
      type: "Dimensão",
      description: "Dados detalhados dos parceiros de experiências e eventos da plataforma Curitiba 360.",
      fieldsCount: 12,
      owner: "Partners Operations"
    }
  ];

  const filteredItems = catalogItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Catálogo de Dados & Dicionário (Data Catalog)</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Navegue pelas tabelas fatos e dimensões do Data Warehouse do Curitiba 360, com governança e responsabilidade de dados.</p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md shadow-sm rounded-2xl bg-white border border-slate-200 p-2 flex items-center gap-2">
          <Search size={18} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Pesquisar tabelas ou campos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs text-slate-800 focus:outline-none border-none bg-transparent"
          />
        </div>

        {/* Schema Diagram Concept (Visual layout) */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-slate-900 text-white space-y-4 shadow-md">
          <div className="flex items-center gap-2">
            <GitFork size={20} className="text-purple-400" />
            <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-purple-200">Arquitetura de Modelagem Dimensional</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl my-0">
            Abaixo é representado o relacionamento clássico do **Star Schema** utilizado nas nossas análises de negócio (BI) no BigQuery:
          </p>
          <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[10px] text-slate-400 overflow-x-auto">
            <div className="flex justify-center items-center gap-4 text-center min-w-[500px]">
              <div className="p-3 border border-purple-500/30 rounded-xl bg-purple-500/10">
                <span className="font-bold text-purple-300">dim_customer</span>
              </div>
              <div className="text-slate-600">◀───▶</div>
              <div className="p-4 border border-purple-600 rounded-2xl bg-purple-700/20 text-white shadow">
                <span className="font-bold block text-purple-100">fact_orders</span>
                <span className="text-[8px] text-purple-300 mt-1 block">quantidade, grossRevenue, discountAmount</span>
              </div>
              <div className="text-slate-600">◀───▶</div>
              <div className="p-3 border border-purple-500/30 rounded-xl bg-purple-500/10">
                <span className="font-bold text-purple-300">dim_product</span>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog List */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Dicionário de Tabelas ({filteredItems.length})</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {filteredItems.map(item => (
              <div key={item.id} className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-purple-700 bg-purple-50 border border-purple-100 w-fit px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <BookOpen size={12} /> {item.type}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 my-0 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-3">{item.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Campos: <strong className="text-slate-600">{item.fieldsCount}</strong></span>
                  <span>Owner: <strong className="text-slate-600">{item.owner}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
