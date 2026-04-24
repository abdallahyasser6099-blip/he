# HEALIX Health System

HEALIX is a clinic management system for chronic disease care with secure doctor and patient access.

## Current Phase

This repository currently includes the authentication foundation and a deployment-ready production setup:

- Next.js App Router setup with TypeScript and Tailwind CSS
- Prisma schema for users, patients, medical records, and appointments
- Secure credentials login with `next-auth`
- Bcrypt password hashing
- Doctor and patient roles
- Protected routes with middleware and server-side role checks
- Doctor-managed patient account creation
- PostgreSQL-ready environment configuration for Render or any PostgreSQL host

## Local Setup

1. Create a PostgreSQL database.

   Recommended:

   - Neon
   - Supabase

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your real values:

   - `DATABASE_URL`: pooled PostgreSQL URL
   - `DIRECT_URL`: direct PostgreSQL URL
   - `AUTH_SECRET`: long random secret
   - `AUTH_URL`: `http://localhost:3000` locally

4. Install dependencies:

   ```bash
   npm install
   ```

5. Generate Prisma client and sync the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Seed demo users:

   ```bash
   npm run prisma:seed
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Demo Accounts

- Doctor: `doctor@healix.dev` / `Doctor@123`
- Patient: `patient@healix.dev` / `Patient@123`

## Notes

- This project now targets PostgreSQL for both development and production.
- `DATABASE_URL` should use a pooled connection for the running app.
- `DIRECT_URL` should use a direct connection for Prisma schema operations.
- Patient creation is doctor-controlled to preserve secure onboarding.

## Deploy To Render

This repo includes a `render.yaml` blueprint so Render can create the web service and PostgreSQL database from GitHub.

1. Open Render and connect your GitHub account.
2. Create a new Blueprint deployment from this repository.
3. Render will create:

   - a web service for the Next.js app
   - a PostgreSQL database
   - generated environment variables for the app

4. Set `AUTH_URL` to your final Render domain after the service URL is created.
5. After the first deploy, run the database sync and seed once:

   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

## Manual Render Environment Variables

If you prefer creating the Render services manually, add these environment variables to the web service:

   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `AUTH_URL=https://your-service-name.onrender.com`

## GitHub To Production Flow On Render

1. Push code to GitHub.
2. Connect the GitHub repo in Render.
3. Deploy with the included `render.yaml` blueprint or create the web service manually.
4. Add `AUTH_URL` after the Render URL is assigned.
