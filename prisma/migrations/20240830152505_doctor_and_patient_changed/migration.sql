/*
  Warnings:

  - The values [PEDING] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `approved` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinicAddress` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseDocument` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContact` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('SCHEDULED', 'CONFIRMED', 'CANCELLED');
ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "Status_new"[] USING ("status"::text::"Status_new"[]);
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "doctor" ADD COLUMN     "approved" BOOLEAN NOT NULL,
ADD COLUMN     "clinicAddress" TEXT NOT NULL,
ADD COLUMN     "licenseDocument" TEXT NOT NULL,
ADD COLUMN     "licenseNumber" INTEGER NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "emergencyContact" INTEGER NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL;
