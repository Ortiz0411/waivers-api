# WAIVERS API (Backend)

REST API built with **Node.js + Express + TypeScript** to register and manage rafting tour waivers.

Data is stored in **Supabase (PostgreSQL + Storage)**.  
Each waiver can be converted into a **PDF** that includes all submitted information and the participant’s digital signature.

---

- REST API endpoints to:
  - List waivers.
  - Get waiver details by ID.
  - Create a new waiver.
  - Download the **PDF** for a waiver.
- **Supabase** integration:
  - Database table for waivers.
  - Storage bucket for digital signatures.
- Signature handling:
  - Frontend sends signature as png.
  - Backend converts it to **WEBP** with **Sharp** and uploads it to Supabase Storage.
- **PDF generation** with PDFKit + Sharp:
  - Company logo at the top.
  - Signature image loaded from Supabase public URL.
  - Legal text and waiver data rendered into a single PDF.
- **Automatic risk level** calculation:
  - Based on multiple medical conditions (alcoholism, claustrophobia, heart problems, etc.).
  - Output is `Low`, `Medium` or `High`.
- **Admin authentication** with Supabase Auth:
  - Login with username/password.
  - Only the email defined in `ADMIN_EMAIL` is allowed as admin.
  - `valAuth` middleware protects admin-only routes.
- **Security**:
  - CORS configured for both local and production frontends.
  - Helmet for safer HTTP headers.
- Health check endpoint: `GET /health`.

- > There is also a **confirmation email service** implemented with Nodemailer, but the code is currently commented out and **not** called.  

---

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase JS](https://supabase.com/docs/reference/javascript)
- [Sharp](https://sharp.pixelplumbing.com/)
- [PDFKit](https://pdfkit.org/)
- [Helmet](https://github.com/helmetjs/helmet)
- [CORS](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)
- (Optional) [Nodemailer](https://nodemailer.com/) – for confirmation emails.

---

## Getting started

  
