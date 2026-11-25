import { ChevronLeft, ChevronRight, Grid2X2, Maximize2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { screens } from '../data/screens'

export default function ScreenViewer({ screen }) {
  const navigate = useNavigate()
  const index = screens.findIndex((item) => item.slug === screen.slug)
  const previous = screens[index - 1]
  const next = screens[index + 1]

  const goFullscreen = () => {
    const el = document.querySelector('.screen-image')
    if (el?.requestFullscreen) el.requestFullscreen()
  }

  return (
    <main className="viewer">
      <header className="viewer-toolbar">
        <div>
          <strong>{screen.id}</strong>
          <span>{screen.title}</span>
        </div>

        <nav aria-label="Navegação das telas">
          <button
            type="button"
            onClick={() => previous && navigate(`/tela/${previous.slug}`)}
            disabled={!previous}
            title="Tela anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <button type="button" onClick={() => navigate('/telas')} title="Todas as telas">
            <Grid2X2 size={18} />
          </button>

          <button type="button" onClick={goFullscreen} title="Tela cheia">
            <Maximize2 size={18} />
          </button>

          <button
            type="button"
            onClick={() => next && navigate(`/tela/${next.slug}`)}
            disabled={!next}
            title="Próxima tela"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      </header>

      <section className="screen-stage">
        <img
          className="screen-image"
          src={screen.image}
          alt={`${screen.id} - ${screen.title}`}
          draggable="false"
        />
      </section>
    </main>
  )
}
