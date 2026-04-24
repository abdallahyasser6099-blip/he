import { PrismaClient, Role } from "@prisma/client";

import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const doctorPasswordHash = await hashPassword("Doctor@123");
  const patientPasswordHash = await hashPassword("Patient@123");

  const doctor = await prisma.user.upsert({
    where: { email: "doctor@healix.dev" },
    update: {
      name: "Dr. Sarah Hassan",
      passwordHash: doctorPasswordHash,
      role: Role.DOCTOR,
    },
    create: {
      name: "Dr. Sarah Hassan",
      email: "doctor@healix.dev",
      passwordHash: doctorPasswordHash,
      role: Role.DOCTOR,
    },
  });

  await prisma.user.upsert({
    where: { email: "patient@healix.dev" },
    update: {
      name: "Omar Ali",
      passwordHash: patientPasswordHash,
      role: Role.PATIENT,
      patientProfile: {
        upsert: {
          update: {
            fullName: "Omar Ali",
            age: 57,
            disease: "Type 2 Diabetes",
            doctorId: doctor.id,
          },
          create: {
            fullName: "Omar Ali",
            age: 57,
            disease: "Type 2 Diabetes",
            doctorId: doctor.id,
          },
        },
      },
    },
    create: {
      name: "Omar Ali",
      email: "patient@healix.dev",
      passwordHash: patientPasswordHash,
      role: Role.PATIENT,
      patientProfile: {
        create: {
          fullName: "Omar Ali",
          age: 57,
          disease: "Type 2 Diabetes",
          doctorId: doctor.id,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
