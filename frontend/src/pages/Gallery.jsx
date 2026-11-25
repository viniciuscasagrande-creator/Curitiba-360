import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { screens } from '../data/screens'

export default function Gallery() {
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
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Curitiba 360 Enterprise</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">Telas do Backoffice</h1>
          <span className="text-slate-400 text-sm">{screens.length} referências visuais oficiais do projeto</span>
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
            className="screen-card group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-200 shadow-lg hover:-translate-y-1" 
            key={screen.slug} 
            to={`/tela/${screen.slug}`}
          >
            <div className="thumb h-48 bg-slate-800 overflow-hidden flex items-start justify-center p-2 group-hover:bg-slate-700 transition-colors">
              <img 
                src={screen.image} 
                alt={screen.title} 
                loading="lazy" 
                className="w-full h-full object-cover object-top rounded-lg shadow-sm"
              />
            </div>
            <div className="screen-card-copy p-4 flex flex-col gap-1">
              <strong className="text-blue-400 text-sm font-semibold">{screen.id}</strong>
              <span className="text-slate-200 text-sm font-medium line-clamp-2 leading-snug">{screen.title}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
