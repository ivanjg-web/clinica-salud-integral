import "dotenv/config";

import express from "express";
import cors from "cors";
import specialtyRoutes from "./routes/specialty.routes.ts";
import patientRoutes from "./routes/patient.routes.ts";
import doctorRoutes from "./routes/doctor.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/specialties", specialtyRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
