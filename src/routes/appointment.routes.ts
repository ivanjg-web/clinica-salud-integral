import { Router } from "express";

import {
  crearCita,
  actualizarEstadoCita,
} from "../controllers/appointment.controller.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";
import {
  validateAppointment,
  validateAppointmentStatus,
} from "../middlewares/validate-appointment.ts";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA"),
  validateAppointment,
  (req, res) => {
    /*
      #swagger.tags = ['Citas']
      #swagger.summary = 'Registrar una cita médica'
      #swagger.description = 'Crea una nueva cita médica asociando un paciente con un médico y una fecha de atención. Requiere autenticación JWT y rol RECEPCIONISTA.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return crearCita(req, res);
  },
);

router.patch(
  "/:id/status",
  verifyToken,
  authorize("MEDICO"),
  validateAppointmentStatus,
  (req, res) => {
    /*
      #swagger.tags = ['Citas']
      #swagger.summary = 'Actualizar estado de una cita'
      #swagger.description = 'Permite actualizar el estado de una cita médica. Requiere autenticación JWT y rol MEDICO.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return actualizarEstadoCita(req, res);
  },
);

export default router;
