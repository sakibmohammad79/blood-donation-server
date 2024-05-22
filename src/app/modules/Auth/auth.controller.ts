import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

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
      // needPasswordChange: result.needPasswordChange,
    },
  });
});

export const AuthController = {
  loginUser,
};
