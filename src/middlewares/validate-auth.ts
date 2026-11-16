import type { Request, Response, NextFunction } from "express";
import { registerSchema } from "../schemas/auth.schema.ts";

export function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const resultado = registerSchema.safeParse(req.body);

  if (!resultado.success) {
    res.status(400).json({
      message: "Error de validación",
      errors: resultado.error.issues.map((error) => ({
        campo: error.path.join("."),
        mensaje: error.message,
      })),
    });

    return;
  }

  req.body = resultado.data;

  next();
}
