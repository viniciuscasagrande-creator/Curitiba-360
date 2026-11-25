import { Search, ArrowLeft, ExternalLink, Play, Eye } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { screens } from '../data/screens'
import { OFFICIAL_LOGO } from '../components/wf/WfShell'

export default function Gallery() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return screens
    return screens.filter((screen) =>
      `${screen.id} ${screen.title}`.toLowerCase().includes(normalized)
    )
  }, [query])

  return (
    <main className="gallery-page p-6 bg-slate-950 min-h-screen text-slate-100">
      <header className="gallery-header max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <img src={OFFICIAL_LOGO} alt="Curitiba 360°" className="w-10 h-10 rounded-full bg-white p-1" />
            <button
              type="button"
              onClick={() => navigate('/tela/wf-002-dashboard')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white border-none cursor-pointer shadow"
            >
              <Play size={14} />
              <span>Abrir Backoffice Clonado Ao Vivo (WF-002)</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Voltar ao Menu Geral</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/site')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white border-none cursor-pointer"
            >
              <ExternalLink size={14} />
              <span>Portal Público (/site)</span>
            </button>
          </div>
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Curitiba 360 Enterprise • Sistema Oficial Instalado</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">Telas do Backoffice (71 Telas Vivas)</h1>
          <span className="text-slate-400 text-sm">
            Clique em qualquer uma das {screens.length} telas abaixo para usar o sistema clonado em tempo real com as logos oficiais Curitiba 360°
          </span>
        </div>

        <label className="search-field flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 min-w-[320px] shadow-inner">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar por id ou nome de tela..."
            className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500 text-sm"
          />
        </label>
      </header>

      <section className="gallery-grid max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((screen) => (
          <Link 
            className="screen-card group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-200 shadow-lg hover:-translate-y-1 flex flex-col justify-between" 
            key={screen.slug} 
            to={`/tela/${screen.slug}`}
          >
            <div>
              <div className="thumb h-48 bg-slate-800 overflow-hidden flex items-start justify-center p-2 group-hover:bg-slate-700 transition-colors relative">
                <img 
                  src={screen.image} 
                  alt={screen.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover object-top rounded-lg shadow-sm"
                />
                <span className="absolute top-3 right-3 bg-emerald-600/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  ● TELA VIVA INSTALADA
                </span>
              </div>
              <div className="screen-card-copy p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <strong className="text-blue-400 text-sm font-semibold">{screen.id}</strong>
                  <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                    <Play size={11} /> Abrir Sistema
                  </span>
                </div>
                <span className="text-slate-200 text-sm font-medium line-clamp-2 leading-snug">{screen.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
