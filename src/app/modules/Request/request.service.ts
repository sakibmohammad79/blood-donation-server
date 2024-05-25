import { User, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const bloodRequestIntoDB = async (req: any) => {
  console.log(req.body);
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

  const result = await prisma.request.create({
    data: bloodRequestData,
  });
  return result;
};

const getMyBloodRequestIntoDB = async (req: any) => {
  const user = req.user;
  console.log({ user });
  const result = await prisma.request.findMany({
    where: {
      requesterEmail: user.email,
    },
  });
  return result;
};

const getOfferedMeBloodRequest = async (req: any) => {
  const { user } = req;
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id: user.userId,
    },
  });
  const donorData = await prisma.donor.findFirstOrThrow({
    where: {
      email: userData.email,
    },
  });
  const offeredMeRequestData = await prisma.request.findMany({
    where: {
      receiverId: donorData.id,
    },
  });
  return offeredMeRequestData;
};

export const RequestService = {
  bloodRequestIntoDB,
  getMyBloodRequestIntoDB,
  getOfferedMeBloodRequest,
};
