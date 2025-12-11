# WAIVERS API (Backend)

REST API built with **Node.js + Express + TypeScript** to register and manage rafting tour waivers.

Data is stored in **Supabase (PostgreSQL + Storage)**.  
Each waiver can be converted into a **PDF** that includes all submitted information and the participant’s digital signature.

> This API is currently deployed on **Vercel** as a serverless Express backend.

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
- [Nodemailer](https://nodemailer.com/)

---

## Getting started

1. Clone the repository
   ```bash
   git clone https://github.com/your_user/waivers-api.git
   cd waivers-api

2. Install dependencies
   ```bash
   npm install
   npm install nodemailer (if needed)

3. Environment variables
   ```bash
   # =========================
   # Server
   # =========================
     PORT=4000
     NODE_ENV=development

   # =========================
   # CORS (allowed frontends)
   # =========================
     FRONT_LOCAL=http://localhost:5173
     FRONT_PROD=https://your-frontend.vercel.app

   # =========================
   # Supabase
   # =========================
     SUPABASE_URL=https://your-instance.supabase.co
     SUPABASE_ROLE=your_service_role_key      # Service role (for DB + Storage)
     SUPABASE_ANON=your_anon_public_key       # Public anon key (for Auth)
     DB_TABLE=your_waivers_table_name         # Table name
     SUPABASE_BUCKET=your_signatures_bucket   # Bucket used to store WEBP signatures

   # =========================
   # Admin
   # =========================
     ADMIN_EMAIL=admin@email.com     # Only this email is allowed as admin

   # =========================
   # SMTP (optional, if you enable emails)
   # =========================
     SMTP_HOST=smtp.yourprovider.com
     SMTP_PORT=587
     SMTP_USER=example@yourdomain.com
     SMTP_PASS=your_password

4. Development server
   ```bash
   npm run dev

5. Production build
   ```bash
   npm run build
   npm start

---

# Deployment
This API is deployed on **Vercel** as a serverless Express backend.
- Environment variables are configured through the Vercel dashboard.
- The Express `app` exported in `src/index.ts` is used by the Vercel serverless function handler.

---

# Contact
- Autor: Andrey Ortiz
- Email: a.ortizmar11@gmail.com
- LinkedIn: www.linkedin.com/in/andrey-ortiz-m
