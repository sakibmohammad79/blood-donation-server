import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const bloodRequestIntoDB = async (req: any) => {
  const user = req.user;
  //check user exists
  const requesterUserData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });
  //check donor exists
  const donorData = await prisma.donor.findFirstOrThrow({
    where: {
      email: requesterUserData.email,
      isDeleted: false,
    },
  });

  const bloodRequestData = req.body;
  bloodRequestData.requesterId = donorData.id;
  bloodRequestData.requesterEmail = donorData.email;
  bloodRequestData.location = donorData.location;
  bloodRequestData.contactNumber = donorData.contactNumber;

  const result = await prisma.request.create({
    data: bloodRequestData,
  });
  return result;
};

export const RequestService = {
  bloodRequestIntoDB,
};
