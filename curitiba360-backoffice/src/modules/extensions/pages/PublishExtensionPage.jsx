import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";

export default function PublishExtensionPage() {
  const { publishExtension } = useMarketplace();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("payments");
  const [type, setType] = useState("connector");
  const [price, setPrice] = useState("0");
  const [manifestStr, setManifestStr] = useState(
    JSON.stringify(
      {
        name: "curitiba360-my-connector",
        version: "1.0.0",
        platformVersion: ">=1.0.0",
        entry: "dist/index.js",
        permissions: ["orders.read"],
        events: ["order.created"]
      },
      null,
      2
    )
  );

  const [validationError, setValidationError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);
    try {
      const parsedManifest = JSON.parse(manifestStr);
      if (!parsedManifest.name || !parsedManifest.version || !parsedManifest.entry) {
        throw new Error("O manifesto deve conter 'name', 'version' e 'entry'.");
      }
      publishExtension({
        name,
        shortDescription,
        description: shortDescription,
        category,
        type,
        price: Number(price),
        developerId: "dev-01",
        currentVersion: parsedManifest.version,
        minimumPlatformVersion: parsedManifest.platformVersion || ">=1.0.0",
        manifest: parsedManifest
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/admin/marketplace/catalogo");
      }, 1500);
    } catch (err) {
      setValidationError(err.message || "Manifesto JSON inválido.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-xl text-xs">
        <Link to="/admin/marketplace/developers" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Portal
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Publicar Extensão</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Cadastre os metadados do seu plugin e envie o manifesto de segurança. O pacote passará por validação automática no sandbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Nome da Extensão</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Nota Fiscal Inteligente"
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Descrição Curta</label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Ex: Emita notas fiscais eletrônicas de vendas de ingressos diretamente..."
              className="h-9 px-3 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Categoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="payments">Pagamentos</option>
                <option value="widgets">Widgets</option>
                <option value="reports">Relatórios</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="h-9 px-2 border border-slate-200 rounded-xl bg-slate-50">
                <option value="connector">Conector</option>
                <option value="widget">Widget</option>
                <option value="report">Relatório</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700">Preço Mensal (BRL)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-9 px-3 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Manifesto JSON (Segurança e Escopo)</label>
            <textarea
              rows={8}
              required
              value={manifestStr}
              onChange={(e) => setManifestStr(e.target.value)}
              className="p-3 border border-slate-200 rounded-xl font-mono text-[10px]"
            />
          </div>

          {validationError && (
            <div className="p-3 bg-red-50 border border-red-150 rounded-xl flex items-center gap-2 text-red-700">
              <AlertTriangle size={14} />
              <span>{validationError}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Submeter Pacote
            </button>
            {success && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Check size={14} /> Extensão publicada com sucesso!
              </span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
