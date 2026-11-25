import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Gallery from './components/Gallery'
import ScreenViewer from './components/ScreenViewer'
import { screens } from './data/screens'

function ScreenRoute() {
  const { slug } = useParams()
  const screen = screens.find((item) => item.slug === slug)
  return screen ? <ScreenViewer screen={screen} /> : <Navigate to="/telas" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Navigate to="/tela/wf-001-tela-de-login" replace />} />
      <Route path="/dashboard" element={<Navigate to="/tela/wf-002-dashboard" replace />} />
      <Route path="/telas" element={<Gallery />} />
      <Route path="/tela/:slug" element={<ScreenRoute />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
