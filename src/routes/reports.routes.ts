import { Router } from "express";

import {
  consultarCitasPorEspecialidad,
  consultarCorteDiario,
} from "../controllers/reports.controller.ts";
import { validateReportDate } from "../middlewares/validate-report-date.ts";

import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";

const router = Router();

router.get(
  "/appointments-by-specialty",
  verifyToken,
  authorize("GERENCIA"),
  (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return consultarCitasPorEspecialidad(req, res);
  },
);

router.get(
  "/daily-cutoff",
  verifyToken,
  authorize("GERENCIA"),
  validateReportDate,
  (req, res) => {
    /* #swagger.security = [{ "bearerAuth": [] }] */
    return consultarCorteDiario(req, res);
  },
);

export default router;
