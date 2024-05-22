import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RequestService } from "./request.service";

const bloodRequest = catchAsync(async (req, res, next) => {
  const result = await RequestService.bloodRequestIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blood request send successfully!",
    data: result,
  });
});

export const RequestControoler = {
  bloodRequest,
};
