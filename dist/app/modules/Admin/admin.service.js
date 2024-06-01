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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const admin_constant_1 = require("./admin.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllAdminFromDB = (params, paginateOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(paginateOptions);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: admin_constant_1.adminSearchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                    mode: "insensitive",
                },
            })),
        });
    }
    andCondition.push({
        isDeleted: false,
    });
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.admin.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginateOptions.sortBy && paginateOptions.sortOrder
            ? {
                [paginateOptions.sortBy]: paginateOptions.sortOrder,
            }
            : { createdAt: "asc" },
        include: {
            user: true,
        },
    });
    const total = yield prisma_1.default.admin.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            user: true,
        },
    });
    return result;
});
const adminDeleteIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.admin.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeleteData = yield transactionClient.admin.delete({
            where: {
                id,
            },
        });
        yield transactionClient.user.delete({
            where: {
                email: adminDeleteData.email,
            },
        });
        return adminDeleteData;
    }));
    return result;
});
const adminSoftDeleteIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.admin.findFirstOrThrow({
            where: {
                id,
                isDeleted: false,
            },
        });
        const adminDeleteData = yield transactionClient.admin.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        yield transactionClient.user.update({
            where: {
                email: adminDeleteData.email,
            },
            data: {
                status: client_1.UserStatus.DELETED,
            },
        });
        return adminDeleteData;
    }));
    return result;
});
const updateAdminIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.admin.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const adminStatusChagne = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = query;
    const adminData = yield prisma_1.default.admin.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: adminData.email,
        },
    });
    let result;
    if (status === client_1.UserStatus.ACTIVE) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.ACTIVE },
        });
    }
    if (status === client_1.UserStatus.BLOCKED) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.BLOCKED },
        });
    }
    if (status === client_1.UserStatus.DELETED) {
        result = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: { status: client_1.UserStatus.DELETED },
        });
    }
    return result;
});
exports.AdminService = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    adminDeleteIntoDB,
    adminSoftDeleteIntoDB,
    updateAdminIntoDB,
    adminStatusChagne,
};
