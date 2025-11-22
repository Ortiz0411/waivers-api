import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import waiverRouter from './routes/waivers'
import authRouter from './routes/auth'
import { monitor } from './scripts/monitor'


const app = express()


app.use(cors({
    origin: function (origin, callback) {
        const allowed = [
            process.env.FRONT_LOCAL,
            process.env.FRONT_PROD,
        ];

        const vercel = origin?.includes(".vercel.app");

        if (!origin || allowed.includes(origin) || vercel) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true,
}))


app.use(helmet())
app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/waivers', waiverRouter)


app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
})

/*
app.get('/monitor/vercel', async (_req, res) => {
    const result = await monitor()
    res.json({ alerts: result })
})*/

/*
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})*/

export default app