import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)

      await login(email, password)

      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center text-white">
          <h1 className="text-3xl font-bold">
            Curitiba 360
          </h1>

          <p className="mt-2 text-slate-400">
            Portal de gestão
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Entrar
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Acesse sua conta para continuar.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-700 hover:underline"
            >
              Esqueci minha senha
            </Link>

            <Link
              to="/register"
              className="font-medium text-blue-700 hover:underline"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
