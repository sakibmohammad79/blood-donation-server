import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createDonor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createDonorIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Donor created successfully!",
      data: result,
    });
  }
);
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createAdminIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  }
);

export const UserController = {
  createDonor,
  createAdmin,
};
