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

export const AdminController = {
  getAllAdmin,
};
