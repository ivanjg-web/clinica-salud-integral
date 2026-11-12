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
