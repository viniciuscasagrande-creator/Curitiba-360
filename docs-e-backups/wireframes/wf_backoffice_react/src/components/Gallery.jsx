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
    <main className="gallery-page">
      <header className="gallery-header">
        <div>
          <p>Curitiba 360</p>
          <h1>Telas do Backoffice</h1>
          <span>{screens.length} referências visuais oficiais</span>
        </div>

        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar tela"
          />
        </label>
      </header>

      <section className="gallery-grid">
        {filtered.map((screen) => (
          <Link className="screen-card" key={screen.slug} to={`/tela/${screen.slug}`}>
            <div className="thumb">
              <img src={screen.image} alt="" loading="lazy" />
            </div>
            <div className="screen-card-copy">
              <strong>{screen.id}</strong>
              <span>{screen.title}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
