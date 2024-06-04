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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const createDonorIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.donor.email,
        },
    });
    const duplicateErrorCode = 409;
    if (userInfo) {
        throw new ApiError_1.default(duplicateErrorCode, "User already exists!");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            userName: payload.userName,
        },
    });
    if (user) {
        throw new ApiError_1.default(duplicateErrorCode, "User already exists!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    // async function hashPassword(password: any, costFactor = 12) {
    //   try {
    //     const hashedPassword = await bcrypt.hash(password, costFactor);
    //     return hashedPassword;
    //   } catch (error) {
    //     console.error("Error hashing password:", error);
    //     // Handle error appropriately (e.g., log, return an error response)
    //   }
    // }
    // const hashedPassword = hashPassword(payload.password);
    const userData = {
        email: payload.donor.email,
        password: hashedPassword,
        role: client_1.UserRole.DONOR,
        userName: payload.userName,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        //create user
        yield tx.user.create({
            data: userData,
        });
        //create donor
        const createDonor = yield tx.donor.create({
            data: payload.donor,
        });
        return createDonor;
    }));
    return result;
});
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.admin.email,
        },
    });
    const duplicateErrorCode = 409;
    if (userInfo) {
        throw new ApiError_1.default(duplicateErrorCode, "User already exists!");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: {
            userName: payload.userName,
        },
    });
    if (user) {
        throw new ApiError_1.default(duplicateErrorCode, "User already exists!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const adminData = {
        email: payload.admin.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
        userName: payload.userName,
    };
    //create user
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.create({
            data: adminData,
        });
        //create admin
        const createAdmin = yield tx.admin.create({
            data: payload.admin,
        });
        return createAdmin;
    }));
    return result;
});
const getMyProfileIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    let adminInfo;
    if (userInfo.role === client_1.UserRole.DONOR) {
        adminInfo = yield prisma_1.default.donor.findUnique({
            where: {
                email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
            },
        });
    }
    if (userInfo.role === client_1.UserRole.ADMIN) {
        adminInfo = yield prisma_1.default.admin.findUnique({
            where: {
                email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
            },
        });
    }
    return Object.assign(Object.assign({}, userInfo), adminInfo);
});
exports.UserService = {
    createDonorIntoDB,
    createAdminIntoDB,
    getMyProfileIntoDB,
};
