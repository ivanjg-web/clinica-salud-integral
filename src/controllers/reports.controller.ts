import type { Request, Response } from "express";
import {
  getAppointmentsBySpecialty,
  getDailyCutoff,
} from "../models/reports.model.ts";

export async function consultarCitasPorEspecialidad(
  req: Request,
  res: Response,
) {
  try {
    const result = await getAppointmentsBySpecialty();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al consultar las citas por especialidad",
      error,
    });
  }
}

export async function consultarCorteDiario(req: Request, res: Response) {
  try {
    const date = req.query.date;

    if (typeof date !== "string") {
      return res.status(400).json({
        message: "Debes proporcionar una fecha válida",
      });
      return;
    }

    const result = await getDailyCutoff(date);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al consultar el corte diario",
      error,
    });
  }
}
