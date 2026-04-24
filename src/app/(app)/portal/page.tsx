import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export default async function PatientPortalPage() {
  const session = await requireRole(Role.PATIENT);

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id },
    include: {
      doctor: {
        select: {
          name: true,
          email: true,
        },
      },
      medicalRecords: {
        orderBy: { date: "desc" },
        take: 3,
      },
    },
  });

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-healix-600">
          Patient Portal
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">
          Welcome, {session.user.name}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Your access is limited to your own care information. Doctor-only
          management routes stay blocked by middleware and server-side role checks.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Care summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-900">Primary disease:</span>{" "}
              {patient?.disease ?? "Not set"}
            </p>
            <p>
              <span className="font-medium text-slate-900">Age:</span>{" "}
              {patient?.age ?? "Not set"}
            </p>
            <p>
              <span className="font-medium text-slate-900">Assigned doctor:</span>{" "}
              {patient?.doctor.name ?? "Not set"}
            </p>
            <p>
              <span className="font-medium text-slate-900">Contact:</span>{" "}
              {patient?.doctor.email ?? "Not set"}
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Latest records</h2>
          <div className="mt-4 space-y-3">
            {patient?.medicalRecords.length ? (
              patient.medicalRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border bg-white px-4 py-4">
                  <p className="font-medium text-slate-900">{record.diagnosis}</p>
                  <p className="mt-1 text-sm text-slate-500">{record.notes}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed bg-white px-4 py-8 text-sm text-slate-500">
                No medical records available yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
