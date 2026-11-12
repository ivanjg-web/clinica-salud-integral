import { Router } from "express";
import { consultarMedicos } from "../controllers/doctor.controller.ts";
import { verifyToken } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";

const router = Router();

router.get("/", verifyToken, authorize("RECEPCIONISTA"), (req, res) => {
  /* #swagger.security = [{ "bearerAuth": [] }] */
  return consultarMedicos(req, res);
});

export default router;
