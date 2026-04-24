import { requireSession } from "@/lib/session";

export default async function AppointmentsPage() {
  await requireSession();

  return (
    <div className="rounded-[24px] border bg-slate-50 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-skycare-600">
        Appointments
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-950">
        Protected appointments area
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        This route is protected for authenticated users and ready for the Phase 4
        appointments module.
      </p>
    </div>
  );
}
