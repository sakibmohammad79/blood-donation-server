/*
  Warnings:

  - You are about to drop the column `addres` on the `Review` table. All the data in the column will be lost.
  - Added the required column `address` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "addres",
ADD COLUMN     "address" TEXT NOT NULL;
