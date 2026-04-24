import type { Role } from "@prisma/client";

export const doctorOnlyRoutes = ["/patients"];
export const patientOnlyRoutes = ["/portal"];

export function homeForRole(role: Role) {
  return role === "DOCTOR" ? "/dashboard" : "/portal";
}
