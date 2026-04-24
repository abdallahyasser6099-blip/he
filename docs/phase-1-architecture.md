# HEALIX Phase 1 Architecture

## Objectives

Phase 1 defines the baseline architecture for HEALIX as a chronic-care clinic platform. The goal is to establish a stable foundation before implementing advanced workflows in Phase 2.

## Monorepo Layout

```text
healix/
├── apps/
│   ├── web/                  # Next.js frontend (planned migration target)
│   └── api/                  # Express API service
├── packages/
│   ├── types/                # Shared DTOs and domain contracts
│   ├── ui/                   # Shared UI primitives for multi-app reuse
│   └── config/               # Shared TS/ESLint/Prettier configuration
├── prisma/
│   └── schema.prisma         # PostgreSQL relational model
├── docs/
│   └── phase-1-architecture.md
└── README.md
```

## Frontend / Backend Responsibilities

### Frontend (`apps/web`)
- Route composition and UI shell
- Form state and user interaction handling
- Safe API consumption via typed clients
- Feature boundaries: dashboard, patients, appointments, medical records, reports, settings

### Backend (`apps/api`)
- Authentication and role-based authorization
- Validation and input sanitization
- Access controls for protected patient data
- Domain modules and route composition

## Module Map

- **Authentication**: identity, sessions, roles, permission checks
- **Dashboard**: operational summaries and key metrics
- **Patients**: demographics, care assignment, status tracking
- **Medical Records**: longitudinal clinical notes and diagnosis context
- **Appointments**: scheduling lifecycle and attendance/status updates
- **Reports**: longitudinal exports, clinic analytics
- **Settings**: clinic-level configuration and user preferences

## Data Model Principles

- PostgreSQL is the source of truth.
- Prisma provides schema, type generation, and migration workflow.
- The schema is normalized for patient safety and auditable updates.
- Phase 1 includes foundational auth entities (`Account`, `Session`, `VerificationToken`) to enable NextAuth or JWT workflows in Phase 2.

## Implementation Notes

- The existing Next.js application at repository root remains operational during migration.
- `apps/api` and `packages/*` are scaffolded to establish clear boundaries for upcoming phases.
- Future work will migrate frontend files into `apps/web` while preserving behavior.
