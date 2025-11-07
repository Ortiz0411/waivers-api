"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const waiverServices_1 = require("../services/waiverServices");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.valAuth, async (_req, res) => {
    try {
        const waivers = await (0, waiverServices_1.getWaivers)();
        return res.json(waivers);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en obtener waivers' });
    }
});
router.get("/:id", auth_1.valAuth, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const waiver = await (0, waiverServices_1.getwaiverById)(id);
        return res.json(waiver);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en obtener waiver' });
    }
});
router.post("/", async (req, res) => {
    try {
        const waiver = await (0, waiverServices_1.addWaiver)(req.body);
        return res.status(201).json(waiver);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en registrar waiver' });
    }
});
exports.default = router;
