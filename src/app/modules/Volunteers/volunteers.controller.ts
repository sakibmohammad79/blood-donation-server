import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { VolunteerService } from "./volunteers.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "../Admin/admin.constant";
import { paginateOptions } from "../../constant/globalConstant";

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

const getAllVoluteer = catchAsync(async (req, res, next) => {
  const query = pick(req.query, adminFilterableFields);
  const options = pick(req.query, paginateOptions);
  const result = await VolunteerService.getAllVolunteerFromDB(query, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer data fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});
const activeVolunteer = catchAsync(async (req, res, next) => {
 const {id} = req.params
  const result = await VolunteerService.activeVolunteer(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer activated successfully!",
    data: result,
  });
});


export const VolunteerController = {
  createVolunteer,
  getAllVoluteer,
  activeVolunteer
};
