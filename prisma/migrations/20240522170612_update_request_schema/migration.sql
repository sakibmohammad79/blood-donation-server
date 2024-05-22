/*
  Warnings:

  - Added the required column `requesterEmail` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "requesterEmail" TEXT NOT NULL;
