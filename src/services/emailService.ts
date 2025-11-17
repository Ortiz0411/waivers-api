/**
 * Envio de correo de confirmacion con nodemailer.
 * - Configuracion SMTP en .env.
 * - Adjunta pdf del waiver ingresado.
 */

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { waiver } from '../types'
import { genPdf } from './pdfService'
import path from 'path'

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

    const date = new Date(waiver.tour_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    const mailOptions = {
        from: `<${process.env.SMTP_USER}>`,
        to: waiver.email,
        subject: 'Waiver Confirmation',
        text: `Thank you for submitting your waiver.`,
        html: `
                <div style="background-color:#f8f8f8; padding:20px; text-align:center; font-family:Arial, sans-serif;">
                <div style="max-width:600px; width:100%; background:#ffffff; margin:auto; border-radius:10px; padding:25px 20px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

                    <!-- LOGO -->
                    <div style="margin-bottom:20px;">
                    <img src="cid:rcrlogo" alt="RCR Logo" style="width:150px; max-width:80%; height:auto;">
                    </div>

                    <!-- TÍTULO -->
                    <h2 style="color:#BA251E; margin-bottom:10px; font-size:20px; line-height:1.3;">Waiver Submitted Successfully</h2>
                    <p style="color:#1E1B16; font-size:15px; margin-bottom:18px;">
                    Thank you for submitting your waiver, <strong>${waiver.name}</strong>.
                    </p>

                    <!-- BLOQUE DE TEXTO -->
                    <div style="background-color:#FBE03910; border:1px solid #FBE039; border-radius:8px; padding:15px; margin-bottom:18px;">
                    <p style="color:#1E1B16; font-size:14.5px; line-height:1.6; margin:0;">
                        We have received your information and you're all set for your adventure on <br>
                        <strong style="color:#BA251E;">${date}</strong>
                    </p>
                    </div>

                    <!-- CUERPO -->
                    <p style="color:#1E1B16; font-size:14.5px; line-height:1.6; margin:0 0 12px 0;">
                    Please arrive <strong>15 minutes prior</strong> to your scheduled tour time.<br>
                    Your waiver in PDF format is attached to this email.
                    </p>

                    <p style="color:#1E1B16; font-size:14.5px; margin:10px 0 0 0;">
                    We look forward to seeing you!
                    </p>

                    <!-- FOOTER -->
                    <hr style="border:none; border-top:1px solid #eee; margin:18px 0 10px 0;">
                    <p style="color:#808080; font-size:12.5px; margin:6px 0 0 0;">
                    © ${new Date().getFullYear()} RCR Rafting. All rights reserved.
                    </p>
                </div>
                </div>
                `,
        attachments: [
            {
                filename: `waiver-${waiver.name}.pdf`,
                content: pdf
            },
            {
                filename: 'rcrlogo.png',
                path: path.resolve(__dirname, '../assets/rcrlogo.png'),
                cid: 'rcrlogo',
            },
        ]
    }
    await transporter.sendMail(mailOptions)
}