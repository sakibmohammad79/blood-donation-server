import { Prisma, User, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createDonorIntoDB = async (payload: any) => {
  console.log(payload);
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData: any = {
    email: payload.donor.email,
    password: hashedPassword,
    role: UserRole.DONOR,
    userName: payload.userName,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const createDonor = await tx.donor.create({
      data: payload.donor,
    });
    return createDonor;
  });
  return result;
};

export const UserService = {
  createDonorIntoDB,
};
