

export const roleMiddleware = (rolePermitidos) => {
  return (req, res, next) => {
    if (!rolePermitidos.includes(req.usuario.tipo)) {
      return res.status(403).json({ error: "Permissões insuficientes" })
    }
    next()
  }
}