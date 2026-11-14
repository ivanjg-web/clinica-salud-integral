import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const appointmentSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  scheduledAt: z.coerce
    .date()
    .min(new Date(), "No puedes agendar una cita en una fecha que ya pasó"),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(["COMPLETADA", "CANCELADA"]),
});

export function validateAppointment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = appointmentSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      message: "Error de validación",
      errors: resultado.error.issues.map((error) => ({
        campo: error.path.join("."),
        mensaje: error.message,
      })),
    });

    return;
  }

  req.body = resultado.data;

  next();
}

export function validateAppointmentStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = appointmentStatusSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      message: "Estado de cita no válido",
      errors: resultado.error.issues.map((error) => ({
        campo: error.path.join("."),
        mensaje: error.message,
      })),
    });

    return;
  }

  req.body = resultado.data;

  next();
}
