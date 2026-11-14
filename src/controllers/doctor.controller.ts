import type { Request, Response } from "express";

import {
  obtenerMedicos,
  obtenerMedicoPorId,
  getDoctorAgenda,
} from "../models/doctor.model.ts";

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

export async function consultarMedicoPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del médico no es válido",
      });
      return;
    }

    const medico = await obtenerMedicoPorId(id);

    if (!medico) {
      res.status(404).json({
        message: "El médico no existe",
      });
      return;
    }

    res.status(200).json(medico);
  } catch (error) {
    res.status(500).json({
      message: "Error al consultar el médico",
      error,
    });
  }
}

export async function consultarAgendaMedico(req: Request, res: Response) {
  try {
    const doctorId = Number(req.params.id);

    if (!Number.isInteger(doctorId) || doctorId <= 0) {
      res.status(400).json({
        message: "El ID del médico no es válido",
      });
      return;
    }

    if (!req.user || req.user.doctorId !== doctorId) {
      res.status(403).json({
        message: "Solo puedes consultar tu propia agenda",
      });
      return;
    }

    const { from, to } = req.query;

    if (
      (from !== undefined && typeof from !== "string") ||
      (to !== undefined && typeof to !== "string")
    ) {
      res.status(400).json({
        message: "Las fechas deben enviarse como texto",
      });
      return;
    }

    if ((from && !to) || (!from && to)) {
      res.status(400).json({
        message: "Debes enviar las dos fechas: from y to",
      });
      return;
    }

    let fechaDesde: Date | undefined;
    let fechaHasta: Date | undefined;

    if (from && to) {
      const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

      if (!formatoFecha.test(from) || !formatoFecha.test(to)) {
        res.status(400).json({
          message: "Las fechas deben tener el formato AAAA-MM-DD",
        });
        return;
      }

      fechaDesde = new Date(`${from}T00:00:00`);
      fechaHasta = new Date(`${to}T23:59:59.999`);

      if (
        Number.isNaN(fechaDesde.getTime()) ||
        Number.isNaN(fechaHasta.getTime()) ||
        fechaDesde > fechaHasta
      ) {
        res.status(400).json({
          message: "El rango de fechas no es válido",
        });
        return;
      }
    }

    const agenda = await getDoctorAgenda(doctorId, fechaDesde, fechaHasta);

    res.status(200).json(agenda);
  } catch (error) {
    res.status(500).json({
      message: "Error al consultar la agenda del médico",
      error,
    });
  }
}
