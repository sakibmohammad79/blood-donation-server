-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_requesterId_fkey";

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
