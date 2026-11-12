import type { Request, Response } from "express";

import {
  obtenerPacientes as consultarPacientes,
  obtenerPacientePorId,
  crearPaciente,
  actualizarPaciente as actualizarPacienteModelo,
  eliminarPaciente as eliminarPacienteModelo,
} from "../models/patient.model.ts";

// LISTAR TODOS LOS PACIENTES
export async function obtenerPacientes(req: Request, res: Response) {
  try {
    const pacientes = await consultarPacientes();

    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al consultar pacientes:", error);

    res.status(500).json({
      message: "Error al consultar los pacientes",
    });
  }
}

// CONSULTAR UN PACIENTE POR ID
export async function obtenerPacientesPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del paciente debe ser un número entero positivo",
      });
      return;
    }

    const paciente = await obtenerPacientePorId(id);

    if (!paciente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    res.status(200).json(paciente);
  } catch (error) {
    console.error("Error al consultar paciente por ID:", error);

    res.status(500).json({
      message: "Error al consultar el paciente por ID",
    });
  }
}

// REGISTRAR UN PACIENTE
export async function registrarPaciente(req: Request, res: Response) {
  try {
    const { name, email, birthDate } = req.body;

    const nuevoPaciente = await crearPaciente(name, email, new Date(birthDate));

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error("Error al registrar paciente:", error);

    res.status(500).json({
      message: "Error al registrar el paciente",
    });
  }
}

// ACTUALIZAR UN PACIENTE
export async function actualizarPaciente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del paciente debe ser un número entero positivo",
      });
      return;
    }

    const { name, email, birthDate } = req.body;

    const pacienteExistente = await obtenerPacientePorId(id);

    if (!pacienteExistente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    const pacienteActualizado = await actualizarPacienteModelo(
      id,
      name,
      email,
      new Date(birthDate),
    );

    res.status(200).json(pacienteActualizado);
  } catch (error) {
    console.error("Error al actualizar paciente:", error);

    res.status(500).json({
      message: "Error al actualizar el paciente",
    });
  }
}

// ELIMINAR UN PACIENTE
export async function eliminarPaciente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: "El ID del paciente debe ser un número entero positivo",
      });
      return;
    }

    const pacienteExistente = await obtenerPacientePorId(id);

    if (!pacienteExistente) {
      res.status(404).json({
        message: "Paciente no encontrado",
      });
      return;
    }

    await eliminarPacienteModelo(id);

    res.status(200).json({
      message: "Paciente eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);

    res.status(500).json({
      message: "Error al eliminar el paciente",
    });
  }
}
