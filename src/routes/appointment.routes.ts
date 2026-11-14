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
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return crearCita(req, res);
  },
);

router.patch(
  "/:id/status",
  verifyToken,
  authorize("MEDICO"),
  validateAppointmentStatus,
  (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return actualizarEstadoCita(req, res);
  },
);

export default router;
