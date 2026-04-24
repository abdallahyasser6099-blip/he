"use client";

import Link from "next/link";
import { CalendarDays, FileText, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  role: "DOCTOR" | "PATIENT";
  name: string;
  email: string;
};

const navigation = {
  DOCTOR: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/patients", label: "Patients", icon: Users },
    { href: "/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  PATIENT: [
    { href: "/portal", label: "My Care", icon: LayoutDashboard },
    { href: "/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
} as const;

export function AppShell({ children, role, name, email }: AppShellProps) {
  const items = navigation[role];
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
        <aside className="rounded-[28px] border border-white/70 bg-slate-950 px-5 py-6 text-white shadow-panel">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-skycare-100">
                HEALIX
              </p>
              <div>
                <p className="text-lg font-semibold">{role === "DOCTOR" ? "Doctor Workspace" : "Patient Portal"}</p>
                <p className="text-sm text-slate-400">{email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                      active
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium">{name}</p>
            <p className="mt-1 text-xs text-slate-400">{role === "DOCTOR" ? "Role-based access enabled" : "Viewing your assigned care space"}</p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <main className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-panel backdrop-blur lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
