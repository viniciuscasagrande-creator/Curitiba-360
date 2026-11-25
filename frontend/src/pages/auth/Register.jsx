import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(
      name,
      email,
      password
    )

    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-bold">
          Criar conta
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Cadastre-se no Curitiba 360.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <Input
            label="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full"
          >
            Criar conta
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm text-blue-700"
        >
          Já tenho uma conta
        </Link>
      </div>
    </div>
  )
}
