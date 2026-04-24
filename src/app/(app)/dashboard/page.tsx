import { CalendarClock, ShieldCheck, Users } from "lucide-react";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export default async function DashboardPage() {
  const session = await requireRole(Role.DOCTOR);

  const [patientCount, upcomingAppointments, recentPatients] = await Promise.all([
    prisma.patient.count({ where: { doctorId: session.user.id } }),
    prisma.appointment.count({
      where: {
        patient: {
          doctorId: session.user.id,
        },
      },
    }),
    prisma.patient.findMany({
      where: { doctorId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-skycare-600">
          Doctor Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-slate-950">
          Welcome back, {session.user.name}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Your workspace is secured with credential-based authentication, hashed
          passwords, role-aware sessions, and middleware-protected routes.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={Users}
          label="Assigned Patients"
          value={patientCount.toString()}
          tone="bg-skycare-50 text-skycare-700"
        />
        <StatCard
          icon={CalendarClock}
          label="Appointments"
          value={upcomingAppointments.toString()}
          tone="bg-healix-50 text-healix-700"
        />
        <StatCard
          icon={ShieldCheck}
          label="Access Policy"
          value="Active"
          tone="bg-slate-100 text-slate-700"
        />
      </section>

      <section className="rounded-[24px] border bg-slate-50 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent patients</h2>
            <p className="text-sm text-slate-600">
              These records are visible only within your doctor scope.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {recentPatients.length > 0 ? (
            recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between rounded-2xl border bg-white px-4 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{patient.fullName}</p>
                  <p className="text-sm text-slate-500">
                    {patient.disease ?? "Condition pending"}{patient.age ? ` • ${patient.age} years` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-skycare-50 px-3 py-1 text-xs font-medium text-skycare-700">
                  Patient
                </span>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed bg-white px-4 py-8 text-sm text-slate-500">
              No patient accounts created yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-[24px] border bg-white p-5">
      <div className={`inline-flex rounded-2xl p-3 ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
