import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { paginateOptions } from "../../constant/globalConstant";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res, next) => {
  const query = pick(req.query, adminFilterableFields);
  const options = pick(req.query, paginateOptions);
  const result = await AdminService.getAllAdminFromDB(query, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdminFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
});

const adminDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await AdminService.adminDeleteIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

const adminSoftDelete = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await AdminService.adminSoftDeleteIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin soft delete by id!",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await AdminService.updateAdminIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin update successfully!",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  adminDelete,
  adminSoftDelete,
  updateAdmin,
};
