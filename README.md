redme de api

# WAIVERS API

API REST desarrollada en **Node.js + Express + TypeScript** que permite el registro de waivers para tours de rafting.
Los datos se almacenan en **Supabase (PostgreSQL + Storage)**, y se envia un **correo automático de confirmación, con PDF adjunto** que contiene la informacion completada por el participante.

## Características
- CRUD Básico (GET, POST).
- Conexión a **Supabase** (Base de datos y Storage para firmas digitales).
- Envío de emails automaticos con **Nodemailer**.
- Generación de **PDF con PDFKIT**.
- Autenticación con **JWT**.
- Deploy en **Vercel (serverless Express backend)**

## Tecnologías
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [Nodemailer](https://nodemailer.com/)
- [PDFKit](https://pdfkit.org/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## Instalacion
1. Clonar repositorio:
   ```bash
   git clone https://github.com/Ortiz0411/waivers-api.git
   cd waivers-api

3. Instalar dependencias:
   ```bash
   npm install

5. Crear archivo .env en raíz del proyecto:
   ```env
   PORT=4000
   NODE_ENV=development

   BASE_URL=http://localhost:4000
   FRONT_LOCAL=http://localhost:5173
   FRONT_PROD=https://tu-frontend.vercel.app

   SUPABASE_URL=https://tu-instancia.supabase.co
   SUPABASE_ROLE=tu_service_role_key
   DB_TABLE=tu_tabla_supabase
   SUPABASE_BUCKET=tu_bucket_supabase

   JWT=clave_secreta
   ADMIN_USER=admin
   ADMIN_HASH=hash_bcrypt

   SMTP_HOST=smtp.tuservidor.com
   SMTP_PORT=587
   SMTP_USER=ejemploemail@tuemail.com
   SMTP_PASS=tu_contraseña
   

7. Ejecutar modo desarrollo
   ```bash
   npm run dev

8. Compilar produccion
   ```bash
   npm run build

## Contacto
- Autor: Andrey Ortiz
- Email: a.ortizmar11@gmail.com
- LinkedIn: www.linkedin.com/in/andrey-ortiz-m