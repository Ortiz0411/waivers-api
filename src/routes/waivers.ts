import { Router } from "express";
import { getWaivers, getWaiverById, addWaiver, } from "../services/waiverServices";


const router = Router();


router.get("/", async (_req, res) => {

    try {
        const waivers = await getWaivers()
        return res.json(waivers);
    } catch (err: any) {
        console.error(err)
        return res.status(500).json({ error: 'Error en obtener waivers' });
    }
})


router.get("/:id", async (req, res) => {
    
    const id = Number(req.params.id)

    try {
        const waiver = await getWaiverById(id)
        return res.json(waiver);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Error en obtener waiver' })
    }
})


router.post("/", async (req, res) => {
    
    try {
        const waiver = await addWaiver(req.body)
        return res.status(201).json(waiver)
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: 'Error en registrar waiver' })
    }
})


export default router