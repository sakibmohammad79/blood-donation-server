/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "contactNumber",
DROP COLUMN "email",
DROP COLUMN "location";
