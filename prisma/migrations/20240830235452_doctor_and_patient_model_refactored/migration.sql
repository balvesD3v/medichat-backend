/*
  Warnings:

  - You are about to drop the column `UserId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `availableTimes` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `birthdate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `clinicAddress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContact` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `licenseDocument` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_UserId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "UserId",
ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "patientId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "approved",
DROP COLUMN "availableTimes",
DROP COLUMN "birthdate",
DROP COLUMN "clinicAddress",
DROP COLUMN "emergencyContact",
DROP COLUMN "licenseDocument",
DROP COLUMN "licenseNumber",
DROP COLUMN "medicalHistory",
DROP COLUMN "specialization",
ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "patientId" INTEGER;

-- CreateTable
CREATE TABLE "doctors" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "specialization" TEXT[],
    "availableTimes" TEXT[],
    "licenseNumber" INTEGER NOT NULL,
    "licenseDocument" TEXT NOT NULL,
    "clinicAddress" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "birthdate" TIMESTAMP(3),
    "medicalHistory" TEXT,
    "emergencyContact" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_doctorId_key" ON "doctors"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_patientId_key" ON "patients"("patientId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
