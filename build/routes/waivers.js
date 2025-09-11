"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = waiverRouter;
const express_1 = require("express");
const waiverServices_1 = require("../services/waiverServices");
function waiverRouter(pool) {
    const router = (0, express_1.Router)();
    router.get('/', async (_req, res) => {
        try {
            const waivers = await (0, waiverServices_1.getWaivers)(pool);
            res.json(waivers);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    router.get('/:id', async (req, res) => {
        const id = Number(req.params.id);
        try {
            const waiver = await (0, waiverServices_1.getWaiverById)(pool, id);
            if (!waiver)
                return res.status(404).json({ error: 'No se encontro el waiver' });
            res.json(waiver);
        }
        catch (err) {
            console.error(`No se encontro el waiver ${id}`);
            res.status(500).json({ error: err.message });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const waiver = await (0, waiverServices_1.addWaiver)(pool, req.body);
            res.status(201).json(waiver);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
