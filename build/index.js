"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const waivers_1 = __importDefault(require("./routes/waivers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//app.use(cors({origin: })) anadir enlace de vercel
const PORT = Number(process.env.PORT);
app.use('/api/waivers', waivers_1.default);
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
