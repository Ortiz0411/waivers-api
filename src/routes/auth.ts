/**
 * Auth routes
 * 
 * Endpoints:
 * - Post /login: validates credentials and JWT in cookie
 * - Post/logout: clears cookie
 * - GET /me: returns the authenticated user
 */

import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookie, cookieOption, valAuth } from '../middleware/auth'
import rateLimit from 'express-rate-limit'

const router = Router()


/** Limited login attempts (5 attempts every 15 minutes)*/
const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false
})


/** Verify user credentials, generate cookie*/
router.post('/login', loginLimit, async (req, res) => {
    const { username, password } = req.body

    const adminUser = process.env.ADMIN_USER!
    const adminHash = process.env.ADMIN_HASH!

    // Incorrect user
    if (username !== adminUser) {
        res.header("Access-Control-Allow-Origin", process.env.FRONT_LOCAL)
        res.header("Access-Control-Allow-Credentials", "true")
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" })
    }

    // Incorrect password
    const ok = await bcrypt.compare(password, adminHash)
    if (!ok) {
        res.header("Access-Control-Allow-Origin", process.env.FRONT_LOCAL)
        res.header("Access-Control-Allow-Credentials", "true")
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" })
    }

    // Correct credentials
    const token = jwt.sign(
        { sub: 'admin', username },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    )

    res.header("Access-Control-Allow-Origin", process.env.FRONT_LOCAL)
    res.header("Access-Control-Allow-Credentials", "true")

    res.cookie(cookie, token, cookieOption())
    return res.json({ ok: true })
})


/** Clear the login cookie */
router.post('/logout', (_req, res) => {
    res.header("Access-Control-Allow-Credentials", "true")
    res.clearCookie(cookie, cookieOption())
    return res.json({ ok: true })
})


/** Returns the logged-in user */
router.get('/me', valAuth, (req, res) => {
    const user = (req as any).user
    return res.json({ user })
})


export default router