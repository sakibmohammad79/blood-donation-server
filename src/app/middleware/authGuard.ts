import { Secret } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import ApiError from "../error/ApiError";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { IAuthUser } from "../interfaces/common";

const Guard = (...userRoles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      // console.log(token);
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
      const verfiedUser: any = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      );

      if (!verfiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      //set user in req
      req.user = verfiedUser;

      if (userRoles.length && !userRoles.includes(verfiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are forbidden!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default Guard;
