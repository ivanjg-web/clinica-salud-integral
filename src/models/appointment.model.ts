import { prisma } from "../config/prisma.ts";
import type { Prisma, AppointmentStatus } from "../generated/prisma/client.ts";

export async function createAppointment(data: Prisma.AppointmentCreateInput) {
  return await prisma.appointment.create({
    data,
  });
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus,
) {
  return await prisma.appointment.update({
    where: { id },
    data: { status },
  });
}
