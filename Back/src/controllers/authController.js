import usuarioService from "../services/usuarioService.js"


export class AuthController {
    async login(req, res) {
        try {
          const {email, senha} = req.body
          const {token, usuario} = await usuarioService.login(email, senha)

          return res.status(200).json({
            message: 'Login bem-sucedido',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
          })
        } catch (error) {
            return res.status(400).json({ error: error.message }); 
        }
    }
}