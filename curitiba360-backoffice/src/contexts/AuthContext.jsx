import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('curitiba360_user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Informe e-mail e senha.')
    }

    const loggedUser = {
      id: 'user-001',
      name: 'Administrador Curitiba 360',
      email,
      role: 'admin'
    }

    localStorage.setItem(
      'curitiba360_user',
      JSON.stringify(loggedUser)
    )

    setUser(loggedUser)

    return loggedUser
  }

  const register = async (name, email, password) => {
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'user'
    }

    localStorage.setItem(
      'curitiba360_user',
      JSON.stringify(newUser)
    )

    setUser(newUser)

    return newUser
  }

  const logout = () => {
    localStorage.removeItem('curitiba360_user')
    setUser(null)
  }

  const forgotPassword = async (email) => {
    console.log(`Recuperação solicitada para: ${email}`)

    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { AuthContext }
