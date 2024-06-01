"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check user exists
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exists!");
    }
    //check password
    const isPasswordCorrent = bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordCorrent) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password not correct!");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtHelper_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    return {
        accessToken,
        needPasswordChange: user.needPasswordChange,
    };
});
const passwordChange = (user, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    //compare password
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isPasswordCorrect) {
        throw new Error("Old password not correct!");
    }
    const verifyToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.access_token_secret);
    if (!verifyToken) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized!");
    }
    //hashed password
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email,
            status: client_1.UserStatus.ACTIVE,
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false,
        },
    });
    return {
        success: true,
        message: "password change success!",
    };
});
exports.AuthService = {
    logInUser,
    passwordChange,
};
