import type { Request, Response } from "express";
import { obtenerEspecialidades } from "../models/specialty.model.ts";

// LISTAR TODAS LAS ESPECIALIDADES
export async function listarEspecialidades(req: Request, res: Response) {
  try {
    const especialidades = await obtenerEspecialidades();

    res.status(200).json(especialidades);
  } catch (error) {
    console.error("Error al consultar especialidades:", error);

    res.status(500).json({
      message: "Error al consultar las especialidades",
    });
  }
}
