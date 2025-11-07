/**
 * Rutas servicios de waivers
 * 
 * Endpoints:
 * - GET / : Lista de waivers
 * - GET /:id : detalles de waiver por id
 * - POST / : registra waiver
 * - GET /:id/pdf : descarga el PDF de waiver
 */

import { Router } from "express"
import { getWaivers, getwaiverById, addWaiver, } from "../services/waiverServices"
import { valAuth } from "../middleware/auth"
import { genPdf } from "../services/pdfService"


const router = Router()


/** Lista todos los waivers, protegido para solo admin */
router.get("/", valAuth, async (_req, res) => {

    try {
        const waivers = await getWaivers()
        return res.json(waivers)
    } catch (err: any) {
        return res.status(500).json({ error: 'Error en obtener waivers' })
    }
})


/** Obtiene detalles de waiver por id, protegido para solo admin */
router.get("/:id", valAuth, async (req, res) => {
    
    const id = Number(req.params.id)

    try {
        const waiver = await getwaiverById(id)
        return res.json(waiver)
    } catch (err: any) {
        return res.status(500).json({ error: 'Error en obtener waiver' })
    }
})


/** Registra un nuevo waiver, publico */
router.post("/", async (req, res) => {
    
    try {
        const waiver = await addWaiver(req.body)
        return res.status(201).json(waiver)
    } catch (err: any) {
        return res.status(500).json({ error: 'Error en registrar waiver' })
    }
})


/** Retorna PDF de waiver por id, protegido para solo admin */
router.get("/:id/pdf", valAuth, async (req, res) => {

    const id = Number(req.params.id)

    try {
        const waiver = await getwaiverById(id)
        const pdf = await genPdf(waiver)

        const name = String(waiver.name).replace(/[^\w\- ]+/g, "").trim()

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="Waiver-${name}.pdf"`,
            "Cache-Control": "no-store",
        })

        return res.send(pdf)
    } catch (err: any) {
        return res.status(500).json({ error: "Error al generar PDF" })
    }
})


export default router