import { ChevronLeft, ChevronRight, Grid2X2, Maximize2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { screens } from '../data/screens'

export default function ScreenViewer() {
  const navigate = useNavigate()
  const { slug } = useParams()

  const screen = screens.find((item) => item.slug === slug) || screens[0]
  const index = screens.findIndex((item) => item.slug === screen.slug)
  const previous = screens[index - 1]
  const next = screens[index + 1]

  const goFullscreen = () => {
    const el = document.querySelector('.screen-image-target')
    if (el?.requestFullscreen) el.requestFullscreen()
  }

  return (
    <main className="viewer min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="viewer-toolbar sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="bg-blue-600/20 text-blue-400 font-bold text-xs px-2.5 py-1 rounded-md border border-blue-500/30 shrink-0">
            {screen.id}
          </span>
          <h1 className="text-white font-semibold text-base truncate">
            {screen.title}
          </h1>
        </div>

        <nav aria-label="Navegação das telas" className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => previous && navigate(`/tela/${previous.slug}`)}
            disabled={!previous}
            title="Tela anterior"
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 rounded-lg text-slate-200 border border-slate-700 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button 
            type="button" 
            onClick={() => navigate('/telas')} 
            title="Todas as telas"
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
          >
            <Grid2X2 size={16} />
            <span>Galeria ({screens.length})</span>
          </button>

          <button 
            type="button" 
            onClick={goFullscreen} 
            title="Tela cheia"
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700 transition-colors"
          >
            <Maximize2 size={18} />
          </button>

          <button
            type="button"
            onClick={() => next && navigate(`/tela/${next.slug}`)}
            disabled={!next}
            title="Próxima tela"
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 rounded-lg text-slate-200 border border-slate-700 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      </header>

      <section className="screen-stage flex-1 p-6 flex justify-center items-start overflow-auto">
        <img
          className="screen-image-target max-w-full h-auto rounded-xl border border-slate-800 shadow-2xl bg-white"
          src={screen.image}
          alt={`${screen.id} - ${screen.title}`}
          draggable="false"
        />
      </section>
    </main>
  )
}
