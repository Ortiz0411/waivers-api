import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import waiverRouter from './routes/waivers'


dotenv.config();
const app = express()
app.use(express.json())


app.use(cors({
    origin: [
        "https://waivers-front.vercel.app/",
        "https://waivers-front.vercel.app/form"
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))


const PORT = Number(process.env.PORT)


app.use('/api/waivers', waiverRouter)


app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})