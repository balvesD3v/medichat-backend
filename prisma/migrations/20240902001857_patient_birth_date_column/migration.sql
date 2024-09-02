/*
  Warnings:

  - You are about to drop the column `birthdate` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "birthdate",
ADD COLUMN     "birthDate" TIMESTAMP(3);
