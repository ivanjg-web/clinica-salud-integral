import type { Request, Response, NextFunction } from "express";
import { dailyCutoffSchema } from "../schemas/reports.schema.ts";

export function validateReportDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = dailyCutoffSchema.safeParse(req.query);

  if (!resultado.success) {
    const mensaje = resultado.error.issues[0]?.message ?? "Fecha no válida";

    res.status(400).json({
      message: mensaje,
    });

    return;
  }

  next();
}
