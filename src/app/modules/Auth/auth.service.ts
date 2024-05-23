import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helper/jwtHelper";
import config from "../../../config";

const logInUser = async (payload: { email: string; password: string }) => {
  //check user exists

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  //check password
  const isPasswordCorrent = bcrypt.compare(payload.password, user.password);
  if (!isPasswordCorrent) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password not correct!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const passwordChange = async (
  user: {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  },
  payload: { oldPassword: string; newPassword: string },
  token: string
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  //compare password
  const isPasswordCorrect: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Old password not correct!");
  }

  const verifyToken = jwtHelpers.verifyToken(
    token,
    config.jwt.access_token_secret as Secret
  );

  if (!verifyToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized!");
  }

  //hashed password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
  return;
};
export const AuthService = {
  logInUser,
  passwordChange,
};
