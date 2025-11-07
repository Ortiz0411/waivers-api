"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
const loginLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false
});
router.post('/login', loginLimit, async (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER;
    const adminHash = process.env.ADMIN_HASH;
    if (username !== adminUser)
        return res.status(401).json({ error: 'Credenciales invalidas' });
    const ok = await bcrypt_1.default.compare(password, adminHash);
    if (!ok)
        return res.status(401).json({ error: 'Credenciales invalidas' });
    const token = jsonwebtoken_1.default.sign({ sub: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie(auth_1.authCookie, token, (0, auth_1.cookieOption)());
    return res.json({ ok: true });
});
router.post('/logout', (_req, res) => {
    res.clearCookie(auth_1.authCookie, (0, auth_1.cookieOption)());
    return res.json({ ok: true });
});
router.get('/me', auth_1.valAuth, (req, res) => {
    const user = req.user;
    return res.json({ user });
});
exports.default = router;
