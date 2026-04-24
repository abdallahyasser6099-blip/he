# HEALIX Health System

HEALIX is a chronic-care clinic management system designed for doctor and patient workflows.

## Phase 1 Focus

Phase 1 establishes architecture, project layout, UI shell planning, and a baseline PostgreSQL schema that can grow safely in later phases.

## Recommended Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth direction**: NextAuth or JWT-based auth in Phase 2
- **Data fetching**: React Query

## Repository Structure

```text
healix/
├── apps/
│   ├── web/                  # Next.js frontend migration target
│   └── api/                  # Express REST API scaffold
├── packages/
│   ├── types/                # Shared DTOs and domain types
│   ├── ui/                   # Shared UI primitives for future reuse
│   └── config/               # Shared tsconfig/eslint/prettier setup
├── prisma/
│   └── schema.prisma         # Database schema
├── docs/
│   └── phase-1-architecture.md
└── README.md
```

## Core Modules

- Authentication
- Dashboard
- Patients
- Medical Records
- Appointments
- Reports
- Settings

## Separation of Responsibilities

- Frontend handles presentation, local form state, and safe API consumption.
- Backend owns authentication, authorization, validation, and patient-data access checks.

## Phase 1 Deliverables in This Repo

- Initial monorepo-aligned folder scaffold under `apps/` and `packages/`
- API service bootstrap (`apps/api`) with health route and centralized error middleware
- Shared type package seed (`packages/types`)
- Shared TypeScript configuration baseline (`packages/config`)
- Expanded Prisma schema for users, patients, appointments, medical records, and auth-ready entities (`Account`, `Session`, `VerificationToken`)
- Architecture document in `docs/phase-1-architecture.md`

## Transitional Note

The current Next.js application remains at repository root during migration.
`apps/web` is reserved as the target location for a phased move in upcoming iterations.
