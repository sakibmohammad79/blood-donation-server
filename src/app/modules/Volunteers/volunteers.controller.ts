import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { VolunteerService } from "./volunteers.service";

const createVolunteer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await VolunteerService.createVolunteerIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Volunteer created successfully!",
      data: result,
    });
  }
);


export const VolunteerController = {
  createVolunteer,
};
