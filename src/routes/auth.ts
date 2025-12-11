import { Router } from "express"
import { supabaseAuth } from "../services/supabase"
import { valAuth } from "../middleware/valAuth"

const router = Router()

router.post("/login", async (req, res) => {

    const { username, password } = req.body as { username?: string; password?: string }

    if (!username || !password) {
        return res.status(400).json({ error: "username y password son requeridos" })
    }

    const email = `${username}@${process.env.EMAIL_DOMAIN}`;


    try {
        
        const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password })

        if (error || !data.session || !data.user) {
            return res.status(401).json({ error: "Credenciales inválidas" })
        }

        const adminEmail = process.env.ADMIN_EMAIL
        if (adminEmail && email.toLowerCase() !== adminEmail.toLowerCase()) {
            return res.status(403).json({ error: "No tienes permisos de administrador" })
        }

        const { access_token, expires_in, token_type } = data.session

        return res.json({
            access_token,
            token_type,
            expires_in,
            user: {
                id: data.user.id,
                email: data.user.email
            }
        })

    } catch (err) {
        console.error("Error en /api/auth/login:", err)
        return res.status(500).json({ error: "Error interno en login" })
    }

})

router.get("/me", valAuth, (req, res) => {
    const user = (req as any).user
    return res.json({ user })
})

export default router