/*
  Warnings:

  - You are about to drop the column `createdAt` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `chats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_appointmentId_fkey";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "appointmentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chats_appointmentId_key" ON "chats"("appointmentId");

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
