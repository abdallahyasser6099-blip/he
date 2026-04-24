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
- PostgreSQL-ready environment configuration for Vercel and Neon/Supabase

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

## Deploy To Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. In Vercel Project Settings, add these environment variables:

   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `AUTH_URL=https://your-project-domain.vercel.app`

4. Deploy the project.
5. After the first deploy, run the database sync once from a machine with access to the database:

   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

## GitHub To Production Flow

1. Push code to GitHub.
2. Connect the GitHub repo in Vercel.
3. Add the production environment variables in Vercel.
4. Redeploy after setting the variables.
