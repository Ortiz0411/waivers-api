"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWaiver = exports.getWaiverById = exports.getWaivers = void 0;
const pg_1 = require("pg");
const emailService_1 = require("./emailService");
const clientConn = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
};
const query = async (query, params) => {
    const client = new pg_1.Client(clientConn);
    await client.connect();
    try {
        const result = await client.query(query, params);
        return result.rows;
    }
    finally {
        await client.end();
    }
};
const getWaivers = async () => {
    return query('SELECT * FROM waivers ORDER BY id DESC');
};
exports.getWaivers = getWaivers;
const getWaiverById = async (id) => {
    const rows = await query('SELECT * FROM waivers WHERE id = $1', [id]);
    return rows[0];
};
exports.getWaiverById = getWaiverById;
const addWaiver = async (data) => {
    const rows = await query(`INSERT INTO waivers (
        name, legal_guardian, email, tour_date,
        alcoholism, claustrophobia, dizzines, ear_infection, epilepsy,
        peptic_ulcers, respiratory_problems, neck_injure, back_problems,
        drug_use, depression, heart_problems, recent_operation,
        headaches, overweight, other_condition, pregnancy,
        medications, date_medications, date_examination, date_xray,
        other_areas, signature, ip_address, user_agent
        ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29
        ) RETURNING *`, [
        data.name, data.legal_guardian, data.email, data.tour_date,
        data.alcoholism, data.claustrophobia, data.dizzines, data.ear_infection, data.epilepsy,
        data.peptic_ulcers, data.respiratory_problems, data.neck_injure, data.back_problems,
        data.drug_use, data.depression, data.heart_problems, data.recent_operation,
        data.headaches, data.overweight, data.other_condition, data.pregnancy,
        data.medications, data.date_medications, data.date_examination, data.date_xray,
        data.other_areas, data.signature, data.ip_address, data.user_agent,
    ]);
    const waiver = rows[0];
    (0, emailService_1.sendEmail)(waiver).catch((err) => console.error('Erro en enviar email:', err));
    return waiver;
};
exports.addWaiver = addWaiver;
