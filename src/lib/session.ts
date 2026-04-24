import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { homeForRole } from "@/lib/roles";

export async function requireSession() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(role: Role) {
  const session = await requireSession();

  if (session.user.role !== role) {
    redirect(homeForRole(session.user.role));
  }

  return session;
}
