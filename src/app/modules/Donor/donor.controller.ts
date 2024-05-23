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

const getSingleDonor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await DonorService.getSingleDonorFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor data fetched by id!",
    data: result,
  });
});

const donorDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await DonorService.donorDeleteIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor deleted successfully!",
    data: result,
  });
});
const donorSoftDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await DonorService.donorSoftDeleteIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor soft delete by id!",
    data: result,
  });
});

const updateDonor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await DonorService.updateDonorIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donor update successfully!",
    data: result,
  });
});

export const DonorController = {
  getAllDonor,
  getSingleDonor,
  donorDelete,
  donorSoftDelete,
  updateDonor,
};
