import { RequestStatus, User, UserStatus } from "@prisma/client";
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

  const result = await prisma.request.create({
    data: bloodRequestData,
  });
  return result;
};

const getMyBloodRequestIntoDB = async (req: any) => {
  const user = req.user;
  const result = await prisma.request.findMany({
    where: {
      requesterEmail: user.email,
    },
  });
  return result;
};

const getOfferedMeBloodRequest = async (req: any) => {
  const { user } = req;
  console.log(user);
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

  console.log(donorData);

  const offeredMeRequestData = await prisma.request.findMany({
    where: {
      receiverId: donorData.id,
    },
  });
  console.log(offeredMeRequestData);
  return offeredMeRequestData;
};

const bloodRequestStatusChange = async (req: any) => {
  const { user } = req;

  const { id } = req.params;
  const { status } = req.query;

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

  const offeredMeRequest = await prisma.request.findFirstOrThrow({
    where: {
      receiverId: donorData.id,
      requesterId: id,
    },
  });

  let offeredMeRequestUpdate;
  if (status === RequestStatus.APPROVED) {
    offeredMeRequestUpdate = await prisma.request.update({
      where: {
        id: offeredMeRequest.id,
      },
      data: {
        status: RequestStatus.APPROVED,
      },
    });
  }
  if (status === RequestStatus.REJECTED) {
    offeredMeRequestUpdate = await prisma.request.updateMany({
      where: {
        id: offeredMeRequest.id,
      },
      data: {
        status: RequestStatus.REJECTED,
      },
    });
  }
  if (status === RequestStatus.PENDING) {
    offeredMeRequestUpdate = await prisma.request.updateMany({
      where: {
        id: offeredMeRequest.id,
      },
      data: {
        status: RequestStatus.PENDING,
      },
    });
  }
  return offeredMeRequestUpdate;
};

const getSingleRequestReceiver = async (id: string) => {
  const result = await prisma.request.findFirstOrThrow({
    where: {
      receiverId: id,
    },
  });

  const donorInfo = await prisma.donor.findFirstOrThrow({
    where: {
      id: result.receiverId,
    },
  });
  return donorInfo;
};

export const RequestService = {
  bloodRequestIntoDB,
  getMyBloodRequestIntoDB,
  getOfferedMeBloodRequest,
  bloodRequestStatusChange,
  getSingleRequestReceiver,
};
