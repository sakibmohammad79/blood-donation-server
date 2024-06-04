import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../error/ApiError";

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

  // async function hashPassword(password: any, costFactor = 12) {
  //   try {
  //     const hashedPassword = await bcrypt.hash(password, costFactor);
  //     return hashedPassword;
  //   } catch (error) {
  //     console.error("Error hashing password:", error);
  //     // Handle error appropriately (e.g., log, return an error response)
  //   }
  // }

  // const hashedPassword = hashPassword(payload.password);

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
      email: payload.admin.email,
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
  });

  let adminInfo;
  if (userInfo.role === UserRole.DONOR) {
    adminInfo = await prisma.donor.findUnique({
      where: {
        email: userInfo?.email,
      },
    });
  }
  if (userInfo.role === UserRole.ADMIN) {
    adminInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo?.email,
      },
    });
  }

  return {
    ...userInfo,
    ...adminInfo,
  };
};

export const UserService = {
  createDonorIntoDB,
  createAdminIntoDB,
  getMyProfileIntoDB,
};
