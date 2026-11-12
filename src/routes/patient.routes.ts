import { Router } from "express";
import {
  obtenerPacientes,
  obtenerPacientesPorId,
  registrarPaciente,
} from "../controllers/patient.controller.ts";

import { validatePatient } from "../middlewares/validate-patient.ts";

const router = Router();

router.get("/", obtenerPacientes);
router.get("/:id", obtenerPacientesPorId);
router.post("/", validatePatient, registrarPaciente);

export default router;
