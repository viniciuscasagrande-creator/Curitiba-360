import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await forgotPassword(email)

    setSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-bold">
          Recuperar senha
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Informe seu e-mail para recuperar o acesso.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            Solicitação enviada com sucesso.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full"
            >
              Recuperar senha
            </Button>
          </form>
        )}

        <Link
          to="/login"
          className="mt-6 block text-center text-sm text-blue-700"
        >
          Voltar para login
        </Link>
      </div>
    </div>
  )
}
