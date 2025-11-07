/**
 * Envio de correo de confirmacion con nodemailer.
 * - Configuracion SMTP en .env.
 * - Adjunta pdf del waiver ingresado.
 */

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { waiver } from '../types'
import { genPdf } from './pdfService'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export const sendEmail = async (waiver: waiver) => {

    const pdf = await genPdf(waiver)

    const mailOptions = {
        from: `<${process.env.SMTP_USER}>`,
        to: waiver.email,
        subject: 'Confirmacion de Waiver',
        text: `Buenos dias ${waiver.name}, \n\nSu waiver ha sido recibido.\n\nGracias!`,
        html: `<p>Hola <strong>${waiver.name}</strong>,</p><p>Su waiver ha sido recibido.</p><p>Gracias!</p>`,
        attachments: [
            {
                filename: `waiver-${waiver.name}.pdf`,
                content: pdf
            }
        ]
    }
    await transporter.sendMail(mailOptions)
}