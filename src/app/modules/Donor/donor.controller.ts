import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { donorFilterableFields } from "./donor.constant";
import { paginateOptions } from "../../constant/globalConstant";
import { DonorService } from "./donor.service";

const getAllDonor = catchAsync(async (req, res, next) => {
  const query = pick(req.query, donorFilterableFields);
  const options = pick(req.query, paginateOptions);
  const result = await DonorService.getAllDonorFromDB(query, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor data fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const DonorController = {
  getAllDonor,
};
