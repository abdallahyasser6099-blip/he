import { requireSession } from "@/lib/session";

export default async function SettingsPage() {
  const session = await requireSession();

  return (
    <div className="rounded-[24px] border bg-slate-50 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-skycare-600">
        Settings
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-950">
        Account security
      </h1>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          Signed in as <span className="font-medium text-slate-900">{session.user.email}</span>
        </p>
        <p>
          Role <span className="font-medium text-slate-900">{session.user.role}</span>
        </p>
        <p>Password storage uses bcrypt hashing with 12 salt rounds.</p>
      </div>
    </div>
  );
}
