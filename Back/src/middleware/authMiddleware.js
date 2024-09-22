import usuarioService from "../services/usuarioService";
import jwt from 'jsonwebtoken';

export const authMiddleware  = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).json({error: 'Acesso negado, Token nao fornecido'})
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       req.usuario = decoded
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' }); 
    }
}