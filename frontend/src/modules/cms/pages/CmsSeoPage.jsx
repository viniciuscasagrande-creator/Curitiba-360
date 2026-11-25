import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Check, AlertTriangle, Terminal } from "lucide-react";

export default function CmsSeoPage() {
  const [robotsTxt, setRobotsTxt] = useState(
    "User-agent: *\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://curitiba360.com.br/sitemap.xml"
  );
  const [savedRobots, setSavedRobots] = useState(false);

  const handleSaveRobots = (e) => {
    e.preventDefault();
    setSavedRobots(true);
    setTimeout(() => setSavedRobots(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">SEO Engine & Metadados</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o status de indexação do Google Search Console, edite o arquivo Robots.txt e gere esquemas do Schema.org.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* SEO Health check */}
          <div className="md:col-span-2 space-y-4">
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 my-0">Diagnóstico Técnico de SEO</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-150 rounded-2xl text-emerald-850">
                  <Check size={16} />
                  <div>
                    <strong className="block text-slate-900">Sitemap XML Válido</strong>
                    <span className="text-[10px] text-slate-500">Última atualização automática: hoje às 04:00.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-150 rounded-2xl text-emerald-850">
                  <Check size={16} />
                  <div>
                    <strong className="block text-slate-900">Configuração de Canonical Link tags</strong>
                    <span className="text-[10px] text-slate-500">Evitando problemas de conteúdo duplicado para slugs com barras.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-150 rounded-2xl text-amber-850">
                  <AlertTriangle size={16} />
                  <div>
                    <strong className="block text-slate-900">12 páginas com Meta Description ausente</strong>
                    <span className="text-[10px] text-slate-500">Acesse o módulo de páginas para preencher e manter a atratividade do CTR.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Schema.org generator */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-slate-900 my-0">Gerador Schema.org JSON-LD</h3>
              <p className="text-slate-550 my-0">Os metadados estruturados ajudam o Google a exibir rich snippets de eventos e atrações.</p>
              
              <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-[10px] leading-relaxed">
                {`{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Jardim Botânico de Curitiba",
  "description": "Famoso cartão-postal de Curitiba com estufa de metal...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Curitiba",
    "addressRegion": "PR"
  }
}`}
              </div>
            </section>
          </div>

          {/* Robots.txt editor */}
          <div className="space-y-4">
            <form onSubmit={handleSaveRobots} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 my-0 flex items-center gap-1">
                <Terminal size={14} /> Robots.txt Editor
              </h3>
              <p className="text-slate-550 my-0">Defina regras de indexação para robôs de busca de forma global.</p>
              
              <textarea
                rows={8}
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="w-full p-3 font-mono text-[10px] border border-slate-200 rounded-xl bg-slate-50"
              />

              <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition w-full">
                Salvar Robots.txt
              </button>
              {savedRobots && <span className="text-emerald-700 font-bold block pt-1 text-center">Salvo com sucesso!</span>}
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
