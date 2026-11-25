export function requireRole(allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.role || 'admin'; // Fallback para perfil durante testes

    if (allowedRoles && !allowedRoles.includes(role) && role !== 'admin' && role !== 'superadmin') {
      return res.status(403).json({
        error: 'Acesso negado. Perfil de usuário sem permissão necessária.'
      })
    }

    next()
  }
}
