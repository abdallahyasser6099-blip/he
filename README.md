# HEALIX Health System

HEALIX is a clinic management system for chronic disease care with secure doctor and patient access.

## Current Phase

This repository currently includes the authentication foundation:

- Next.js App Router setup with TypeScript and Tailwind CSS
- Prisma schema for users, patients, medical records, and appointments
- Secure credentials login with `next-auth`
- Bcrypt password hashing
- Doctor and patient roles
- Protected routes with middleware and server-side role checks
- Doctor-managed patient account creation

## Local Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate Prisma client and sync the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Seed demo users:

   ```bash
   npm run prisma:seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Demo Accounts

- Doctor: `doctor@healix.dev` / `Doctor@123`
- Patient: `patient@healix.dev` / `Patient@123`

## Notes

- The development database is SQLite for quick local setup.
- Production should move to PostgreSQL with the same Prisma models.
- Patient creation is doctor-controlled to preserve secure onboarding.
