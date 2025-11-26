import { Request, Response, NextFunction, CookieOptions } from "express"
import jwt from 'jsonwebtoken'

export const cookie = 'token'

export interface Jwt {
    sub: string
    username: string
}


export function valAuth (req: Request, res: Response, next: NextFunction) {

    try {
        const token = req.cookies?.[cookie]
        if (!token) return res.status(401).json({ error: 'No autorizado' })
        
        const verifyJwt = jwt.verify(token, process.env.JWT_SECRET!) as Jwt
        (req as any).user = verifyJwt
        return next()
    } catch (err) {
        return res.status(401).json({ error: 'No autorizado' })
    }
}


export function cookieOption(): CookieOptions {

    const prod = process.env.NODE_ENV === 'production'

    return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: ".vercel.app",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}