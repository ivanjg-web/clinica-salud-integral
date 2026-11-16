import { Router } from "express";
import { listarEspecialidades } from "../controllers/specialty.controller.ts";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.tags = ['Especialidades']
    #swagger.summary = 'Listar especialidades médicas'
    #swagger.description = 'Obtiene el listado de todas las especialidades médicas registradas en la clínica.'
  */
  return listarEspecialidades(req, res);
});

export default router;
