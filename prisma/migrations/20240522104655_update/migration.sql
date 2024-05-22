-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
