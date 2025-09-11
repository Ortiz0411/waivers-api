# WAIVERS API

API REST desarrollada en **Node.js + Express + TypeScript** que permite el registro de waivers para tours de rafting.
Los datos son almacenados en **PostgreSQL (Neon.Tech)**, y se envia un **correo de confirmación con PDF adjunto** con los datos completados por el participante.

## Características
- CRUD Básico (GET, POST).
- Conexión a PostgreSQL usando **pg (Client)**.
- Envío de emails automaticos con **Nodemailer**
- Generación de **PDF con PDFKIT**
- Válidaciones básicas
- Deploy en **Render**

## Tecnologías
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [PostgreSQL](https://www.postgresql.org/) con [Neon.tech](https://neon.tech/)  
- [Nodemailer](https://nodemailer.com/)  
- [PDFKit](https://pdfkit.org/)

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
   PORT=3000
   DATABASE_URL=postgres://usuario:password@host:5432/dbname
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña_2FA

7. Ejecutar
   ```bash
   npm run dev

## Contacto
  -Autor: Andrey Ortiz
  -Email: a.ortizmar11@gmail.com
  -LinkedIn: www.linkedin.com/in/andrey-ortiz-m
   
