import { Role } from "@prisma/client";

import { requireRole } from "@/lib/session";

export default async function ReportsPage() {
  await requireRole(Role.DOCTOR);

  return (
    <div className="rounded-[24px] border bg-slate-50 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-skycare-600">
        Reports
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-950">
        Doctor-only reporting area
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Middleware and server-side checks keep report data unavailable to patient
        accounts.
      </p>
    </div>
  );
}
