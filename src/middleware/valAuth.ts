import { Request, Response, NextFunction } from "express"
import { supabaseAuth } from "../services/supabase"

export async function valAuth(req: Request, res: Response, next: NextFunction) {

    try {

        const auth = req.headers.authorization || ""

        if (!auth.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No autorizado (falta token)" })
        }

        const token = auth.replace("Bearer ", "").trim()
        if (!token) {
            return res.status(401).json({ error: "Token inválido" })
        }

        const { data, error } = await supabaseAuth.auth.getUser(token)

        if (error || !data.user) {
            return res.status(401).json({ error: "Sesión inválida o expirada" })
        }


        const adminEmail = process.env.ADMIN_EMAIL
        if (!adminEmail) {
            console.error("ADMIN_EMAIL no está configurado en .env")
            return res.status(500).json({ error: "Error de configuración del servidor" })
        }

        if ((data.user.email || "").toLowerCase() !== adminEmail.toLowerCase()) {
            return res.status(403).json({ error: "Solo el administrador puede acceder" })
        }


        ;(req as any).user = data.user

        return next()

    } catch (err) {
        return res.status(500).json({ error: "Error interno en autenticación" })
    }

}