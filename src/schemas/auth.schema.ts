import { z } from "zod";

export const registerSchema = z
  .strictObject({
    email: z
      .string()
      .trim()
      .email("El formato del correo electrónico no es válido")
      .toLowerCase(),

    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),

    role: z.enum(["RECEPCIONISTA", "MEDICO", "GERENCIA"]),

    doctorId: z.number().int().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "MEDICO" && data.doctorId === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["doctorId"],
        message: "Debes asociar el usuario con un médico",
      });
    }

    if (data.role !== "MEDICO" && data.doctorId !== undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["doctorId"],
        message: "Solo los usuarios con rol MEDICO pueden tener doctorId",
      });
    }
  });
