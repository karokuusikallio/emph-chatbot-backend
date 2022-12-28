/*
  Warnings:

  - A unique constraint covering the columns `[conversationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "conversationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_conversationId_key" ON "User"("conversationId");
