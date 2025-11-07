"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCookie = void 0;
exports.valAuth = valAuth;
exports.cookieOption = cookieOption;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie = 'waiver_token';
function valAuth(req, res, next) {
    try {
        const token = req.cookies?.[cookie];
        if (!token)
            return res.status(401).json({ error: 'No autorizado' });
        const verifyJwt = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = verifyJwt;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'No autorizado' });
    }
}
function cookieOption() {
    const isProd = process.env.NODE_ENV === 'production';
    return {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    };
}
exports.authCookie = 'waiver_token';
