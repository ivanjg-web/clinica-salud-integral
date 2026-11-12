import { Router } from "express";
import {
  obtenerPacientes,
  obtenerPacientesPorId,
  registrarPaciente,
} from "../controllers/patient.controller.ts";

import { validatePatient } from "../middlewares/validate-patient.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";

const router = Router();

router.get("/", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }] */
  return obtenerPacientes(req, res);
});

router.get("/:id", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }] */
  return obtenerPacientesPorId(req, res);
});

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validatePatient,
  (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return registrarPaciente(req, res);
  },
);

export default router;
