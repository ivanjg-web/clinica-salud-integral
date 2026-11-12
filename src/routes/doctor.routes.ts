import { Router } from "express";
import { consultarMedicos } from "../controllers/doctor.controller.ts";

const router = Router();

router.get("/", consultarMedicos);

export default router;
