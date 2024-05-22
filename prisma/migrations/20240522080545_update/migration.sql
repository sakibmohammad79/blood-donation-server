/*
  Warnings:

  - You are about to drop the column `bloodType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - Added the required column `bloodType` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "bloodType" "BloodType" NOT NULL,
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bloodType",
DROP COLUMN "location";
