import "dotenv/config";

import express from "express";
import cors from "cors";
import { createRequire } from "node:module";

import swaggerUi from "swagger-ui-express";

import specialtyRoutes from "./routes/specialty.routes.ts";
import patientRoutes from "./routes/patient.routes.ts";
import doctorRoutes from "./routes/doctor.routes.ts";
import authRoutes from "./routes/auth.routes.ts";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger/swagger-output.json");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/specialties", specialtyRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
