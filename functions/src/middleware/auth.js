import { auth } from '../config/firebase.js'

export async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Não autenticado. Cabeçalho de autorização ausente ou malformatado.'
      })
    }

    const token = header.replace('Bearer ', '')
    const decoded = await auth.verifyIdToken(token)

    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token de autenticação inválido ou expirado.'
    })
  }
}
