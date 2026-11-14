import type { Request, Response } from "express";

import { obtenerPacientePorId } from "../models/patient.model.ts";
import { obtenerMedicoPorId } from "../models/doctor.model.ts";
import { createAppointment } from "../models/appointment.model.ts";
import { updateAppointmentStatus } from "../models/appointment.model.ts";
import { Prisma } from "../generated/prisma/client.ts";

export async function crearCita(req: Request, res: Response) {
  try {
    const { patientId, doctorId, scheduledAt } = req.body;

    const paciente = await obtenerPacientePorId(patientId);

    if (!paciente) {
      res.status(404).json({
        message: "El paciente no existe",
      });
      return;
    }

    const medico = await obtenerMedicoPorId(doctorId);

    if (!medico) {
      res.status(404).json({
        message: "El médico no existe",
      });
      return;
    }

    const cita = await createAppointment({
      scheduledAt,
      patient: {
        connect: { id: patientId },
      },
      doctor: {
        connect: { id: doctorId },
      },
    });

    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({
      message: "Error al agendar la cita",
      error,
    });
  }
}

export async function actualizarEstadoCita(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID de la cita no es valido",
      });
      return;
    }

    const cita = await updateAppointmentStatus(id, status);

    res.status(200).json(cita);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        message: "La cita no existe",
      });
      return;
    }

    res.status(500).json({
      message: "Error al actualizar el estado de la cita",
      error,
    });
  }
}
