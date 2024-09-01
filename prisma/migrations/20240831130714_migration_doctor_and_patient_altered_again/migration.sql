/*
  Warnings:

  - You are about to drop the column `doctorId` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `licenseDocument` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `licenseNumber` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `certificateOfSpecialization` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduateDiploma` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalResidencyCertificate` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalRegistration` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_patientId_fkey";

-- DropIndex
DROP INDEX "doctors_doctorId_key";

-- DropIndex
DROP INDEX "patients_patientId_key";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "doctorId",
DROP COLUMN "licenseDocument",
DROP COLUMN "licenseNumber",
ADD COLUMN     "certificateOfSpecialization" TEXT NOT NULL,
ADD COLUMN     "graduateDiploma" TEXT NOT NULL,
ADD COLUMN     "medicalResidencyCertificate" TEXT NOT NULL,
ADD COLUMN     "professionalRegistration" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "patientId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "doctorId",
DROP COLUMN "patientId";

-- CreateIndex
CREATE UNIQUE INDEX "doctors_userId_key" ON "doctors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_userId_key" ON "patients"("userId");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
