import { supabase } from './supabase'
import { waiver, WaiverTable } from '../types'
import crypto from 'crypto'
import { sendEmail } from "./emailService"

const WAIVERS_TABLE = process.env.WAIVERS_TABLE
const SIGN_BUCKET = process.env.SIGN_BUCKET

/** Calcula nivel de riesgo segun condiciones */
function calcRisk(body: any) {

    const conditions = [body.alcoholism, body.claustrophobia, body.dizzines, body.ear_infection,
    body.epilepsy, body.peptic_ulcers, body.respiratory_problems, body.neck_injure,
    body.back_problems, body.drug_use, body.depression, body.heart_problems, body.recent_operation,
    body.headaches, body.overweight ]

    let count = 0

    for(let i = 0; i < conditions.length; i++){
        if(conditions[i] === true){
            count ++
        }
    }

    if (count <= 1) return 'Bajo'
    if (count === 2) return 'Medio'
    return 'Alto'
}


/** Convierte URL WEBP en Buffer */
function signBuffer(dataUrl: string): Buffer {

    if (!dataUrl || !dataUrl.startsWith("data:image/webp;base64,")) {
        throw new Error('Firma invalida')
    }
    const base64 = dataUrl.replace("data:image/webp;base64,", "")  
    return Buffer.from(base64, 'base64')  
}


/** Sube la firma a Supabase Storage y retorna URL */
async function uploadsign(dataUrl:string): Promise<string> {

    const buffer = signBuffer(dataUrl)
    const name = `${SIGN_BUCKET}/${new Date().toISOString().slice(0, 10)}_${crypto.randomUUID()}.webp`

    await supabase.storage.from(SIGN_BUCKET!).upload(name, buffer, {contentType: 'image/webp', upsert: false})

    const { data } = supabase.storage.from(SIGN_BUCKET!).getPublicUrl(name)
    return data.publicUrl
}


/** Retorna lista con campos basicos de waivers */
export async function getWaivers(): Promise<WaiverTable[]> {

    const { data } = await supabase.from(WAIVERS_TABLE!).select('id, name, email, legal_guardian, tour_date, created_at, risk_level').order('id', {ascending: false})
    return data as WaiverTable[]
}


/** Retorna todos los campos de un waiver especifico */
export async function getwaiverById(id: number): Promise<waiver> {

    const { data } = await supabase.from(WAIVERS_TABLE!).select('*').eq('id', id).maybeSingle()
    return data  as waiver
}


/** Sube firma a Storage y obtiene url. Calula risk_level. Inserta en DB y retorna resultado. Envia email de confirmacion */
export async function addWaiver(body: any): Promise<waiver> {

    const signature_url = await uploadsign(body.signature)

    const risk_level = calcRisk(body)

    const insert = {
        name: body.name, legal_guardian: body.legal_guardian, email: body.email, tour_date: body.tour_date,
        alcoholism: !!body.alcoholism, claustrophobia: !!body.claustrophobia, dizzines: !!body.dizzines,
        ear_infection: !!body.ear_infection, epilepsy: !!body.epilepsy, peptic_ulcers: !!body.peptic_ulcers,
        respiratory_problems: !!body.respiratory_problems, neck_injure: !!body.neck_injure, back_problems: !!body.back_problems,
        drug_use: !!body.drug_use, depression: !!body.depression, heart_problems: !!body.heart_problems, recent_operation: !!body.recent_operation,
        headaches: !!body.headaches, overweight: !!body.overweight,
        other_condition: body.other_condition, pregnancy: Number(body.pregnancy), medications: body.medications, date_medications: body.date_medications,
        date_examination: body.date_examination, date_xray: body.date_xray, other_areas: body.other_areas, signature_url, risk_level
    }

    delete (insert as any).signature
    const { data } = await supabase.from('waivers').insert([insert]).select().single()

    /** Envio de email en segundo plano, no espera */
    sendEmail(data as waiver)
    return data as waiver
}