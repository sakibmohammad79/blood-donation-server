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
export const AuthService = {
  logInUser,
};
