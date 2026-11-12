
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";


DROP TABLE "Appointment";
DROP TABLE "Doctor";
DROP TABLE "Patient";


DROP TYPE "AppointmentStatus";

-- Enums 
CREATE TYPE "AppointmentStatus" AS ENUM (
    'PROGRAMADA',
    'COMPLETADA',
    'CANCELADA'
);

CREATE TYPE "Role" AS ENUM (
    'RECEPCIONISTA',
    'MEDICO',
    'GERENCIA'
);

-- Tabla de especialidades
CREATE TABLE "specialties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- Tabla de pacientes
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- Tabla de médicos
CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- Tabla de citas
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PROGRAMADA',
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- Tabla de usuarios
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Indices únicos
CREATE UNIQUE INDEX "specialties_name_key"
ON "specialties"("name");

CREATE UNIQUE INDEX "patients_email_key"
ON "patients"("email");

CREATE UNIQUE INDEX "users_email_key"
ON "users"("email");

-- Relaciones
ALTER TABLE "doctors"
ADD CONSTRAINT "doctors_specialty_id_fkey"
FOREIGN KEY ("specialty_id")
REFERENCES "specialties"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "appointments"
ADD CONSTRAINT "appointments_patient_id_fkey"
FOREIGN KEY ("patient_id")
REFERENCES "patients"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "appointments"
ADD CONSTRAINT "appointments_doctor_id_fkey"
FOREIGN KEY ("doctor_id")
REFERENCES "doctors"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
