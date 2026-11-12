import { prisma } from "../config/prisma.ts";

export async function obtenerEspecialidades() {
  return await prisma.specialty.findMany({
    orderBy: {
      id: "asc",
    },
  });
}
