import { prisma } from "../config/prisma.ts";

// CONSULTAR TODOS LOS PACIENTES
export async function obtenerPacientes() {
  return await prisma.patient.findMany();
}

// CONSULTAR UN PACIENTE POR ID
export async function obtenerPacientePorId(id: number) {
  return await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        orderBy: {
          scheduledAt: "desc",
        },
        include: {
          doctor: {
            include: {
              specialty: true,
            },
          },
        },
      },
    },
  });
}

// CREAR UN NUEVO PACIENTE
export async function crearPaciente(
  name: string,
  email: string,
  birthDate: Date,
) {
  return await prisma.patient.create({
    data: {
      name,
      email,
      birthDate,
    },
  });
}

// ACTUALIZAR UN PACIENTE
export async function actualizarPaciente(
  id: number,
  name: string,
  email: string,
  birthDate: Date,
) {
  return await prisma.patient.update({
    where: { id },
    data: {
      name,
      email,
      birthDate,
    },
  });
}

// ELIMINAR UN PACIENTE
export async function eliminarPaciente(id: number) {
  return await prisma.patient.delete({
    where: { id },
  });
}
