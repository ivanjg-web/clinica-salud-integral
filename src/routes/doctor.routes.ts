import { Router } from "express";
import {
  consultarMedicos,
  consultarMedicoPorId,
  consultarAgendaMedico,
} from "../controllers/doctor.controller.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";

const router = Router();

router.get("/", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /*
    #swagger.tags = ['Médicos']
    #swagger.summary = 'Listar médicos'
    #swagger.description = 'Obtiene el listado de médicos registrados en la clínica, incluyendo su información profesional. Requiere autenticación JWT y rol RECEPCIONISTA.'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return consultarMedicos(req, res);
});

router.get("/:id", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /*
    #swagger.tags = ['Médicos']
    #swagger.summary = 'Consultar médico por ID'
    #swagger.description = 'Obtiene la información de un médico específico mediante su identificador. Requiere autenticación JWT y rol RECEPCIONISTA.'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  return consultarMedicoPorId(req, res);
});

router.get(
  "/:id/appointments",
  verifyToken,
  authorize("MEDICO"),
  (req, res) => {
    /*
      #swagger.tags = ['Médicos']
      #swagger.summary = 'Consultar agenda médica'
      #swagger.description = 'Obtiene las citas asignadas al médico indicado, permitiendo consultar su agenda según los filtros disponibles. El médico autenticado únicamente puede consultar su propia agenda.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return consultarAgendaMedico(req, res);
  },
);

export default router;
