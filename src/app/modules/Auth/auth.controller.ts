import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import ApiError from "../../error/ApiError";
import { Request, Response } from "express";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.logInUser(req.body);
  // const { refreshToken } = result;
  // res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Loggedin successfully!",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const passowrdChange = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
    }
    const user = req.user;
    const result = await AuthService.passwordChange(user, req.body, token);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password change successfully!",
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  passowrdChange,
};
