import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),

  email: z
    .string()
    .trim()
    .email({ message: "El correo electrónico no es válido" }),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha de nacimiento no es válida",
    })
    .refine((date) => new Date(date) <= new Date(), {
      message: "La fecha de nacimiento no puede ser futura",
    }),
});
