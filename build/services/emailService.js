"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const pdfService_1 = require("./pdfService");
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendEmail = async (waiver) => {
    const pdf = await (0, pdfService_1.genPdf)(waiver);
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
    };
    await transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
