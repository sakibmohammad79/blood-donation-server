import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";

const createReivew = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReviewService.createReviewInotDB(req);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Your review send successfully!",
      data: result,
    });
  }
);
const getAllReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReviewService.getAllReviewFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review data fetch successfully!",
      data: result,
    });
  }
);

export const ReviewController = {
  createReivew,
  getAllReview,
};
