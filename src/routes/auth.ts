/**
 * Rutas de auth
 * 
 * Endpoints:
 * - Post /login : valida credenciales y JWT en cookie
 * - Post /logout : limpia la cookie
 * - GET /me : retorna el usuario autenticado
 */

import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookie, cookieOption, valAuth } from '../middleware/auth'
import rateLimit from 'express-rate-limit'

const router = Router()


/** Limitado de intentos /login (3 intentos cada 15 minutos)*/
const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false
})


/** Verifica credenciales de usuario, genera cookie*/
router.post('/login', loginLimit, async (req, res) => {

    const { username, password } = req.body

    const adminUser = process.env.ADMIN_USER!
    const adminHash = process.env.ADMIN_HASH!

    if (username !== adminUser) return res.status(401).json({ error: 'Credenciales invalidas' })
    
    const ok = await bcrypt.compare(password, adminHash)
    if (!ok) return res.status(401).json({ error: 'Credenciales invalidas' })

    const token = jwt.sign(
        { sub: 'admin', username },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    res.cookie(cookie, token, cookieOption())
    return res.json({ ok: true })
})


/** Limpia la cookie de login */
router.post('/logout', (_req, res) => {
    res.clearCookie(cookie, cookieOption())
    return res.json({ ok: true })
})


/** Retorna el usuario iniciado */
router.get('/me', valAuth, (req, res) => {
    const user = (req as any).user
    return res.json({ user })
})


export default router