"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const waivers_1 = __importDefault(require("./routes/waivers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = Number(process.env.PORT);
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
app.get('/ping', (_req, res) => {
    console.log("Hizo ping");
    res.send("Ping Ping");
});
app.use('/api/waivers', (0, waivers_1.default)(pool));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
