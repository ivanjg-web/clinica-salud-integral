import type { Request, Response } from "express";

import { obtenerMedicos } from "../models/doctor.model.ts";

// CONSULTAR TODOS LOS MÉDICOS O FILTRAR POR ESPECIALIDAD
export async function consultarMedicos(req: Request, res: Response) {
  try {
    const specialty = req.query.specialty;

    if (specialty !== undefined && typeof specialty !== "string") {
      res.status(400).json({
        message: "El parámetro 'specialty' debe ser un texto",
      });
      return;
    }

    const medicos = await obtenerMedicos(specialty);

    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({
      message: "Error al consultar los médicos",
      error,
    });
  }
}
