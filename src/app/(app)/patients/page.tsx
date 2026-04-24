import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";
import { CreatePatientForm } from "./patient-form";

export default async function PatientsPage() {
  const session = await requireRole(Role.DOCTOR);

  const patients = await prisma.patient.findMany({
    where: { doctorId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-[24px] border bg-white p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-skycare-600">
            Patients
          </p>
          <h1 className="text-2xl font-semibold text-slate-950">
            Doctor-managed patient access
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Only doctors can create patient accounts. Passwords are hashed before
            storage and patients are automatically linked to your care panel.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {patients.length > 0 ? (
            patients.map((patient) => (
              <div
                key={patient.id}
                className="rounded-2xl border bg-slate-50 px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{patient.fullName}</p>
                    <p className="text-sm text-slate-500">
                      {patient.user?.email ?? "No login yet"}
                    </p>
                  </div>
                  <span className="rounded-full bg-healix-50 px-3 py-1 text-xs font-medium text-healix-700">
                    {patient.disease ?? "Condition pending"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed px-4 py-8 text-sm text-slate-500">
              No patients have been added yet.
            </div>
          )}
        </div>
      </section>

      <CreatePatientForm />
    </div>
  );
}
