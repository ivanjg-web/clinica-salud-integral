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
  /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Listar pacientes'
    #swagger.description = 'Obtiene el listado de pacientes registrados en la clínica. Requiere autenticación JWT y rol RECEPCIONISTA.'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return obtenerPacientes(req, res);
});

router.get("/:id", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /*
    #swagger.tags = ['Pacientes']
    #swagger.summary = 'Consultar paciente por ID'
    #swagger.description = 'Obtiene la información de un paciente específico mediante su identificador. Requiere autenticación JWT y rol RECEPCIONISTA.'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return obtenerPacientesPorId(req, res);
});

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validatePatient,
  (req, res) => {
    /*
      #swagger.tags = ['Pacientes']
      #swagger.summary = 'Registrar paciente'
      #swagger.description = 'Registra un nuevo paciente en la clínica después de validar los datos enviados. Requiere autenticación JWT y rol RECEPCIONISTA.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return registrarPaciente(req, res);
  },
);

export default router;
