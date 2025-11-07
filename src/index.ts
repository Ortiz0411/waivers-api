import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import waiverRouter from './routes/waivers'
import authRouter from './routes/auth'


const app = express()

app.use(cors({
    origin: [
        process.env.FRONT_LOCAL!,
        process.env.FRONT_PROD!
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(helmet())
app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/waivers', waiverRouter)


app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
})


const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})

export default app