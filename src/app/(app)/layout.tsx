import { AppShell } from "@/components/app-shell";
import { requireSession } from "@/lib/session";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <AppShell
      role={session.user.role}
      name={session.user.name ?? "HEALIX User"}
      email={session.user.email ?? ""}
    >
      {children}
    </AppShell>
  );
}
