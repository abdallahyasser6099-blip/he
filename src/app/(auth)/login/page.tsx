import { ShieldCheck } from "lucide-react";

import { auth } from "@/auth";
import { homeForRole } from "@/lib/roles";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect(homeForRole(session.user.role));
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-slate-950 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-sm font-medium text-skycare-100">
          <span className="rounded-full bg-white/10 p-2">
            <ShieldCheck className="h-5 w-5" />
          </span>
          HEALIX Health System
        </div>
        <div className="max-w-xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-healix-100">
            Secure Chronic Care Workspace
          </p>
          <h1 className="text-5xl font-semibold leading-tight">
            Protected access for doctors and patients in one clinical system.
          </h1>
          <p className="text-lg leading-8 text-slate-300">
            Built for long-term care workflows with role-aware access, protected
            routes, and tightly scoped patient data visibility.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-panel backdrop-blur">
          <div className="mb-8 space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-skycare-600">
              Sign In
            </p>
            <h2 className="text-3xl font-semibold text-slate-950">
              Access your HEALIX workspace
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Use the credentials issued by your clinic administrator or doctor.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
