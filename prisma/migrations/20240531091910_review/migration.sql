-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('APPROVED', 'PENDING');

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addres" TEXT NOT NULL,
    "photo" TEXT,
    "details" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_id_fkey" FOREIGN KEY ("id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
