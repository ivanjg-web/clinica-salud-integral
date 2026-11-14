/*
  Warnings:

  - A unique constraint covering the columns `[doctor_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "doctor_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_doctor_id_key" ON "users"("doctor_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
