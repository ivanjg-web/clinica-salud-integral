import { prisma } from "../config/prisma.ts";

export async function obtenerMedicos(specialty?: string) {
  return await prisma.doctor.findMany({
    where: specialty
      ? {
          specialty: {
            name: specialty,
          },
        }
      : {},
    include: {
      specialty: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function obtenerMedicoPorId(id: number) {
  return await prisma.doctor.findUnique({
    where: { id },
    include: {
      specialty: true,
    },
  });
}

export async function getDoctorAgenda(
  doctorId: number,
  from?: Date,
  to?: Date,
) {
  return await prisma.appointment.findMany({
    where: {
      doctorId,
      ...(from && to
        ? {
            scheduledAt: {
              gte: from,
              lte: to,
            },
          }
        : {}),
    },
    include: {
      patient: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}
