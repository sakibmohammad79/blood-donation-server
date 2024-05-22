import { Prisma, User, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createDonorIntoDB = async (payload: any) => {
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

export const UserService = {
  createDonorIntoDB,
  createAdminIntoDB,
};
