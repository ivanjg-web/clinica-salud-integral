import { z } from "zod";

export const dailyCutoffSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato AAAA-MM-DD")
    .refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return true;
      }

      const fecha = new Date(`${value}T00:00:00`);

      return (
        !Number.isNaN(fecha.getTime()) &&
        fecha.toISOString().slice(0, 10) === value
      );
    }, "La fecha no es válida"),
});
