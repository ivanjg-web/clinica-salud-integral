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
  /* #swagger.security = [{ "bearerAuth": [] }] */
  return consultarMedicos(req, res);
});

router.get("/:id", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }] */
  return consultarMedicoPorId(req, res);
});

router.get(
  "/:id/appointments",
  verifyToken,
  authorize("MEDICO"),
  (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return consultarAgendaMedico(req, res);
  },
);

export default router;
