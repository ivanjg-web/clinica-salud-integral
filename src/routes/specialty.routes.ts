import { Router } from "express";
import { listarEspecialidades } from "../controllers/specialty.controller.ts";

const router = Router();

router.get("/", listarEspecialidades);

export default router;
