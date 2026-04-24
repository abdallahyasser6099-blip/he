import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      patientProfileId: string | null;
    };
  }

  interface User {
    role: Role;
    patientProfileId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    patientProfileId?: string | null;
  }
}
