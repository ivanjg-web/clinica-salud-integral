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
    /*
      #swagger.tags = ['Reportes']
      #swagger.summary = 'Consultar citas por especialidad'
      #swagger.description = 'Genera un reporte con la cantidad de citas agrupadas por especialidad médica. Disponible únicamente para usuarios con rol GERENCIA.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return consultarCitasPorEspecialidad(req, res);
  },
);

router.get(
  "/daily-cutoff",
  verifyToken,
  authorize("GERENCIA"),
  validateReportDate,
  (req, res) => {
    /*
      #swagger.tags = ['Reportes']
      #swagger.summary = 'Consultar corte diario'
      #swagger.description = 'Genera un resumen de las citas correspondientes a una fecha específica, agrupadas según su estado. Requiere autenticación JWT y rol GERENCIA.'
      #swagger.security = [{ "bearerAuth": [] }]
    */
    return consultarCorteDiario(req, res);
  },
);

export default router;
