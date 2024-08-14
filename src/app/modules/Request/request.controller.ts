import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RequestService } from "./request.service";
import { User } from "@prisma/client";

const allRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.getAllRequest();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All blood request fetch successfully!",
    data: result,
  });
});
const allApprovedRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.getAllApprovedRequest();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All approved request fetch successfully!",
    data: result,
  });
});
const bloodRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.bloodRequestIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blood request send successfully!",
    data: result,
  });
});

const myBloodRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.getMyBloodRequestIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Blood request data fetched successfully!",
    data: result,
  });
});
const offeredMeBloodRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.getOfferedMeBloodRequest(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered me blood request data fetched successfully!",
    data: result,
  });
});

const bloodRequestStatusChange = catchAsync(async (req, res, next) => {
  const result = await RequestService.bloodRequestStatusChange(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered me blood request status update!",
    data: result,
  });
});

const getSingleRequestReceiver = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await RequestService.getSingleRequestReceiver(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single blood request reciever fetch!",
    data: result,
  });
});

export const RequestControoler = {
  allRequest,
  allApprovedRequest,
  bloodRequest,
  myBloodRequest,
  offeredMeBloodRequest,
  bloodRequestStatusChange,
  getSingleRequestReceiver,
};
