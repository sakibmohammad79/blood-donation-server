import { Prisma, User, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";

const createDonorIntoDB = async (payload: any) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: payload.donor.email,
    },
  });
  const duplicateErrorCode = 409;
  if (userInfo) {
    throw new ApiError(duplicateErrorCode, "User already exists!");
  }
  const user = await prisma.user.findUnique({
    where: {
      userName: payload.userName,
    },
  });

  if (user) {
    throw new ApiError(duplicateErrorCode, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData: any = {
    email: payload.donor.email,
    password: hashedPassword,
    role: UserRole.DONOR,
    userName: payload.userName,
  };

  const result = await prisma.$transaction(async (tx) => {
    //create user
    await tx.user.create({
      data: userData,
    });
    //create donor
    const createDonor = await tx.donor.create({
      data: payload.donor,
    });
    return createDonor;
  });
  return result;
};
const createAdminIntoDB = async (payload: any) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: payload.donor.email,
    },
  });
  const duplicateErrorCode = 409;
  if (userInfo) {
    throw new ApiError(duplicateErrorCode, "User already exists!");
  }
  const user = await prisma.user.findUnique({
    where: {
      userName: payload.userName,
    },
  });

  if (user) {
    throw new ApiError(duplicateErrorCode, "User already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const adminData: any = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    userName: payload.userName,
  };

  //create user
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: adminData,
    });
    //create admin
    const createAdmin = await tx.admin.create({
      data: payload.admin,
    });
    return createAdmin;
  });
  return result;
};

const getMyProfileIntoDB = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      needPasswordChange: true,
    },
  });

  let profileInfo;
  if (userInfo.role === UserRole.DONOR) {
    profileInfo = await prisma.donor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return {
    ...userInfo,
    ...profileInfo,
  };
};

export const UserService = {
  createDonorIntoDB,
  createAdminIntoDB,
  getMyProfileIntoDB,
};
