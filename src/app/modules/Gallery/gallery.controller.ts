import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { GallerlyService } from "./gallery.service";

const createGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await GallerlyService.createGalleryInotDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "New Gallery add successfully!",
      data: result,
    });
  }
);
const getAllGallery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await GallerlyService.getAllGalleryFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "gallery data fetch successfully!",
      data: result,
    });
  }
);


export const GalleryController = {
createGallery,
getAllGallery
};
