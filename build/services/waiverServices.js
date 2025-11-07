"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWaivers = getWaivers;
exports.getwaiverById = getwaiverById;
exports.addWaiver = addWaiver;
const supabase_1 = require("./supabase");
const crypto_1 = __importDefault(require("crypto"));
const emailService_1 = require("./emailService");
function urlBuffer(dataUrl) {
    const match = dataUrl?.match(/^data:(.+);base64,(.*)$/);
    if (!match)
        throw new Error('Firma inválida (no es dataURL base64)');
    const mime = match[1];
    const b64 = match[2];
    const buffer = Buffer.from(b64, 'base64');
    let ext = 'png';
    if (mime.includes('svg'))
        ext = 'svg';
    else if (mime.includes('jpeg'))
        ext = 'jpg';
    else if (mime.includes('jpg'))
        ext = 'jpg';
    return { mime, buffer, ext };
}
async function uploadsign(dataUrl) {
    const { mime, buffer, ext } = urlBuffer(dataUrl);
    const name = `signatures/${new Date().toISOString().slice(0, 10)}_${crypto_1.default.randomUUID()}.${ext}`;
    const { error: err } = await supabase_1.supabase.storage.from('signatures').upload(name, buffer, { contentType: mime, upsert: false });
    if (err)
        throw err;
    const { data } = supabase_1.supabase.storage.from('signatures').getPublicUrl(name);
    return data.publicUrl;
}
async function getWaivers() {
    const { data } = await supabase_1.supabase.from('waivers').select('*').order('id', { ascending: false });
    return data;
}
async function getwaiverById(id) {
    const { data } = await supabase_1.supabase.from('waivers').select('*').eq('id', id).maybeSingle();
    return data;
}
async function addWaiver(body) {
    const signUrl = await uploadsign(body.signature_url);
    const insert = {
        name: body.name, legal_guardian: body.legal_guardian, email: body.email, tour_date: body.tour_date,
        alcoholism: !!body.alcoholism, claustrophobia: !!body.claustrophobia, dizzines: !!body.dizzines,
        ear_infection: body.ear_infection, epilepsy: !!body.epilepsy, peptic_ulcers: !!body.peptic_ulcers,
        respiratory_problems: !!body.respiratory_problems, neck_injure: !!body.neck_injure, back_problems: !!body.back_problems,
        drug_use: !!body.drug_use, depression: !!body.depression, heart_problems: !!body.heart_problems, recent_operation: !!body.recent_operation,
        headaches: !!body.headaches, overweight: !!body.overweight,
        other_condition: body.other_condition, pregnancy: Number(body.pregnancy), medications: body.medications, date_medications: body.date_medications,
        date_examination: body.date_examination, date_xray: body.date_xray, other_areas: body.other_areas, signUrl
    };
    const { data } = await supabase_1.supabase.from('waivers').insert([insert]).select().single();
    (0, emailService_1.sendEmail)(data);
    return data;
}
