/*
  Warnings:

  - Added the required column `contactNumber` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
