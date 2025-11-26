import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import waiverRouter from './routes/waivers'
import authRouter from './routes/auth'


const app = express()

/*
app.use(cors({
    origin: [
        process.env.FRONT_LOCAL!,
        process.env.FRONT_PROD!
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))*/





// BORRAR

app.use((req, res, next) => {

    const allowed = [
        process.env.FRONT_LOCAL,
        process.env.FRONT_PROD
    ];

    const origin = req.headers.origin;

    if (origin && allowed.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false
    })
);


// HASTA ACA



//app.use(helmet())


app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/waivers', waiverRouter)


app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() })
})

/*
const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
}) */

export default app