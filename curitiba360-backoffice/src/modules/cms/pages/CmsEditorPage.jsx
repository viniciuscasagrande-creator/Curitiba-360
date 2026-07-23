import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useCmsDashboard } from "../hooks/useCmsDashboard";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash, Eye, Settings, Smartphone, Monitor } from "lucide-react";

export default function CmsEditorPage() {
  const { pageId } = useParams();
  const { pages, savePage, loading } = useCmsDashboard();
  const navigate = useNavigate();

  const isNew = !pageId || pageId === "new";
  const existingPage = pages.find(p => p.id === pageId);

  // States
  const [title, setTitle] = useState(existingPage ? existingPage.title : "");
  const [template, setTemplate] = useState(existingPage ? existingPage.template : "Landing");
  const [status, setStatus] = useState(existingPage ? existingPage.status : "rascunho");
  const [seoTitle, setSeoTitle] = useState(existingPage?.seo?.title || "");
  const [seoDesc, setSeoDesc] = useState(existingPage?.seo?.desc || "");
  const [addedBlocks, setAddedBlocks] = useState([
    { id: "b-1", type: "Hero", content: "Bem-vindo ao Portal Curitiba 360" },
    { id: "b-2", type: "CTA", content: "Garanta seus ingressos aqui" }
  ]);

  const [previewMode, setPreviewMode] = useState("desktop"); // desktop or mobile

  const blockTemplates = [
    { type: "Hero", label: "Hero Banner" },
    { type: "Cards", label: "Cards Grid" },
    { type: "Galeria", label: "Galeria de Fotos" },
    { type: "FAQ", label: "Módulo FAQ" },
    { type: "CTA", label: "Botão de Chamada" }
  ];

  const handleAddBlock = (type) => {
    setAddedBlocks([
      ...addedBlocks,
      { id: `b-${Date.now()}`, type, content: `Módulo ${type} - clique para configurar` }
    ]);
  };

  const handleRemoveBlock = (id) => {
    setAddedBlocks(addedBlocks.filter(b => b.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title) return;
    savePage({
      title,
      template,
      status,
      seo: { title: seoTitle || title, desc: seoDesc },
      blocks: addedBlocks
    });
    navigate("/admin/cms/pages");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/cms/pages" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar à lista
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">
              {isNew ? "Criar Nova Página" : "Editar Página CMS"}
            </h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Edite blocos arrastáveis, defina a semântica do Schema.org e gerencie parâmetros de cache.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
            >
              <Save size={14} /> Salvar Alterações
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Settings and Block list */}
          <div className="md:col-span-1 space-y-4">
            <section className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 my-0">Atributos Básicos</h3>
              
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Título da Página</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Parques de Curitiba"
                  className="h-9 px-3 border border-slate-200 rounded-xl w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Template</label>
                <select value={template} onChange={(e) => setTemplate(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50 w-full">
                  <option value="Home">Home Portal</option>
                  <option value="Cidade">Cidade</option>
                  <option value="Destino">Destino</option>
                  <option value="Evento">Evento</option>
                  <option value="Landing">Landing Page</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Status Editorial</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50 w-full">
                  <option value="rascunho">Rascunho</option>
                  <option value="em_revisao">Em Revisão</option>
                  <option value="publicado">Publicado</option>
                  <option value="agendado">Agendado</option>
                </select>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 my-0">Adicionar Bloco</h3>
              <div className="space-y-2">
                {blockTemplates.map(bl => (
                  <button
                    key={bl.type}
                    type="button"
                    onClick={() => handleAddBlock(bl.type)}
                    className="w-full h-8 px-3 border border-slate-200 rounded-xl hover:border-emerald-300 transition text-slate-800 font-bold bg-slate-50 text-left flex justify-between items-center cursor-pointer"
                  >
                    <span>{bl.label}</span>
                    <Plus size={14} className="text-slate-400" />
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 my-0">SEO & Metadados</h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Título alternativo de busca"
                    className="h-8 px-2 border border-slate-200 rounded-xl w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    placeholder="Máximo de 160 caracteres"
                    className="p-2 border border-slate-200 rounded-xl w-full"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Builder area */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex justify-between items-center bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2">
              <span className="font-bold text-slate-700">Visual Builder (Preview)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={`h-7 px-2.5 rounded-lg border-none cursor-pointer flex items-center gap-1 ${previewMode === "desktop" ? "bg-white shadow text-purple-700" : "bg-transparent text-slate-500"}`}
                >
                  <Monitor size={14} /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={`h-7 px-2.5 rounded-lg border-none cursor-pointer flex items-center gap-1 ${previewMode === "mobile" ? "bg-white shadow text-purple-700" : "bg-transparent text-slate-500"}`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
              </div>
            </div>

            {/* Layout simulator viewport */}
            <div className={`mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-inner min-h-128 transition-all ${previewMode === "mobile" ? "max-w-xs" : "w-full"}`}>
              <div className="space-y-4">
                {addedBlocks.map((block) => (
                  <div key={block.id} className="relative group p-4 border border-dashed border-slate-300 rounded-2xl bg-white space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2 text-[10px] text-slate-400">
                      <span className="font-bold uppercase tracking-wider text-purple-700">{block.type} Module</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(block.id)}
                        className="bg-transparent border-none text-slate-400 hover:text-red-650 cursor-pointer"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => {
                        const newContent = e.target.value;
                        setAddedBlocks(addedBlocks.map(b => b.id === block.id ? { ...b, content: newContent } : b));
                      }}
                      className="w-full border-none focus:ring-0 p-0 text-slate-800 text-sm font-semibold outline-none"
                    />
                  </div>
                ))}

                {addedBlocks.length === 0 && (
                  <div className="text-center py-20 text-slate-400">// Nenhum bloco adicionado. Escolha um na barra lateral.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
