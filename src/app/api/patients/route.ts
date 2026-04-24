import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

const createPatientSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
  age: z
    .union([z.string(), z.number()])
    .transform((value) => (value === "" ? undefined : Number(value)))
    .refine((value) => value === undefined || Number.isInteger(value), {
      message: "Age must be a whole number",
    })
    .optional(),
  disease: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== Role.DOCTOR) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const payload = await request.json();
  const parsed = createPatientSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid patient data",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(parsed.data.password);

  try {
    const patientUser = await prisma.user.create({
      data: {
        name: parsed.data.fullName,
        email: parsed.data.email.toLowerCase(),
        passwordHash,
        role: Role.PATIENT,
        patientProfile: {
          create: {
            fullName: parsed.data.fullName,
            age: parsed.data.age,
            disease: parsed.data.disease,
            doctorId: session.user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(patientUser, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to create patient account. Email may already exist." },
      { status: 409 },
    );
  }
}
